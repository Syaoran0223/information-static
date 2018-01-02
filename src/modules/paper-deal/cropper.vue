<template>
  <div class="fileupload">
    <div class="files">
      <ul v-for="url in dest_images" class="filelist" style="display: block;">
        <li>
          <div class="img-bar">
            <a @click.prevent="remove($index)" style="cursor:pointer;"><span class="glyphicon glyphicon-trash img-tag"></span></a>
          </div>
          <p class="imgWrap">
            <a href="#" @click.prevent="open_dest_modal(url)">
              <img v-bind:src="url" width="100" height="100" />
            </a>
          </p>
        </li>
      </ul>
    </div>
  </div>
  <button class="btn btn-primary" @click.prevent="img_list_open=true">在线切图</button>
  <modal
    width="750px"
    :open.sync="img_list_open">
    <div class="modal-header">
      <button type="button" class="close" @click.prevent="img_list_open=false"><span>&times;</span></button>
      <h4 class="modal-title">截图</h4>
    </div>
    <div class="modal-body">
      <div class="row">
        <div class="col-sm-3" v-for="attachment in images">
          <a href="#" @click.prevent="open_modal(attachment.url)">
            <img v-bind:src="attachment.url"  width="110" height="110"/>
          </a>
        </div>
      </div>
      
    </div>
    <div class="modal-footer">
    </div>
  </modal>
  <modal
    width="900px"
    :open.sync="img_open">
    <div class="modal-header">
      <button type="button" class="close" @click.prevent="close_modal"><span>&times;</span></button>
      <h4 class="modal-title">截图</h4>
    </div>
    <div class="modal-body">
      <div>
        <img id="image" class="image" v-bind:src="open_url" style="max-width: 100%;">
      </div>
    </div>
    <div class="modal-footer">
      
      <button @click.prevent="save" class="btn btn-primary">
        <span v-if="saving">正在切图...</span>
        <span v-else>切图</span>
      </button>
      <button @click.prevent="save_whole" class="btn btn-primary">
        <span>截取整张</span>
      </button>
    </div>
  </modal>
  <modal
    width="900px"
    :open.sync="dest_img_open">
    <div class="modal-header">
      <button type="button" class="close" @click.prevent="dest_img_open=false"><span>&times;</span></button>
      <h4 class="modal-title">截图</h4>
    </div>
    <div class="modal-body">
      <div>
        <img v-bind:src="dest_url" style="max-width: 100%;">
      </div>
    </div>
  </modal>
</template>
<script>
  import { POST } from 'utils/ajax'
  import { api_host } from 'config'
  import { notify_ok } from 'utils/notification'

  export default {
    name: 'cropper',
    props: {
      images: {
        type: Array,
        default() {
          return []
        }
      },
      dest_images: {
        type: Array,
        twoWay: true,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        img_list_open: false,
        img_open: false,
        open_url: '',
        canvasData: null,
        cropBoxData: null,
        saving: false,
        dest_image: {
          list: []
        },
        dest_img_open: false,
        dest_url: ''
      }
    },
    methods: {
      init() {
        let el = $(this.$el.parentElement)
        this.$image = el.find('#image')
        this.$image.cropper({
          autoCropArea: 0.5,
          ready: () => {
            this.$image.cropper('setCanvasData', this.canvasData)
            this.$image.cropper('setCropBoxData', this.cropBoxData)
          }
        })
      },
      open_modal(url) {
        this.img_open = true
        this.open_url = url
        Vue.nextTick(() => {
          setTimeout(this.init, 500)
        })
      },
      close_modal() {
        this.img_open=false
        if (this.$image) {
          this.$image.cropper('destroy')
        }
      },
      open_dest_modal(url) {
        this.dest_img_open = true
        this.dest_url = url
      },
      gen_box(canvas, box) {
        box.right = box.left + box.width
        box.lower = box.top + box.height

        canvas.right = canvas.left + canvas.width
        canvas.lower = canvas.top + canvas.height

        box.left = box.left < canvas.left ? canvas.left : box.left
        box.top = box.top < canvas.top ? canvas.top : box.top

        box.right = box.right > canvas.right ? canvas.right : box.right
        box.lower = box.lower > canvas.lower ? canvas.lower : box.lower

        let left = ((box.left-canvas.left)/canvas.width) * canvas.naturalWidth
        let top = ((box.top-canvas.top)/canvas.height) * canvas.naturalHeight
        let right = ((box.right-canvas.left)/canvas.width)  * canvas.naturalWidth
        let lower = ((box.lower-canvas.top)/canvas.height) * canvas.naturalHeight
        let degree = this.$image.cropper('getData')['rotate']
        return [left, top, right, lower, degree]
      },
      remove(index) {
        this.dest_images.splice(index, 1);
      },
      rotate() {
        this.$image.cropper('rotate', 90)
      },
      save() {
        let canvasData = this.$image.cropper('getCanvasData')
        let boxData = this.$image.cropper('getCropBoxData')

        let box = this.gen_box(canvasData, boxData)

        console.log(box)
        let data = {
          file_url: this.open_url,
          box: box
        }
        this.saving = true
        POST(`${api_host}/api/cropper`, {
          data
        }).then((res) => {
          console.log(res)
          this.dest_images.push(res.url)
          notify_ok({
            title: '切割成功'
          }, {
            z_index: '3000'
          })
          this.img_open = false
          this.img_list_open = false
        }).catch(() => {

        }).then(() => {
          this.saving = false
          this.open_url = ''
          this.$image.cropper('destroy')
        })
      },
      save_whole() {
        this.dest_images.push(this.open_url)
        notify_ok({
          title: '切割成功'
        }, {
          z_index: '3000'
        })
        this.img_open = false
        this.img_list_open = false
        this.open_url = ''
        this.$image.cropper('destroy')
      }
    }
  }
</script>