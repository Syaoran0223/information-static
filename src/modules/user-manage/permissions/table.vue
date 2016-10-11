<template>
  <data-grid
    :data="table"
    @page-index-change="page_index_change"
  >

    <div class="">
      <table class="table table-bordered table-hover tree">

        <tr v-for="item in table.items" track-by="id" class="muted:item.hasRight">
          <td class="tree-view__item">

            <span v-for="i in item.depth" class="tree-view__indent"></span>

            <span v-if="item._has_children"
              class="tree-view__expander glyphicon glyphicon-chevron-down"></span>

            {{item.title}}
            <span class="text-muted small">({{item.identity}})</span>

            <span class="text-muted small">{{item.type | get_const_value 'permission_type'}}</span>
            <span class="text-muted small">{{item.status | get_const_value 'permission_status'}}</span>

            <div class="pull-right" v-if="!table.roleId">
              <a href="#"
                 @click.prevent="on_item_add_click({parentId: item.id})">
                新增</a>
              <a href="#" @click.prevent="on_item_edit_click(item)">
                编辑</a>
              <a href="#" @click.prevent="on_item_remove_click(item)">
                删除</a>
            </div>

          </td>
        </tr>

      </table>
    </div>

  </data-grid>
</template>
<script type="text/babel">
  import { state, actions } from './store'
  import configBaseComponent from 'components/base/table'
  const { on_item_add_click } = actions

  export default {
    extends: configBaseComponent({ state, actions }),
    methods: {
      on_item_add_click
    }
  }
</script>
