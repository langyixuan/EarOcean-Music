<template>
  <!-- 播放列表组件 -->
  <div class="playlist">
    <div class="top-title">
      <div class="layout-l">
        <button
          @click="changeCurrentPlaylist"
          :style="{
            'background-color': isPlaylist ? '#c1f4f1' : 'white',
          }"
        >
          播放列表
        </button>
        <button
          @click="changeHistoryPlaylist"
          :style="{
            'background-color': isHistoryPlaylist ? '#c1f4f1' : 'white',
          }"
        >
          历史列表
        </button>
      </div>
      <div class="latout-r">
        <el-popconfirm title="确定要清空播放列表吗？" @confirm="deleteAllSong">
          <i
            class="el-icon-delete-solid"
            slot="reference"
            style="
              position: absolute;
              right: 30px;
              color: $aqua-green;
              font-size: 24px;
            "
          ></i>
        </el-popconfirm>
      </div>
    </div>
    <!-- 当前播放列表 -->
    <ul class="currentPlaylist" v-show="isPlaylist">
      <li
        v-for="(item, index) in currentPlaylist"
        :key="item.id"
        :class="[item.id === currentSongId ? 'isPlaying' : '']"
        @click="selectSong(item)"
      >
        <i class="index">{{ index + 1 }}</i>
        <span>{{ item.name }}</span>
        <i class="artist">{{ item.ar | artistsFilter }}</i>
        <i style="font-weight: 700">{{ item.dt | songTimeFormat }}</i>
        <i class="iconfont icon-quxiao" @click.stop="deleteSong(item.id)"></i>
      </li>
    </ul>
    <!-- 历史播放列表 -->
    <ul class="currentPlaylist" v-show="isHistoryPlaylist">
      <li
        v-for="(item, index) in historyPlaylist"
        :key="index"
        :class="[item.id === currentSongId ? 'isPlaying' : '']"
        @click="selectSong(item)"
      >
        <i class="index">{{ index + 1 }}</i>
        <span>{{ item.name }}</span>
        <i class="artist">{{ item.ar | artistsFilter }}</i>
        <i style="font-weight: 700">{{ item.dt | songTimeFormat }}</i>
        <i class="iconfont icon-quxiao" @click.stop="deleteSong(item.id)"></i>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Playlist',
  data() {
    return {
      isPlaylist: true,
      isHistoryPlaylist: false,
    }
  },
  computed: {
    ...mapGetters(['currentPlaylist', 'historyPlaylist', 'currentSongId']),
  },
  methods: {
    // 选择播放列表中的歌曲播放
    selectSong(csongsDetail) {
      this.$emit('selectSong', csongsDetail)
    },
    // 删除播放列表中的歌曲
    deleteSong(songId) {
      if (songId === this.currentSongId) {
        this.$emit('getNextSong')
      }
      this.$store.dispatch('deleteCurrentPlaylist', songId)
      console.log('删除成功')
    },
    // 清空播放列表
    deleteAllSong() {
      this.$store.dispatch('deleteAllSong')
      this.$emit('closePlaylist')
    },
    // 切换至当前播放列表
    changeCurrentPlaylist() {
      this.isPlaylist = true
      this.isHistoryPlaylist = false
    },
    // 切换至历史播放列表
    changeHistoryPlaylist() {
      this.isPlaylist = false
      this.isHistoryPlaylist = true
    },
  },
}
</script>

<style lang="scss" scoped>
.playlist {
  padding: 20px;
  .top-title {
    display: flex;
    justify-content: space-between;
    button {
      padding: 10px 15px;
      text-align: center;
      outline: none;
      border: 0;
      border-radius: $br-10;
      font-size: $small-f;
      font-weight: 900;
      cursor: pointer;
      margin-left: 10px;
    }
  }
  .currentPlaylist {
    li {
      display: flex;
      justify-content: space-between;
      margin: 10px 15px;
      padding: 10px 0;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      border-radius: $br-10;
      &:hover {
        transform: scale(1.05);
      }
    }
    span {
      width: 270px;
      @include hidden;
      font-size: $small-f;
      font-weight: 700;
    }
    .artist {
      width: 200px;
      @include hidden;
      font-size: $mini-f;
      font-weight: 700;
      color: $gray;
    }
    i {
      width: 50px;
      font-size: $mini-f;
      text-align: center;
    }
    .index,
    .iconfont {
      width: 30px;
      color: rgba($blue, 0.85);
      font-size: $mini-f;
      font-weight: 700;
    }
  }
  .isPlaying {
    background-color: rgba($aqua-green, 0.2);
    transform: scale(1.05);
  }
}
</style>