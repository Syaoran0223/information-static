<template>
  <data-grid
    :data="table"
    @page-index-change="page_index_change"
  >

    <div class="">
      <div class="flex-grid" v-for="item in table.items" track-by="id">
        <div class="grid-cell">{{item.identity}}</div>
        <div class="grid-cell">{{item.title}}</div>
        <div class="grid-cell">{{item.status | get_const_value 'status'}}</div>
        <div class="grid-cell cell-btn-group">
          <button class="btn btn-link"
                  @click="on_item_bind_click(item)">
            绑定权限
          </button>
          <button class="btn btn-link"
                  @click="on_item_edit_click(item,{edit_type:'edit'})"
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

  const { on_item_bind_click } = actions

  export default {
    extends: configBaseComponent({ state, actions }),
    methods: {
      on_item_bind_click
    }
  }
</script>
