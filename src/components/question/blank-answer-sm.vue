<template>
  <div>
    <div class="form-group">
      <label for="" class="control-label col-sm-2">答案:</label>
      <div class="col-sm-10">
        <div v-for="item in value" class="row">
          <div class="mg-t-7">
            {{{item.content}}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'BlankAnswerSm',
    props: {
      value: {
        type: Array,
        twoWay: true
      }
    }
  }
</script>