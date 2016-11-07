<template>
  <header class="navbar navbar-default app-header">
    <div class="container">
      <div class="navbar-header">
        <div class="navbar-brand"><b>思明</b> <small>试卷情报系统</small></div>
      </div>
      <nav>
        <ul class="nav navbar-nav nav-pills app-header-nav">
          <li><a v-link="{ name: 'play' }">demo</a></li>
          <li><a v-link="{ name: 'home' }">待办</a></li>
          <li><a v-link="{ name: 'PaperUpload' }">试卷上传</a></li>
          <li><a v-link="{ name: 'PaperUploadList' }">上传记录</a></li>
          <li><a v-link="{ name: 'WaitConfirm' }">待审核</a></li>
          <li><a v-link="{ name: 'PaperConfirm' }">试卷审核</a></li>
          <li><a v-link="{ name: 'ConfirmList' }">审核记录</a></li>
          <li><a v-link="{ name: 'WaitDeal' }">待处理</a></li>
          <li><a v-link="{ name: 'PaperDeal' }">试卷预处理</a></li>
          <li><a v-link="{ name: 'DealList' }">预处理记录</a></li>
        </ul>
      </nav>
      <ul class="nav navbar-nav nav-pills navbar-right">
        <li class="dropdown">
          <a href="#" class="user-dropdown" data-toggle="dropdown">
            {{user.name}} <span class="caret"></span>
          </a>
          <ul class="dropdown-menu">
            <li>
              <a>个人中心</a>
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
