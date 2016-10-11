<template>
  <data-grid
    :data="table"
    @page-index-change="page_index_change"
  >
    <div class="">
      <div class="flex-grid" v-for="item in table.items" track-by="id">
        <div class="grid-cell">{{item.realName}}</div>
        <div class="grid-cell">
          <span
            v-for="student in item.students"
            ><template v-if="$index!=0">,</template> {{student.realName}}
          </span>的{{item.relation}}
        </div>
        <div class="grid-cell small">
          <div>{{item.work}}</div>
          <div>{{item.duty}}</div>
        </div>
        <div class="grid-cell small">{{item.mobile}}</div>
        <div class="grid-cell">
          <span v-for="tag in item.tags" class="label label-primary"
            style="margin-left: 3px;">
            {{ tag.tagTitle }}
          </span>
        </div>
        <div class="grid-cell cell-btn-group">
          <button class="btn btn-link"
                  @click="on_item_edit_click(item, {tabs_active: 't_base'})"
          >详情
          </button>
        </div>
      </div>
    </div>
  </data-grid>
</template>
<script type="text/babel">
  import { state, actions } from './store'
  import configBaseComponent from 'components/base/table'

  export default {
    extends: configBaseComponent({ state, actions })
  }
</script>
