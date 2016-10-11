<template>
  <div class="panel">
    <div class="panel-body">

      <form class="form-inline"
        @submit.prevent="on_search_submit">

        <div class="form-group">
          <label for="">班级</label>
          <selector
            remote="teacher/classes/suggest"
            :value.sync="search.formData.classId"
          ></selector>
        </div>
        <div class="form-group">
          <label for="">姓名</label>
          <input type="text" class="form-control"
            v-model="search.formData.realName"
          >
        </div>
        <div class="form-group">
          <label for="">籍贯</label>
          <input type="text" class="form-control"
                 v-model="search.formData.nativePlaceLike"
          >
        </div>
        <div class="form-group">
          <label for="">民族</label>
          <input type="text" class="form-control"
                 v-model="search.formData.nationLike"
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
