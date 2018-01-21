import createStore from 'store/createStore'
import {date_format} from 'utils/filter'
import { api_host } from 'config'

const module_state = {
    config: {
        api: 'api/paper/check/list'
    }
}

const module_actions = {
    get_item_edit_url ({ state }) {
        return `${ api_host }/api/paper/preview/${ state.edit.params.id }`
    }
}

const { state, actions } = createStore(module_state, module_actions)
export { state, actions }
