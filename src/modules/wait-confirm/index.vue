<template>

  <div class="panel panel-default">
    <div class="panel-body">

      待审核

    </div>
  </div>

</template>
<script>
  import configBaseComponent from 'components/base/index'
  import { state, actions } from './store'

  export default {
    name: 'WaitConfirm',
    extends: configBaseComponent({ state, actions })
  }
</script>
