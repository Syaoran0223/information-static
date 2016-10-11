<template>
  <modal
    :open.sync="edit.open">
    <loading-state :loading="edit.loading">

      <div class="modal-header">
        <button type="button" class="close" @click="edit.open=false"><span>&times;</span></button>
        <h4 class="modal-title">教师管理</h4>
      </div>

      <form class="form-horizontal"
        @submit.prevent="on_edit_submit">

        <div class="modal-body">
          <div class="form-group">
            <label for="" class="control-label col-sm-3">姓名</label>
            <div class="col-sm-9">
              <input type="text" class="form-control"
                     v-model="edit.formData.realName">
            </div>
          </div>
          <div class="form-group">
            <label for="" class="control-label col-sm-3">手机</label>
            <div class="col-sm-9">
              <input type="text" class="form-control"
                     v-model="edit.formData.mobile">
            </div>
          </div>
          <div class="form-group">
            <label for="" class="control-label col-sm-3">密码</label>
            <div class="col-sm-9">
              <input type="text" class="form-control"
                     v-model="edit.formData.password">
              <span class="help-block">无需修改密码时请留空</span>
            </div>
          </div>
          <div class="form-group">
            <label for="" class="control-label col-sm-3">学科</label>
            <div class="col-sm-9">
              <selector
                const="subject"
                :value.sync="edit.formData.subject"
                :required="true"
              ></selector>
            </div>
          </div>
          <div class="form-group">
            <label for="" class="control-label col-sm-3">类型</label>
            <div class="col-sm-9">
              <selector
                const="teacher_type"
                :value.sync="edit.formData.type"
                :required="true"
              ></selector>
            </div>
          </div>
          <div class="form-group">
            <label for="" class="control-label col-sm-3">角色</label>
            <div class="col-sm-9">
              <selector
                remote="teacher/roles/suggest"
                :multiple="true"
                :value.sync="edit.formData.roleIds"
                :required="true"
              ></selector>
            </div>
          </div>
          <div class="form-group">
            <label for="" class="control-label col-sm-3">状态</label>
            <div class="col-sm-9">
              <selector
                const="status"
                :value.sync="edit.formData.status"
                :required="true"
              ></selector>
            </div>
          </div>

        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-link"
                  @click="edit.open=false">取消</button>
          <button type="submit" class="btn btn-primary"
                  :disabled="edit.saving">
            <span v-if="edit.saving">保存中...</span>
            <span v-else>提交</span>
          </button>
        </div>

      </form>

    </loading-state>
  </modal>
</template>
<script>
  import { state, actions } from './store'
  import configBaseComponent from 'components/base/edit'

  export default {
    extends: configBaseComponent({ state, actions })
  }
</script>
