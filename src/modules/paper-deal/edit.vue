<template>
<div class="panel panel-default" style="margin-top: 20px;">
    <div class="panel-body">
    <form class="form-horizontal">

        <div class="row">
        <div class="col-sm-10 col-sm-offset-1">
            
            <div class="form-group">
            <label for="" class="control-label col-sm-2">题号</label>
            <div class="col-sm-4">
                <input class="form-control" type="number">
            </div>
            <label for="" class="control-label col-sm-1">题型</label>
            <div class="col-sm-4">
                <selector
                const="section"
                :value.sync="edit.formData.section"
                :required="true"
                width="100%"
                ></selector>
            </div>
            </div>

            <div class="form-group">
            <label for="" class="control-label col-sm-2">选项个数</label>
            <div class="col-sm-4">
                <input class="form-control" type="number">
            </div>
            <label for="" class="control-label col-sm-1">是否套题</label>
            <div class="col-sm-4">
                <tag-selector
                const="has_sub"
                :value.sync="edit.formData.has_sub"
                :required="true"
                ></tag-selector>
            </div>
            </div>

            <div class="form-group">
            <label for="" class="control-label col-sm-2">题目图片</label>
            <div class="col-sm-9">
                <file-upload
                :items.sync="edit.formData.file"
                :state.sync="edit.uploadState"
                ></file-upload>
            </div>
            </div>

            <div class="form-group">
            <label for="" class="control-label col-sm-2">答案图片</label>
            <div class="col-sm-9">
                <file-upload
                :items.sync="edit.formData.files"
                :state.sync="edit.uploadState"
                ></file-upload>
            </div>
            </div>

        </div>
        </div>

        <div class="modal-footer">
        <button class="btn btn-primary"
                :disabled="edit.saving">
            <span v-if="edit.saving">保存中...</span>
            <span v-else>保存</span>
        </button>
        </div>
    </form>
    </div>
</div>
</template>

<script>
export default {
    name: 'Edit',
    data() {
      return {
        edit: {
            
        }
      }
    }
  }
</script>