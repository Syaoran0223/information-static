<template>
  <div class="panel">
    <div class="panel-body">

      <form class="form-inline"
        @submit.prevent="on_search_submit">

        <div class="form-group">
          <label for="">入学年份</label>
          <selector
            const="school_years"
            :value.sync="search.formData.enrollYear"
          ></selector>
        </div>
        <div class="form-group">
          <label for="">学期</label>
          <selector
            remote="teacher/terms/suggest"
            :value.sync="search.formData.term"
          ></selector>
        </div>
        <div class="form-group">
          <label for="">班级名称</label>
          <input type="text" class="form-control"
                 v-model="search.formData.title">
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
