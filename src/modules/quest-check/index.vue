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
      <form class="form-horizontal" @submit.prevent="on_answer_right">
        <div class="panel-body">
          <div class="form-group">
            <label for="" class="control-label col-sm-1">题型:</label>
            <div class="col-sm-11">
              <button type="button" class="btn btn-sm btn-primary">
                {{edit.formData.quest_type_id | get_const_value 'quest_types'}}
              </button>
            </div>
          </div>

          <select-quest
            :value.sync="edit.formData"
            :options.sync="edit.formData.options1"
            :readonly="true"
            v-if="edit.formData.quest_type_id==1">
          </select-quest>
          <blank-quest
            :readonly="true"
            :value.sync="edit.formData"
            :answer_list.sync="edit.formData.answer_list1"
            v-if="edit.formData.quest_type_id==2">
          </blank-quest>
          <understand-quest
            :readonly="true"
            :value.sync="edit.formData"
            v-if="edit.formData.quest_type_id==3">
          </understand-quest>
          <sub-quest
            :readonly="true"
            :value.sync="edit.formData"
            :sub_items.sync="edit.formData.sub_items1"
            v-if="edit.formData.quest_type_id==4">
          </sub-quest>

        </div>

        <div class="modal-footer">
          <button class="btn btn-danger" @click.prevent="edit.formData.is_error=1">答案错误</button>
          <button type="submit" class="btn btn-success"
                  :disabled="edit.answer_saving">
            <span v-if="edit.answer_saving">保存中...</span>
            <span v-else>答案正确</span>
          </button>
        </div>
      </form>
    </div>

    <div class="panel panel-default" v-if="is_error">
      <form class="form-horizontal" @submit.prevent="on_edit_submit">
        <div class="panel-body">
          <option-view
              v-if="edit.formData.quest_type_id==1"
              :readonly="true"
              :value.sync="edit.formData.options2">
          </option-view>

          <blank-answer
            v-if="edit.formData.quest_type_id==2"
            :value.sync="edit.formData.answer_list2">
          </blank-answer>

          <div class="form-group" v-if="edit.formData.quest_type_id==3">
            <label for="" class="control-label col-sm-1">答案:</label>
            <div class="col-sm-11">
              <input-alert
                  :value.sync="edit.formData.correct_answer2"
                  placehold="点击此处输入答案">
              </input-alert>
            </div>
          </div>
          
          <div v-if="edit.formData.quest_type_id==4">
            <div class="panel panel-default" v-for="item in edit.formData.sub_items2">
              <div class="panel-body">
                <div class="form-group">
                  <label for="" class="control-label col-sm-2">({{item.sort}}) 子题类型:</label>
                  <div class="col-sm-10">
                    <button type="button" class="btn btn-sm btn-primary">
                      {{item.quest_type_id | get_const_value 'quest_types'}}
                    </button>
                  </div>
                </div>

                <select-quest
                  :readonly="true"
                  :value.sync="item"
                  :options.sync="item.options"
                  v-if="item.quest_type_id==1"
                  :is-sub="true">
                </select-quest>

                <blank-quest
                  :readonly="true"
                  :value.sync="item"
                  :answer_list.sync="item.answer_list"
                  v-if="item.quest_type_id==2"
                  :is-sub="true">>
                </blank-quest>

                <understand-quest
                  :readonly="true"
                  :value.sync="item"
                  v-if="item.quest_type_id==3"
                  :is-sub="true">
                </understand-quest>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn btn-danger" @click.prevent="edit.formData.is_error=0">取消</button>
          <button type="submit" class="btn btn-primary"
                  :disabled="edit.saving">
            <span v-if="edit.saving">保存中...</span>
            <span v-else>保存</span>
          </button>
        </div>
      </form>
    </div>
    
  </template>


</template>
<script>
  import configBaseComponent from 'components/base/edit'
  import { state, actions } from './store'
  const {on_answer_right} = actions

  export default {
    name: 'QuestCheck',
    extends: configBaseComponent({ state, actions }),
    ready() {
      let id = this.$route.params.quest_id
      if (id != ':quest_id') {
        actions.on_item_edit_click({}, {id})
      }
    },
    computed: {
      is_error() {
        return this.edit.formData.is_error
      }
    },
    methods: {
      on_answer_right
    }
  }
</script>