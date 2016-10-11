<template>
  <modal
    :open.sync="edit.open">
    <loading-state :loading="edit.loading">

      <div class="modal-header">
        <button type="button" class="close" @click="edit.open=false"><span>&times;</span></button>
        <h4 class="modal-title">学生管理</h4>
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
            <label for="" class="control-label col-sm-3">学号</label>
            <div class="col-sm-9">
              <input type="text" class="form-control"
                     v-model="edit.formData.seatNo">
            </div>
          </div>
          <div class="form-group">
            <label for="" class="control-label col-sm-3">班级</label>
            <div class="col-sm-9">
              <selector
                remote="teacher/classes/suggest"
                :value.sync="edit.formData.class"
                :required="true"
              ></selector>
            </div>
          </div>
          <div class="form-group">
            <label for="" class="control-label col-sm-3">性别</label>
            <div class="col-sm-9">
              <selector
                const="gender"
                :value.sync="edit.formData.sex"
                :required="true"
              ></selector>
            </div>
          </div>
          <div class="form-group">
            <label for="" class="control-label col-sm-3">籍贯</label>
            <div class="col-sm-9">
              <input type="text" class="form-control"
                     v-model="edit.formData.nativePlace">
            </div>
          </div>
          <div class="form-group">
            <label for="" class="control-label col-sm-3">民族</label>
            <div class="col-sm-9">
              <input type="text" class="form-control"
                     v-model="edit.formData.nation">
            </div>
          </div>
          <div class="form-group">
            <label for="" class="control-label col-sm-3">入学时间</label>
            <div class="col-sm-9">
              <datetime-picker
                :value.sync="edit.formData.enrolDate"
                format="YYYY-MM-DD"
                :required="true"
              ></datetime-picker>
            </div>
          </div>
          <div class="form-group">
            <label for="" class="control-label col-sm-3">出生日期</label>
            <div class="col-sm-9">
              <datetime-picker
                :value.sync="edit.formData.birthDay"
                format="YYYY-MM-DD"
                :required="true"
              ></datetime-picker>
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
