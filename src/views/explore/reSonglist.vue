<template>
  <!-- 推荐歌单模块 -->
  <div
    class="replaylist"
    data-aos="fade-left"
    data-aos-offset="150"
    data-aos-delay="250"
    data-aos-duration="800"
    data-aos-easing="ease-in-out"
  >
    <div class="title" v-show="resonglist.length">Recommend Songlist</div>
    <div class="imglist">
      <div
        class="imgcard"
        v-for="list in resonglist"
        :key="list.id"
        @click="toPlaylistDetial(list.id)"
      >
        <img :src="list.picUrl" />
        <span>{{ list.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getReSonglist } from '@/api/songlist.js'
export default {
  name: 'ReSonglist',
  components: {},
  data() {
    return {
      resonglist: [],
    }
  },
  mounted() {
    getReSonglist({ limit: 10 }).then((res) => {
      this.resonglist = res.data.result
    })
  },
  methods: {
    // 跳转至歌单详情页
    toPlaylistDetial(listid) {
      this.$router.push(`/songlist/${listid}`)
    },
  },
}
</script>

<style lang="scss" scoped>
$img-margin: 18px;
$img-size: 145px;
.replaylist {
  // width: 80%;
  margin: 25px 20px;

  .title {
    @include tagstyle;
  }

  .imglist {
    width: 97%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .imgcard {
    width: calc(#{$img-size} + 10px);
    margin-left: $img-margin;
    margin-bottom: $img-margin;
    @include hidden;

    img {
      width: $img-size;
      height: $img-size;
      margin-bottom: 5px;
      background-size: cover;
      border-radius: 0 $br-mlist 0 $br-mlist;
      cursor: pointer;
      filter: hue-rotate(10deg);
      transform: scale(1);
      transition: 0.3s ease-in-out;
      box-shadow: $img-shadow;
    }

    img:hover {
      filter: sepia(0);
      transform: scale(0.9);
    }

    span {
      font-size: $mini-f;
      font-weight: 700;
    }
  }
  // .loading-container {
  //   position: absolute;
  //   width: 100%;
  //   top: 50%;
  //   transform: translateY(-50%);
  // }
}
</style>