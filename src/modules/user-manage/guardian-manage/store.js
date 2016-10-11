import { api_host } from 'config'
import { subject, status, teacher_type } from 'utils/consts'
import createStore from 'store/createStore'

const module_state = {
  config: {
    api: 'teacher/guardians'
  },
}

const module_actions = {
  get_search_submit_data ({ state }) {
    state.search.formData.classId = _.isUndefined(state.search.formData.classId) ? '' : state.search.formData.classId
    return state.search.formData
  }
}


const { state, actions } = createStore(module_state, module_actions)
export { state, actions }

