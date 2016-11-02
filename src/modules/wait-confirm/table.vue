<template>
  <data-grid
    :data="table"
    @page-index-change="page_index_change"
  >

    <div class="">
      <div class="flex-grid" v-for="item in table.items" track-by="id">
        <div class="grid-cell">{{item.school_name}}</div>
        <div class="grid-cell cell-label">{{item.subject | get_const_value 'subject'}}</div>
        <div class="grid-cell cell-label">{{item.grade | get_const_value 'grade'}}</div>
        <div class="grid-cell">{{item.paper_types | get_const_value 'paper_type'}}</div>
        <div class="grid-cell">{{item.name}}</div>
        <div class="grid-cell cell-label">{{item.state | get_const_value 'paper_state'}}</div>
        <div class="grid-cell cell-btn-group">
          <button class="btn btn-link"
              @click="on_item_edit_click(item)"
          >
            <span>我要审核</span>
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
