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
          <div class="col-sm-4">
            剩余时间: {{timeout | parse_timeout}}
          </div>
        </div>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-body">
        试卷预处理
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
    name: 'PaperDeal',
    extends: configBaseComponent({ state, actions }),
    data() {
      return {
        timeout: 0
      }
    },
    watch: {
      timeout() {
        if (this.timeout <= 0) {
          return
        }
        setTimeout(() =>{
          this.timeout--
        }, 1000)
      }
    },
    ready() {
      if (this.timeout > 0) {
        this.timeout--
      }
      let id = this.$route.params.paper_id
      if (id != ':paper_id') {
        actions.on_item_edit_click({}, {id})
      }
    },
    methods: {
      accept,
      reject
    }
  }
</script>
