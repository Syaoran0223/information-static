<template>
  <div class="clearfix text-right">

    <ul class="pagination">
      <li><a href="#" @click.prevent="go(pageIndex-1)"> <span>&lt; 上一页 </span> </a></li>
      <li v-if="pageIndex > paginationSize"><a href="#" @click.prevent="go(0)"> <span>1</span> </a></li>
      <li v-if="pageIndex > paginationSize+1"><span class="ellipsis">...</span></li>
      <li v-for="index in pages" :class="{active: index==pageIndex}">
        <a href="#" @click.prevent="go(index)">{{index + 1}}</a>
      </li>
      <li v-if="pageIndex < totalPage - paginationSize - 2"><span class="ellipsis">...</span></li>
      <li v-if="pageIndex < totalPage - paginationSize - 1"><a href="#" @click.prevent="go(totalPage-1)"> <span>{{totalPage}}</span> </a></li>
      <li><a href="#" @click.prevent="go(pageIndex+1)"> <span> 下一页 &gt;</span> </a></li>
    </ul>
  </div>

</template>

<script type="text/babel">
  export default {
    props: {
      pageIndex: {
        required: true,
        default: 0,
        coerce: _.parseInt
      },
      totalCount: {
        required: true,
        default: 0,
        coerce: _.parseInt
      },
      totalPage: {
        required: true,
        default: 1,
        coerce: (val) => {
          val = _.parseInt(val)
          return val == 0 ? 1 : val
        }
      },
      paginationSize: {
        default: 4,
        coerce: _.parseInt
      }
    },
    computed: {
      pages() {
        var range_min = Math.max(0, this.pageIndex - this.paginationSize)
        var range_max = Math.min(this.totalPage, this.pageIndex + this.paginationSize+1)
        return _.range(range_min, range_max)
      }
    },
    methods: {
      go(index) {
        index = Math.max(0, index)
        index = Math.min(index, this.totalPage-1)
        this.$emit('change', index)
      }
    }
  }
</script>
<style scoped>
  .pagination > li {
    display: inline-block;
  }
  .pagination > li > .ellipsis {
    position: relative;
    float: left;
    padding: 6px 12px;
    line-height: 1.42857;
    text-decoration: none;
    color: #1fb6f3;
    background-color: #fff;
    margin-left: -1px;
    border: none;
  }
</style>
