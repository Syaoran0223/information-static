import { api_host } from 'config'
import { subject, status } from 'utils/consts'
import { json_stringify } from 'utils/index'
import createStore from 'store/createStore'

const module_state = {
  config: {
    api: 'teacher/classes',
    router: 'classManage'
  }
}


const module_actions = {
  parse_edit_submit_data ({ state }, customFormData) {
    let data = { ...state.edit.formData,
      termId: state.edit.formData.term,
    }
    let headTeacherIds = state.edit.formData.headTeachers
    if (!state.edit.is_new) {
      if (!this.equal(headTeacherIds, state.edit.formData.originHeadTeachers)) {
        data.headTeacherIds = headTeacherIds.join(',')
      }
    } else {
      data.headTeacherIds = headTeacherIds.join(',')
    }
    data.teachers = _.map(data.teachers, (t)=> {
      t.id = t.teacher.id
      return t
    })
    data.teachers = json_stringify(data.teachers)
    return data
  },
  equal ({ state }, list1, list2) {
    return list1.sort().toString() == list2.sort().toString()
  },
  parse_edit_init_data ({ state }, data) {
    data.term = {
      id: data.termId,
      text: data.grade + data.termName
    }
    data.teachers = this.map_teachers(data.teachers)
    data.headTeachers = this.map_head_teachers(data.headTeachers)
    data.originHeadTeachers = _.map(data.headTeachers, 'id')
    return data
  },
  parse_add_init_data ({ state }, data) {
    data.status = _.keys(status)[0]
    data.teachers = []
    return data
  },
  map_teachers({ state }, teachers) {
    let res = _.chain(teachers)
      .map((t) => {
        return {teacher: {id: t.id, text: t.realName}}
      })
      .uniqBy((t) => {
        return t.teacher.id
      })
      .map((t) => {
        t.subjects = _.chain(teachers)
          .filter((teacher)=> {
            return teacher.id == t.teacher.id
          })
          .map((teacher) => {
            return teacher.subject
          })
          .value()
        return t
      })
      .value()
    return res
  },
  map_head_teachers({ state }, teachers) {
    return _.map(teachers, (teacher) => {
      return {
        id: teacher.id,
        text: teacher.realName + ' ' + teacher.subjectName
      }
    })
  },
  get_search_submit_data ({ state }) {
    if (state.search.formData.term) {
      state.search.formData.termId = state.search.formData.term
    }
    return state.search.formData
  }
}

const { state, actions } = createStore(module_state, module_actions)
export { state, actions }

