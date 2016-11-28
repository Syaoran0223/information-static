<template>
<div class="panel panel-default" style="margin-top: 20px;">
    <div class="success-tag" v-show="!!question.formData.id">保存成功</div>
    <div class="panel-body">
    <form class="form-horizontal" @submit.prevent="submit_data">

        <div class="row">
        <div class="col-sm-10 col-sm-offset-1">
            
            <div class="form-group">
            <label for="" class="control-label col-sm-2">题号</label>
            <div class="col-sm-4">
                <input class="form-control" type="number" v-model="question.formData.quest_no">
            </div>
            <label for="" class="control-label col-sm-1">题型</label>
            <div class="col-sm-4">
                <selector
                const="quest_types"
                :value.sync="question.formData.quest_type_id"
                :required="true"
                width="100%"
                ></selector>
            </div>
            </div>

            <div class="form-group" v-show="question.formData.quest_type_id==1">
                <label for="" class="control-label col-sm-2">选项个数</label>
                <div class="col-sm-4">
                    <input class="form-control" type="number" v-model="question.formData.option_count">
                </div>
            </div>
            <div class="form-group">
                <label for="" class="control-label col-sm-2">是否套题</label>
                <div class="col-sm-4">
                    <tag-selector
                    const="has_sub"
                    :value.sync="question.formData.has_sub"
                    :required="true"
                    ></tag-selector>
                </div>
            </div>

            <div class="form-group">
            <label for="" class="control-label col-sm-2">题目图片</label>
            <div class="col-sm-9">
                <file-upload
                :items.sync="question.formData.quest_image"
                :state.sync="question.uploadState"
                ></file-upload>
            </div>
            </div>

            <div class="form-group">
            <label for="" class="control-label col-sm-2">答案图片</label>
            <div class="col-sm-9">
                <file-upload
                :items.sync="question.formData.answer_image"
                :state.sync="question.uploadState"
                ></file-upload>
            </div>
            </div>

        </div>
        </div>

        <div class="modal-footer">
        <button class="btn btn-primary"
                type="submit"
                :disabled="question.saving || question.uploadState == 'uploading'">
            <span v-if="question.saving">保存中...</span>
            <span v-else>保存</span>
        </button>
        <button class="btn btn-danger" @click.prevent="remove(question)">
            <span >删除</span>
        </button>
        </div>
    </form>
    </div>
</div>
<confirm :open.sync="removeConfirm.open" @confirm="on_item_remove" :saving.sync="removeConfirm.saving"></confirm>
</template>

<script>
import { POST, PUT } from 'utils/ajax'
import { api_host } from 'config'
import { notify_ok, notify_error } from 'utils/notification'

export default {
    name: 'Edit',
    props: {
        question: {
            twoWay: true,
            default() {
                return {}
            }
        },
        exam_id: {
            default() {
                return 0
            }
        }
    },
    data() {
        return {
            removeConfirm: {
                open: false,
                saving: false,
                current_id: 0
            }
        }
    },
    methods: {
        remove(question) {
            if (question.formData.id) {
                this.removeConfirm.current_id = question.formData.id
                this.removeConfirm.open = true
                return
            }
            this.$dispatch('remove-question', question.id)
        },
        on_item_remove() {
            // todo delete question
            this.removeConfirm.saving = false
            this.removeConfirm.open = false
            
        },
        submit_data() {
            this.question.saving = true
            let data = this.question.formData
            data.exam_id = this.exam_id
            let api_method = this.question.formData.id ? PUT : POST
            api_method(`${api_host}/api/paper/preprocess/view`, {
                data
            }).then((res) => {
                notify_ok({
                    title: '保存成功'
                })
                this.question.formData = res
            }).catch(() => {

            }).then(() => {
                this.question.saving = false
            })
        }
    }
  }
</script>

<style>
    .success-tag {
        float: right;
        padding: 3px;
        background: #009588;
        color: white;
    }
</style>