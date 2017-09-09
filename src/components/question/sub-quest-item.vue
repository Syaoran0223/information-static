<template>
  <div class="panel-body">
    <div class="close-position" v-show="!readonly">
      <button type="button" class="close" @click.prevent="remove(value._id)">&times;</button>
    </div>
    <div class="form-group" v-if="!readonly">
      <label for="" class="control-label col-sm-3">({{value.sort}}) 请选择子题类型:</label>
      
      <div class="col-sm-8">
        
        <tag-selector
          :init-items="sub_quest_type" :value.sync="value.quest_type_id" :required="true">
        </tag-selector>
      </div>
    </div>
    <div class="form-group" v-else>
      <label for="" class="control-label col-sm-2">({{value.sort}}) 子题类型:</label>
      <div class="col-sm-10">
        <button type="button" class="btn btn-sm btn-primary">
          {{value.quest_type_id | get_const_value 'quest_types'}}
        </button>
      </div>
    </div>

    <select-quest
      :readonly="readonly"
      :value.sync="value"
      :options.sync="value.options"
      :show_wrong="show_wrong"
      v-if="is_selector(value.quest_type_id)"
      :is-sub="true">
    </select-quest>

    <understand-quest
      :readonly="readonly"
      :value.sync="value"
      v-if="!is_selector(value.quest_type_id)"
      :show_wrong="show_wrong"
      :is-sub="true">
    </understand-quest>
  </div>
</template>
<script>  
  import SelectQuest from './select-quest.vue'
  import BlankQuest from './blank-quest.vue'
  import UnderstandQuest from './understand-quest.vue'
  import { qtypes } from 'config'

  export default {
    name: 'SubQuest',
    props: {
      value: {
        type: Object,
        twoWay: true
      },
      subject: {
        type: String
      },
      readonly: {
        type: Boolean,
        default: false
      },
      show_wrong: {
        type: Boolean,
        default: false  
      },
      sub_items: {
        type: Array,
        twoWay: true
      }
    },
    components: {
      SelectQuest,
      BlankQuest,
      UnderstandQuest
    },
    computed: {
      sub_quest_type() {
        let quest_types = _.cloneDeep(qtypes)
        let data =  _.filter(quest_types, {subject_id: Number(this.subject)})
        return data
      }
    },
    methods: {
      is_selector(quest_type_id) {
        let quest_type = _.find(this.sub_quest_type, (d)=> {
          return d.id == quest_type_id
        })
        if (!quest_type) {
          return false
        }
        return quest_type.text == '选择题' || quest_type.text == '单选题' || quest_type.text == '多选题' || quest_type.text == '不定项选择题' || quest_type.text == '双选题'
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