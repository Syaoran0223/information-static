<template>
  <div>
    <div class="form-group">
      <label for="" class="control-label col-sm-2">选项:</label>
      <div class="col-sm-10">
        <div v-for="item in value" class="row">
          <div class="inline">
            <div class="mg-t-7">{{item.sort}}</div>
          </div>
          <div class="inline">
            <div class="mg-t-7">{{{item.content}}}</div>
          </div>
          <div class="checkbox">
            <label>
              <input type="checkbox" v-model="item._selected"> 正确答案
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="form-group">
      <label for="" class="control-label col-sm-2">答案:</label>
      <div class="col-sm-10">
        <div class="mg-t-7">
          <span v-for="item in selected">{{item.sort}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import InputAlert from './input-alert.vue'

  export default {
    name: 'OptionView',
    props: {
      value: {
        type: Array,
        twoWay: true
      }
    },
    components: {
      InputAlert
    },
    computed: {
      selected() {
        return _.filter(this.value, (item)=> {
          return item._selected
        })
      }
    },
    watch: {
      value(val) {
        _.forEach(this.value, (item, key) => {
          item.sort = String.fromCharCode(key+65)
        })
      }
    }
  }
</script>
<style>
  .inline {
    float: left !important;
    margin: 0px 10px 0px 10px;
  }
  .inline-sm {
    float: left !important;
    margin: -10px 10px 10px 10px;
  }
</style>