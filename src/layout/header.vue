<template>
  <!-- Header--顶部导航模块 -->
  <div id="header">
    <NavBtn />
    <div class="layout-r">
      <Search />
      <UserLoginBox />
    </div>
  </div>
</template>

<script>
import Search from '@/components/search'
import NavBtn from '@/components/navBtn'
import UserLoginBox from '@/components/userLoginBox'
export default {
  name: 'Header',
  components: { Search, NavBtn, UserLoginBox },
  methods: {
    toLogin() {
      this.$router.push('/login')
    },
  },
}
</script>

<style lang="scss" scoped>
#header {
  position: sticky;
  top: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: $header-height;
  background-color: $white;
  line-height: $header-height;
  z-index: 100;
  padding-right: 60px;

  .layout-r {
    display: flex;
    align-items: center;
  }
}
</style>
