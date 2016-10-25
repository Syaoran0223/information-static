<template>

  <div class="panel panel-default">
    <div class="panel-body">

      上传记录

    </div>
  </div>

</template>
<script>
  import configBaseComponent from 'components/base/index'
  import { state, actions } from './store'

  export default {
    name: 'PaperUploadList',
    extends: configBaseComponent({ state, actions })
  }
</script>
