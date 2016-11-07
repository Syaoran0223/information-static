<template>

  <div class="panel panel-default">
    <div class="panel-body">
        用户信息
    </div>
  </div>

</template>
<script type="text/babel">
  import configBaseComponent from 'components/base/index'
  import { state, actions } from './store'
  
  export default {
    name: 'UserInfo',
    extends: configBaseComponent({ state, actions })
  }
</script>
