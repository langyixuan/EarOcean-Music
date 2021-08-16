<template>
  <!-- 热门歌手模块 -->
  <div
    class="topartists"
    data-aos="fade-left"
    data-aos-offset="150"
    data-aos-delay="400"
    data-aos-duration="800"
    data-aos-easing="ease-in-out"
  >
    <div class="title">Hot Artists</div>
    <ul class="artists-list">
      <li
        v-for="artist in artistsList"
        :key="artist.id"
        @click="toSingerDetail(artist.id)"
      >
        <img :src="artist.img1v1Url" alt="" />
        <div class="tag">
          <span class="big">{{ artist.name }}</span>
          <span class="small">{{
            `单曲数量 ${artist.musicSize}  专辑数量 ${artist.albumSize}`
          }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getTopArtists } from '@/api/singer.js'
export default {
  name: 'TopArtists',
  data() {
    return {
      artistsList: [],
    }
  },
  mounted() {
    getTopArtists({ type: 2 }).then((res) => {
      // 因为默认会获取到100条数据，这里只随机选取其中10条
      let listIndex = []

      for (let i = 0; i <= 10; i++) {
        let temp = Math.floor(Math.random() * 100)
        if (!listIndex.includes(temp)) {
          listIndex.push(temp)
        }
      }
      this.artistsList.indexs = listIndex
      this.artistsList = res.data.list.artists.filter((ele, index) =>
        listIndex.includes(index)
      )
    })
  },
  methods: {
    toSingerDetail(id) {
      this.$router.push(`/singer/${id}`)
    },
  },
}
</script>

<style lang="scss" scoped>
$img-size: 55px;
.topartists {
  width: 280px;
  margin-top: 25px;
  margin-right: 50px;
  .title {
    @include tagstyle;
  }

  .artists-list {
    li {
      width: 250px;
      display: flex;
      align-items: center;
      margin-left: 20px;
      margin-bottom: 25px;
      border-radius: 50px 30px 30px 50px;
      background-color: $white;
      box-shadow: $img-shadow;
      cursor: pointer;
      transform: scale(1);
      transition: 0.3s ease-in-out;

      &:hover {
        transform: scale(1.1);
      }
    }
    img {
      display: inline-block;
      width: $img-size;
      height: $img-size;
      border-radius: 50%;
      box-shadow: $img-shadow;
      margin-right: 20px;
      object-fit: cover;
    }

    .tag {
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .big {
        font-size: $small-f;
        color: $aqua-green;
        font-weight: 600;
      }
      .small {
        color: rgb(174, 178, 179);
        font-size: $mini-f;
        -webkit-transform-origin-x: 0;
        -webkit-transform: scale(0.9);
      }
    }

    span {
      display: block;
    }
  }
}
</style>