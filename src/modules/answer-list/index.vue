<template>

  <div class="panel panel-default">
    <div class="panel-body">

      <table-view></table-view>

    </div>
  </div>

</template>
<script>
  import configBaseComponent from 'components/base/index'
  import { state, actions } from './store'
  import TableView from './table'

  export default {
    name: 'AnswerList',
    extends: configBaseComponent({ state, actions }),
    components: {
      TableView
    }
  }
</script>
