import { api_host } from 'config'
import { subject, status, teacher_type } from 'utils/consts'
import createStore from 'store/createStore'

const module_state = {
  positionData: {
    items: [],
    current: null
  },
  config: {
    api: 'teacher/teachers'
  },
}


const module_actions = {
  parse_add_init_data ({ state }, data) {
    data.subject = _.keys(subject)[0]
    data.status = _.keys(status)[0]
    data.type = _.keys(teacher_type)[0]
    return data
  },

  parse_edit_init_data ({ state }, data) {
    data.roleIds = _.map(data.roles, (r) => {
      return { id: r.roleId, text: r.roleTitle }
    })
    return data
  }
}

const { state, actions } = createStore(module_state, module_actions)
export { state, actions }

