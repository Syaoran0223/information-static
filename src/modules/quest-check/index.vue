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
            <label for="" class="control-label col-sm-1">性质:</label>
            <div class="col-sm-11">
              <tag-selector const="has_sub" :value.sync="edit.formData.has_sub" :required="true"></tag-selector>
            </div>
          </div>
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
            v-if="is_selector && !edit.formData.has_sub">
          </select-quest>
          <understand-quest
            :readonly="true"
            :value.sync="edit.formData"
            v-if="!is_selector && !edit.formData.has_sub">
          </understand-quest>
          <sub-quest
            :readonly="true"
            :value.sync="edit.formData"
            :sub_items.sync="edit.formData.sub_items1"
            v-if="edit.formData.has_sub">
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
              v-if="is_selector && !edit.formData.has_sub"
              :readonly="true"
              :value.sync="edit.formData.options2">
          </option-view>

          <div class="form-group" v-if="!is_selector && !edit.formData.has_sub">
            <label for="" class="control-label col-sm-1">答案:</label>
            <div class="col-sm-11">
              <input-alert
                  :value.sync="edit.formData.correct_answer2"
                  placehold="点击此处输入答案">
              </input-alert>
            </div>
          </div>
          
          <div v-if="edit.formData.has_sub">
            <div class="panel panel-default" v-for="item in edit.formData.sub_items2">
              <sub-quest-item
                :value.sync="item"
                :readonly="true"  
                :sub_items.sync="edit.formData.sub_items2"
                :show_wrong="false"
                :subject="edit.formData.exam.subject"
                >
              </sub-quest-item>
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
  import {qtypes} from 'config'
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
      },
      is_selector() {
        let quest_type = _.find(qtypes, (d)=> {
          return d.id == this.edit.formData.quest_type_id
        })
        if (!quest_type) {
          return false
        }
        return quest_type.text == '选择题' || quest_type.text == '单选题' || quest_type.text == '多选题' || quest_type.text == '不定项选择题' || quest_type.text == '双选题'
      }
    },
    methods: {
      on_answer_right
    }
  }
</script>