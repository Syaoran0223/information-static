import createStore from 'store/createStore'
import { PUT, GET } from 'utils/ajax'
import { notify_ok } from 'utils/notification'
import { date_format } from 'utils/filter'
import router from 'router'
import { api_host } from 'config'

const module_state = {
    config: {
        api: 'api/paper/confirm'
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
        },
        usage: {
            saving: false
        }
    }
}

const module_actions = {
    table_query({ state, actions }, exam_id) {
        state.table.loading = true
        state.table.items = []
        let api = `${ api_host }/${ state.config.api }/${exam_id}/history`
        GET(api, {
            data: actions.get_table_query_params()
        }).then(res => {
            state.table.loading = false
            _.assign(state.table, actions.parse_table_query_fetched(res))
            state.table.empty = !state.table.items.length
        })
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
        data.exam_date = date_format(data.exam_date, 'YYYY-MM-DD')
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
            setTimeout(() => {
                router.go({
                    name: 'ConfirmList'
                })
              }, 300)
            
          }).catch(() => {

          }).then(() => {
            state.edit.rejection.saving = false
          })
    },
    accept ({state, actions}) {
        if (state.edit.acception.saving) return
        state.edit.acception.saving = true
        let data = state.edit.confirmData
        data.state = 5
        PUT(actions.get_item_submit_url({}), {
            data
          }).then((res) => {
            notify_ok({
              title: '保存成功'
            })
            setTimeout(() => {
                router.go({
                    name: 'ConfirmList'
                })
              }, 300)
            
          }).catch(() => {

          }).then(() => {
            state.edit.acception.saving = false
          })
    },
    use ({state, actions}) {
        if (state.edit.usage.saving) return
        state.edit.usage.saving = true
        let data = state.edit.confirmData
        data.state = 2
        PUT(actions.get_item_submit_url({}), {
            data
          }).then((res) => {
            notify_ok({
              title: '保存成功'
            })
            setTimeout(() => {
                router.go({
                    name: 'ConfirmList'
                })
              }, 300)
            
          }).catch(() => {

          }).then(() => {
            state.edit.usage.saving = false
          })
    }
}

const { state, actions } = createStore(module_state, module_actions)
export { state, actions }
