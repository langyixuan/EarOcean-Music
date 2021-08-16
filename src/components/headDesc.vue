<template>
  <!-- 详情页顶部描述模块 -->
  <div
    class="head-desc"
    data-aos="fade-left"
    data-aos-offset="200"
    data-aos-delay="50"
    data-aos-duration="500"
    data-aos-easing="ease-in-out"
  >
    <div class="desc-left" v-if="needAlbum">
      <!-- <img :src="img" class="shadow" /> -->
      <img :src="img" />
      <img src="../assets/record/record-black2.png" alt="" class="record" />
    </div>
    <div class="desc-left" v-else>
      <img :src="img" class="shadow" />
      <img :src="img" />
    </div>

    <div
      class="desc-right"
      :style="{ 'margin-left': needAlbum ? '65px' : '0px' }"
    >
      <h1>{{ name }}</h1>
      <div class="creator">
        <span>Create By: {{ creator }}</span>
        <span>{{ createTime | timeFormat('YYYY-MM-DD hh:mm:ss') }}创建</span>
      </div>
      <div class="count">
        <span>
          <i class="iconfont icon-vynil"></i>
          收录{{ trackCount }}首
        </span>
        <span>
          <i class="iconfont icon-shiting"></i>
          播放{{ playCount | playCount }}次
        </span>
      </div>
      <p v-if="desc">简介：{{ desc }}</p>
      <p v-else>暂无简介</p>
      <div class="btns">
        <Button :btntext="'播放'" :btnicon="'icon-icon_play'" />
        <Button :btntext="'收藏'" :btnicon="'icon-shoucang'" />
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/button'
export default {
  name: 'HeadDesc',
  components: { Button },
  props: [
    'img',
    'name',
    'creator',
    'trackCount',
    'playCount',
    'desc',
    'subscribedCount',
    'createTime',
    'needAlbum',
  ],
}
</script>

<style lang="scss" scoped>
.head-desc {
  display: flex;

  .desc-left {
    position: relative;
    margin-right: 65px;

    img {
      position: relative;
      top: 0;
      width: 300px;
      border-radius: $br-20;
      z-index: 1;
    }
    .shadow {
      position: absolute;
      top: 40px;
      width: 300px;
      transform: scale(0.9);
      filter: blur(10px) brightness(80%) opacity(0.8);
    }
    .record {
      position: absolute;
      top: 0;
      left: 33%;
      z-index: 0;
      margin-right: 50px;
    }
  }

  .desc-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: auto;
    // margin-left: 30px;
    h1 {
      font-size: $bigtitle-f;
      font-weight: 900;
      letter-spacing: 1px;
    }
    p {
      color: $gray;
      font-weight: 700;
      @include hiddenmore;
      -webkit-line-clamp: 3;
    }
    .creator {
      span {
        margin-right: 20px;
        font-weight: 700;
      }
    }
    .count {
      span {
        margin-right: 20px;
        font-weight: 700;
        i {
          font-size: $normal-f;
          font-weight: 600;
          color: rgba($blue, 0.8);
        }
      }
    }
  }
}
</style>