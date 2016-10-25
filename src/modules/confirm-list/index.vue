<template>

  <div class="panel panel-default">
    <div class="panel-body">

      审核记录

    </div>
  </div>

</template>
<script>
  import configBaseComponent from 'components/base/index'
  import { state, actions } from './store'

  export default {
    name: 'ConfirmList',
    extends: configBaseComponent({ state, actions })
  }
</script>
