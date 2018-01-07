<template>
  <div class="panel">
    <div class="panel-body">

      <form class="form-inline"
        @submit.prevent="on_search_submit">
        <div class="form-group">
          <label for="">省</label>
          <selector
            remote="api/province"
            :value.sync="search.formData.province_id"
          ></selector>
        </div>
        <div class="form-group">
          <label for="">市</label>
          <selector
            remote="api/city"
            :remote-params.sync="cityForm"
            :value.sync="search.formData.city_id"
          ></selector>
        </div>
        <div class="form-group">
          <label for="">县/区</label>
          <selector
            remote="api/area"
            :value.sync="search.formData.area_id"
            :remote-params.sync="areaForm"
          ></selector>
        </div>
        <div class="form-group">
          <label for="">学校</label>
          <selector
            remote="api/school"
            :value.sync="search.formData.school_id"
            :remote-params.sync="schoolForm"
          ></selector>
        </div>


        <div class="form-group">
          <label for="">学年</label>
          <selector
            const="school_years"
            :value.sync="search.formData.year"
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
          <label for="">学科</label>
          <selector
            :init-items="subjects"
            :value.sync="search.formData.subject"
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
      data() {
        return {
          cityForm: {
            pro_id: 0
          },
          areaForm: {
            city_id: 0
          },
          schoolForm: {
            ctid: 0
          }
        }
    },
    watch: {
      'search.formData.province_id'(val) {
        this.cityForm.pro_id = val
      },
      'search.formData.city_id'(val) {
        this.areaForm.city_id = val
      },
      'search.formData.area_id'(val) {
        this.schoolForm.ctid = val
      }
    },
    computed: {
      subjects() {
        if (!this.search.formData.grade) {
          return []
        }
        let res = []
        if (this.search.formData.grade < 7) {
          res = _.map(subjects[0].children, (data)=> {
            return {id: data.id, text: data.label}
          })
        } else if (this.search.formData.grade < 10) {
          res =  _.map(subjects[1].children, (data)=> {
            return {id: data.id, text: data.label}
          })
        } else {
          res = _.map(subjects[2].children, (data)=> {
            return {id: data.id, text: data.label}
          })
        }
        res.unshift({id: null, text: '请选择'})
        return res
      }
    },
    extends: configBaseComponent({ state, actions })
  }
</script>
