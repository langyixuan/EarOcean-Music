<template>
  <div class="search">
    <input
      type="text"
      class="iconfont searchBar"
      :placeholder="icon"
      @blur="blurHandel"
      @focus="focusHandel"
      v-model="inputValue"
      :class="[isFocus ? 'isSearch' : '']"
      @keyup.enter="getResult"
      @keyup.backspace="onbackspace"
      @input="inputHandel"
      @compositionstart="onCompositionStart"
      @compositionend="onCompositionEnd"
    />
    <i
      class="iconfont icon-quxiao"
      v-show="isFocus"
      @click="clearInput"
      ref="revise"
    ></i>
    <div class="search-box" v-if="searchSuggest">
      <!-- 单曲信息 -->
      <div
        id="songs"
        v-if="searchSuggest.songs"
        style="line-height: 0; margin-bottom: 15px"
      >
        <span class="iconfont icon-music"> 单曲</span>
        <ul>
          <li
            v-for="(item, index) in searchSuggest.songs"
            :key="item.id"
            @click="playMusic(item, index)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <!-- 艺人信息 -->
      <div
        id="artists"
        v-if="searchSuggest.artists"
        style="line-height: 0; margin-bottom: 15px"
      >
        <span class="iconfont icon-yonghutouxiang"> 艺人</span>
        <ul>
          <li
            v-for="item in searchSuggest.artists"
            :key="item.id"
            @click="toSingerDetail(item.id)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <!-- 专辑信息 -->
      <div id="albums" v-if="searchSuggest.albums" style="line-height: 0">
        <span class="iconfont icon-vynil"> 专辑</span>
        <ul>
          <li
            v-for="item in searchSuggest.albums"
            :key="item.id"
            @click="toAlbumDetail(item.id)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getSearch, getSearchSuggest } from '@/api/search.js'
import { getSongUrl, getSongDetail } from '@/api/song.js'
import { mapGetters } from 'vuex'
export default {
  name: 'Search',
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
  data() {
    return {
      icon: '\ue60c',
      isFocus: false,
      inputValue: '',
      searchSuggest: null,
      songsIds: '',
      lock: false,
      songDetail: '',
    }
  },
  mounted() {
    this.$refs.revise.addEventListener('mousedown', (e) => {
      e.preventDefault()
    })
  },
  methods: {
    blurHandel() {
      console.log(this.$refs.input)
      this.inputValue = ''
      this.isFocus = false
    },
    focusHandel() {
      this.isFocus = true
    },
    inputHandel() {
      this.songsIds = ''
      // 获取搜索推荐
      if (!this.lock && this.inputValue) {
        getSearchSuggest({ keywords: this.inputValue }).then((res) => {
          this.searchSuggest = res.data.result
          this.searchSuggest.songs.forEach(
            (item) => (this.songsIds += item.id + ',')
          )
          this.songsIds = this.songsIds.substr(0, this.songsIds.length - 1)
          // console.log(this.songsIds)
          getSongDetail({ ids: this.songsIds }).then((res) => {
            this.songDetail = res.data.songs
            console.log(this.songDetail)
          })
        })
      }
    },
    // 清空输入框
    clearInput() {
      this.inputValue = ''
    },
    // 获取搜索结果
    getResult() {
      getSearch({ keywords: this.inputValue, limit: 5 }).then((res) =>
        console.log(res)
      )
    },
    // playMusic(csongsDetail, csongsIndex) {
    //   console.log(csongsDetail.id)
    //   if (csongsDetail.id === this.currentSongId) return
    //   this.$store.dispatch('saveCurrentSongDetail', csongsDetail)
    //   this.$store.dispatch('saveCurrentSongId', csongsDetail.id)
    //   getSongUrl({ id: csongsDetail.id }).then((res) => {
    //     // 点击播放单曲时，请求当前歌曲URL相关信息并存入vuex
    //     // (3) 保存试听范围：如果当前歌曲是VIP,保存其试听范围
    //     if (res.data.data[0].freeTrialInfo) {
    //       this.$store.dispatch('saveSongAudition', [
    //         res.data.data[0].freeTrialInfo.start,
    //         res.data.data[0].freeTrialInfo.end,
    //       ])
    //     } else {
    //       this.$store.dispatch('saveSongAudition', [0, 0])
    //     }
    //     // (4) 保存当前播放歌曲Url
    //     this.$store.dispatch('saveCurrentSongUrl', res.data.data[0].url)
    //     // (5) 将播放歌曲添加至历史列表
    //     this.$store.dispatch('addHistoryPlaylist', csongsDetail)
    //     console.log(this.$store.state.historyPlaylist)
    //     // (6) 将当前播放歌曲加入播放列表
    //     this.addPlaylist(csongsDetail, congsIndex)
    //   })
    // },
    toAlbumDetail(id) {
      this.$router.push(`/album/${id}`)
    },
    toSingerDetail(id) {
      this.$router.push(`/singer/${id}`)
    },
    // 监听输入中文的开始
    onCompositionStart() {
      this.lock = true
    },
    // 监听输入中文结束
    onCompositionEnd() {
      this.lock = false
    },
    // 按backspace键清空songsIds
    onbackspace() {
      this.songsIds = ''
    },
  },
}
</script>

<style lang="scss" scoped>
$height: 35px;
.search {
  position: relative;
  .searchBar {
    display: flex;
    align-items: center;
    width: $height;
    height: $height;
    border-radius: $br-30;
    outline: none;
    font-size: $small-f;
    border: 2px solid rgba($blue, 0.15);
    margin-right: 30px;
    transition: all 0.5s ease-in-out;
    cursor: pointer;
    text-align: center;
    background-color: rgba($blue, 0.15);
  }
  .isSearch {
    width: 300px;
    text-align: left;
    padding: 0 20px;
  }

  i {
    position: absolute;
    top: calc(0px - #{$height} / 2);
    right: 40px;
    font-weight: 700;
    color: $black;
    cursor: pointer;
  }

  input::-webkit-input-placeholder {
    color: $black;
    font-size: $normal-f;
    font-weight: 700;
    line-height: 35px;
  }

  .search-box {
    position: absolute;
    top: $height;
    width: 300px;
    // height: 500px;
    background-color: rgb(238, 246, 248);
    opacity: 0.95;
    padding: 20px;
    border-radius: $br-20;

    span {
      height: 30px;
      line-height: 30px;
      color: rgba($blue, 0.85);
    }

    ul {
      li {
        color: black;
        font-weight: 700;
        height: 30px;
        line-height: 30px;
        transition: all 0.4s ease-in-out;
      }
      li:hover {
        cursor: pointer;
        transform: scale(1.05);
        color: rgba($blue, 0.85);
      }
    }
  }
}
</style>