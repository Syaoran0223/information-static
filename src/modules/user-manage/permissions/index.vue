<template>

  <div class="panel panel-default">
    <div class="panel-body">
      <button class="btn btn-primary"
              @click="on_item_add_click({parentId: 0})"
      >新增
      </button>
    </div>

    <div class="panel-body">
      <table-view></table-view>
    </div>
  </div>

  <edit-view></edit-view>

  <confirm
    :open.sync="state.table.removeConfirm.open"
    @confirm="on_item_remove"
    :saving.sync="state.table.removeConfirm.saving"
  ></confirm>

</template>
<script type="text/babel">
  import configBaseComponent from 'components/base/index'
  import { state, actions } from './store'

  import TableView from './table.vue'
  import EditView from './edit'

  export default {
    name: 'Repairs',
    extends: configBaseComponent({ state, actions }),
    components: {
      TableView,
      EditView
    }
  }
</script>
