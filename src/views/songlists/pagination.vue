<template>
  <div class="pagination">
    <el-pagination
      background
      layout="prev, pager, next"
      :pager-count="9"
      :total="Math.ceil(songlistCount / 18) * 10"
      :current-page="currentPage"
      @current-change="getSonglist"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    songlistCount: Number,
    selectedTag: String,
  },
  data() {
    return {
      currentPage: 1,
    }
  },
  methods: {
    // 获取指定页的歌单
    getSonglist(currentPage) {
      this.$emit('getSonglist', this.selectedTag, currentPage - 1)
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