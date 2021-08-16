<template>
  <div class="song-detail">
    <div class="layout-l" v-if="currentSongDetail.al">
      <div
        class="record"
        :style="{ animationPlayState: isPlaying ? 'running' : 'paused' }"
      >
        <img :src="currentSongDetail.al.picUrl" class="record-bg" />
        <!-- <img src="../assets/record/record-gray.png" class="record-ab" /> -->
      </div>
      <img :src="currentSongDetail.al.picUrl" class="bg" />
    </div>
    <div class="layout-r">
      <div class="lyric" v-if="currentLyric">
        <!-- <p>{{ currentTime }}</p> -->
        <p
          v-for="(item, key, index) in currentLyric"
          :key="index"
          :class="[
            currentTime > allKeys[index] && currentTime < allKeys[index + 1]
              ? 'isLyric'
              : '',
          ]"
        >
          <!-- <i>{{ key }}</i> -->
          {{ item }}
        </p>
      </div>
      <div class="lyric" v-else>
        <p>暂无歌词</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getLyric } from '@/api/song.js'
export default {
  name: 'SongDetail',
  data() {
    return {
      currentLyric: null,
      // 每句歌词对应的属性（时间节点）
      allKeys: [],
    }
  },
  props: ['currentTime'],
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
    ]),
  },
  mounted() {
    // 在mounted中重新调用一次的目的是，防止首次进入歌词页面时没有歌词信息
    getLyric({ id: this.currentSongId }).then((res) => this.lyricHandel(res))
  },
  watch: {
    currentSongUrl(newVal, oldVal) {
      if (newVal === oldVal) return
      // 获取歌词
      getLyric({ id: this.currentSongId }).then((res) => {
        this.lyricHandel(res)
        console.log(res)
      })
    },
  },
  methods: {
    getAllkeys(lrcArr) {
      for (let key in lrcArr) {
        this.allKeys.push(key)
      }
    },
    // 歌词格式转换
    lyricHandel(res) {
      if (!res.data.lrc) {
        this.currentLyric = null
        return
      }
      let lrcObj = {}
      let lyrics = res.data.lrc.lyric.split('\n')
      let reg = /\[\d*:\d*(\.|:)\d*]/g
      for (let i = 0; i < lyrics.length; i++) {
        let timeRegExpArr = lyrics[i].match(reg)
        if (!timeRegExpArr) continue
        let t = timeRegExpArr[0]
        let min = Number(t.match(/\[\d*/i).toString().slice(1))
        let sec = Number(t.match(/\:\d*/i).toString().slice(1))
        var content = lyrics[i].replace(timeRegExpArr, '')
        var time = min * 60 + sec
        lrcObj[time] = content
      }
      this.currentLyric = lrcObj
      console.log(this.currentLyric)
      this.getAllkeys(this.currentLyric)
    },
  },
}
</script>

<style lang="scss" scoped>
.song-detail {
  display: flex;
  align-items: center;
  position: relative;
  margin: 0 auto;
  width: 85%;
  justify-content: space-between;
  .bg {
    width: 50%;
    height: 580px;
    position: absolute;
    top: 0;
    filter: blur(160px) brightness(100%) opacity(1);
    z-index: -1;
  }
}
$r-bg: 520px;
.record {
  display: flex;
  justify-content: center;
  align-items: center;
  width: $r-bg;
  height: $r-bg;
  animation: rotate 20s linear infinite;
  background: url('../assets/record/record-blue3.png');
  background-size: $r-bg $r-bg;
  img {
    width: 280px;
    border-radius: 50%;
    box-shadow: $img-shadow;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}

.lyric {
  width: 650px;
  height: 560px;
  overflow: hidden;
  text-align: center;
  transition: all 1s ease-in-out;
  &:hover {
    overflow: auto;
  }
  p {
    font-size: $big-f;
    font-weight: 700;
    line-height: 40px;
    transition: all 0.5s ease-in-out;
    cursor: pointer;
    i {
      color: black;
      font-size: $mini-f;
    }
  }
  .isLyric {
    font-size: $large-f;
    color: rgba($blue, 0.9);
  }
}
</style>