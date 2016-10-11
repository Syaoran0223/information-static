<template>
  <modal
    :open.sync="edit.open">
    <loading-state :loading="edit.loading">

      <div class="modal-header">
        <button type="button" class="close" @click="edit.open=false"><span>&times;</span></button>
        <h4 class="modal-title">学期管理</h4>
      </div>

      <form class="form-horizontal"
        @submit.prevent="on_edit_submit">

        <div class="modal-body">
          <div class="form-group">
            <label for="" class="control-label col-sm-3">年级</label>
            <div class="col-sm-9">
              <selector
                const="grade"
                :value.sync="edit.formData.grade"
                :required="true"
              ></selector>
            </div>
          </div>
          <div class="form-group">
            <label for="" class="control-label col-sm-3">学期</label>
            <div class="col-sm-9">
              <selector
                const="term"
                :value.sync="edit.formData.term"
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