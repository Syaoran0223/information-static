<template>
  <data-grid
    :data="table"
    @page-index-change="page_index_change"
  >

    <div class="">
      <div class="flex-grid" v-for="item in table.items" track-by="id">
        <div class="grid-cell cell-full c-title">
          {{item.realName}}
          <div>{{item.uniqNo}}</div>
        </div>
        <div class="grid-cell center">{{item.grade}}</div>
        <div class="grid-cell center">{{item.className}}</div>
        <div class="grid-cell center">{{item.term}}</div>
        <div class="grid-cell">{{item.status | get_const_value 'status'}}</div>
        <div class="grid-cell cell-btn-group">
          <button class="btn btn-link"
                  @click="on_item_edit_click(item, {tabs_active: 't_base'})"
          >编辑
          </button>
          <button class="btn btn-link"
                  @click="on_item_remove_click(item)"
          >删除
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
