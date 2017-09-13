<template>
  <div>
    <template v-if="show_wrong">
      <div class="mg-t-7 pull-left">
        <p class="placehold" v-if="!value">{{placehold}}</p>
        <p id="test" v-else>{{{value}}}</p>
      </div>
      <div class="mg-t-7 pull-left" style="margin-left: 15px;">
        <span><a href="#" @click.prevent="open=true">纠错</a></span>
      </div>
    </template>
    <template v-else>
      <div class="mg-t-7">
        <p class="placehold" v-if="!value" @click="open=true">{{placehold}}</p>
        <p v-else @click="open=true">{{{value}}}</p>
      </div>
    </template>
    
    <modal
      :open.sync="open"
      width="500"
    >

      <div class="modal-body">
        <ckeditor
          :value.sync="value"
          :origin_value.sync="origin_value"
        ></ckeditor>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-link"
                @click="close_window">关闭</button>
      </div>

    </modal>
  </div>
</template>
<script>
  export default {
    name: 'InputAlert',
    ready() {
      MathJax.Hub.Queue(["Typeset", MathJax.Hub])
    },
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
      },
      show_wrong: {
        type: Boolean,
        default: false
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