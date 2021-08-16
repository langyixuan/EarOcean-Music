<template>
  <!-- 歌曲列表模块 -->
  <div class="songs-card">
    <div
      class="song-list"
      v-for="(item, index) in songsData.songs"
      :key="item.id"
    >
      <div class="flex-l" @click="playMusic(item, index)">
        <!-- 单曲封面 -->
        <img :src="item.al.picUrl" v-if="needImg" />
        <span class="songIndex" v-else>{{ index + 1 }}</span>
        <!-- 单曲名称和歌手 -->
        <div class="desc">
          <span>{{ item.name }}</span>
          <i>{{ item.ar | artistsFilter }}</i>
        </div>
        <!-- 是否有mv -->
        <i
          class="iconfont icon-MV"
          v-show="item.mv !== 0"
          @click.stop="toMvDetail(item.mv)"
        ></i>
      </div>
      <!-- 专辑名称 -->
      <span class="album-name">{{ item.al.name }}</span>
      <!-- icon -->
      <div class="icon">
        <i class="iconfont icon-xihuan"></i>
        <i
          class="iconfont icon-tianjia_3"
          @click="addPlaylist(item, index)"
        ></i>
      </div>
      <!-- 单曲时长 -->
      <span style="font-weight: 700">{{ item.dt | songTimeFormat }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSongUrl } from '@/api/song.js'
export default {
  name: 'SongsCard',
  // songsData是歌单中歌曲的详情数据
  props: ['songsData', 'needImg'],
  data() {
    return {
      currentIndex: -1,
    }
  },
  computed: {
    ...mapGetters([
      // 当前音乐的播放状态
      'isPlaying',
      // 当前播放的歌曲id
      'currentSongId',
      // 当前的播放列表
      'currentPlaylist',
    ]),
  },
  mounted() {
    console.log(this.songsData)
  },
  methods: {
    // 点击播放音乐，切换到播放模式
    playMusic(csongsDetail, congsIndex) {
      // 当点击的歌曲id等于当前播放的歌曲id不做任何操作
      if (csongsDetail.id === this.currentSongId) return
      // (1) 保存当前播放歌曲详情
      console.log(csongsDetail)
      this.$store.dispatch('saveCurrentSongDetail', csongsDetail)
      // (2) 保存当前播放歌曲ID
      this.$store.dispatch('saveCurrentSongId', csongsDetail.id)
      getSongUrl({ id: csongsDetail.id }).then((res) => {
        // 点击播放单曲时，请求当前歌曲URL相关信息并存入vuex
        // (3) 保存试听范围：如果当前歌曲是VIP,保存其试听范围
        if (res.data.data[0].freeTrialInfo) {
          this.$store.dispatch('saveSongAudition', [
            res.data.data[0].freeTrialInfo.start,
            res.data.data[0].freeTrialInfo.end,
          ])
        } else {
          this.$store.dispatch('saveSongAudition', [0, 0])
        }
        // (4) 保存当前播放歌曲Url
        this.$store.dispatch('saveCurrentSongUrl', res.data.data[0].url)
      })
      // (5) 将播放歌曲添加至历史列表
      this.$store.dispatch('addHistoryPlaylist', csongsDetail)
      console.log(this.$store.state.historyPlaylist)
      // (6) 将当前播放歌曲加入播放列表
      this.addPlaylist(csongsDetail, congsIndex)
    },

    // 添加到当前播放列表
    addPlaylist(csongsDetail, csongsIndex) {
      // 判断准备添加到播放列表中的歌曲是否已存在播放列表中
      for (let song of this.currentPlaylist) {
        if (song.id === csongsDetail.id) {
          this.$message.warning('该音乐已在当前播放列表中')
          return
        }
      }
      // 添加当前音乐到播放列表
      this.$store.dispatch('addCurrentPlaylist', csongsDetail)
      this.$message.success('已成功添加至播放列表')
    },

    // 去MV详情页
    toMvDetail(id) {
      this.$router.push(`/mv/${id}`)
    },
  },
}
</script>

<style lang="scss" scoped>
$height: 60px;
.songs-card {
  width: 100%;
}
.song-list {
  height: $height;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(244, 248, 250);
  border-radius: $br-10;
  margin-bottom: 15px;
  transition: all 0.4s ease-in-out;
  cursor: pointer;
  padding-right: 15px;

  &:hover {
    transform: scale(1.03);
  }
  .flex-l {
    display: flex;
    align-items: center;
    .songIndex {
      width: 45px;
      text-align: center;
      font-size: $small-f;
      font-weight: 700;
      color: rgba($blue, 0.8);
    }
  }
  img {
    width: calc(#{$height} - 10px);
    margin-right: 30px;
    border-radius: $br-10;
    box-shadow: $img-shadow;
  }
  .desc {
    display: flex;
    width: 280px;
    flex-direction: column;
    justify-content: space-around;
    padding-right: 20px;
    @include hidden;
    span {
      font-size: $small-f;
      font-weight: 700;
    }
    i {
      font-size: $mini-f;
      color: $gray;
      font-weight: 700;
    }
  }

  .icon-MV {
    font-size: $big-f;
    color: rgba($blue, 0.85);
    font-weight: 500;
    cursor: pointer;
  }

  .album-name {
    width: 200px;
    @include hiddenmore;
    -webkit-line-clamp: 2;
    font-weight: 700;
  }

  .icon {
    i {
      font-size: $big-f;
      font-weight: 600;
      color: rgba($blue, 0.7);
      margin-left: 15px;
      cursor: pointer;
    }
  }
}
</style>