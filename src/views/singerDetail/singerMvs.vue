<template>
  <div class="singer-mvs">
    <p>Singer Mvs</p>
    <div class="mvlist">
      <MvCard
        v-for="item in mvlist"
        :key="item.id"
        :cover="item.imgurl16v9"
        :artist="item.artistName"
        :playCount="item.playCount"
        :name="item.name"
        :id="item.id"
        :artistId="item.artist.id"
      />
    </div>
  </div>
</template>

<script>
import { getSingerMvs } from '@/api/singer.js'
import MvCard from '@/components/mvCard'
export default {
  name: 'SingerMvs',
  props: ['id'],
  components: { MvCard },
  data() {
    return {
      mvlist: [],
    }
  },
  mounted() {
    getSingerMvs({ id: this.id }).then((res) => {
      this.mvlist = res.data.mvs
    })
  },
}
</script>

<style lang="scss" scoped>
.singer-mvs {
  margin-top: 50px;
  p {
    @include tagstyle;
    margin-left: 30px;
  }
  .mvlist {
    width: 96%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px 38px;
  }
}
</style>