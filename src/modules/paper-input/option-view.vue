<template>
  <div>
    <div class="mg-t-7" v-if="!value.length">
      <button
          class="btn btn-default btn-xs"
          @click.prevent="insert()">
        新增
      </button>
    </div>
    <div v-for="item in value">
      <div class="row">
        <div class="col-sm-1">
          <div class="mg-t-7">{{item.sort}}</div>
        </div>
        <div class="col-sm-5">
          <input-alert
              :value.sync="item.content"
              placehold="点击此处输入选项">
          </input-alert>
        </div>
        <div class="col-sm-2">
          <button class="btn btn-default btn-xs"
            @click.prevent="remove(item._id)">
            删除
          </button>
          <button
              v-if="$index + 1 == value.length"
              class="btn btn-default btn-xs"
              @click.prevent="insert()">
            新增
          </button>
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
            sort: 'A',
            content: '',
            _id: _.uniqueId('option_')
          }
        )
      }
    }
  }
</script>