import createStore from 'store/createStore'

const module_state = {
    config: {
        api: 'api/paper/confirm/wait'
    }
}

const module_actions = {

}

const { state, actions } = createStore(module_state, module_actions)
export { state, actions }
