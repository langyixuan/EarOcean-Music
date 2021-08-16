<template>
  <!-- 歌单卡片模块 -->
  <div class="songlist-card" @click="toPlaylistDetial">
    <img :src="img" alt="" />
    <div class="desc">
      <span>{{ name }}</span>
      <i>By: {{ creator }}</i>
      <i class="count">收录{{ trackcount }}首</i>
    </div>
    <div class="iconfont icon-PlayFilled"></div>
  </div>
</template>

<script>
export default {
  name: 'SonglistCard',
  props: ['img', 'name', 'playcount', 'creator', 'trackcount', 'id'],
  methods: {
    // 跳转歌单详情页
    toPlaylistDetial() {
      this.$router.push(`/songlist/${this.id}`)
    },
  },
}
</script>

<style lang="scss" scoped>
$width: 145px;
$height: 260px;
$padding: 18px;
.songlist-card {
  width: $width;
  height: $height;
  position: relative;
  margin-left: 20px;
  margin-top: 35px;
  background: linear-gradient(-45deg, rgba($blue, 0.1), $white);
  border-radius: $br-10;
  padding: $padding;
  cursor: pointer;
  box-sizing: content-box;
  transition: all 0.5s ease-in-out;

  &:hover {
    box-shadow: $img-shadow;
    transform: scale(0.95);
  }
  &:hover .icon-PlayFilled {
    opacity: 1;
  }

  img {
    width: $width;
    border-radius: $br-10;
    margin-bottom: 15px;
    box-shadow: $img-shadow2;
  }
  .icon-PlayFilled {
    opacity: 0;
    position: absolute;
    top: 50px;
    left: calc(#{$width} / 2);
    font-size: 40px;
    color: rgba($blue, 0.8);
    transition: all 0.5s ease-in-out;
  }
}
.desc {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100px;
  span {
    font-weight: 700;
    font-size: $small-f;
    margin-top: 10px;
    @include hiddenmore;
    -webkit-line-clamp: 2;
  }
  i {
    display: block;
    color: $gray;
    font-size: $mini-f;
    font-weight: 700;
  }
  .count {
    color: rgba($blue, 0.8);
    font-weight: 700;
  }
}
</style>