import createStore from 'store/createStore'
import {date_format} from 'utils/filter'
import { api_host } from 'config'
import { PUT, GET } from 'utils/ajax'
import { notify_ok } from 'utils/notification'

const module_state = {
    config: {
        api: 'api/paper/is_fast'
    },
    edit: {
        is_new: true,
        uploadState: 'done'
    }
}

const module_actions = {
    parse_edit_init_data ({ state }, data) {
        data.province_id = {
            id: data.province_id,
            text: data.province_name
        }
        data.city_id = {
            id: data.city_id,
            text: data.city_name
        }
        data.area_id = {
            id: data.area_id,
            text: data.area_name
        }
        data.school_id = {
            id: data.school_id,
            text: data.school_name
        }
        data.exam_date = date_format(data.exam_date, 'YYYY-MM-DD')
        return data
    },
    parse_edit_submit_data ({ state }, customFormData) {
        if (!!state.edit.formData.attachments) {
            state.edit.formData.attachments = _.chain(state.edit.formData.attachments)
                .filter((img)=> {
                  return img.status == 'success'
                })
                .map((img)=> {
                  img.id = _.uniqueId('upfile_')
                  return img
                })
                .value()
        }
        return customFormData || state.edit.formData
    },
    parse_table_query_fetched ({ state }, data) {
        let items = data.items || data
        items = _.map(items, (d)=> {
            d.saving = false
            d.pushing = false
            d.canceling = false
            return d
        })
        return {
            items: items,
            totalCount: data.totalCount,
            totalPage: data.totalPage
        }
    },

    push_attachments({ state, actions }, item) {
        if (item.pushing) {
            return
        }
        item.pushing = true
        let url = `${ api_host }/api/paper/attachment/upload/${ item.id }`
        GET(url, {data: {}}).then((res) => {
            notify_ok({
                title: '上传成功'
            })
            actions.table_query({state, actions})
        }).catch(() => {

        }).then(() => {
            item.pushing = false
        })
    },

    update_fast({ state, actions }, item) {
        if (item.saving) {
            return
        }
        item.saving = true
        let url = `${ api_host }/${ state.config.api }/${ item.id }`
        PUT(url, {}).then((res) => {
            notify_ok({
                title: '保存成功'
            })
            actions.table_query({state, actions})
        }).catch(() => {

        }).then(() => {
            item.saving = false
        })
    },
    cancel_fast({ state, actions }, item) {
        if (item.canceling) {
            return
        }
        item.canceling = true
        let url = `${ api_host }/api/paper/cancel_fast/${ item.id }`
        PUT(url, {}).then((res) => {
            notify_ok({
                title: '保存成功'
            })
            actions.table_query({state, actions})
        }).catch(() => {

        }).then(() => {
            item.canceling = false
        })
    }
}

const { state, actions } = createStore(module_state, module_actions)
export { state, actions }
