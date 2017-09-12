<template>
  <div>
    <div class="mg-t-7" v-show="!open">
      <p class="placehold" v-if="!value" @click="open=true">{{placehold}}</p>
      <p v-else @click="open=true">{{{value}}}</p>
    </div>
    <div v-show="open">
      <ckeditor
        :value.sync="value"
        :origin_value.sync="origin_value"
      ></ckeditor>
      <div class="modal-footer">
        <button type="button" class="btn btn-link"
                @click="close_window">关闭</button>
      </div>
    </div>
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
      },
      origin_value: {
        twoWay: true,
        default: ''
      }
    },
    data() {
      return {
        open: false
      }
    },
    methods: {
      close_window() {
        this.open=false
        MathJax.Hub.Queue(["Typeset", MathJax.Hub])
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