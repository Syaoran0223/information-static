<template>

  <div class="panel panel-default">
    <div class="panel-body">

      <search-view></search-view>
      <table-view></table-view>

    </div>
  </div>

</template>
<script>
  import configBaseComponent from 'components/base/index'
  import { state, actions } from './store'
  import TableView from './table'
  import SearchView from './search'

  export default {
    name: 'WaitDeal',
    extends: configBaseComponent({ state, actions }),
    components: {
      TableView,
      SearchView
    }
  }
</script>
