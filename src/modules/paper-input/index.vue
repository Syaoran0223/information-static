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
    <file-upload :items.sync="edit.formData.images" :readonly="true"></file-upload>
    <div class="row">
      <div class="col-sm-7">
        <div class="panel panel-default" v-if="edit.formData.selected_id == 0">
          <form class="form-horizontal" @submit.prevent="on_edit_submit">
            <div class="panel-body">
              <div class="form-group">
                <label for="" class="control-label col-sm-1">题号:</label>
                <div class="col-sm-11">
                  <p class="form-control-static">{{edit.formData.quest_no}}</p>
                </div>
              </div>
              <div class="form-group">
                <label for="" class="control-label col-sm-1">性质:</label>
                <div class="col-sm-11">
                  <tag-selector const="has_sub" :value.sync="edit.formData.has_sub" :required="true"></tag-selector>
                </div>
              </div>

              <div class="form-group">
                <label for="" class="control-label col-sm-1">题型:</label>
                <div class="col-sm-11">
                  <tag-selector @click="change_qtype" :init-items="quest_type" :value.sync="edit.formData.quest_type_id" :required="true"></tag-selector>
                </div>
              </div>

              <select-quest
                :value.sync="edit.formData"
                :options.sync="edit.formData.options1"
                v-if="is_selector && !edit.formData.has_sub">
              </select-quest>
              <understand-quest
                :value.sync="edit.formData"
                v-if="!is_selector && !edit.formData.has_sub">
              </understand-quest>
              <sub-quest
                :value.sync="edit.formData"
                :sub_items.sync="edit.formData.sub_items1"
                v-if="edit.formData.has_sub">
              </sub-quest>

            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary"
                      :disabled="edit.saving">
                <span v-if="edit.saving">保存中...</span>
                <span v-else>保存</span>
              </button>
            </div>
          </form>
        </div>
        <div class="panel panel-default" v-else>
          <form class="form-horizontal" @submit.prevent="on_edit_submit">
            <div class="panel-body">
              <p>{{{selected_item.qtxt}}}</p>
              <div v-for="d in selected_item.qopt">
                <span style="float: left">{{d.Key}}:&nbsp;&nbsp;</span> {{{d.Value | trim}}}
              </div>
              <p class="text-right">
                <span class="label label-primary">{{selected_item.name}}</span>
                <span class="label label-primary">{{selected_item.subject_name}}</span>
              </p>
              <p class="text-right">
                <a href="http://i3ke.com/question/detail/{{selected_item.qid}}" target="blank">[查看详情]</a>
              </p>
            </div>
            <div class="modal-footer">
              <button class="btn btn-success" @click.prevent="edit.formData.selected_id=0">取消选择</button>
              <button type="submit" class="btn btn-primary"
                      :disabled="edit.saving">
                <span v-if="edit.saving">保存中...</span>
                <span v-else>完全一致</span>
              </button>
              <button class="btn btn-primary" @click.prevent="question_update">略作修改</button>
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
              :value.sync="edit.formData.quest_content"
              :selected_id.sync="edit.formData.selected_id">
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
  import { qtypes } from 'config'
  import router from 'router'
  import SearchView from './search.vue'

  const { accept, reject } = actions

  export default {
    name: 'PaperInput',
    extends: configBaseComponent({ state, actions }),
    data() {
      return {
        is_selector: true
      }
    },
    ready() {
      let id = this.$route.params.quest_id
      if (id != ':quest_id') {
        actions.on_item_edit_click({}, {id})
      }
    },
    computed: {
      selected_item() {
        let data = _.find(this.page.table.items, (d)=> {
          return d.qid == this.edit.formData.selected_id
        })
        return data
      },
      quest_type() {
        let data =  _.filter(qtypes, {subject_id: Number(this.edit.formData.exam.subject)})
        return data
      }
    },
    methods: {
      question_update() {
        let selected_item = this.selected_item
        this.edit.formData.selected_id = 0
        this.edit.formData.quest_content_html = selected_item.qtxt
        this.edit.formData.quest_content = selected_item.qword
        this.edit.formData.kaodian = selected_item.kaodian
        this.edit.formData.options1 = _.map(selected_item.qopt, (op)=> {
          return {
            sort: op.Key,
            content: op.Value,
            _id: _.uniqueId('option_'),
            _selected: false
          }
        })
      },
      change_qtype() {  
        let quest_type = _.find(this.quest_type, (d)=> {
          return d._selected
        })
        this.is_selector = quest_type.text == '选择题' || quest_type.text == '单选题' || quest_type.text == '多选题' || quest_type.text == '不定项选择题' || quest_type.text == '双选题'
      }
    },
    components: {
      SearchView
    }
  }
</script>