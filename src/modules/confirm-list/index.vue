<template>

  <div class="panel panel-default">
    <div class="panel-body">
      <table-view></table-view>
      <edit-view></edit-view>

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
    name: 'ConfirmList',
    extends: configBaseComponent({ state, actions }),
    components: {
      TableView,
      EditView,
      SearchView
    }
  }
</script>
