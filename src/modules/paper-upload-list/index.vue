<template>

  <div class="panel panel-default">
    <div class="panel-body">
      <search-view></search-view>
      <table-view></table-view>
      <edit-view></edit-view>
      <confirm :open.sync="state.table.removeConfirm.open" @confirm="on_item_remove" :saving.sync="state.table.removeConfirm.saving"></confirm>
    </div>
  </div>

</template>
<script>
  import configBaseComponent from 'components/base/index'
  import { state, actions } from './store'
  import TableView from './table'
  import EditView from './edit'
  import SearchView from './search'

  export default {
    name: 'PaperUploadList',
    extends: configBaseComponent({ state, actions }),
    components: {
      TableView,
      EditView,
      SearchView
    }
  }
</script>
