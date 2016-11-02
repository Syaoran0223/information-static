<template>

  <div class="panel panel-default">
    <div class="panel-body" v-if="$route.params.paper_id == ':paper_id'">
      <p class="text-center">请前往待审核菜单选择试卷</p>
    </div>
    <div class="panel-body" v-else>
      {{$route.params.paper_id}}
    </div>
  </div>

</template>
<script>
  import configBaseComponent from 'components/base/edit'
  import { state, actions } from './store'
  import router from 'router'

  export default {
    name: 'PaperConfirm',
    extends: configBaseComponent({ state, actions })
  }
</script>
