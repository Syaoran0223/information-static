import { api_host } from 'config'
import createStore from 'store/createStore'
import { GET, PUT } from 'utils/ajax'
import { notify_error } from 'utils/notification'

const module_state = {
    statistic: {
        data: []
    }
}

const module_actions = {
    get_statistic({state, action}) {
        GET(`${api_host}/api/user/works`).then((data)=> {
            state.statistic.data = data
        })
    }
}

const { state, actions } = createStore(module_state, module_actions)
export { state, actions }
