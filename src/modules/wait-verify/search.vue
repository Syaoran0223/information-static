<template>
  <div class="panel">
    <div class="panel-body">

      <form class="form-inline"
        @submit.prevent="on_search_submit">

        <div class="form-group">
          <label for="">学年</label>
          <selector
            const="school_years"
            :value.sync="search.formData.year"
          ></selector>
        </div>
        <div class="form-group">
          <label for="">学科</label>
          <selector
            const="subject"
            :value.sync="search.formData.subject"
          ></selector>
        </div>
        <div class="form-group">
          <label for="">年级</label>
          <selector
            const="grade"
            :value.sync="search.formData.grade"
          ></selector>
        </div>
        <div class="form-group">
          <label for="">类型</label>
          <selector
            const="paper_type"
            :value.sync="search.formData.paper_types"
          ></selector>
        </div>
        <div class="form-group">
          <label for="">试卷名称</label>
          <input type="text" class="form-control"
                 v-model="search.formData.name">
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
