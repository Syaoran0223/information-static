<template>
  <div>
    <div class="mg-t-7">
      <p class="placehold" v-if="!value" @click="open=true">{{placehold}}</p>
      <p v-else @click="open=true">{{{value}}}</p>
    </div>
    
    <modal
      :open.sync="open"
      width="500"
    >

      <div class="modal-body">
        <ckeditor
          :value.sync="value"
        ></ckeditor>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-link"
                @click="open=false">关闭</button>
      </div>

    </modal>
  </div>
</template>
<script>
  export default {
    name: 'InputAlert',
    props: {
      placehold: {
        type: String,
        default: '点击此处输入文字'
      },
      value: {
        twoWay: true
      }
    },
    data() {
      return {
        open: false
      }
    }
  }
</script>
<style>
  .mg-t-7 {
    margin-top: 7px;
  }

  .placehold {
    color: #9e9e9e
  }
</style>