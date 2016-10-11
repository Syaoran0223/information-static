<template>
  <div>
    <template v-if="data.loading">
      <div class="text-center">载入中...</div>
    </template>

    <template v-if="!data.loading && data.empty">
      <div class="text-center">{{emptyMsg}}</div>
    </template>

    <template v-if="!data.loading && !data.empty">
      <slot></slot>
    </template>

    <pagination
      v-show="!data.loading && show_pagination"
      :page-index="data.pageIndex"
      :page-size="data.pageSize"
      :total-count="data.totalCount"
      :total-page="data.totalPage"
      @change="on_page_index_change"
    ></pagination>
  </div>
</template>
<script>
  import Pagination from './pagination.vue'

  export default {
    components: {
      Pagination
    },
    props: {
      data: {

      },
      emptyMsg: {
        default: '没有匹配的数据'
      },
      show_pagination: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      on_page_index_change(index) {
        this.$emit('page-index-change', index)
      }
    }
  }
</script>
