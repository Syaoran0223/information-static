<template>
  <header class="navbar navbar-default app-header">
    <div class="container">
      <div class="navbar-header">
        <div class="navbar-brand"><b>思明</b> <small>试卷情报系统</small></div>
      </div>
      <nav>
        <ul class="nav navbar-nav nav-pills app-header-nav">
          <ac id="PaperUpload"><li><a v-link="{ name: 'PaperUpload' }">试卷上传</a></li></ac>
          <ac id="PaperIsFast"><li><a v-link="{ name: 'PaperIsFast' }">快速通道</a></li></ac>
          <ac id="PaperUploadList"><li><a v-link="{ name: 'PaperUploadList' }">上传记录</a></li></ac>
          <ac id="WaitConfirm"><li><a v-link="{ name: 'WaitConfirm' }">待审核</a></li></ac>
          <ac id="PaperConfirm"><li><a v-link="{ name: 'PaperConfirm' }">试卷审核</a></li></ac>
          <ac id="ConfirmList"><li><a v-link="{ name: 'ConfirmList' }">审核记录</a></li></ac>
          <ac id="WaitDeal"><li><a v-link="{ name: 'WaitDeal' }">待处理</a></li></ac>
          <ac id="PaperDeal"><li><a v-link="{ name: 'PaperDeal' }">试卷预处理</a></li></ac>
          <ac id="DealList"><li><a v-link="{ name: 'DealList' }">预处理记录</a></li></ac>
          <ac id="WaitInput"><li><a v-link="{ name: 'WaitInput' }">待录题</a></li></ac>
          <ac id="PaperInput"><li><a v-link="{ name: 'PaperInput' }">题目录入</a></li></ac>
          <ac id="InputList"><li><a v-link="{ name: 'InputList' }">录题记录</a></li></ac>
          <ac id="WaitAnswer"><li><a v-link="{ name: 'WaitAnswer' }">待解答</a></li></ac>
          <ac id="PaperAnswer"><li><a v-link="{ name: 'PaperAnswer' }">题目解答</a></li></ac>
          <ac id="AnswerList"><li><a v-link="{ name: 'AnswerList' }">答题记录</a></li></ac>
          <ac id="WaitCheck"><li><a v-link="{ name: 'WaitCheck' }">待检查</a></li></ac>
          <ac id="QuestCheck"><li><a v-link="{ name: 'QuestCheck' }">答案检查</a></li></ac>
          <ac id="CheckList"><li><a v-link="{ name: 'CheckList' }">检查记录</a></li></ac>
          <ac id="WaitJudge"><li><a v-link="{ name: 'WaitJudge' }">待裁定</a></li></ac>
          <ac id="QuestJudge"><li><a v-link="{ name: 'QuestJudge' }">答案裁定</a></li></ac>
          <ac id="JudgeList"><li><a v-link="{ name: 'JudgeList' }">裁定记录</a></li></ac>
          <ac id="WaitVerify"><li><a v-link="{ name: 'WaitVerify' }">待校对</a></li></ac>
          <ac id="QuestVerify"><li><a v-link="{ name: 'QuestVerify' }">题目校对</a></li></ac>
          <ac id="VerifyList"><li><a v-link="{ name: 'VerifyList' }">校对记录</a></li></ac>
          <li><a v-link="{ name: 'UserManage' }">用户中心</a></li>
        </ul>
      </nav>
      <ul class="nav navbar-nav nav-pills navbar-right">
        <li class="dropdown">
          <a href="#" class="user-dropdown" data-toggle="dropdown">
            {{user.name}} <span class="caret"></span>
          </a>
          <ul class="dropdown-menu">
            <li>
              <a v-link="{ name: 'UserManage' }">个人中心</a>
            </li>
            <li role="separator" class="divider"></li>
            <li><a href="/logout"><i class="glyphicon glyphicon-log-out"></i> 注销</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </header>
</template>
<script>
  import { user } from 'config'
  export default {
    data () {
      return { user }
    }
  }
</script>
