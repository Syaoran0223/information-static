<template>

  <modal
    :open.sync="open"
    :width="width"
  >

    <div class="modal-body">
      <h4 style="margin-bottom: 14px;">{{title}}</h4>
      <p v-if="message" style="font-size: 16px;">{{message}}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-link"
              v-show="!saving"
              @click="open=false">取消</button>
      <button type="button" class="btn"
              :class="{
                    'btn-primary': !danger,
                    'btn-danger': danger
                }"
              :disabled="saving"
              @click="onConfirm">
        <span v-if="!saving">确认</span>
        <span v-else>正在处理...</span>
      </button>
    </div>

  </modal>

</template>

<script>
  export default {
    props: {
      title: {
        default: '确认删除该条数据'
      },
      message: {

      },
      open: {
        required: true,
        twoWay: true
      },
      saving: {
      },
      danger: {
        type: Boolean,
        default: true
      },
      width: {}
    },
    methods: {
      onConfirm () {
        this.$emit('confirm')
      }
    }
  }
</script>
