import { api_host } from 'config'
import createStore from 'store/createStore'
import { GET } from 'utils/ajax'

const module_state = {

}

const module_actions = {
}

const { state, actions } = createStore(module_state, module_actions)
export { state, actions }
