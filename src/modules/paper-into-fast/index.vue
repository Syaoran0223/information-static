<template>

  <div class="panel panel-default">
    <div class="panel-body">

      <search-view></search-view>
      <table-view></table-view>
      <edit-view></edit-view>

    </div>
  </div>

</template>
<script>
  import configBaseComponent from 'components/base/index'
  import { state, actions } from './store'
  import TableView from './table'
  import SearchView from './search'
  import EditView from './edit'

  export default {
    name: 'PaperIntoFast',
    extends: configBaseComponent({ state, actions }),
    components: {
      TableView,
      SearchView,
      EditView
    }
  }
</script>
