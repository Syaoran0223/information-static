import createStore from 'store/createStore'
import { parse_tree_data } from 'components/tree-view/parse'
import { DELETE } from 'utils/ajax'
import { api_host } from 'config'
import { notify_ok, notify_error } from 'utils/notification'

const module_state = {
  config: {
    api: 'teacher/permissions'
  }
}

const module_actions = {

  parse_table_query_fetched ({ state }, data) {
    data = parse_tree_data(data)
    return {
      items: data,
      totalCount: _.size(data),
      totalPage: 1
    }
  },

  parse_edit_submit_data ({ state }) {
    return {
      ...state.edit.params,
      ...state.edit.formData
    }
  }
}

const { state, actions } = createStore(module_state, module_actions)
export { state, actions }
