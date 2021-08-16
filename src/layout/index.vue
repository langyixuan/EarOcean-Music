<template>
  <div class="layout-container">
    <div class="layout-body">
      <!-- 侧边导航栏 -->
      <div class="sidebar">
        <Sidebar />
      </div>

      <!-- 内容显示区域 -->
      <div class="content">
        <!-- 顶部导航栏 -->
        <Header />
        <!-- 子路由出口 -->
        <!-- 需要缓存的视图组件 -->
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <!-- 不需要缓存的视图组件 -->
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </div>
    </div>
    <div class="player">
      <MiniPlayer />
    </div>
  </div>
</template>

<script>
import Header from './header'
import Sidebar from './sidebar'
import BackTop from '@/base/backTop'
import MiniPlayer from './miniplayer'

export default {
  name: 'Layout',
  components: { Sidebar, Header, BackTop, MiniPlayer },
  data() {
    return {}
  },
  mounted() {
    // window.addEventListener('scroll', () => {
    //   let scrollTop =
    //     document.documentElement.scrollTop ||
    //     document.body.scrollTop ||
    //     window.pageYOffset
    //   console.log(this.$refs.content)
    // })
  },
}
</script>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  background-color: darkgray;

  .layout-body {
    display: flex;
    height: calc(100% - #{$player-height});
    background-color: $white;
  }

  .sidebar {
    height: 100%;
  }

  .content {
    flex: 1;
    background-color: $white;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .player {
    height: $player-height;
    background-color: chocolate;
  }
}
</style>
