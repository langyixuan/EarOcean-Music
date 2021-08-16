<template>
  <div class="explore">
    <NewAlbums />
    <div class="layout-lr">
      <div class="layout-tb">
        <ReSonglist />
        <ReMv />
      </div>
      <TopArtists />
    </div>
  </div>
</template>

<script>
// import Swiper from './swiper'
import ReSonglist from './reSonglist'
import TopArtists from './topArtists'
import NewAlbums from './newAlbums'
import ReMv from './reMv'
export default {
  name: 'Explore',
  components: { ReSonglist, TopArtists, NewAlbums, ReMv },
}
</script>

<style lang="scss" scoped>
.explore {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

  .layout-lr {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;

    .layout-tb {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
