import createStore from 'store/createStore'
import router from 'router'
import { api_host } from 'config'
import { date_format } from 'utils/filter'

const module_state = {
    config: {
        api: 'api/paper/preprocess/list'
    }
}

const module_actions = {
    on_item_edit_click2({ state, actions }, item) {
        router.go({
            name: 'PaperDeal',
            params: {
                paper_id: item.exam_id
            }
        })
    },
    get_item_edit_url({ state }) {
        return `${ api_host }/${ state.config.api }/${ state.edit.params.exam_id }`
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
    }
}

const { state, actions } = createStore(module_state, module_actions)
export { state, actions }
