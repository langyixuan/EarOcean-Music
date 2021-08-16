<template>
  <!-- Loading页面加载组件 -->
  <div class="loading">
    <img src="../assets/loading1.gif" />
    <p class="loadingtitle">{{ title }}</p>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    title: {
      type: String,
      default: 'Loading...',
    },
  },
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Prompt&display=swap');
.loading {
  width: 100px;
  text-align: center;
  img {
    width: 100px;
  }
  .loadingtitle {
    font-size: $normal-f;
    color: $black;
    font-weight: 700;
    font-size: $normal-f;
    font-family: 'Prompt', sans-serif;
  }
}
</style>