<template>

  <div class="panel panel-default" v-if="$route.params.quest_id == ':quest_id'">
    <div class="panel-body">
      <p class="text-center">请前往待录题菜单选择题目</p>
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
      <form class="form-horizontal" @submit.prevent="on_edit_submit">
        <div class="panel-body">
          <div class="form-group">
            <label for="" class="control-label col-sm-1">题型</label>
            <div class="col-sm-11">
              <tag-selector const="quest_types" :value.sync="edit.formData.quest_type_id" :required="true"></tag-selector>
            </div>
          </div>

          <div class="form-group">
            <label for="" class="control-label col-sm-1">题目</label>
            <div class="col-sm-11">
              <input-alert
                  :value.sync="edit.formData.quest_content_html"
                  placehold="点击此处输入题干">
              </input-alert>
            </div>
          </div>

          <div class="form-group">
            <label for="" class="control-label col-sm-1">选项</label>
            <div class="col-sm-11">
              <option-view
                  :value.sync="option_values">
              </option-view>
            </div>
          </div>

        </div>
      </form>
    </div>
  </template>


</template>
<script>
  import configBaseComponent from 'components/base/edit'
  import { state, actions } from './store'
  import router from 'router'
  import InputAlert from './input-alert.vue'
  import OptionView from './option-view.vue'

  const { accept, reject } = actions

  export default {
    name: 'PaperInput',
    extends: configBaseComponent({ state, actions }),
    ready() {
      let id = this.$route.params.quest_id
      if (id != ':quest_id') {
        actions.on_item_edit_click({}, {id})
      }
    },
    components: {
      InputAlert,
      OptionView
    },
    data() {
      return {
        option_values: [
          {
            sort: 'A',
            content: '',
            _id: _.uniqueId('option_')
          }
        ]
      }
    }
  }
</script>