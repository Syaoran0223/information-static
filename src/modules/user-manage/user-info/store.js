import { api_host } from 'config'
import createStore from 'store/createStore'
import { GET, PUT } from 'utils/ajax'
import { notify_error } from 'utils/notification'

const module_state = {
    config: {
        api: 'api/user/info'
    },
    validState: {
        timeout: 0,
        validating: false
    }
}

const module_actions = {
    get_item_edit_url({ state }) {
        return `${api_host}/${state.config.api}`
    },
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
        data.validCode = ''
        return data
    },
    get_item_submit_url ({ state }) {
        return `${ api_host }/${ state.config.api }`
    },
    on_edit_submit ({ state, actions }, customFormData) {
        if (state.edit.loading) return
        state.edit.saving = true

        let data = actions.parse_edit_submit_data(customFormData)

        PUT(actions.get_item_submit_url(customFormData), {
            data
        }).then((res) => {
            notify_ok({
            title: '保存成功'
            })
        }).catch(() => {

        }).then(() => {
            state.edit.saving = false
            state.edit.open = false
            actions.on_item_edit_click()
        })
    },
    after_edit_done ({state, actions}) {
        actions.table_query({state, actions})
    },
    sendValidCode({state, action}, phone) {
        if (!phone) {
            notify_error({
                title: '请输入手机号'
            })
            return
        }
        GET(`${api_host}/api/sms`, {
            data: {
                phone: phone
            }
        }).then(()=> {
            state.validState.timeout = 120
            state.validState.validating = true
            setInterval(()=> {
                if (state.validState.timeout <= 0) {
                    state.validState.validating = false
                    return
                }
                state.validState.timeout--
            }, 1000)
        })
    }
}

const { state, actions } = createStore(module_state, module_actions)
export { state, actions }
