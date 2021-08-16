<template>
  <div class="album-detail">
    <div class="album-desc" v-if="albumDesc.album">
      <HeadDesc
        :img="albumDesc.album.picUrl"
        :name="albumDesc.album.name"
        :desc="albumDesc.album.description"
        :creator="albumDesc.album.artist.name"
        :createTime="albumDesc.album.publishTime"
        :trackCount="albumDesc.songs.length"
        :needAlbum="true"
      />
    </div>
    <div class="songlist">
      <SongsCard :songsData="albumDesc" :needImg="false" />
    </div>
    <div class="same-album"></div>
  </div>
</template>

<script>
import { getAlbumDetail, getSameAlbums } from '@/api/albums.js'
import HeadDesc from '@/components/headDesc'
import SongsCard from '@/components/songsCard'
// import AlbumDesc from '@/components/albumDesc'
export default {
  name: 'AlbumDetail',
  components: { SongsCard, HeadDesc },
  props: ['id'],
  data() {
    return {
      albumDesc: '',
    }
  },
  mounted() {
    //获取专辑信息
    getAlbumDetail({ id: this.id }).then((res) => {
      this.albumDesc = res.data
    })
    // 获取相关歌手其他专辑（相似专辑）
    // getSameAlbums({
    //   id: this.albumDesc.album.artist.id,
    //   limit: 6,
    // }).then((res) => console.log(res))
  },
}
</script>

<style lang="scss" scoped>
.songlist,
.album-desc {
  width: 90%;
  margin: 20px auto;
}
.songlist {
  margin-top: 50px;
}
.block {
  width: 20px;
}
</style>