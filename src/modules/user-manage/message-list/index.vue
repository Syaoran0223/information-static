<template>

  <div class="panel panel-default">
    <div class="panel-body">
        消息记录
    </div>
  </div>

</template>
<script type="text/babel">
  import configBaseComponent from 'components/base/index'
  import { state, actions } from './store'
  
  export default {
    name: 'MessageList',
    extends: configBaseComponent({ state, actions })
  }
</script>
