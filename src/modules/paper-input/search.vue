<template>
  <data-grid
    :data="table"
    @page-index-change="page_index_change"
  >
    <div class="panel panel-default" v-for="item in table.items">
      <div class="panel-body">
        <p>{{{item.qtxt}}}</p>
      </div>
    </div>
  <data-grid>
</template>
<script>
  import { state, actions } from './store'
  import configBaseComponent from 'components/base/table'

  const { table_query } = actions
  export default {
    extends: configBaseComponent({ state, actions }),
    name: 'SearchView',
    props: {
      value: {
        twoWay: true
      }
    },
    watch: {
      'value': _.debounce(function (val) {
        this.change_search_param(val)
      }, 500)
    },
    methods: {
      table_query,
      change_search_param(val) {
        this.search.formData = {
          q: val
        }
        this.table_query()
      }
    },
    data() {
      return {
        search: state.search
      }
    }
  }
</script>
            