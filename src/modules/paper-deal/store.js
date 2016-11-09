import createStore from 'store/createStore'
import { PUT } from 'utils/ajax'
import { notify_ok } from 'utils/notification'

const module_state = {
    config: {
        api: 'api/paper/deal'
    }
}

const module_actions = {
    
}

const { state, actions } = createStore(module_state, module_actions)
export { state, actions }