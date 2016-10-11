import { api_host } from 'config'
import { term, grade } from 'utils/consts'
import createStore from 'store/createStore'

const module_state = {
  config: {
    api: 'teacher/terms'
  }
}


const module_actions = {
  parse_add_init_data ({ state }, data) {
    data.term = _.keys(term)[0]
    data.grade = _.keys(grade)[0]
    return data
  }
}

const { state, actions } = createStore(module_state, module_actions)
export { state, actions }

