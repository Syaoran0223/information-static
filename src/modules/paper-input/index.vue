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
        <div class="panel panel-default" v-if="edit.formData.selected_id == 0">
          <form class="form-horizontal" @submit.prevent="on_edit_submit">
            <div class="panel-body">
              <div class="form-group">
                <label for="" class="control-label col-sm-1">题型:</label>
                <div class="col-sm-11">
                  <tag-selector const="quest_types" :value.sync="edit.formData.quest_type_id" :required="true"></tag-selector>
                </div>
              </div>

              <select-quest
                :value.sync="edit.formData"
                :options.sync="edit.formData.options"
                v-if="edit.formData.quest_type_id==1">
              </select-quest>
              <blank-quest
                :value.sync="edit.formData"
                v-if="edit.formData.quest_type_id==2">
              </blank-quest>
              <understand-quest
                :value.sync="edit.formData"
                v-if="edit.formData.quest_type_id==3">
              </understand-quest>
              <sub-quest
                :value.sync="edit.formData"
                v-if="edit.formData.quest_type_id==4">
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
                <button class="btn btn-primary btn-xs">{{selected_item.name}}</button>
                <button class="btn btn-primary btn-xs">{{selected_item.subject_name}}</button>
              </p>
            </div>
            <div class="modal-footer">
              <button class="btn btn-success" @click.prevent="edit.formData.selected_id=0">取消选择</button>
              <button type="submit" class="btn btn-primary"
                      :disabled="edit.saving">
                <span v-if="edit.saving">保存中...</span>
                <span v-else>保存</span>
              </button>
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
  import router from 'router'
  import SearchView from './search.vue'
  import SelectQuest from './select-quest.vue'
  import BlankQuest from './blank-quest.vue'
  import UnderstandQuest from './understand-quest.vue'
  import SubQuest from './sub-quest.vue'

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
    computed: {
      selected_item() {
        let data = _.find(this.page.table.items, (d)=> {
          return d.qid == this.edit.formData.selected_id
        })
        return data
      }
    },
    components: {
      SearchView,
      SelectQuest,
      BlankQuest,
      UnderstandQuest,
      SubQuest
    }
  }
</script>