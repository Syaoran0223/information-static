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
    <div class="row">
      <div class="col-sm-7">
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
                      :origin_value.sync="edit.formData.quest_content"
                      placehold="点击此处输入题干">
                  </input-alert>
                </div>
              </div>

              <option-view
                  :value.sync="option_values">
              </option-view>

              <div class="form-group">
                <label for="" class="control-label col-sm-1">答案</label>
                <div class="col-sm-11">
                  <input-alert
                      :value.sync="edit.formData.answer"
                      placehold="点击此处输入答案">
                  </input-alert>
                </div>
              </div>

              <div class="form-group">
                <label for="" class="control-label col-sm-1">解答</label>
                <div class="col-sm-11">
                  <input-alert
                      :value.sync="edit.formData.jieda"
                      placehold="点击此处输入解答">
                  </input-alert>
                </div>
              </div>

              <div class="form-group">
                <label for="" class="control-label col-sm-1">分析</label>
                <div class="col-sm-11">
                  <input-alert
                      :value.sync="edit.formData.fenxi"
                      placehold="点击此处输入分析">
                  </input-alert>
                </div>
              </div>

              <div class="form-group">
                <label for="" class="control-label col-sm-1">点评</label>
                <div class="col-sm-11">
                  <input-alert
                      :value.sync="edit.formData.dianpin"
                      placehold="点击此处输入点评">
                  </input-alert>
                </div>
              </div>

              <div class="form-group">
                <label for="" class="control-label col-sm-1">考点</label>
                <div class="col-sm-11">
                  <input-alert
                      :value.sync="edit.formData.kaodian"
                      placehold="点击此处输入考点">
                  </input-alert>
                </div>
              </div>

            </div>
          </form>
        </div>
      </div>
      <div class="col-sm-5">
        <div class="panel panel-default">
          <div class="panel-body">
            <div class="row">
              <div class="col-sm-10 col-sm-offset-1">
                <div class="form-group has-success has-feedback">
                  <input type="text" class="form-control" id="inputSuccess2" v-model="edit.formData.quest_content">
                  <span class="glyphicon glyphicon-search form-control-feedback"></span>
                </div>
              </div>
            </div>
            <search-view
              :value.sync="edit.formData.quest_content">
            </search-view>
          </div>
        </div>
      </div>
    </div>
    
  </template>


</template>
<script>
  import configBaseComponent from 'components/base/edit'
  import { state, actions } from './store'
  import router from 'router'
  import InputAlert from './input-alert.vue'
  import OptionView from './option-view.vue'
  import SearchView from './search.vue'

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
      OptionView,
      SearchView
    },
    data() {
      return {
        option_values: [
          {
            sort: 'A',
            content: '',
            _id: _.uniqueId('option_'),
            _selected: false
          },
          {
            sort: 'B',
            content: '',
            _id: _.uniqueId('option_'),
            _selected: false
          }
        ]
      }
    }
  }
</script>