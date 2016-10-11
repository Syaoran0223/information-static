<template>
  <modal
    :open.sync="edit.open">
    <loading-state :loading="edit.loading">

      <div class="modal-header">
        <button type="button" class="close" @click="edit.open=false"><span>&times;</span></button>
        <h4 class="modal-title">位置</h4>
      </div>
      <div class="modal-body">

        <form class="form-horizontal"
          @submit.prevent="on_edit_submit">

          <div class="panel-body">
            <div class="form-group">
              <label for="" class="control-label col-sm-3">唯一标记</label>
              <div class="col-sm-9">
                <input type="text" class="form-control"
                    v-model="edit.formData.identity"
                    required>
              </div>
            </div>
            <div class="form-group">
              <label for="" class="control-label col-sm-3">标题</label>
              <div class="col-sm-9">
                <input type="text" class="form-control"
                    v-model="edit.formData.title"
                    required>
              </div>
            </div>
            <div class="form-group">
              <label for="" class="control-label col-sm-3">类型</label>
              <div class="col-sm-9">
                <tag-selector
                  const="permission_type"
                  :value.sync="edit.formData.type"
                ></tag-selector>
              </div>
            </div>
            <div class="form-group">
              <label for="" class="control-label col-sm-3">状态</label>
              <div class="col-sm-9">
                <tag-selector
                  const="permission_status"
                  :value.sync="edit.formData.status"
                ></tag-selector>
              </div>
            </div>
          </div>

          <div class="panel-footer text-right">
            <button type="button" class="btn btn-link"
                    @click="edit.open=false">取消</button>
            <button type="submit" class="btn btn-primary"
                    :disabled="edit.saving">
              <span v-if="edit.saving">保存中...</span>
              <span v-else>提交</span>
            </button>
          </div>

        </form>
      </div>

    </loading-state>
  </modal>
</template>
<script>
  import { api_host } from 'config'
  import { GET } from 'utils/ajax'
  import { state, actions } from './store'
  import configBaseComponent from 'components/base/edit'
  const {
    after_edit_done
  } = actions
  import { notify_ok } from 'utils/notification'

  export default {
    extends: configBaseComponent({ state, actions }),
    computed: {
    },
    methods: {
    }
  }
</script>
