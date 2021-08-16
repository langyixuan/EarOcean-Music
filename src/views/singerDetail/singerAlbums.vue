<template>
  <div class="singer-albums">
    <div class="head-desc">
      <span>Singer Albums</span>
      <el-pagination
        small
        layout="prev, pager, next"
        :total="Math.ceil(albumCount / 9) * 10"
        :pager-count="5"
        @current-change="getSingerAlbums"
        :current-page="currentPage"
        class="pagination"
      >
      </el-pagination>
    </div>
    <AlbumDesc :albumData="singerAlbum" />
  </div>
</template>

<script>
import { getSingerAlbums } from '@/api/singer.js'
import AlbumDesc from '@/components/albumDesc'
export default {
  name: 'SingerAlbums',
  components: { AlbumDesc },
  props: ['id', 'albumCount'],
  data() {
    return {
      singerAlbum: '',
      currentPage: 1,
    }
  },
  mounted() {
    this.getSingerAlbums(0)
  },
  methods: {
    getSingerAlbums(currentPage) {
      getSingerAlbums({ id: this.id, limit: 9, offset: currentPage * 9 }).then(
        (res) => {
          console.log(res)
          this.singerAlbum = res.data.hotAlbums
        }
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.singer-album {
  .head-desc {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      @include tagstyle;
    }
    .pagination {
      margin-right: 50px;
    }
  }
}
</style>