<template>
  <div>
    <div v-show="!loading">
      <slot></slot>
    </div>
    <div v-show="loading"
      style="line-height: 60px; text-align: center;">
      载入中...
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      loading: {}
    }
  }
</script>
