<template>
  <modal
    width="750px"
    :open.sync="edit.open">
    <loading-state :loading="edit.loading">
      <div class="modal-header">
        <button type="button" class="close" @click="edit.open=false"><span>&times;</span></button>
        <h4 class="modal-title">试卷</h4>
      </div>

      <div class="modal-body">
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
              <label for="" class="control-label col-sm-2">学科</label>
              <div class="col-sm-4">
                <selector
                  const="subject"
                  :value.sync="edit.formData.subject"
                  :required="true"
                  width="100%"
                ></selector>
              </div>
              <label for="" class="control-label col-sm-1">年级</label>
              <div class="col-sm-4">
                <selector
                  const="grade"
                  :value.sync="edit.formData.grade"
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
              </div>
            </div>
            

          </div>

          <div class="modal-footer" v-if="edit.formData.state==0 || edit.formData.state==-1">
            <button type="submit" class="btn btn-primary"
                    :disabled="edit.saving || edit.uploadState == 'uploading'">
              <span v-if="edit.saving">保存中...</span>
              <span v-else>保存</span>
            </button>
          </div>
        </form>
      </div>
    </loading-state>
  </modal>
</template>
<script>
  import configBaseComponent from 'components/base/edit'
  import { state, actions } from './store'

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
