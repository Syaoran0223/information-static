<template>
  <div>
    <div class="form-group">
      <label for="" class="control-label col-sm-1">母题:</label>
      <div class="col-sm-11">
        <template v-if="show_wrong">
          <input-alert
            :value.sync="value.quest_content_html"
            :origin_value.sync="value.quest_content"
            :show_wrong="true"
            placehold="点击此处输入题干">
          </input-alert>
        </template>
        <template v-else>
          <div class="mg-t-7" v-if="readonly">
            <p>{{{value.quest_content_html}}}</p>
          </div>
          <input-tag
              v-else
              :value.sync="value.quest_content_html"
              :origin_value.sync="value.quest_content"
              placehold="点击此处输入题干">
          </input-tag>
        </template>
      </div>
    </div>

    <div v-if="show_sub">
      <hr/>
      <div class="panel panel-default" v-for="item in sub_items">
        <sub-quest-item
          :value.sync="item"
          :readonly="readonly"
          :sub_items.sync="sub_items"
          :show_wrong="show_wrong"
          :subject="value.exam.subject"
          >
        </sub-quest-item>
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
  import SubQuestItem from './sub-quest-item.vue'
  import { qtypes } from 'config'

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
      },
      show_wrong: {
        type: Boolean,
        default: false  
      }
    },
    components: {
      InputAlert,
      SelectQuest,
      BlankQuest,
      UnderstandQuest,
      SubQuestItem
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