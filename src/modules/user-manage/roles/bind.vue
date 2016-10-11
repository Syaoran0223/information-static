<template>

  <modal
    :open.sync="bindview.open"
  >
    <div class="modal-header">
      <button type="button" class="close" @click="bindview.open=false"><span>&times;</span></button>
      <h4 class="modal-title">角色权限</h4>
    </div>

    <form @submit.prevent="bind_form_submit">

    <div class="modal-body">
      <permissions-tree-view
        :items.sync="bindview.items"
      ></permissions-tree-view>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-link"
              @click="bindview.open=false">取消</button>
      <button type="submit" class="btn btn-primary"
              :disabled="bindview.saving">
        <span v-if="bindview.saving">保存中...</span>
        <span v-else>提交</span>
      </button>
    </div>

    </form>
  </modal>

</template>
<script type="text/babel">
  import { state, actions } from './store'
  const { bind_form_submit } = actions
  import PermissionsTreeView from './permissions-tree-view.vue'

  export default {
    components: {
      PermissionsTreeView
    },
    data () {
      return {
        bindview: state.permissionBindModal
      }
    },
    methods: {
      bind_form_submit
    }
  }
</script>
