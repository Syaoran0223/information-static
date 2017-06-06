<template>
  <div class="row">
    <div class="col-sm-3">
      <div class="panel panel-default">
        <div class="panel-body">

          <ul class="nav nav-pills nav-stacked">
              <li>
                <a v-link="{ name: 'UserInfo', exact: true }">个人信息</a>
              </li>
              <li>
                <a v-link="{ name: 'UserWork', exact: true }">工作统计</a>
              </li>
              <li>
                <a v-link="{ name: 'ScoreList', exact: true }">积分记录</a>
              </li>
              <li>
                <a v-link="{ name: 'MessageList', exact: true }">消息记录</a>
              </li>
          </ul>

        </div>
      </div>
    </div>
    <div class="col-sm-9">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'UserManage'
  }
</script>
