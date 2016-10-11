<template>
  <div>

    <div class="app-page-navbar navbar-default">
      <ul class="nav nav-pills">
        <ac id="teacherManage">
          <li>
            <a v-link="{
                  name: 'teacherManage',
                  exact: true }">
              教师管理</a>
          </li>
        </ac>
        <ac id="studentManage">
          <li>
            <a v-link="{
                  name: 'studentManage'}">
              学生管理</a>
          </li>
        </ac>
        <ac id="classManage">
          <li>
            <a v-link="{
                  name: 'classManage'}">
              班级管理</a>
          </li>
        </ac>
        <ac id="termManage">
          <li>
            <a v-link="{
                  name: 'termManage'}">
              学期管理</a>
          </li>
        </ac>
        <ac id="guardianManage">
          <li>
            <a v-link="{
                  name: 'guardianManage'}">
              家长管理</a>
          </li>
        </ac>
        <ac id="permissions">
          <li>
            <a v-link="{
                  name: 'permissions'}">
              权限管理</a>
          </li>
        </ac>
        <ac id="roles">
          <li>
            <a v-link="{
                  name: 'roles'}">
              角色管理</a>
          </li>
        </ac>
      </ul>
    </div>

    <router-view></router-view>

  </div>
</template>
<script>
  export default {
    name: 'UserManage'
  }
</script>
