<template>
  <data-grid
    :data="table"
    @page-index-change="page_index_change"
  >

    <div class="">
      <div class="flex-grid" v-for="item in table.items">
        <div class="grid-cell">{{item.exam_year}} {{item.exam_section | get_const_value 'section'}}</div>
        <div class="grid-cell">{{item.school_name}}</div>
        <div class="grid-cell cell-label">{{item.exam_grade | get_const_value 'grade'}}</div>
        <div class="grid-cell cell-label">{{item.exam_subject | get_const_value 'subject'}}</div>
        <div class="grid-cell">{{item.exam_name}}</div>
        <div class="grid-cell">第 {{item.quest_no}} 题</div>
        <div class="grid-cell cell-btn-group">
          <button class="btn btn-link"
              @click="on_item_edit_click(item)"
          >
            <span>我要裁定</span>
          </button>
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
