<template>
<div class="panel panel-default" style="margin-top: 20px;" v-if="currentStep == 0" style="margin-top: 20px;">
  <form @submit.prevent="next_step">
    <div class="panel-heading">
        试卷结构
    </div>
    <div class="panel-body">
      <table class="table table-striped">
        <tr class="form-inline" v-for="item in questions">
          <td>题号 <input type="text" class="form-control" v-model="item.quest_no" required></td>
          <td>题目 <input type="text" class="form-control" v-model="item.title" required></td>
          <td>小题 <input type="number" class="form-control" v-model="item.start_no" required> - <input type="number" class="form-control"v-model="item.end_no" required></td>
          <td><a href="#" @click.prevent="remove(item)">删除</a></td>
        </tr>
      </table>
    </div>
    <div class="panel-footer">
        <div class="text-center">
          <button type="button" @click.prevent="add_question" class="btn btn-primary">&nbsp;&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-plus"></span>&nbsp;&nbsp;&nbsp;&nbsp;</button>
          <button type="submit" class="btn btn-success">
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span v-show="step.saving">正在处理...</span>
          <span v-else>下一步</span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          </button>
        </div>
    </div>
  </form>
</div>
<div class="panel panel-default" v-if="currentStep==1" style="margin-top: 20px;">
  <form class="form-horizontal" @submit.prevent="submit_data">
    <div class="panel-heading">
      试卷切割
    </div>
    <div class="panel-body">
      <div class="panel panel-default" style="margin-top: 20px;" v-for="tip in tips">
          <div class="panel-body">
              <div class="row">
              <div class="col-sm-10 col-sm-offset-1">
                  
                  <div class="form-group">
                  <label for="" class="control-label col-sm-2">题号</label>
                  <div class="col-sm-4">
                      <input class="form-control" type="number" v-model="tip.formData.start_no">
                  </div>
                  <span for="" class="control-label col-sm-1" style="text-align: center;">---</span>
                  <div class="col-sm-4">
                      <input class="form-control" type="number" v-model="tip.formData.end_no">
                  </div>
                  </div>

                  <div class="form-group">
                  <label for="" class="control-label col-sm-2">题目图片</label>
                  <div class="col-sm-9">
                      <file-upload
                      :items.sync="tip.formData.quest_image"
                      :state.sync="tip.uploadState"
                      ></file-upload>
                  </div>
                  </div>

                  <div class="form-group">
                  <label for="" class="control-label col-sm-2">答案图片</label>
                  <div class="col-sm-9">
                      <file-upload
                      :items.sync="tip.formData.answer_image"
                      :state.sync="tip.uploadState"
                      ></file-upload>
                  </div>
                  </div>

              </div>
              </div>

              <div class="modal-footer">
              <button class="btn btn-danger" @click.prevent="remove_tip(tip)">
                  <span >删除</span>
              </button>
              </div>
          </div>
      </div>
    </div>
    <div class="panel-footer">
      <div class="text-center">
        <button type="button" @click.prevent="add_tip" class="btn btn-primary">&nbsp;&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-plus"></span>&nbsp;&nbsp;&nbsp;&nbsp;</button>
          <button type="submit" class="btn btn-success">
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span v-show="step.saving">正在处理...</span>
          <span v-else>保存</span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          </button>
      </div>
    </div>
  </form>
  
</div>

</template>

<script>
import { POST, PUT, DELETE } from 'utils/ajax'
import { api_host } from 'config'
import { notify_ok, notify_error } from 'utils/notification'
import router from 'router'

export default {
    name: 'Struct',
    props: {
      currentStep: {
        default: 0
      }
    },
    data() {
        return {
            step: {
              saving: false
            },
            removeConfirm: {
                open: false,
                saving: false,
                current_id: 0
            },
            questions: [],
            tips: []
        }
    },
    methods: {
        add_tip() {
          this.tips.push({
              id: _.uniqueId('tip_'),
              formData: {
                start_no: 0,
                end_no: 0,
                quest_image: [],
                answer_image: []
              },
              uploadState: 'done'
          })
        },
        add_question() {
          this.questions.push({
            _id: _.uniqueId('quest_'),
            quest_no: '',
            title: '',
            start_no: 0,
            end_no: 0
          })
        },
        remove(item) {
          this.questions = _.filter(this.questions, (d)=> {
            return d._id != item._id
          })
        },
        remove_tip(tip) {
          this.tips = _.filter(this.tips, (d) => {
            return d.id != tip.id
          })
        },
        next_step() {
          if (this.step.saving) return
          this.step.saving = true

          let data = {struct: this.questions}

          PUT(`${api_host}/api/paper/preprocess/struct/${this.$route.params.paper_id}`, {
              data
          }).then((res) => {
              notify_ok({
                title: '保存成功'
              })
              this.currentStep = 1
          }).catch(() => {

          }).then(() => {
              this.step.saving = false
          })
        },
        submit_data() {
          if (this.step.saving) return
          if (_.isEmpty(this.tips)) {
            notify_error({
              title: '请输入试卷切割信息'
            })
            return
          }
          for (var i=0; i<this.tips.length; i++) {
            if (this.tips[i].formData.start_no == 0 || this.tips[i].formData.end_no == 0 || this.tips[i].formData.start_no > this.tips[i].formData.end_no) {
              notify_error({
                title: '题号输入有误'
              })
              return
            }
          }
          this.step.saving = true

          let data = {tips: this.tips, exam_id: this.$route.params.paper_id}

          POST(`${api_host}/api/paper/preprocess/tips`, {
              data
          }).then((res) => {
              notify_ok({
                title: '保存成功'
              })
              setTimeout(() => {
                router.go({
                    name: 'DealList'
                })
              }, 300)
          }).catch(() => {

          }).then(() => {
              this.step.saving = false
          })
        }
    }
  }
</script>