<template>
  <div class="singer-songs">
    <SongsCard
      :songsData="songsData"
      :needImg="true"
      :isShowSongs="isShowSongs"
    />
    <i
      class="iconfont icon-gengduomore10"
      @click="isShowSongs = !isShowSongs"
    ></i>
  </div>
</template>

<script>
import { getSingerSongs } from '@/api/singer.js'
import SongsCard from '@/components/songsCardSmall'
export default {
  name: 'SingerSongs',
  props: ['id', 'songsCount'],
  components: { SongsCard },
  data() {
    return {
      songsData: '',
      isShowSongs: true,
    }
  },
  mounted() {
    getSingerSongs({ id: this.id }).then((res) => {
      this.songsData = res.data
    })
    console.log(this.isShowSongs)
  },
}
</script>

<style lang="scss" scoped>
.singer-songs {
  margin-top: 30px;
  position: relative;
  .iconfont {
    position: absolute;
    right: 0px;
    padding: 8px 15px;
    border-radius: $br-10;
    cursor: pointer;
    &:hover {
      background-color: rgba($blue, 0.1);
    }
  }
}
</style>