<template>
  <div class="favorite-songs">
    <div class="head-desc">
      <img :src="userInfo.avatarUrl" />
      <div class="desc-r">
        <h1>{{ userInfo.nickname }} Favorite Songs</h1>
        <span>共收录{{ likeSongDetail.songs.length }}首</span>
      </div>
    </div>
    <!-- 歌单相应单曲 -->
    <div class="songs">
      <SongsCard :songsData="likeSongDetail" :needImg="true" />
    </div>
  </div>
</template>

<script>
import { getLikelist, getSongDetail } from '@/api/song.js'
import { mapGetters } from 'vuex'
import SongsCard from '@/components/songsCard'
export default {
  name: 'Favorite',
  components: { SongsCard },
  data() {
    return {
      // 获取到喜欢歌曲列表的IDS
      songIds: '',
      // 喜欢的歌曲列表详情
      likeSongDetail: '',
    }
  },
  watch: {
    songIds: {
      handler(newVal, oldVal) {
        // 获取喜欢的音乐详情
        if (newVal != oldVal) {
          getSongDetail({ ids: newVal }).then((res) => {
            this.likeSongDetail = res.data
            console.log(this.likeSongDetail)
          })
        }
      },
      immediate: true,
    },
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  mounted() {
    // 获取喜欢的音乐列表
    getLikelist({ uid: this.userInfo.userId }).then((res) => {
      this.songIds = res.data.ids.join(',')
      // console.log(this.songIds)
    })
  },
}
</script>

<style lang="scss" scoped>
.favorite-songs {
  width: 100%;

  .head-desc {
    width: 90%;
    height: 150px;
    // background-color: cornflowerblue;
    display: flex;
    align-items: center;
    margin: 20px auto;
    // background-color: cornflowerblue;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      box-shadow: $img-shadow;
    }
    .desc-r {
      height: 100px;
      margin-left: 30px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    h1 {
      font-size: $large-f;
      font-weight: 900;
    }
    span {
      font-size: $small-f;
      font-weight: 900;
    }
  }
  .songs {
    width: 90%;
    margin: 0 auto;
  }
}
</style>