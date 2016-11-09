<template>

	<div class="panel panel-default">
		<div class="panel-body">
			<loading-state :loading="edit.loading">
				<div class="modal-body">
					<form class="form-horizontal">

						<div class="modal-body">
							<div class="form-group">
								<label for="" class="control-label col-sm-2">用户名</label>
								<div class="col-sm-4">
									<p class="form-control-static">{{edit.formData.name}}</p>
								</div>
								<label for="" class="control-label col-sm-2">积分</label>
								<div class="col-sm-4">
									<p class="form-control-static">{{edit.formData.score}}</p>
								</div>
							</div>
							<div class="form-group">
								<label for="" class="control-label col-sm-2">密码</label>
								<div class="col-sm-4">
									<input type="password" class="form-control" v-model="edit.formData.password">
								</div>
								<label for="" class="control-label col-sm-2">确认密码</label>
								<div class="col-sm-4">
									<input type="password" class="form-control" v-model="edit.formData.rePassword">
								</div>
							</div>
							<div class="form-group">
								<label for="" class="control-label col-sm-2">邮箱</label>
								<div class="col-sm-4">
									<input type="email" class="form-control" v-model="edit.formData.email">
								</div>
								<label for="" class="control-label col-sm-2">手机</label>
								<div class="col-sm-4">
									<input type="text" class="form-control" v-model="edit.formData.phone">
								</div>
							</div>

							<div class="form-group">
								<label for="" class="control-label col-sm-2">验证码</label>
								<div class="col-sm-4">
									<input type="text" class="form-control" v-model="edit.formData.validCode">
								</div>
								<div class="col-sm-2">
									<button class="btn btn-default">获取验证码</button>
								</div>
							</div>
							<hr>

							<div class="form-group">
								<label for="" class="control-label col-sm-2">省</label>
								<div class="col-sm-4">
									<selector remote="api/province" :value.sync="edit.formData.province_id" :required="true" width="100%"></selector>
								</div>
								<label for="" class="control-label col-sm-2">市</label>
								<div class="col-sm-4">
									<selector remote="api/city" :remote-params.sync="cityForm" :value.sync="edit.formData.city_id" :required="true" width="100%"></selector>
								</div>
							</div>
							<div class="form-group">
								<label for="" class="control-label col-sm-2">县/区</label>
								<div class="col-sm-4">
									<selector remote="api/area" :value.sync="edit.formData.area_id" :remote-params.sync="areaForm" :required="true" width="100%"></selector>
								</div>
								<label for="" class="control-label col-sm-2">学校</label>
								<div class="col-sm-4">
									<selector remote="api/school" :value.sync="edit.formData.school_id" :remote-params.sync="schoolForm" :required="true" width="100%"></selector>
								</div>
							</div>
							<div class="form-group">
								<label for="" class="control-label col-sm-2">年级</label>
								<div class="col-sm-4">
									<selector const="grade" :value.sync="edit.formData.grade_id" :required="true" width="100%"></selector>
								</div>
							</div>

						</div>

						<div class="modal-footer">
							<button type="submit" class="btn btn-primary" @click.prevent="on_edit_submit" :disabled="edit.saving">
                        <span v-if="edit.saving">保存中...</span>
                        <span v-else>保存</span>
                        </button>
						</div>
					</form>
				</div>

			</loading-state>
		</div>
	</div>

</template>
<script>
  import configBaseComponent from 'components/base/edit'
  import { state, actions } from './store'
  
  export default {
    name: 'UserInfo',
    extends: configBaseComponent({ state, actions }),
    ready() {
        actions.on_item_edit_click({})
    },
    watch: {
      'edit.formData.province_id'(val) {
        this.cityForm.pro_id = val
      },
      'edit.formData.city_id'(val) {
        this.areaForm.city_id = val
      },
      'edit.formData.area_id'(val) {
        this.schoolForm.ctid = val
      }
    },
    data() {
      return {
        cityForm: {
          pro_id: 0
        },
        areaForm: {
          city_id: 0
        },
        schoolForm: {
          ctid: 0
        }
      }
    }
  }
</script>