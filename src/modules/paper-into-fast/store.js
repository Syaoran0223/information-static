import createStore from 'store/createStore'
import router from 'router'
import { api_host } from 'config'
import { PUT } from 'utils/ajax'
import { notify_ok } from 'utils/notification'

const module_state = {
    config: {
        api: 'api/paper/is_fast/wait'
    }
}

const module_actions = {
    parse_table_query_fetched ({ state }, data) {
        let items = data.items || data
        items = _.map(items, (d)=> {
            d.saving = false
            return d
        })
        return {
            items: items,
            totalCount: data.totalCount,
            totalPage: data.totalPage
        }
    },
    update_fast({ state, actions }, item) {
        if (item.saving) {
            return
        }
        item.saving = true
        let url = `${ api_host }/api/paper/into_fast/${ item.id }`
        PUT(url, {}).then((res) => {
            notify_ok({
                title: '设置成功'
            })
            actions.table_query({state, actions})
        }).catch(() => {

        }).then(() => {
            item.saving = false
        })
    }
}

const { state, actions } = createStore(module_state, module_actions)
export { state, actions }
