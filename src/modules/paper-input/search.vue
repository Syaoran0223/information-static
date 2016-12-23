<template>
  <data-grid
    :data="table"
    @page-index-change="page_index_change"
  >
    <div class="panel panel-default panel-hover" v-for="item in table.items" @click="select_quest(item.qid)">
      <div class="success-tag" v-show="selected_id == item.qid">选中</div>
      <div class="panel-body">
        <p>{{{item.qtxt}}}</p>
        <div v-for="d in item.qopt">
          <span style="float: left">{{d.Key}}:&nbsp;&nbsp;</span> {{{d.Value | trim}}}
        </div>
        <p class="text-right">
          <button class="btn btn-primary btn-xs">{{item.name}}</button>
          <button class="btn btn-primary btn-xs">{{item.subject_name}}</button>
        </p>
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
      },
      selected_id: {
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
      },
      select_quest(qid) {
        if (qid == this.selected_id) {
          this.selected_id = 0
        } else {
          this.selected_id = qid
        }
      }
    },
    data() {
      return {
        search: state.search
      }
    }
  }
</script>
<style scoped>
   .panel-hover {
      cursor:pointer;
   }
</style>            