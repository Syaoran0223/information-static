import { api_host } from 'config'
import createStore from 'store/createStore'
import { gender, status } from 'utils/consts'
import { date_format } from 'utils/filter'

const module_state = {
  positionData: {
    items: [],
    current: null
  },
  config: {
    api: 'teacher/studentItems'
  },
}


const module_actions = {
  parse_edit_submit_data ({ state }, customFormData) {
    return { ...state.edit.formData,
      classId: state.edit.formData.class
    }
  },
  parse_edit_init_data ({ state }, data) {
    data.class = {
      id: data.classId,
      text: data.grade + data.className
    }
    data.enrolDate = date_format(data.enrolDate)
    data.birthDay = date_format(data.birthDay)
    return data
  },
  parse_add_init_data ({ state }, data) {
    data.sex = _.keys(gender)[0]
    data.status = _.keys(status)[0]
    return data
  }
}


const { state, actions } = createStore(module_state, module_actions)
export { state, actions }

