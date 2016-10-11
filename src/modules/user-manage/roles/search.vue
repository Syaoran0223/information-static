<template>
  <div class="panel">
    <div class="panel-body">

      <form class="form-inline"
        @submit.prevent="on_search_submit">

        <div class="form-group">
            <label for="">年级</label>
            <selector
              const="grade"
              :value.sync="search.formData.grade"
            ></selector>
          </div>
          <div class="form-group">
            <label for="">学期</label>
            <selector
              const="term"
              :value.sync="search.formData.term"
            ></selector>
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
