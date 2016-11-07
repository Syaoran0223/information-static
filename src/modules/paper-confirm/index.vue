<template>

  <div class="panel panel-default" v-if="$route.params.paper_id == ':paper_id'">
    <div class="panel-body">
      <p class="text-center">请前往待审核菜单选择试卷</p>
    </div>
  </div>
  <template v-else>
    <div class="panel panel-default">
      <div class="panel-body">
        <div class="row">
          <div class="col-sm-8">
            <h4>{{edit.formData.name}}</h4>
            <div>{{edit.formData.year | get_const_value 'school_years'}} {{edit.formData.section | get_const_value 'section'}} {{edit.formData.school_name}} {{edit.formData.grade | get_const_value 'grade'}} {{edit.formData.subject | get_const_value 'subject'}}</div>
          </div>
          <div class="col-sm-4">
            剩余时间: {{edit.formData.countdown | parse_timeout}}
          </div>
        </div>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-body">
        <form class="form-horizontal">

          <div class="row">
            <div class="col-sm-8 col-sm-offset-2">
              
              <div class="form-group">
                <label for="" class="control-label col-sm-2">年度</label>
                <div class="col-sm-4">
                  <selector
                    const="school_years"
                    :value.sync="edit.formData.year"
                    :required="true"
                    width="100%"
                    :disabled="true"
                  ></selector>
                </div>
                <label for="" class="control-label col-sm-1">学期</label>
                <div class="col-sm-4">
                  <selector
                    const="section"
                    :value.sync="edit.formData.section"
                    :required="true"
                    :disabled="true"
                    width="100%"
                  ></selector>
                </div>
              </div>
              <div class="form-group">
                <label for="" class="control-label col-sm-2">试卷名称</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control"
                         v-model="edit.formData.name" disabled>
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
                    :disabled="true"
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
                    :disabled="true"
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
                    :disabled="true"
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
                    :disabled="true"
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
                    :disabled="true"
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
                    :disabled="true"
                  ></selector>
                </div>
                <label for="" class="control-label col-sm-1">年级</label>
                <div class="col-sm-4">
                  <selector
                    const="grade"
                    :value.sync="edit.formData.grade"
                    :required="true"
                    width="100%"
                    :disabled="true"
                  ></selector>
                </div>
              </div>
              <div class="form-group">
                <label for="" class="control-label col-sm-2">文件</label>
                <div class="col-sm-9">
                  <file-upload
                    :items.sync="edit.formData.attachments"
                    :state.sync="edit.uploadState"
                    :readonly="true"
                  ></file-upload>
                </div>
              </div>
              <div class="form-group">
                <label for="" class="control-label col-sm-2">备注</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control"
                         v-model="edit.confirmData.memo">
                </div>
              </div>

            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-danger"
                    @click.prevent="reject"
                    :disabled="edit.rejection.saving">
              <span v-if="edit.rejection.saving">保存中...</span>
              <span v-else>不通过</span>
            </button>
            <button class="btn btn-primary"
                    @click.prevent="accept"
                    :disabled="edit.acception.saving">
              <span v-if="edit.acception.saving">保存中...</span>
              <span v-else>通过</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  

</template>
<script>
  import configBaseComponent from 'components/base/edit'
  import { state, actions } from './store'
  import router from 'router'
  const { accept, reject } = actions

  export default {
    name: 'PaperConfirm',
    extends: configBaseComponent({ state, actions }),
    watch: {
      'edit.formData.countdown'() {
        if (this.edit.formData.countdown <= 0) {
          return
        }
        setTimeout(() =>{
          this.edit.formData.countdown--
        }, 1000)
      }
    },
    ready() {
      let id = this.$route.params.paper_id
      if (id != ':paper_id') {
        actions.on_item_edit_click({}, {id})
      }
    },
    methods: {
      accept,
      reject
    }
  }
</script>
