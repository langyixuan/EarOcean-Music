<template>
  <div class="mv-card" @click="toMvDetail()">
    <div class="cover">
      <img :src="cover" />
      <i>
        <div class="iconfont icon-icon_play"></div>
        {{ playCount | playCount }}
      </i>
      <div class="iconfont icon-PlayFilled"></div>
    </div>
    <div class="desc">
      <span>{{ name }}</span>
      <i>{{ artist }} </i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MvCard',
  // mv的描述信息
  props: ['cover', 'artist', 'name', 'artist', 'playCount', 'id', 'artistId'],
  methods: {
    // 跳转至MV详情页面
    toMvDetail() {
      this.$router.push(`/mv/${this.id}`)
    },
  },
}
</script>

<style lang="scss" scoped>
$width: 200px;
$height: 112px;
.mv-card {
  margin-bottom: 30px;
  .cover {
    position: relative;
    background-color: transparent;
    transition: all 0.4s ease-in-out;
    cursor: pointer;

    img {
      width: $width;
      height: $height;
      background-size: cover;
      border-radius: $br-10;
    }
    i {
      position: absolute;
      bottom: 10px;
      right: 10px;
      color: $white;
      font-size: $mini-f;
    }
    .icon-icon_play {
      display: inline-block;
      font-size: $mini-f;
    }
    .icon-PlayFilled {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 40px;
      color: $white;
      opacity: 0;
      transition: all 0.4s ease-in-out;
    }

    &:hover {
      transform: scale(0.95);
    }
    &:hover .icon-PlayFilled {
      opacity: 1;
    }
  }
  .desc {
    height: 40px;
    width: $width;
    display: flex;
    margin-top: 10px;
    flex-direction: column;
    justify-content: space-between;
    span {
      font-size: $small-f;
      font-weight: 900;
      @include hidden;
    }
    i {
      font-size: $mini-f;
      color: $gray;
      font-weight: 700;
      @include hidden;
    }
  }
}
</style>