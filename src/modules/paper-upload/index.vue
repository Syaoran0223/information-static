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
                         v-model="edit.formData.seatNo">
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
                    const="school_years"
                    :value.sync="edit.formData.year"
                    :required="true"
                    width="100%"
                  ></selector>
                </div>
                <label for="" class="control-label col-sm-1">市</label>
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
                <label for="" class="control-label col-sm-2">县/区</label>
                <div class="col-sm-4">
                  <selector
                    const="school_years"
                    :value.sync="edit.formData.year"
                    :required="true"
                    width="100%"
                  ></selector>
                </div>
                <label for="" class="control-label col-sm-1">学校</label>
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

  export default {
    name: 'PaperUpload',
    extends: configBaseComponent({ state, actions })
  }
</script>
