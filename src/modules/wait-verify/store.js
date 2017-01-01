import createStore from 'store/createStore'
import router from 'router'

const module_state = {
    config: {
        api: 'api/quest/verify/wait'
    }
}

const module_actions = {
    on_item_edit_click({ state, actions }, item) {
        router.go({
            name: 'QuestVerify',
            params: {
                quest_id: item.id
            }
        })
    }
}

const { state, actions } = createStore(module_state, module_actions)
export { state, actions }
