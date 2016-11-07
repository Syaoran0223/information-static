<template>

  <div class="panel panel-default">
    <div class="panel-body">

      待处理记录

    </div>
  </div>

</template>
<script>
  import configBaseComponent from 'components/base/index'
  import { state, actions } from './store'
  import TableView from './table'

  export default {
    name: 'WaitDeal',
    extends: configBaseComponent({ state, actions }),
    components: {
      TableView
    }
  }
</script>
