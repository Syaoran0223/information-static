<template>
  <data-grid
    :data="table"
    @page-index-change="page_index_change"
  >

    <div class="">
      <div class="flex-grid" v-for="item in table.items" track-by="id">
        <div class="grid-cell">{{item.title}}</div>
        <div class="grid-cell">说明: {{item.info}}</div>
        <div class="grid-cell">积分: 
            <span v-if="item.type==-1">-</span>
            <span v-if="item.type==1">+</span>
            {{item.score}}
        </div>
        <div class="grid-cell">{{item.created_at | date_format}}</div>
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
