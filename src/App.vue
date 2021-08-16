<template>
  <div id="app">
    <Layout />
  </div>
</template>

<script>
import Layout from '@/layout/'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  components: { Layout },
  computed: {
    ...mapGetters([
      // 当前用户的Token
      'userToken',
      // 当前用户信息
      'userInfo',
      // 用户私人歌单
      'userSonglist',
      // 当前播放歌曲ID
      'currentSongId',
      // 当前播放的歌曲详情
      'currentSongDetail',
      // 当前歌曲试听范围
      'auditionStart',
      'auditionEnd',
      // 当前歌曲Url
      'currentSongUrl',
      // 当前的播放列表
      'currentPlaylist',
      // 历史播放列表
      'historyPlaylist',
      // 当前播放模式
      'playMode',
    ]),
  },
  methods: {
    // 为了防止vuex中存储的数据刷新清空，需要将数据存储在sessionStorage中
    saveState() {
      sessionStorage.setItem('userToken', JSON.stringify(this.userToken))
      sessionStorage.setItem('userInfo', JSON.stringify(this.userInfo))
      sessionStorage.setItem('userSonglist', JSON.stringify(this.userSonglist))
      sessionStorage.setItem(
        'currentSongId',
        JSON.stringify(this.currentSongId)
      )
      sessionStorage.setItem(
        'currentSongDetail',
        JSON.stringify(this.currentSongDetail)
      )
      sessionStorage.setItem(
        'auditionStart',
        JSON.stringify(this.auditionStart)
      )
      sessionStorage.setItem('auditionEnd', JSON.stringify(this.auditionEnd))
      sessionStorage.setItem(
        'currentSongUrl',
        JSON.stringify(this.currentSongUrl)
      )
      sessionStorage.setItem(
        'currentPlaylist',
        JSON.stringify(this.currentPlaylist)
      )
      sessionStorage.setItem(
        'historyPlaylist',
        JSON.stringify(this.historyPlaylist)
      )
      sessionStorage.setItem('playMode', JSON.stringify(this.playMode))
    },
  },
  mounted() {
    // 将sessionStorage中的数据存入vuex中
    window.addEventListener('unload', this.saveState)
  },
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Prompt&display=swap');
#app {
  // font-family: 'Noto Sans', 'Helvetica Neue', Helvetica, 'Nimbus Sans L', Arial,
  //   'Liberation Sans', 'PingFang SC', 'Hiragino Sans GB', 'Noto Sans CJK SC',
  //   'Source Han Sans SC', 'Source Han Sans CN', 'Microsoft YaHei',
  //   'Wenquanyi Micro Hei', 'WenQuanYi Zen Hei', 'ST Heiti', SimHei,
  //   'WenQuanYi Zen Hei Sharp', sans-serif;
  font-family: Prompt, Barlow, -apple-system, BlinkMacSystemFont, Helvetica Neue,
    PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC,
    WenQuanYi Micro Hei, sans-serif;

  #nprogress .bar {
    background: red !important;
  }
}
</style>