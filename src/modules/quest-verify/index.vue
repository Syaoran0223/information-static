<template>

  <div class="panel panel-default" v-if="$route.params.quest_id == ':quest_id'">
    <div class="panel-body">
      <p class="text-center">请前往待检查菜单选择题目</p>
    </div>
  </div>
  <template v-else>
    <div class="panel panel-default">
      <div class="panel-body">
        <div class="row">
          <div class="col-sm-12">
            <div>{{edit.formData.exam.name}} -- {{edit.formData.exam.year | get_const_value 'school_years'}} {{edit.formData.exam.section
              | get_const_value 'section'}} {{edit.formData.exam.school_name}} {{edit.formData.exam.grade | get_const_value
              'grade'}} {{edit.formData.exam.subject | get_const_value 'subject'}}</div>
          </div>
        </div>
      </div>
    </div>
    <file-upload :items.sync="edit.formData.images" :state.sync="edit.uploadState" :readonly="true"></file-upload>
    
    <div class="panel panel-default">
      <form class="form-horizontal">
        <div class="panel-body">
          <div class="form-group">
            <label for="" class="control-label col-sm-1">题型:</label>
            <div class="col-sm-11">
              <button type="button" class="btn btn-sm btn-primary">
                {{edit.formData.quest_type_id | get_const_value 'quest_types'}}
              </button>
            </div>
          </div>

          <select-verify
            :value.sync="edit.formData"
            v-if="edit.formData.quest_type_id==1">
          </select-verify>
          <blank-verify
            :value.sync="edit.formData"
            v-if="edit.formData.quest_type_id==2">
          </blank-verify>
          <understand-verify
            :value.sync="edit.formData"
            v-if="edit.formData.quest_type_id==3">
          </understand-verify>
          <sub-verify
            :value.sync="edit.formData"
            v-if="edit.formData.quest_type_id==4">
          </sub-verify>

        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-success"
                  @click="on_verify_right"
                  :disabled="edit.verify_saving">
            <span v-if="edit.verify_saving">保存中...</span>
            <span v-else>准确无误</span>
          </button>
          <button type="button" class="btn btn-primary"
                  @click="on_edit_submit"
                  :disabled="edit.saving">
            <span v-if="edit.saving">保存中...</span>
            <span v-else>提交修改</span>
          </button>
        </div>
      </form>
    </div>
  </template>


</template>
<script>
  import configBaseComponent from 'components/base/edit'
  import { state, actions } from './store'
  import SelectVerify from './select-verify.vue'
  import BlankVerify from './blank-verify.vue'
  import UnderstandVerify from './understand-verify.vue'
  import SubVerify from './sub-verify.vue'

  const {on_verify_right, on_edit_submit} = actions

  export default {
    name: 'QuestVerify',
    extends: configBaseComponent({ state, actions }),
    ready() {
      let id = this.$route.params.quest_id
      if (id != ':quest_id') {
        actions.on_item_edit_click({}, {id})
      }
    },
    components: {
      SelectVerify,
      BlankVerify,
      UnderstandVerify,
      SubVerify
    },
    methods: {
      on_verify_right
    }
  }
</script>