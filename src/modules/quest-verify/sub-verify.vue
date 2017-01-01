<template>
  <form class="form-horizontal">
  <div>
    <div class="form-group">
      <label for="" class="control-label col-sm-1">母题:</label>
      <div class="col-sm-11">
        <input-alert
            :value.sync="value.quest_content_html"
            :origin_value.sync="value.quest_content"
            placehold="点击此处输入题干">
        </input-alert>
      </div>
    </div>

    <hr>
      <div class="panel panel-default" v-for="data in value.sub_items">
        <div class="panel-body">
          <div class="form-group">
            <label for="" class="control-label col-sm-2">({{data.sort}}) 子题类型:</label>
            <div class="col-sm-10">
              <button type="button" class="btn btn-sm btn-primary">
                {{data.quest_type_id | get_const_value 'quest_types'}}
              </button>
            </div>
          </div>

          <select-verify
            v-if="data.quest_type_id==1"
            :value.sync="data"
            :is-sub="true">
          </select-verify>

          <blank-verify
            v-if="data.quest_type_id==2"
            :value.sync="data"
            :is-sub="true">
          </blank-verify>

          <understand-verify
            v-if="data.quest_type_id==3"
            :value.sync="data"
            :is-sub="true">
          </understand-verify>
        </div>
      </div>

    <hr>

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
  </form>
</template>
<script>
  import SelectVerify from './select-verify.vue'
  import BlankVerify from './blank-verify.vue'
  import UnderstandVerify from './understand-verify.vue'

  export default {
    name: 'SubVerify',
    props: {
      value: {
        type: Object,
        twoWay: true
      }
    },
    components: {
      SelectVerify,
      BlankVerify,
      UnderstandVerify
    }
  }
</script>