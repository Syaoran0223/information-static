import createStore from 'store/createStore'
import router from 'router'
import {date_format} from 'utils/filter'
import { api_host } from 'config'
import { PUT } from 'utils/ajax'
import { notify_ok } from 'utils/notification'

const module_state = {
    config: {
        api: 'api/paper/is_fast/wait'
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
        data.exam_date = date_format(data.exam_date, 'YYYY-MM-DD')
        return data
    },
    parse_table_query_fetched ({ state }, data) {
        let items = data.items || data
        items = _.map(items, (d)=> {
            d.saving = false
            return d
        })
        return {
            items: items,
            totalCount: data.totalCount,
            totalPage: data.totalPage
        }
    },
    update_fast({ state, actions }, item) {
        if (item.saving) {
            return
        }
        item.saving = true
        let url = `${ api_host }/api/paper/into_fast/${ item.id }`
        PUT(url, {}).then((res) => {
            notify_ok({
                title: '设置成功'
            })
            actions.table_query({state, actions})
        }).catch(() => {

        }).then(() => {
            item.saving = false
        })
    },
    get_item_edit_url ({ state }) {
        return `${ api_host }/api/paper/is_fast/${ state.edit.params.id }`
    }
}

const { state, actions } = createStore(module_state, module_actions)
export { state, actions }
