<template>

  <ul class="list-group">

    <li class="list-group-item"
        v-for="item in items" track-by="id"
        :class="{
          'hidden': !item._visible
        }"
    >

      <span v-for="i in item.depth" class="tree-view__indent"></span>

      <span class="tree-view__expander glyphicon"
            :class="{
              'glyphicon-chevron-down': item._expand,
              'glyphicon-chevron-right': !item._expand
            }"
            v-if="item._has_children"
            @click.stop="on_click_item_expander(item)"
      ></span>

      <span @click.stop="on_select(item)">
            <i class="glyphicon"
               :class="{
                'glyphicon-check': item._selected,
                'glyphicon-unchecked': !item._selected
              }"
            ></i>
          </span>

      {{item.title}}
      <span class="text-muted small">{{item.status | get_const_value 'permission_status'}}</span>
    </li>

  </ul>

</template>
<script type="text/babel">
  import { api_host } from 'config'
  import { GET } from 'utils/ajax'
  import { parse_tree_data } from 'components/tree-view/parse'

  import Tree from 'components/tree-view/tree'

  export default {
    extends: Tree,
    data () {
      return {
        open: false,
        initDepth: 1
      }
    },
    methods: {
      on_select (item) {
        item._selected = !item._selected
        this.set_children_selected(item)
        this.set_parent_selected(item)
      }
    }
  }
</script>
