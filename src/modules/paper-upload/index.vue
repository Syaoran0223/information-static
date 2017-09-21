<template>

  <div class="panel panel-default">
    <div class="panel-body">
      <div class="row">
        <div class="col-sm-8 col-sm-offset-2">
          <form class="form-horizontal"
            @submit.prevent="on_edit_submit">

            <div class="modal-body">
              <div class="form-group">
                <label for="" class="control-label col-sm-2">年度</label>
                <div class="col-sm-4">
                  <selector
                    const="school_years"
                    :value.sync="edit.formData.year"
                    :required="true"
                    width="100%"
                  ></selector>
                </div>
                <label for="" class="control-label col-sm-1">学期</label>
                <div class="col-sm-4">
                  <selector
                    const="section"
                    :value.sync="edit.formData.section"
                    :required="true"
                    width="100%"
                  ></selector>
                </div>
              </div>
              <div class="form-group">
                <label for="" class="control-label col-sm-2">试卷名称</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control"
                         v-model="edit.formData.name">
                </div>
              </div>
              <div class="form-group">
                <label for="" class="control-label col-sm-2">试卷类型</label>
                <div class="col-sm-9">
                  <selector
                    const="paper_type"
                    :value.sync="edit.formData.paper_types"
                    :required="true"
                    width="100%"
                  ></selector>
                </div>
              </div>
              <div class="form-group">
                <label for="" class="control-label col-sm-2">考试时间</label>
                <div class="col-sm-9">
                  <datetime-picker
                    :required="true"
                    :value.sync="edit.formData.exam_date"
                    format="YYYY-MM-DD"
                    width="100%"
                    >
                  </datetime-picker>
                </div>
              </div>
              <div class="form-group">
                <label for="" class="control-label col-sm-2">省</label>
                <div class="col-sm-4">
                  <selector
                    remote="api/province"
                    :value.sync="edit.formData.province_id"
                    :required="true"
                    width="100%"
                  ></selector>
                </div>
                <label for="" class="control-label col-sm-1">市</label>
                <div class="col-sm-4">
                  <selector
                    remote="api/city"
                    :remote-params.sync="cityForm"
                    :value.sync="edit.formData.city_id"
                    :required="true"
                    width="100%"
                  ></selector>
                </div>
              </div>
              <div class="form-group">
                <label for="" class="control-label col-sm-2">县/区</label>
                <div class="col-sm-4">
                  <selector
                    remote="api/area"
                    :value.sync="edit.formData.area_id"
                    :remote-params.sync="areaForm"
                    :required="true"
                    width="100%"
                  ></selector>
                </div>
                <label for="" class="control-label col-sm-1">学校</label>
                <div class="col-sm-4">
                  <selector
                    remote="api/school"
                    :value.sync="edit.formData.school_id"
                    :remote-params.sync="schoolForm"
                    :required="true"
                    width="100%"
                  ></selector>
                </div>
              </div>
              <div class="form-group">
                <label for="" class="control-label col-sm-2">年级</label>
                <div class="col-sm-4">
                  <selector
                    const="grade"
                    :value.sync="edit.formData.grade"
                    :required="true"
                    width="100%"
                  ></selector>
                </div>
                <label for="" class="control-label col-sm-1">学科</label>
                <div class="col-sm-4">
                  <selector
                    :init-items="subjects"
                    :value.sync="edit.formData.subject"
                    :required="true"
                    width="100%"
                  ></selector>
                </div>
              </div>
              <div class="form-group">
                <label for="" class="control-label col-sm-2">文件</label>
                <div class="col-sm-9">
                  <file-upload
                    :items.sync="edit.formData.attachments"
                    :state.sync="edit.uploadState"
                  ></file-upload>
                  <span id="helpBlock2" class="help-block">
                    请上传试卷文件，如有答案文件请一并上传(最大文件大小允许 20M)
                  </span>
                </div>
              </div>

              <div class="form-group">
                <label for="" class="control-label col-sm-2">快速通道</label>
                <div class="col-sm-9">
                  <tag-selector const="is_fast" :value.sync="edit.formData.is_fast" :required="true"></tag-selector>
                </div>
              </div>
              

            </div>

            <div class="modal-footer">
              <button type="submit" class="btn btn-primary"
                      :disabled="edit.saving || edit.uploadState == 'uploading'">
                <span v-if="edit.saving">保存中...</span>
                <span v-else>保存</span>
              </button>
            </div>
          </form>
        </div>
      </div>
      

    </div>
  </div>

</template>
<script>
  import configBaseComponent from 'components/base/edit'
  import { state, actions } from './store'
  const {init_edit} = actions
  import { subject_by_grade } from 'utils/consts'
  import { subjects } from 'config'

  export default {
    name: 'PaperUpload',
    extends: configBaseComponent({ state, actions }),
    watch: {
      'edit.formData.province_id'(val) {
        this.cityForm.pro_id = val
      },
      'edit.formData.city_id'(val) {
        this.areaForm.city_id = val
      },
      'edit.formData.area_id'(val) {
        this.schoolForm.ctid = val
      }
    },
    computed: {
      subjects() {
        if (!this.edit.formData.grade) {
          return []
        }
        let res = []
        if (this.edit.formData.grade < 7) {
          res = _.map(subjects[0].children, (data)=> {
            return {id: data.id, text: data.label}
          })
        } else if (this.edit.formData.grade < 10) {
          res =  _.map(subjects[1].children, (data)=> {
            return {id: data.id, text: data.label}
          })
        } else {
          res = _.map(subjects[2].children, (data)=> {
            return {id: data.id, text: data.label}
          })
        }
        res.unshift({id: null, text: '请选择'})
        return res
      }
    },
    ready() {
      this.init_edit()
    },
    methods: {
      init_edit
    },
    data() {
      return {
        cityForm: {
          pro_id: 0
        },
        areaForm: {
          city_id: 0
        },
        schoolForm: {
          ctid: 0
        }
      }
    }
  }
</script>
