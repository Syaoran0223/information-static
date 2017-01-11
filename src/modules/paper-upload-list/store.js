import createStore from 'store/createStore'
import {date_format} from 'utils/filter'

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
    }
}

const { state, actions } = createStore(module_state, module_actions)
export { state, actions }
