import createStore from 'store/createStore'
import { PUT } from 'utils/ajax'
import { notify_ok } from 'utils/notification'

const module_state = {
    config: {
        api: 'api/paper/confirm/review'
    },
    edit: {
        confirmData: {
            state: '1',
            memo: ''
        },
        rejection: {
            saving: false
        },
        acception: {
            saving: false
        }
    }
}

const module_actions = {
    parse_edit_init_data ({ state }, data) {
        data.province_id = {
            id: data.province_id,
            text: data.province_name
        }
        data.city_id = {
            id: data.city_id,
            text: data.city_name
        }
        data.area_id = {
            id: data.area_id,
            text: data.area_name
        }
        data.school_id = {
            id: data.school_id,
            text: data.school_name
        }
        return data
    },
    reject ({state, actions}) {
        if (state.edit.rejection.saving) return
        state.edit.rejection.saving = true
        let data = state.edit.confirmData
        data.state = -1
        PUT(actions.get_item_submit_url({}), {
            data
          }).then((res) => {
            notify_ok({
              title: '保存成功'
            })
            
          }).catch(() => {

          }).then(() => {
            state.edit.rejection.saving = false
          })
    },
    accept ({state, actions}) {
        if (state.edit.acception.saving) return
        state.edit.acception.saving = true
        let data = state.edit.confirmData
        data.state = 2
        PUT(actions.get_item_submit_url({}), {
            data
          }).then((res) => {
            notify_ok({
              title: '保存成功'
            })
            
          }).catch(() => {

          }).then(() => {
            state.edit.acception.saving = false
          })
    }
}

const { state, actions } = createStore(module_state, module_actions)
export { state, actions }
