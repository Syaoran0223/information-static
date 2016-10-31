import createStore from 'store/createStore'

const module_state = {
    config: {
        api: 'api/paper/upload'
    },
    edit: {
        is_new: true,
        uploadState: 'done'
    }
}

const module_actions = {

}

const { state, actions } = createStore(module_state, module_actions)
export { state, actions }
