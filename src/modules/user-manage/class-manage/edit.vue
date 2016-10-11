<template>
  <modal
    :open.sync="edit.open"
    width="700px">
    <loading-state :loading="edit.loading">

      <div class="modal-header">
        <button type="button" class="close" @click="edit.open=false"><span>&times;</span></button>
        <h4 class="modal-title">班级管理</h4>
      </div>

      <form class="form-horizontal"
        @submit.prevent="on_edit_submit">

        <div class="modal-body">
          <div class="form-group">
            <label for="" class="control-label col-sm-3">学期</label>
            <div class="col-sm-9">
              <selector
                remote="teacher/terms/suggest"
                :value.sync="edit.formData.term"
                :required="true"
              ></selector>
            </div>
          </div>
          <div class="form-group">
            <label for="" class="control-label col-sm-3">班级名称</label>
            <div class="col-sm-9">
              <input type="text" class="form-control"
                     v-model="edit.formData.title"
                     style="width: 41%"
                     required>
              <p class="help-block">班级名称不必再填写年级信息，如：2班</p>
            </div>
          </div>
          <div class="form-group">
            <label for="" class="control-label col-sm-3">入学年份</label>
            <div class="col-sm-9">
              <selector
                const="school_years"
                :value.sync="edit.formData.enrollYear"
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
          <div class="form-group">
            <label for="" class="control-label col-sm-3">科任老师</label>
            <div class="col-sm-9">
              <div class="panel panel-default" v-for="teacher in edit.formData.teachers">
                <div class="panel-body">
                  <div class="row">
                    <div class="col-sm-6">
                      <selector
                        remote="teacher/teachers/suggest"
                        :value.sync="teacher.teacher"
                        remote-label="realName"
                        placeholder="请选择教师"
                        width="100%"
                        value-pick=""
                        @change="onSelectorChange"
                        :required="true"
                      ></selector>
                    </div>
                    <div class="col-sm-6">
                      <selector
                        const="subject"
                        :value.sync="teacher.subjects"
                        :required="true"
                        :multiple="true"
                        placeholder="请选择学科"
                        width="100%"
                      ></selector>
                    </div>
                  </div>
                </div>
                <div class="panel-footer">
                  <button type="button" class="btn btn-sm btn-danger" @click="removeTeacher(teacher.teacher.id)">删除</button>
                </div>
              </div>
              <div><button type="button" class="btn btn-sm btn-primary" @click="addTeacher">添加</button></div>
            </div>
          </div>
          <div class="form-group">
            <label for="" class="control-label col-sm-3">班主任</label>
            <div class="col-sm-9">
              <selector
                remote="teacher/teachers/suggest"
                :value.sync="edit.formData.headTeachers"
                :multiple="true"
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
  import { GET } from 'utils/ajax'

  export default {
    extends: configBaseComponent({ state, actions }),
    methods: {
      removeTeacher(id) {
        let teachers = _.clone(state.edit.formData.teachers)
        _.remove(teachers, (t)=> {
          return t.teacher.id == id
        })
        state.edit.formData.teachers = teachers
      },
      addTeacher() {
        state.edit.formData.teachers.push({subjects: []})
      },
      onSelectorChange(val) {
        if (_.isEmpty(val)) {
          return
        }
        let teachers = _.map(state.edit.formData.teachers, (t)=> {
          if (t.teacher.id == val.id && _.isEmpty(t.subjects)) {
            t.subjects.push(val.item.subject)
          }
          return t
        })
        state.edit.formData.teachers = teachers
      }
    }
  }
</script>
