import createStore from 'store/createStore'
import router from 'router'

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
    after_edit_done ({state, actions}) {
        router.go({
            name: 'PaperUploadList'
        })
    }
}

const { state, actions } = createStore(module_state, module_actions)
export { state, actions }
