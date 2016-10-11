<template>
  <div>

    <div class="panel panel-default">
      <div class="panel-body">
        <button class="btn btn-primary"
                @click="on_item_add_click"
        >新增</button></div>
    </div>
    <div class="panel panel-default">
      <div class="panel-body">
        <table-view></table-view></div>
    </div>

    <edit-view></edit-view>

    <bind-view></bind-view>

    <confirm
      :open.sync="state.table.removeConfirm.open"
      :saving.sync="state.table.removeConfirm.saving">
      @confirm="on_item_remove"
    </confirm>

  </div>
</template>
<script type="text/babel">
  import configBaseComponent from 'components/base/index'
  import { state, actions } from './store'

  import TableView from './table.vue'
  import EditView from './edit.vue'
  import SearchView from './search.vue'
  import BindView from './bind.vue'

  export default {
    name: 'StudentBase',
    extends: configBaseComponent({ state, actions }),
    components: {
      TableView,
      EditView,
      SearchView,
      BindView
    }
  }
</script>
