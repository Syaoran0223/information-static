<template>

  <div class="panel panel-default" v-if="$route.params.paper_id == ':paper_id'">
    <div class="panel-body">
      <p class="text-center">请前往待审核菜单选择试卷</p>
    </div>
  </div>
  <template v-else>
    <div class="panel panel-default">
      <div class="panel-body">
        <div class="row">
          <div class="col-sm-8">
            <h4>{{edit.formData.name}}</h4>
            <div>{{edit.formData.year | get_const_value 'school_years'}} {{edit.formData.section | get_const_value 'section'}} {{edit.formData.school_name}} {{edit.formData.grade | get_const_value 'grade'}} {{edit.formData.subject | get_const_value 'subject'}}</div>
          </div>
        </div>
      </div>
    </div>
    <file-upload
      :items.sync="edit.formData.attachments"
      :state.sync="edit.uploadState"
      :readonly="true"
    ></file-upload>
    
    <edit-view></edit-view>
    <div class="panel panel-default">
      <div class="panel-body">
        <div class="text-center">
          <button type="button" class="btn btn-primary">&nbsp;&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-plus"></span>&nbsp;&nbsp;&nbsp;&nbsp;</button>
        </div>
      </div>
    </div>
  </template>
  

</template>
<script>
  import configBaseComponent from 'components/base/edit'
  import { state, actions } from './store'
  import router from 'router'
  import EditView from './edit.vue'

  export default {
    name: 'PaperDeal',
    extends: configBaseComponent({ state, actions }),
    data() {
      return {
        questions: [
          {
            quest_no: 0,
            quest_type_id: 1,
            option_num: 0,
            has_sub: false,
            quest_images: [],
            answer_images: []
          }
        ]
      }
    },
    
    ready() {
      let id = this.$route.params.paper_id
      if (id != ':paper_id') {
        actions.on_item_edit_click({}, {id})
      }
    },
    components: {
      EditView
    }
  }
</script>
