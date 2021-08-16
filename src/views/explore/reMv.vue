<template>
  <!-- 推荐Mv模块 -->
  <div class="recommend-mv">
    <div class="title">Recommend MV</div>
    <div class="mvlist">
      <MvCard
        v-for="item in mvlist"
        :key="item.id"
        :cover="item.cover"
        :artist="item.artistName"
        :playCount="item.playCount"
        :name="item.name"
        :id="item.id"
        :artistId="item.artistId"
      />
    </div>
  </div>
</template>

<script>
import { getNewMvs } from '@/api/mv.js'
import MvCard from '@/components/mvCard'
export default {
  name: 'ReMv',
  components: { MvCard },
  data() {
    return {
      mvlist: [],
    }
  },
  mounted() {
    getNewMvs({ area: '欧美', limit: 8 }).then((res) => {
      this.mvlist = res.data.data
    })
  },
}
</script>

<style lang="scss" scoped>
.recommend-mv {
  // background-color: aqua;
  .title {
    @include tagstyle;
    padding-left: 45px;
  }
  .mvlist {
    width: 97%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px 38px;
    // background-color: violet;
  }
}
</style>