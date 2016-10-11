<template>

  <ul class="list-group">

    <li class="list-group-item"
        v-for="item in items" track-by="id">

      <span v-for="i in item.depth" class="tree-view__indent"></span>

      <span v-if="item._has_children"
            class="tree-view__expander glyphicon glyphicon-chevron-down"></span>

      <span @click="on_select(item)">
            <i class="glyphicon"
               :class="{
                'glyphicon-check': item._selected
                'glyphicon-unchecked': !item._selected
              }"
            ></i>
          </span>

      {{item.title}}
    </li>

  </ul>

</template>
<script type="text/babel">
  import { api_host } from 'config'
  import { GET } from 'utils/ajax'
  import { parse_tree_data } from 'utils/parser'

  export default {
    extends: {},
    props: {
      items: {
        twoWay: true,
        default: null
      },
      initDepth: {
        default: 1
      }
    },
    data () {
      return {
      }
    },
    watch: {
      open () {
        if (!open) return
        this.query()
      }
    },
    methods: {
      query () {
        GET(`${api_host}/teacher/permissions`).then((res) => {
          this.items = parse_tree_data(res)
        })
      }
    }
  }
</script>
