import createStore from 'store/createStore'
import { PUT } from 'utils/ajax'
import { notify_ok } from 'utils/notification'
import {api_host} from 'config'

const module_state = {
    config: {
        api: 'api/paper/input'
    }
}

const module_actions = {
    parse_edit_init_data: ({ state }, data) => {
        data.images = data.quest_image.concat(data.answer_image)
        return data
    },
    get_table_query_url({ state }) {
        return `${ api_host }/api/paper/search`
    }
}

const { state, actions } = createStore(module_state, module_actions)
export { state, actions }
