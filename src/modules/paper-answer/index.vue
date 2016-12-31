<template>

  <div class="panel panel-default" v-if="$route.params.quest_id == ':quest_id'">
    <div class="panel-body">
      <p class="text-center">请前往待作答菜单选择题目</p>
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
      <div class="col-sm-12">
        <div class="panel panel-default" v-if="edit.formData.selected_id == 0">
          <form class="form-horizontal" @submit.prevent="on_edit_submit">
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
    </div>
    
  </template>


</template>
<script>
  import configBaseComponent from 'components/base/edit'
  import { state, actions } from './store'
  import router from 'router'

  const { accept, reject } = actions

  export default {
    name: 'PaperAnswer',
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
    }
  }
</script>