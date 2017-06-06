<template>

	<div class="panel panel-default">
		<div class="panel-body">
      <div class="row">
        <div class="col-sm-4" v-for="item in statistic.data">
          <div class="panel panel-default">
            <div class="panel-body" style="height: 125px;">
              <div>{{item.title}}</div>
              <div v-for="value in item">
                <template v-if="$key != 'title'">
                  {{ map[$key] }} : {{value}}
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
		</div>
	</div>

</template>
<script>
  import { state, actions } from './store'
  
  export default {
    name: 'UserWork',
    ready() {
        actions.get_statistic()
    },
    data() {
      return {
        map: {
          confirming: '正在审核',
          pass: "审核通过",
          ready: "待审核",
          useage: "已采纳",
          reject: "审核不通过",
          dealing: "正在处理",
          complete: "完成",
          complete_answer: "完成解答",
          finish: "录题结束",
          typing: "正在录题",
          answering: "正在解答",
          checking: "正在检查",
          judging: "正在裁定",
          verifying: "正在校对"
        },
				statistic: state.statistic
      }
    }
  }
</script>