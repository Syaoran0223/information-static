import { api_host } from 'config'
import createStore from 'store/createStore'
import { GET, PUT } from 'utils/ajax'
import { notify_ok } from 'utils/notification'

import { parse_tree_data } from 'components/tree-view/parse'

const module_state = {
  config: {
    api: 'teacher/roles'
  },

  permissionBindModal: {
    open: false,
    loading: false,
    saving: false,
    items: [],
    params: {}
  }
}


const module_actions = {

  on_item_bind_click ({ state, actions }, item) {
    state.permissionBindModal.open = true
    state.permissionBindModal.params = item
    actions.query_permissions({ state })
  },

  //permissions
  query_permissions ({ state }) {
    state.permissionBindModal.loading = true
    state.permissionBindModal.items = []
    GET(`${api_host}/teacher/permissions`, {
      data: {
        roleId: state.permissionBindModal.params.id
      }
    }).then((res) => {
      state.permissionBindModal.loading = false
      state.permissionBindModal.items = parse_tree_data(res, {
        expand_level: 0,
        step_fn: (item) => {
          item._selected = !!item.hasRight
          return item
        }
      })
    })
  },
  bind_form_submit ({ state }) {
    state.permissionBindModal.saving = true
    let permissionIds = _.chain(state.permissionBindModal.items)
            .filter({ _selected: true })
            .map('id')
            .value()

    PUT(`${api_host}/teacher/role/bindPermissionsForRole`, {
      data: {
        roleId: state.permissionBindModal.params.id,
        permissionIds
      }
    }).then(() => {
      state.permissionBindModal.saving = false
      state.permissionBindModal.open = false

      notify_ok({
        title: '保存成功'
      })
    })
  }
}

const { state, actions } = createStore(module_state, module_actions)
export { state, actions }

