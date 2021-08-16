<template>
  <div class="pagination-wapper">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="Math.ceil(mvCount / 10) * 10"
      :pager-count="9"
      @current-change="getMvList"
      :current-page.sync="currentPage"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    mvCount: Number,
    languageTag: String,
    typeTag: String,
    sortTag: String,
  },
  data() {
    return {
      currentPage: 1,
    }
  },
  methods: {
    // 获取指定页的MV
    getMvList(currentPage) {
      this.$emit(
        'getMvList',
        this.languageTag,
        this.typeTag,
        this.sortTag,
        currentPage - 1
      )
    },
    // 返回第一页
    backPageOne() {
      this.currentPage = 1
    },
  },
}
</script>

<style lang="scss" scoped>
</style> 