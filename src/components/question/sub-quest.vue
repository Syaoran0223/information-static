<template>
  <div>
    <div class="form-group">
      <label for="" class="control-label col-sm-1">母题:</label>
      <div class="col-sm-11">
        <div class="mg-t-7" v-if="readonly">
          <p>{{{value.quest_content_html}}}</p>
        </div>
        <input-alert
            v-else
            :value.sync="value.quest_content_html"
            :origin_value.sync="value.quest_content"
            placehold="点击此处输入大小题的母题题干">
        </input-alert>
      </div>
    </div>

    <div v-if="show_sub">
      <hr/>
      <div class="panel panel-default" v-for="item in sub_items">
        <div class="panel-body">
          <div class="close-position" v-show="!readonly">
            <button type="button" class="close" @click.prevent="remove(item._id)">&times;</button>
          </div>
          <div class="form-group" v-if="!readonly">
            <label for="" class="control-label col-sm-3">({{item.sort}}) 请选择子题类型:</label>
            
            <div class="col-sm-8">
              
              <tag-selector
                const="sub_quest_types" :value.sync="item.quest_type_id" :required="true">
              </tag-selector>
            </div>
          </div>
          <div class="form-group" v-else>
            <label for="" class="control-label col-sm-2">({{item.sort}}) 子题类型:</label>
            <div class="col-sm-10">
              <button type="button" class="btn btn-sm btn-primary">
                {{item.quest_type_id | get_const_value 'quest_types'}}
              </button>
            </div>
          </div>

          <select-quest
            :readonly="readonly"
            :value.sync="item"
            :options.sync="item.options"
            v-if="item.quest_type_id==1"
            :is-sub="true">
          </select-quest>

          <blank-quest
            :readonly="readonly"
            :value.sync="item"
            :answer_list.sync="item.answer_list"
            v-if="item.quest_type_id==2"
            :is-sub="true">>
          </blank-quest>

          <understand-quest
            :readonly="readonly"
            :value.sync="item"
            v-if="item.quest_type_id==3"
            :is-sub="true">
          </understand-quest>
        </div>
      </div>
      <div v-show="!readonly"><button class="btn btn-primary btn-xs" @click.prevent="insert">新增子题</button></div>
      <hr/>
    </div>

    <div class="form-group">
      <label for="" class="control-label col-sm-1">解答:</label>
      <div class="col-sm-11">
        <input-alert
            :value.sync="value.jieda"
            placehold="点击此处输入解答">
        </input-alert>
      </div>
    </div>

    <div class="form-group">
      <label for="" class="control-label col-sm-1">分析:</label>
      <div class="col-sm-11">
        <input-alert
            :value.sync="value.fenxi"
            placehold="点击此处输入分析">
        </input-alert>
      </div>
    </div>

    <div class="form-group">
      <label for="" class="control-label col-sm-1">点评:</label>
      <div class="col-sm-11">
        <input-alert
            :value.sync="value.dianpin"
            placehold="点击此处输入点评">
        </input-alert>
      </div>
    </div>

    <div class="form-group">
      <label for="" class="control-label col-sm-1">考点:</label>
      <div class="col-sm-11">
        <input-alert
            :value.sync="value.kaodian"
            placehold="点击此处输入考点">
        </input-alert>
      </div>
    </div>
  </div>
</template>
<script>
  import InputAlert from './input-alert.vue'
  
  import SelectQuest from './select-quest.vue'
  import BlankQuest from './blank-quest.vue'
  import UnderstandQuest from './understand-quest.vue'

  const default_item = {
      sort: 1,
      quest_type_id: 0,
      quest_content_html: '',
      quest_content: '',
      quest_option_html: '',
      quest_answer: '',
      _id: _.uniqueId('sub_item_')
    }

  export default {
    name: 'SubQuest',
    props: {
      value: {
        type: Object,
        twoWay: true
      },
      sub_items: {
        type: Array,
        twoWay: true
      },
      readonly: {
        type: Boolean,
        default: false
      },
      show_sub: {
        type: Boolean,
        default: true
      }
    },
    components: {
      InputAlert,
      SelectQuest,
      BlankQuest,
      UnderstandQuest
    },
    watch: {
      'sub_items'(val) {
        _.forEach(this.sub_items, (item, key) => {
          item.sort = key + 1
        })
      }
    },
    methods: {
      insert() {
        this.sub_items.push(
          {
            sort: 0,
            quest_type_id: 0,
            quest_content_html: '',
            quest_content: '',
            quest_option_html: '',
            quest_answer: '',
            answer_list: [],
            options: [],
            _id: _.uniqueId('sub_item_')
          }
        )
      },
      remove(_id) {
        let items = _.clone(this.sub_items)
        _.remove(items, (d)=> {
          return d._id == _id
        })
        this.sub_items = items
      }
    }
  }
</script>
<style scoped>
  .intend {
    padding-left: 40px;
  }
  .close-position {
    position: absolute;
    right: 50px;
  }
</style>