<template>
  <div class="player-container">
    <div class="player-desc">
      <div class="song-desc" v-if="currentSongDetail.al">
        <img
          :src="currentSongDetail.al.picUrl"
          @click.prevent="isShow = !isShow"
        />
        <div class="desc-r">
          <span>{{ currentSongDetail.name }}</span>
          <i>{{ currentSongDetail.ar | artistsFilter }}</i>
        </div>
        <div class="play-bar">
          <!-- 播放模式 -->
          <div class="play-mode" @click="changePlayMode">
            <i
              class="iconfont icon-liebiaoshunxu"
              style="font-size: 18px"
              v-if="playMode === 0"
            ></i>
            <i
              class="iconfont icon-suijibofang"
              style="font-size: 18px"
              v-else-if="playMode === 1"
            ></i>
            <i
              class="iconfont icon-danquxunhuan"
              style="font-size: 18px"
              v-else
            ></i>
          </div>
          <!-- 上一首 -->
          <div
            class="iconfont icon-shangyishou"
            style="font-size: 20px"
            @click="prevMusic"
          ></div>
          <!-- 播放/暂停 -->
          <div
            class="iconfont icon-bofang"
            v-if="!isPlaying"
            @click="playMusic"
          ></div>
          <div
            class="iconfont icon-tianchongxing-"
            v-else
            @click="pauseMusic"
          ></div>
          <!-- 下一首 -->
          <div
            class="iconfont icon-xiayishou"
            style="font-size: 20px"
            @click="nextMusic"
          ></div>
        </div>
        <!-- 播放进度条 -->
        <div class="progress-bar">
          <i>{{ currentTime | songTimeFormat2 }}</i>
          <Progress
            :currentPercent="songPercent"
            @changePercent="hasBarChange"
          />
          <i>{{ endTime() | songTimeFormat }}</i>
        </div>
        <!-- 音量控制 -->
        <div class="volume">
          <i
            class="iconfont icon-volume"
            v-if="defaultVolume !== 0"
            @click="muteVolume"
          ></i>
          <i class="iconfont icon-silence" v-else @click="cancelMute"></i>
          <el-slider
            v-model="defaultVolume"
            :max="100"
            :show-tooltip="false"
            @change.prevent="volumeChange"
          ></el-slider>
        </div>
        <!-- 播放列表 -->
        <div class="playlist" @click="isPlaylist = !isPlaylist">
          <i class="iconfont icon-gedan"></i>
        </div>
      </div>
      <audio
        :src="currentSongUrl"
        ref="audio"
        autoplay
        @timeupdate="updateTime"
      ></audio>
    </div>
    <!-- 歌词页面 -->
    <transition name="slide-fade">
      <div class="full-screen" v-show="isShow">
        <SongDetail :currentTime="currentTime" />
      </div>
    </transition>
    <!-- 播放列表页面 -->
    <transition name="slide-fade">
      <div class="mini-playlist" v-show="isPlaylist">
        <Playlist
          @selectSong="selectSongByPlaylist"
          @getNextSong="nextMusic"
          @closePlaylist="closePlaylist"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SongDetail from '@/components/songDetail'
import { getSongUrl } from '@/api/song.js'
import Progress from '@/components/progress'
import Playlist from '@/components/playlist'
export default {
  name: 'Player',
  components: { SongDetail, Progress, Playlist },
  data() {
    return {
      // 是否显示播放歌单
      isPlaylist: false,
      // 是否显示歌词页面
      isShow: false,
      // 歌曲当前播放进度
      currentTime: 0,
      // 音量值
      defaultVolume: 50,
      // 当前音量值
      currentVolume: 50,
    }
  },
  computed: {
    ...mapGetters([
      // 当前播放状态
      'isPlaying',
      // 当前播放歌曲url
      'currentSongUrl',
      // 当前播放音乐详情
      'currentSongDetail',
      // 当前播放音乐的ID
      'currentSongId',
      // VIP音乐可试听的范围
      'auditionStart',
      'auditionEnd',
      // 当前播放模式
      'playMode',
      // 当前播放列表
      'currentPlaylist',
    ]),
    // 当前歌曲播放进度百分比
    songPercent() {
      return this.currentTime / (this.currentSongDetail.dt / 1000)
    },
  },
  mounted() {
    // 若有歌曲已经变为播放，将播放状态设置为true
    if (this.currentSongUrl == '') return
    this.$store.dispatch('saveIsPlaying', true)
  },
  watch: {
    // 监听URL的变化，当URL改变时将当前播放状态设置为true
    currentSongUrl(newUrl, oldUrl) {
      if (newUrl === oldUrl) return
      this.$store.dispatch('saveIsPlaying', true)
    },
  },
  methods: {
    // 播放歌曲
    playMusic() {
      if (!this.currentSongUrl) {
        this.$message.error('当前音乐因版权问题不能播放')
      }
      this.$store.dispatch('saveIsPlaying', true)
      this.$refs.audio.play()
    },

    // 暂停歌曲
    pauseMusic() {
      this.$store.dispatch('saveIsPlaying', false)
      this.$refs.audio.pause()
    },

    // 切换歌曲时，需要启动歌曲的播放，并变更当前播放的歌曲信息
    startMusic(csongsDetail, congsIndex) {
      // 当点击的歌曲id等于当前播放的歌曲id不做任何操作
      if (csongsDetail.id === this.currentSongId) return
      // (1) 保存当前播放歌曲详情
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
    },

    // 切换上一首
    prevMusic() {
      // 每次切换歌曲时，先考虑当前的播放模式
      switch (this.playMode) {
        case 0:
          this.orderPlayPrev()
          break
        case 1:
          this.randomPlay()
          break
        case 2:
          this.circlePlay()
          break
      }
    },

    // 切换下一首
    nextMusic() {
      // 每次切换歌曲时，先考虑当前的播放模式
      switch (this.playMode) {
        case 0:
          this.orderPlayNext()
          break
        case 1:
          this.randomPlay()
          break
        case 2:
          this.circlePlay()
          break
      }
      // console.log(this.currentPlaylist)
      // console.log(this.playMode)
    },

    // 切换播放模式
    changePlayMode() {
      // 每次点击切换一次playmode
      if (this.playMode < 2) {
        this.$store.dispatch('savePlayMode', this.playMode + 1)
      } else {
        this.$store.dispatch('savePlayMode', 0)
      }
    },

    // 顺序播放上一首
    orderPlayPrev() {
      let currentIndex = 0
      for (let i = 0; i < this.currentPlaylist.length; i++) {
        if (this.currentSongId === this.currentPlaylist[i].id) {
          currentIndex = i
          break
        }
      }
      if (currentIndex === 0) {
        this.$message.warning('当前已是播放列表的第一首歌曲~')
        return
      }
      this.startMusic(this.currentPlaylist[currentIndex - 1])
    },
    // 顺序播放下一首
    orderPlayNext() {
      let currentIndex = 0
      // 如果当前播放歌曲已存在在播放列表中，从播放列表的该歌曲开始进行切换
      for (let i = 0; i < this.currentPlaylist.length; i++) {
        if (this.currentSongId === this.currentPlaylist[i].id) {
          currentIndex = i
          break
        }
      }
      if (currentIndex === this.currentPlaylist.length - 1) {
        this.$message.warning('当前已是播放列表中的最后一首歌曲~')
        return
      }
      this.startMusic(this.currentPlaylist[currentIndex + 1])
      console.log(currentIndex + 1)
    },
    // 随机播放
    randomPlay() {
      // 获取随机播放的索引值
      const randomIndex = this.getRandomIndedx(
        0,
        this.currentPlaylist.length - 1
      )
      this.startMusic(this.currentPlaylist[randomIndex])
    },
    getRandomIndedx(min, max) {
      // 获取随机的索引值
      return Math.floor(Math.random() * (max - min + 1) + min)
    },

    // 单曲循环
    circlePlay() {
      this.$store.dispatch('saveIsPlaying', true)
      this.$refs.audio.load()
    },

    // 更新当前播放进度
    updateTime(e) {
      this.currentTime = e.target.currentTime
    },
    // 如果当前没有音乐则播放结束时长为00:00
    endTime() {
      if (this.currentSongUrl) {
        return this.currentSongDetail.dt
      } else {
        return 0
      }
    },
    // 更新拖动进度条后的进度
    hasBarChange(percent) {
      this.$refs.audio.currentTime =
        (this.currentSongDetail.dt / 1000) * percent
      if (!this.isPlaying) {
        this.playMusic()
      }
    },

    // 调节音量
    volumeChange() {
      this.currentVolume = this.defaultVolume
      this.$refs.audio.volume = this.defaultVolume / 100
    },
    // 静音
    muteVolume() {
      this.defaultVolume = 0
      this.$refs.audio.volume = this.defaultVolume / 100
    },
    // 取消静音
    cancelMute() {
      this.defaultVolume = this.currentVolume
      this.$refs.audio.volume = this.defaultVolume / 100
    },
    // 选择播放列表中的歌曲
    selectSongByPlaylist(csongsDetail) {
      this.startMusic(csongsDetail)
    },
    // 收起播放列表
    closePlaylist() {
      this.isPlaylist = false
      this.currentTime = 0
    },
  },
}
</script>

<style lang="scss">
.player-container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: $player-height;
  // overflow: scroll;
  border-top: 2px solid rgb(165, 197, 247);
  background: linear-gradient(
    360deg,
    rgb(5, 105, 255),
    rgb(207, 222, 253),
    rgb(232, 252, 253),
    rgb(255, 255, 255)
  );
  -webkit-animation: gradient-move 4s ease-in-out alternate infinite;
  -moz-animation: gradient-move 4s ease-in-out alternate infinite;
  -o-animation: gradient-move 4s ease-in-out alternate infinite;
  animation: gradient-move 4s ease-in-out alternate infinite;
  background-size: 100% 100%;

  @keyframes gradient-move {
    0% {
      background-size: 100% 100%;
    }
    50% {
      background-size: 100% 120%;
    }
    100% {
      background-size: 100% 100%;
    }
  }

  .slide-fade-enter-active {
    transition: all 0.5s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateY(20px);
    opacity: 0;
  }
}

.player-desc {
  width: 92%;
  // background-color: blueviolet;
  margin: 0 auto;
  .song-desc {
    display: flex;
    align-items: center;
    img {
      width: 50px;
      border-radius: $br-10;
      box-shadow: $img-shadow;
      margin-right: 30px;
      cursor: pointer;
    }
    .desc-r {
      width: 210px;
      // background-color: chartreuse;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin-right: 10px;
    }
    span {
      font-size: $small-f;
      font-weight: 900;
      @include hidden;
    }
    i {
      font-size: $mini-f;
      font-weight: 900;
      color: $gray;
      @include hidden;
    }
    .play-bar {
      display: flex;
      align-items: center;
      height: 50px;
      .iconfont {
        font-size: 35px;
        // color: rgba($blue, 0.7);
        color: $aqua-green;
        margin-right: 15px;
        transition: all 0.4s ease-in-out;
        cursor: pointer;
      }
      .iconfont:hover {
        color: rgba($blue, 0.8);
      }
    }

    .progress-bar {
      width: 550px;
      height: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-left: 30px;
      i {
        color: #000;
      }
    }

    .volume {
      width: 220px;
      display: flex;
      align-items: center;
      i {
        font-size: $big-f;
        font-weight: 500;
        color: $aqua-green;
        margin-left: 80px;
      }
    }

    .playlist {
      margin-left: 80px;
      i {
        font-size: $large-f;
        font-weight: 700;
        color: $aqua-green;
        cursor: pointer;
      }
    }
  }
}
// 全屏歌词页面
.full-screen {
  position: absolute;
  bottom: $player-height;
  width: 100vw;
  height: calc(100vh - #{$player-height});
  background-color: $white;
  z-index: 1000;
  overflow: hidden;
  display: flex;
  align-items: center;
}
// 播放列表
.mini-playlist {
  position: absolute;
  right: 0;
  bottom: $player-height;
  width: 45vw;
  height: calc(100vh - #{$player-height});
  background-color: $white;
  z-index: 1000;
  overflow: auto;
  opacity: 0.9;
}
.el-slider {
  margin-left: 15px;
  width: 100px;
  .el-slider__runway {
    background-color: rgb(185, 218, 245) !important;
  }
  .el-slider__bar {
    background-color: $aqua-green !important;
  }
  .el-slider__button {
    width: 14px;
    height: 14px;
    border: 2px solid $aqua-green;
  }
}
</style>