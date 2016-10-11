<template>
  <div class="panel">
    <div class="panel-body">

      <form class="form-inline"
        @submit.prevent="on_search_submit">

        <div class="form-group">
          <label for="">学科</label>
          <selector
            const="subject"
            :value.sync="search.formData.subject"
          ></selector>
        </div>
        <div class="form-group">
          <label for="">类型</label>
          <selector
            const="teacher_type"
            :value.sync="search.formData.type"
          ></selector>
        </div>
        <div class="form-group">
          <label for="">姓名</label>
          <input type="text" class="form-control"
            v-model="search.formData.realName"
          >
        </div>
        <div class="form-group">
          <label for="">手机号</label>
          <input type="text" class="form-control"
            v-model="search.formData.mobile"
          >
        </div>
        <button type="submit" class="btn btn-primary">查找</button>
        <button type="button" class="btn btn-default"
          @click="on_search_reset">清空</button>
      </form>

    </div>
  </div>
</template>
<script>
  import { state, actions } from './store'
  import configBaseComponent from 'components/base/search'

  export default {
    extends: configBaseComponent({ state, actions })
  }
</script>
