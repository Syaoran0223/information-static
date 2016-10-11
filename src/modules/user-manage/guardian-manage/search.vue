<template>
  <div class="panel">
    <div class="panel-body">

      <form class="form-inline"
        @submit.prevent="on_search_submit">
        <div class="form-group">
          <label for="">姓名</label>
          <input type="text" class="form-control"
            v-model="search.formData.realNameLike"
          >
        </div>
        <div class="form-group">
          <label for="">手机号</label>
          <input type="text" class="form-control"
            v-model="search.formData.mobileLike"
          >
        </div>
        <div class="form-group">
          <label for="">学生姓名</label>
          <input type="text" class="form-control"
                 v-model="search.formData.studentNameLike"
          >
        </div>
        <div class="form-group">
          <label for="">工作单位</label>
          <input type="text" class="form-control"
                 v-model="search.formData.workLike"
          >
        </div>
        <div class="form-group">
          <label for="">关系</label>
          <input type="text" class="form-control"
                 v-model="search.formData.relationLike"
          >
        </div>
        <div class="form-group">
          <label for="">班级</label>
          <selector
            remote="teacher/classes/suggest"
            :value.sync="search.formData.classId"
          ></selector>
        </div>
        <div class="form-group">
          <label for="">标签分类</label>
          <selector
            remote="teacher/guardians/tagSuggest"
            :value.sync="search.formData.tagId"
            :multiple="true"
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
