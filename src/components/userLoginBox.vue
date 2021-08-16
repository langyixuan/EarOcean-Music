<template>
  <!-- 用户登录操作栏模块 -->
  <div class="user-login-box">
    <div class="userinfo" v-if="userInfo">
      <img :src="userInfo.avatarUrl" class="avatar" />
      <span>{{ userInfo.nickname }}</span>
      <i class="iconfont icon-xiala" @click="isShow = !isShow"></i>
      <transition name="slide-fade">
        <ul class="drop-down-box" v-show="isShow">
          <li @click="logoutFuc">
            <i class="iconfont icon-tuichu"></i>
            <span>退出登录</span>
          </li>
          <li @click="logoutFuc">
            <i class="iconfont icon-qiehuanyonghu"></i>
            <span>切换用户</span>
          </li>
        </ul>
      </transition>
    </div>
    <div class="logininfo" v-else>
      <span @click="toLogin">未登录！请登录</span>
    </div>
  </div>
</template>

<script>
import { logout, refresh } from '@/api/login.js'
import { mapGetters } from 'vuex'
export default {
  name: 'UserLoginBox',
  data() {
    return {
      isShow: false,
      // userInfo: this.$store.state.userInfo,
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  mounted() {
    console.log(this.userInfo)
  },
  methods: {
    logoutFuc() {
      logout().then((res) => {
        this.$message.success('成功退出')
        refresh().then((res) => console.log(res))
        this.$store.dispatch('saveUserToken', null)
        this.$store.dispatch('saveUserInfo', null)
        this.$store.dispatch('saveUserSonglist', [])
        this.$router.push('/login')
      })
    },
    toLogin() {
      this.$router.push('/login')
    },
  },
}
</script>

<style lang="scss" scoped>
$width: 180px;
$height: 35px;
.user-login-box {
  position: relative;
  width: $width;
  height: $height;
  background: linear-gradient(-45deg, rgba($blue, 0.3), $white);
  border-radius: $br-20;
  line-height: $height;
  padding-right: 20px;
  cursor: pointer;
  .logininfo {
    text-align: center;
    span {
      font-weight: 700;
      transition: all 0.3s ease-in-out;
    }
    span:hover {
      color: $aqua-green;
    }
  }

  .userinfo {
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
      width: $height;
      border-radius: 50%;
    }

    span {
      font-size: $normal-f;
      font-weight: 700;
    }
  }
  .slide-fade-enter-active {
    transition: all 0.3s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(-10px);
    opacity: 0;
  }
  .drop-down-box {
    position: absolute;
    // top: -65px;
    top: calc(#{$height} + 10px);
    width: $width;
    height: calc(#{$width} / 2);
    background: linear-gradient(180deg, rgba($blue, 0.3), rgba($blue, 0.1));
    border-radius: $br-20;
    padding: 10px 30px;
    z-index: -1;
    transition: all 0.3s ease-in-out;

    li {
      display: flex;
      justify-content: space-around;

      &:hover {
        color: $aqua-green;
      }

      i,
      span {
        font-size: $normal-f;
        font-weight: 900;
        transition: color 0.5s ease-in-out;
      }

      span {
        font-size: $small-f;
        font-weight: 700;
      }
    }
  }
}
</style>