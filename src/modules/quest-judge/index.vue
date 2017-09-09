<template>

  <div class="panel panel-default" v-if="$route.params.quest_id == ':quest_id'">
    <div class="panel-body">
      <p class="text-center">请前往待裁定菜单选择题目</p>
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
            :show_answer="false"
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
            :show_sub="false"
            v-if="edit.formData.has_sub">
          </sub-quest>

        </div>
      </form>
    </div>
    <form class="form-horizontal">
    <div class="row" v-if="is_selector && !edit.formData.has_sub">
      <div class="col-sm-6">
        <div class="panel panel-default">
          <div class="panel-body">
            <option-view-sm
                :readonly="true"
                :value.sync="edit.formData.options1">
            </option-view-sm>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary"
                    @click="accept(1)"
                    :disabled="edit.accept_1">
              <span v-if="edit.accept_1">保存中...</span>
              <span v-else>采纳</span>
            </button>
          </div>
        </div>
      </div>
       <div class="col-sm-6">
        <div class="panel panel-default">
          <div class="panel-body">
            <option-view-sm
                :readonly="true"
                :value.sync="edit.formData.options2">
            </option-view-sm>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary"
                    @click="accept(2)"
                    :disabled="edit.accept_2">
              <span v-if="edit.accept_2">保存中...</span>
              <span v-else>采纳</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="row" v-if="!is_selector && !edit.formData.has_sub">
      <div class="col-sm-6">
        <div class="panel panel-default">
          <div class="panel-body">
            <div class="form-group">
              <label for="" class="control-label col-sm-2">答案:</label>
              <div class="col-sm-10 mg-t-7">
                {{{edit.formData.correct_answer1}}}
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary"
                    @click="accept(1)"
                    :disabled="edit.accept_1">
              <span v-if="edit.accept_1">保存中...</span>
              <span v-else>采纳</span>
            </button>
          </div>
        </div>
      </div>
       <div class="col-sm-6">
        <div class="panel panel-default">
          <div class="panel-body">
            <div class="form-group">
              <label for="" class="control-label col-sm-2">答案:</label>
              <div class="col-sm-10 mg-t-7">
                {{{edit.formData.correct_answer2}}}
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary"
                    @click="accept(2)"
                    :disabled="edit.accept_2">
              <span v-if="edit.accept_2">保存中...</span>
              <span v-else>采纳</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="row" v-if="edit.formData.has_sub">
      <div class="col-sm-6">
        <div class="panel panel-default">
          <div class="panel-body">
            <sub-quest-answer
              :sub_items.sync="edit.formData.sub_items1">
            </sub-quest-answer>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary"
                    @click="accept(1)"
                    :disabled="edit.accept_1">
              <span v-if="edit.accept_1">保存中...</span>
              <span v-else>采纳</span>
            </button>
          </div>
        </div>
      </div>
       <div class="col-sm-6">
        <div class="panel panel-default">
          <div class="panel-body">
            <sub-quest-answer
              :sub_items.sync="edit.formData.sub_items2">
            </sub-quest-answer>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary"
                    @click="accept(2)"
                    :disabled="edit.accept_2">
              <span v-if="edit.accept_2">保存中...</span>
              <span v-else>采纳</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    </form>
    
  </template>


</template>
<script>
  import configBaseComponent from 'components/base/edit'
  import { state, actions } from './store'
  const {accept} = actions
  import {qtypes} from 'config'

  export default {
    name: 'QuestJudge',
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
      accept
    }
  }
</script>