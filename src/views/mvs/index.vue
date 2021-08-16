<template>
  <div class="mv">
    <div class="tag">
      <MvTag @getMvList="getMvList" @backPageOne="backPageOne" />
    </div>
    <div class="mvlist">
      <MvCard
        v-for="item in mvList"
        :key="item.id"
        :cover="item.cover"
        :artist="item.artistName"
        :name="item.name"
        :playCount="item.playCount"
        :id="item.id"
        :artistId="item.artistId"
      />
    </div>
    <div class="pagination">
      <Pagination
        ref="pagination"
        :languageTag="languageTag"
        :typeTa="typeTag"
        :sortTag="sortTag"
        :mvCount="mvCount"
        @getMvList="getMvList"
      />
    </div>
  </div>
</template>

<script>
import { getAllMvs } from '@/api/mv.js'
import MvTag from './mvTag'
import MvCard from '@/components/mvCard'
import Pagination from './pagination'
export default {
  name: 'MV',
  components: { MvTag, MvCard, Pagination },
  data() {
    return {
      mvList: [],
      languageTag: '全部',
      typeTag: '全部',
      sortTag: '上升最快',
      mvCount: 0,
    }
  },
  created() {
    this.getMvList(this.languageTag, this.typeTag, this.sortTag, 0)
  },
  methods: {
    getMvList(languageTag, typeTag, sortTag, currentPage) {
      getAllMvs({
        area: languageTag,
        type: typeTag,
        order: sortTag,
        limit: 10,
        offset: currentPage * 10,
      }).then((res) => {
        this.mvList = res.data.data
        this.languageTag = languageTag
        this.typeTag = typeTag
        this.sortTag = sortTag
        // 判断当前的页数为0原因，只有当前页数为0时，才会获取到当前请求mv的总数
        if (currentPage === 0) {
          this.mvCount = res.data.count
        }
      })
    },
    backPageOne() {
      // 获取原生的pagition 元素，调取重新返回第一页的操作
      this.$refs.pagination.backPageOne()
    },
  },
}
</script>

<style lang="scss" scoped>
.mv {
  margin-top: 20px;
  .tag {
    margin-left: 5%;
    margin-bottom: 50px;
  }
  .mvlist {
    width: 90%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 20px auto;
  }
  .pagination {
    margin: 30px 0;
    display: flex;
    justify-content: center;
  }
}
</style>