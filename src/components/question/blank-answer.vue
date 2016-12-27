<template>
  <div>
    <div class="form-group">
      <label for="" class="control-label col-sm-1">答案:</label>
      <div class="col-sm-11">
        <div class="mg-t-7" v-if="!value.length">
          <button class="btn btn-default btn-xs" @click.prevent="insert()">
            新增
          </button>
        </div>
        <div v-for="item in value" class="row">
          <div class="inline">
            <input-alert :value.sync="item.content" placehold="点击此处输入答案">
            </input-alert>
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
  </div>
</template>
<script>
  import InputAlert from './input-alert.vue'

  export default {
    name: 'BlankAnswer',
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
            content: '',
            _id: _.uniqueId('b_answer_')
          }
        )
      }
    }
  }
</script>