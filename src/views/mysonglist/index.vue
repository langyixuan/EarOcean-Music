<template>
  <div
    class="my-songlist-container"
    data-aos="fade-left"
    data-aos-offset="200"
    data-aos-delay="400"
    data-aos-duration="800"
    data-aos-easing="ease-in-out"
  >
    <!-- <div class="title">My Songlist</div> -->
    <div class="my-songlist">
      <SonglistCard
        v-for="item in userSonglist"
        :key="item.id"
        :id="item.id"
        :img="item.coverImgUrl"
        :name="item.name"
        :playcount="item.playCount"
        :creator="item.creator.nickname"
        :trackcount="item.trackCount"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SonglistCard from '@/components/songlistCard'
export default {
  name: 'MySonglist',
  components: { SonglistCard },
  data() {
    return {}
  },
  mounted() {
    console.log(this.$store.state.userSonglist)
  },
  computed: {
    ...mapGetters(['userSonglist']),
  },
}
</script>

<style lang="scss" scoped>
.my-songlist-container {
  .my-songlist {
    width: 95%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
  }

  .title {
    @include tagstyle;
    margin-left: 40px;
  }
}
</style>