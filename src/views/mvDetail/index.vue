<template>
  <!-- mv详情页面 -->
  <div class="mv-detail">
    <div class="layout-l">
      <div class="q-pa-md">
        <q-video :ratio="16 / 9" :src="mvUrl" />
      </div>
      <div class="desc">
        <span>{{ mvDatas.name }}</span>
        <div class="info">
          <i>{{ `${mvDatas.playCount}次观看 · ${mvDatas.publishTime}` }}</i>
          <ul>
            <li class="iconfont icon-dianzan">
              <i>{{ mvInfo.likedCount }}</i>
            </li>
            <li class="iconfont icon-fenxiang">
              <i>{{ mvInfo.shareCount }}</i>
            </li>
            <li class="iconfont icon-xiazai"></li>
          </ul>
        </div>
        <div class="artist" v-if="mvDatas.artists">
          <img :src="mvDatas.artists[0].img1v1Url" />
          <span>{{ mvDatas.artists[0].name }}</span>
        </div>
      </div>
    </div>
    <div class="layout-r">
      <div class="re-mv">
        <div class="re-detail" v-for="item in sameMv" :key="item.vid">
          <img :src="item.cover" @click="toMvDetail(item.id)" />
          <div class="desc">
            <span>{{ item.name }}</span>
            <i>{{ item.artistName }}</i>
            <i>{{ item.playCount | playCount }}次播放</i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMvDatas, getMvInfo, getMvUrl, getSameMv } from '@/api/mv.js'
import { QVideo } from 'quasar'
export default {
  name: 'MvDetail',
  components: { QVideo },
  data() {
    return {
      mvUrl: '',
      mvDatas: {},
      mvInfo: {},
      sameMv: {},
    }
  },
  mounted() {
    getMvUrl({ id: this.id }).then((res) => (this.mvUrl = res.data.data.url))
    getMvDatas({ mvid: this.id }).then((res) => (this.mvDatas = res.data.data))
    getMvInfo({ mvid: this.id }).then((res) => (this.mvInfo = res.data))
    getSameMv({ mvid: this.id }).then((res) => {
      this.sameMv = res.data.mvs
    })
  },
  props: {
    id: {
      type: [String, Number],
    },
  },
  watch: {
    // 监听路由是否变化
    $route(to, from) {
      if (to.query.id !== from.query.id) {
        this.id = to.query.id
        // 重新加载数据
        this.init()
      }
    },
  },
  // created() {
  //   if (this.$route.query) {
  //     this.id = this.$route.query.id
  //     this.init()
  //   }
  // },
  methods: {
    toMvDetail(id) {
      this.$router.push(`/mv/${id}`)
    },
  },
}
</script>

<style lang="scss" scoped>
$v-width: 850px;
.mv-detail {
  display: flex;
}
.q-pa-md {
  margin-left: 35px;
  width: $v-width;
  border-radius: $br-30;
}
.desc {
  margin-left: 35px;
  padding: 20px;
  span {
    font-size: $big-f;
    font-weight: 900;
  }
  .artist {
    display: flex;
    align-items: center;
    margin-top: 20px;

    img {
      display: inline-block;
      width: 50px;
      height: 50px;
      background-size: cover;
      border-radius: 50%;
      box-shadow: $img-shadow;
      margin-right: 20px;
      cursor: pointer;
      object-fit: cover;
    }
    span {
      font-size: $normal-f;
      cursor: pointer;
    }
  }

  .info {
    width: $v-width;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 30px;
    i {
      display: block;
      font-weight: 900;
      color: $gray;
    }
    li {
      display: inline-block;
      font-size: 22px;
      color: rgba($blue, 0.7);
      margin-left: 30px;

      i {
        display: inline-block;
        color: $black;
        font-size: $mini-f;
        margin-left: 5px;
      }
    }
  }
}

.re-mv {
  padding: 20px;
  // background-color: royalblue;
  .re-detail {
    display: flex;
    margin-bottom: 30px;

    img {
      width: 150px;
      border-radius: $br-10;
      margin-right: 10px;
      cursor: pointer;
      object-fit: cover;
    }
    .desc {
      width: 150px;
      height: 96px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin-left: -10px;
      span {
        font-size: $small-f;
        font-weight: 900;
        @include hidden;
        // margin-bottom: 10px;
      }
      i {
        font-size: $mini-f;
        @include hidden;
        color: $gray;
      }
    }
  }
}
</style>