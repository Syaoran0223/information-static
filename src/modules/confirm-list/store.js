import createStore from 'store/createStore'
import router from 'router'

const module_state = {
    config: {
        api: 'api/examreview/list'
    }
}

const module_actions = {
    on_item_edit_click({ state, actions }, item) {
        router.go({
            name: 'PaperConfirm',
            params: {
                paper_id: item.exam_id
            }
        })
    }
}

const { state, actions } = createStore(module_state, module_actions)
export { state, actions }
