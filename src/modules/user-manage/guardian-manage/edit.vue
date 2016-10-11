<template>
  <modal
    :open.sync="edit.open">
    <loading-state :loading="edit.loading">

      <div class="modal-header">
        <button type="button" class="close" @click="edit.open=false"><span>&times;</span></button>
        <h4 class="modal-title">家长详情</h4>
      </div>

      <form class="form-horizontal">

        <div class="modal-body">
          <div class="form-group">
            <label for="" class="control-label col-sm-3">姓名</label>
            <div class="col-sm-9">
              <input type="text" class="form-control"
                     v-model="edit.formData.realName"
                     disabled>
            </div>
          </div>
          <div class="form-group">
            <label for="" class="control-label col-sm-3">手机</label>
            <div class="col-sm-9">
              <input type="text" class="form-control"
                     v-model="edit.formData.mobile"
                     disabled>
            </div>
          </div>
          <div class="form-group">
            <label for="" class="control-label col-sm-3">工作单位</label>
            <div class="col-sm-9">
              <input type="text" class="form-control"
                     v-model="edit.formData.work"
                     disabled>
            </div>
          </div>
          <div class="form-group">
            <label for="" class="control-label col-sm-3">职位</label>
            <div class="col-sm-9">
              <input type="text" class="form-control"
                     v-model="edit.formData.duty"
                     disabled>
            </div>
          </div>
          
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-link"
                  @click="edit.open=false">关闭</button>
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
