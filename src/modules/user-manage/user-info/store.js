import { api_host } from 'config'
import createStore from 'store/createStore'
import { GET } from 'utils/ajax'

const module_state = {
    config: {
        api: 'api/user/info'
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
        return data
    }
}

const { state, actions } = createStore(module_state, module_actions)
export { state, actions }
