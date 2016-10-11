<template>
  <div class="panel panel-default">
    <div class="panel-body">
      <button class="btn btn-primary"
              @click="on_item_add_click"
      >新增</button></div>
  </div>
  <div class="panel panel-default">
    <div class="panel-body">
      <search-view></search-view>
      <table-view></table-view>
    </div>
  </div>
  <edit-view></edit-view>
  <confirm :open.sync="state.table.removeConfirm.open" @confirm="on_item_remove" :saving.sync="state.table.removeConfirm.saving"></confirm>
</template>
<script type="text/babel">
  import configBaseComponent from 'components/base/index'
  import { state, actions } from './store'

  import TableView from './table.vue'
  import EditView from './edit.vue'
  import SearchView from './search.vue'

  export default {
    name: 'StudentBase',
    extends: configBaseComponent({ state, actions }),
    components: {
      TableView,
      EditView,
      SearchView
    }
  }
</script>
