<template>
  <div
    class="newalbums"
    data-aos="fade-left"
    data-aos-offset="150"
    data-aos-delay="50"
    data-aos-duration="800"
    data-aos-easing="ease-in-out"
  >
    <div class="title">New Albums</div>
    <AlbumDesc :albumData="newAlbums" />
  </div>
</template>

<script>
import AlbumDesc from '@/components/albumDesc'
import { getNewAlbums } from '@/api/albums'
export default {
  name: 'NewAlbums',
  components: { AlbumDesc },
  data() {
    return {
      newAlbums: [],
    }
  },

  mounted() {
    getNewAlbums({ area: 'EA', limit: 9 }).then((res) => {
      this.newAlbums = res.data.albums
    })
  },
}
</script>

<style lang="scss" scoped>
.newalbums {
  width: 97%;
  margin-top: 20px;
  .title {
    @include tagstyle;
    margin-left: 10px;
  }
}
</style>