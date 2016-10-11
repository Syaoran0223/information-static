<template>

  <div class="panel panel-default">
    <div class="panel-body">

      hello world

    </div>
  </div>

</template>
<script>
  import configBaseComponent from 'components/base/index'
  import { state, actions } from './store'

  export default {
    name: 'Home',
    extends: configBaseComponent({ state, actions })
  }
</script>
