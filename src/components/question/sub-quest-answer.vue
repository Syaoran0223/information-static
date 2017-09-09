<template>
  <div class="panel panel-default" v-for="item in sub_items">
    <div class="panel-body">

      <form class="form-horizontal">
        <div class="form-group">
          <label for="" class="control-label col-sm-3">({{item.sort}}) 子题类型:</label>
          <div class="col-sm-9 mg-t-7">
            <span class="label label-primary">
            {{item.quest_type_id | get_const_value 'quest_types'}}
            </span>
          </div>
        </div>

        <div v-if="is_selector(item.quest_type_id)">
          <div class="form-group">
            <label for="" class="control-label col-sm-2">题目:</label>
            <div class="col-sm-10">
              <div class="mg-t-7">
                <p>{{{item.quest_content_html}}}</p>
              </div>
            </div>
          </div>
          <option-view-sm
              :readonly="true"
              :value.sync="item.options">
          </option-view-sm>
        </div>

        <div v-else>
          <div class="form-group">
            <label for="" class="control-label col-sm-2">题目:</label>
            <div class="col-sm-10">
              <div class="mg-t-7">
                <p>{{{item.quest_content_html}}}</p>
              </div>
            </div>
          </div>
          <div class="form-group">
              <label for="" class="control-label col-sm-2">答案:</label>
              <div class="col-sm-10 mg-t-7">
                {{{item.correct_answer}}}
              </div>
            </div>
        </div>

      </form>

    </div>
  </div>
</template>
<script>
  import InputAlert from './input-alert.vue'
  
  import SelectQuest from './select-quest.vue'
  import BlankQuest from './blank-quest.vue'
  import UnderstandQuest from './understand-quest.vue'
  import OptionViewSm from './option-view-sm.vue'
  import { qtypes } from 'config'
  
  export default {
    name: 'SubQuestAnswer',
    props: {
      sub_items: {
        type: Array,
        twoWay: true
      }
    },
    components: {
      InputAlert,
      SelectQuest,
      BlankQuest,
      UnderstandQuest,
      OptionViewSm
    },
    methods: {
      is_selector(quest_type_id) {
        let quest_type = _.find(qtypes, (d)=> {
          return d.id == quest_type_id
        })
        if (!quest_type) {
          return false
        }
        return quest_type.text == '选择题' || quest_type.text == '单选题' || quest_type.text == '多选题' || quest_type.text == '不定项选择题' || quest_type.text == '双选题'
      }
    }
  }
</script>