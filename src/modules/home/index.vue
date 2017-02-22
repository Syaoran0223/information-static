<template>

  <div class="panel panel-default">
    <div class="panel-body">
      <div class="jumbotron">
        <h4>思明教育--试卷收集系统</h4>
      </div>
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
