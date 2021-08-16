<template>
  <div class="sidebar-container">
    <!-- 应用logo -->
    <router-link to="/">
      <img src="../assets/logo.png" class="logo"
    /></router-link>
    <!-- 侧边导航栏 -->
    <div id="nav">
      <router-link to="/explore" active-class="highlight">
        <span class="iconfont icon-explore"></span>
        Explore
      </router-link>
      <router-link to="/songlists" active-class="highlight">
        <span class="iconfont icon-recommend"></span>
        Songlist
      </router-link>
      <router-link to="/popular" active-class="highlight">
        <span class="iconfont icon-hot"></span>
        Popular
      </router-link>
      <router-link to="/mvs" active-class="highlight">
        <span class="iconfont icon-shipin"></span>
        Music Video
      </router-link>
    </div>

    <div id="nav">
      <router-link to="/mysonglist" active-class="highlight">
        <span class="iconfont icon-bofangliebiao"></span>
        My Songlist
      </router-link>
      <router-link to="/favorite" active-class="highlight">
        <span class="iconfont icon-shoucang_huaban1"></span>
        Favorite music
      </router-link>
      <router-link to="/popular" active-class="highlight">
        <span class="iconfont icon-yinle02"></span>
        Playlist
      </router-link>
      <router-link to="/mv" active-class="highlight">
        <span class="iconfont icon-shoucang"></span>
        Collection
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  methods: {},
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Prompt&display=swap');

.sidebar-container {
  width: 250px;
  height: 100%;
  box-sizing: border-box;
  overflow: scroll;
  border-radius: 0 50px 50px 0;
  background: linear-gradient(
    95deg,
    rgb(5, 105, 255),
    rgb(213, 234, 253),
    rgb(232, 252, 253),
    rgb(255, 255, 255)
  );
  -webkit-animation: gradient-move 8s ease-in-out alternate infinite;
  -moz-animation: gradient-move 8s ease-in-out alternate infinite;
  -o-animation: gradient-move 8s ease-in-out alternate infinite;
  animation: gradient-move 8s ease-in-out alternate infinite;

  background-size: 100% 100%;

  @keyframes gradient-move {
    0% {
      background-size: 100% 100%;
    }
    50% {
      background-size: 200% 130%;
    }
    100% {
      background-size: 100% 100%;
    }
  }

  .logo {
    width: 120px;
    margin: 20px 30px;
  }

  #nav {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 200px;
    height: 210px;
    margin: 10px auto;
    padding: 10px 20px;
    border-radius: 25px;
    background: rgba($white, 0.6);
    box-shadow: 0 8px 32px 0 rgba(0, 250, 237, 0.15);
    backdrop-filter: blur(6.5px);
    -webkit-backdrop-filter: blur(6.5px);
    border: 2px solid $white;
    a {
      display: block;
      color: $black;
      font-size: 16px;
      font-weight: 700;
      font-family: 'Prompt', sans-serif;
      border-radius: 10px;

      span {
        margin-right: 10px;
      }
      &:hover {
        color: $aqua-green;
        transition: all 0.5s ease-in-out;
        box-shadow: 3px 3px 8px #ccc;
      }
    }
    .highlight {
      color: $aqua-green;
      transform: translateX(10px);
    }
  }
}
</style>
