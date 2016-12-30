import createStore from 'store/createStore'
import router from 'router'

const module_state = {
    config: {
        api: 'api/paper/answer/check/list'
    }
}

const module_actions = {
    on_item_edit_click({ state, actions }, item) {
        router.go({
            name: 'QuestCheck',
            params: {
                quest_id: item.quest_id
            }
        })
    }
}

const { state, actions } = createStore(module_state, module_actions)
export { state, actions }
