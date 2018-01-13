<template>
  <data-grid
    :data="table"
    @page-index-change="page_index_change"
  >

    <div class="" v-for="item in table.items">
      <div class="flex-grid"  @click="item.open=!item.open">
        <div class="grid-cell">{{item.province_name}}</div>
        <div class="grid-cell">{{item.city_name}}</div>
        <div class="grid-cell">{{item.area_name}}</div>
        <div class="grid-cell">{{item.year}} {{item.section | get_const_value 'section'}}</div>
        <div class="grid-cell">{{item.school_name}}</div>
        <div class="grid-cell cell-label">{{item.grade | get_const_value 'grade'}}</div>
        <div class="grid-cell cell-label">{{item.subject | get_const_value 'subject'}}</div>
        <div class="grid-cell">{{item.name}}</div>
        <div class="grid-cell">上传时间: {{item.created_at | date_format}}</div>
        <div class="grid-cell cell-btn-group">
          <div class="grid-cell cell-label">
            <span class="glyphicon glyphicon-chevron-up" v-show="item.open"></span>
            <span class="glyphicon glyphicon-chevron-down" v-show="!item.open"></span>
          </div>
        </div>
      </div>
      <div class="panel panel-default" v-show="item.open">
        <div class="panel-body">
          <table class="table table-striped">
            <tr v-for="data in item.questions">
              <td>第 {{data.quest_no}} 题</td>
              <td>{{data.question.quest_type_id | get_const_value 'quest_types'}}</td>
              <td>{{data.question.has_sub | get_const_value 'has_sub'}}</td>
              <td>{{data.state | get_const_value 'question_state'}}</td>
              <td>
                <button v-if="data.state=='1'" class="btn btn-link"
                  @click="on_item_edit_click(data)">
                  <span>继续处理</span>
                </button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>

  </data-grid>
</template>
<script type="text/babel">
  import { state, actions } from './store'
  import configBaseComponent from 'components/base/table'
  export default {
    extends: configBaseComponent({ state, actions })
  }
</script>
