<template>

  <div class="panel panel-default">
    <div class="panel-body">

      审核

    </div>
  </div>

</template>
<script>
  import configBaseComponent from 'components/base/edit'
  import { state, actions } from './store'

  export default {
    name: 'PaperConfirm',
    extends: configBaseComponent({ state, actions })
  }
</script>
