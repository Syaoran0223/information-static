<template>
  <data-grid
    :data="table"
    @page-index-change="page_index_change"
  >

    <div class="">
      <div class="flex-grid" v-for="item in table.items" track-by="id">
        <div class="grid-cell">{{item.title}}</div>
        <div class="grid-cell">{{item.created_at | date_format 'YYYY-MM-DD HH:mm:ss'}}</div>
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
