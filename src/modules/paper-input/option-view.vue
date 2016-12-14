<template>
  <div>
    <div class="form-group">
      <label for="" class="control-label col-sm-1">选项</label>
      <div class="col-sm-11">
        <div class="mg-t-7" v-if="!value.length">
          <button class="btn btn-default btn-xs" @click.prevent="insert()">
            新增
          </button>
        </div>
        <div v-for="item in value" class="row">
          <div class="inline">
            <div class="mg-t-7">{{item.sort}}</div>
          </div>
          <div class="inline">
            <input-alert :value.sync="item.content" placehold="点击此处输入选项">
            </input-alert>
          </div>
          <div class="inline">
            <div class="checkbox">
              <label>
                <input type="checkbox" v-model="item._selected"> 正确答案
              </label>
            </div>
          </div>
          <div class="inline" style="margin-top: 7px;">
            <button class="btn btn-default btn-xs" @click.prevent="remove(item._id)">
              删除
            </button>
            <button v-if="$index + 1 == value.length" class="btn btn-default btn-xs" @click.prevent="insert()">
              新增
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="form-group">
      <label for="" class="control-label col-sm-1">答案</label>
      <div class="col-sm-11">
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
    },
    methods: {
      remove(_id) {
        let items = _.clone(this.value)
        _.remove(items, (d)=> {
          return d._id == _id
        })
        this.value = items
      },
      insert() {
        this.value.push(
          {
            sort: '',
            content: '',
            _id: _.uniqueId('option_'),
            _selected: false
          }
        )
      }
    }
  }
</script>
<style>
  .inline {
    float: left !important;
    margin: 0px 10px 0px 10px;
  }
</style>