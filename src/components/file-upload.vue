<template>
  <div class="panel panel-default fileupload">
    <div class="panel-body">
      <div id="files" class="files">
        <ul v-for="file in items" class="filelist" style="display: block;">
          <li>
            <div class="img-bar" v-show="file.status!='pending' && !readonly">
              <a v-bind:href="file.url" target="_blank" v-show="file.status=='success'" style="cursor:pointer;"><span class="glyphicon glyphicon-download-alt img-tag"></span></a>
              <a @click.prevent="remove(file)" v-show="file.status!='pending'" style="cursor:pointer;"><span class="glyphicon glyphicon-trash img-tag"></span></a>
              <a @click.prevent="reupload(file.id)" v-show="file.status=='error'" style="cursor:pointer;"><span class="glyphicon glyphicon-repeat img-tag"></span></a>
            </div>
            <div class="img-bar" v-show="file.status!='pending' && readonly && !this.isTrue(file.can_preview)">
              <a v-bind:href="file.url" target="_blank" v-show="file.status=='success'" style="cursor:pointer;"><span class="glyphicon glyphicon-download-alt img-tag"></span></a>
            </div>
            <p class="title" style="z-index: 1000;">{{file.name}}</p>
            <p v-show="this.isTrue(file.can_preview) && (file.status=='success' || file.status=='complete')" class="imgWrap">
              <a href="#" @click.prevent="open_modal(file.url)">
                <img v-bind:src="file.url" width="110" height="110" />
              </a>
            </p>
            <p class="imgWrap" v-show="!this.isTrue(file.can_preview) && (file.status=='success' || file.status=='complete')">{{file.name}}</p>
            <p class="imgWrap" v-show="file.status=='uploading'">正在上传...</p>
            <p class="imgWrap" v-show="file.status=='pending'">等待上传...</p>
            <p class="imgWrap" v-show="file.status=='error'">{{file.error_msg}}</p>
            <span class="success" v-show="file.status=='success' && !readonly"></span>
            <div v-show="file.status=='uploading'" id="progress" class="progress img-progress">
              <div class="progress-bar progress-bar-success" v-bind:style="{ width: file.percentage }"></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="panel-footer clearfix" v-if="!readonly">
      <div class="pull-right">
        <div id="{{ id }}"></div>
      </div>
    </div>
  </div>
  <modal
    width="100%"
    :open.sync="modal_open">
    <div class="modal-header">
      <button type="button" class="close" @click="close_modal"><span>&times;</span></button>
      <h4 class="modal-title">截图</h4>
    </div>
    <div class="modal-body">
      <img id="image" v-bind:src="open_url" style="max-width: 100%;"/>
    </div>
    <div class="modal-footer">
    </div>
  </modal>
</template>

<script type="text/babel">
  import { api_host } from 'config'
  import * as ConstTypes from 'utils/consts'
  import WebUploader from 'webuploader'
  import { notify_error } from 'utils/notification'

  export default {
    props: {
      items: {
        twoWay: true,
        default() {
          return []
        }
      },
      dirname: {
        type: String,
        default: 'default'
      },
      type: {
        type: String,
        default: 'all'
      },
      btnName: {
        type: String,
        default: '点击上传文件'
      },
      state: {
        twoWay: true,
        type: String,
        default: 'done'
      },
      readonly: {
        type: Boolean,
        default: false
      },
      cutable: {
        type: Boolean,
        default: false
      }
    },
    data() {
      let id = _.uniqueId('filePicker_')
      return {
        id: id,
        uploadOptions: {
          pick: {
            id: '#' + id,
            label: this.btnName
          },
          auto: true,
          runtimeOrder: 'html5',
          chunked: false,
          chunkSize: 512 * 1024,
          server: `${api_host}/api/uploads`,
          // 禁掉全局的拖拽功能。这样不会出现图片拖进页面的时候，把图片打开。
          disableGlobalDnd: true,
          fileNumLimit: 300,
          fileSizeLimit: 200 * 1024 * 1024,    // 200 M
          fileSingleSizeLimit: 50 * 1024 * 1024    // 50 M
        },
        fileOpt: {
          count: 0
        },
        uploader: {},
        modal_open: false,
        open_url: '',
        $image: null,
        cropBoxData: null,
        canvasData: null
      }
    },
    ready() {
      window.setTimeout(this.init, 500)
      if (this.cutable) {
        this.$image = $('#image')
      }
    },
    methods: {
      init() {
        if (this.type == 'image') {
          this.uploadOptions.accept = [
            {
              title: 'Images',
              extensions: 'gif,jpg,jpeg,bmp,png',
              mimeTypes: 'image/png,image/jpg,image/jpeg,imge/bmp,image/gif'
            }
          ]
        }
        this.uploader = WebUploader.create(this.uploadOptions)
        // 添加文件
        this.uploader.onFileQueued = ( file ) => {
          this.fileOpt.count++
          let fileState = {
            url: '',
            can_preview: file.type.startsWith('image'),
            name: file.name,
            serverCode: 0,
            status: 'pending',
            percentage: '0%',
            id: file.id,
            error_msg: ''
          }
          this.items.push(fileState)
        }
        // 文件上传过程中创建进度条实时显示。
        this.uploader.on( 'uploadProgress', ( file, percentage ) => {
          let fileState = this.getFileState(file.id)
          fileState.percentage = percentage * 100 + '%'
        })
        //开始上传
        this.uploader.on('uploadStart', ( file )=> {
          let fileState = this.getFileState(file.id)
          fileState.status = 'uploading'
          this.state = 'uploading'
        })
        // 上传成功
        this.uploader.on( 'uploadSuccess', ( file ) => {
          let fileState = this.getFileState(file.id)
          if (fileState.serverCode != 0) {
            return
          }
          fileState.status = 'success'
          this.uploader.removeFile(file.id)
        })
        // 上传结束
        this.uploader.on('uploadFinished', (file) => {
          this.state = 'done'
        })
        //接收服务端返回
        this.uploader.on('uploadAccept', (file, response) => {
          let fileState = this.getFileState(file.file.id)
          fileState.serverCode = response.code
          if (response.code != 0) {
            fileState.status = 'error'
            fileState.error_msg = response.msg
            return
          }
          fileState.url = response.data[0]
        })
        // 上传失败
        this.uploader.on( 'uploadError', ( file ) => {
          let fileState = this.getFileState(file.id)
          fileState.status = 'error'
          fileState.error_msg = '上传失败'
        })
        // 全局上传状态
        this.uploader.on( 'all', ( type ) => {
          if ( type === 'startUpload' ) {
            this.fileOpt.status = 'uploading';
          } else if ( type === 'stopUpload' ) {
            this.fileOpt.status = 'paused';
          } else if ( type === 'uploadFinished' ) {
            this.fileOpt.status = 'done';
          }
        })
      },
      getFileState(file_id) {
        return _.find(this.items, (f)=> {
            return f.id == file_id
          })
      },
      remove(file) {
        let files = _.clone(this.items)
        _.remove(files, (f) => {
          return f.id == file.id
        })
        this.items = files
        if (_.isEmpty(this.items)) {
          this.state = 'done'
        }
        if (file.status != 'success') {
          this.uploader.removeFile(file.id)
        }
      },
      reupload(file_id) {
        this.uploader.upload(file_id)
      },
      isTrue(val) {
        if (_.isBoolean(val)) {
          return val
        } else {
          return val == 'true' ? true : false
        }
      },
      open_modal(url) {
        this.modal_open = true
        this.open_url = url
        if (this.cutable) {
          Vue.nextTick(() => {
            this.$image.cropper({
              autoCropArea: 0.5,
              ready: () => {
                this.$image.cropper('setCanvasData', this.canvasData);
                this.$image.cropper('setCropBoxData', this.cropBoxData);
              }
            })
          })
        }
      },
      close_modal() {
        this.modal_open=false
        if (this.cutable && this.$image) {
          this.$image.cropper('destroy')
        }
      }
    }
  }
</script>
