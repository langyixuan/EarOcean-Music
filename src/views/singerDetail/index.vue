<template>
  <div class="singer-container">
    <div class="head-desc" v-if="singerDetail.artist">
      <div class="singerImg">
        <div class="ripple">
          <img :src="singerDetail.artist.cover" />
        </div>
        <el-button type="text" @click="centerDialogVisible = true"
          ><img :src="singerDetail.artist.cover" alt="" class="bg"
        /></el-button>
      </div>
      <div class="singer-desc">
        <h1>{{ singerDetail.artist.name }}</h1>
        <i
          >{{ singerDetail.artist.albumSize }}张专辑 ·
          {{ singerDetail.artist.musicSize }}首歌曲 ·
          {{ singerDetail.artist.mvSize }}个MV</i
        >
        <div class="btn">
          <Button :btntext="'播放'" :btnicon="'icon-icon_play'" />
          <Button :btntext="'关注'" :btnicon="'icon-shoucang_huaban1'" />
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="centerDialogVisible"
      width="50%"
      center
      class="singer-dialog"
      v-if="singerDetail.artist"
    >
      <div class="desc">
        <img :src="singerDetail.artist.cover" alt="艺人图片" />
        <span>{{ singerDetail.artist.name }} 简介</span>
      </div>
      <p>{{ singerDetail.artist.briefDesc }}</p>
    </el-dialog>
    <div class="singer-detail" v-if="singerDetail.artist">
      <div class="singer-songs">
        <SingerSongs :id="id" :songsCount="singerDetail.artist.musicSize" />
      </div>
      <div class="singer-album">
        <SingerAlbums :id="id" :albumCount="singerDetail.artist.albumSize" />
      </div>
      <div class="singer-songlists">
        <SingerMvs :id="id" />
      </div>
    </div>
  </div>
</template>

<script>
import { getSingerDetail } from '@/api/singer.js'
import Button from '@/components/button'
import SingerAlbums from './singerAlbums'
import SingerSongs from './singerSongs'
import SingerMvs from './singerMvs'
export default {
  name: 'Singer',
  props: ['id'],
  components: { Button, SingerAlbums, SingerSongs, SingerMvs },
  data() {
    return {
      singerDetail: '',
      centerDialogVisible: false,
    }
  },
  mounted() {
    // 获取歌手详情
    getSingerDetail({ id: this.id }).then((res) => {
      this.singerDetail = res.data.data
    })
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
$width: 240px;
$ml: 80px;
.singer-container {
  width: 100%;
  height: $width;
}
.head-desc {
  position: relative;
  display: flex;
  align-items: center;
  margin-left: $ml;
  margin-top: 50px;
  .ripple {
    width: $width;
    height: $width;
    border-radius: 50%;
    animation: ripple 1.5s linear infinite;

    img {
      width: $width;
      height: $width;
      border-radius: 50%;
      object-fit: cover;
      filter: blur(20px) brightness(100%) opacity(1);
    }
  }
  .bg {
    position: absolute;
    top: 0;
    width: $width;
    height: $width;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: $img-shadow2;
  }

  .singer-desc {
    height: $width;
    margin-left: $ml;
    margin-top: -40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h1 {
      font-size: 80px;
      font-weight: 700;
      padding: 0;
    }
    i {
      font-size: $gray;
      font-weight: 700;
      font-size: $small-f;
    }
  }

  @keyframes ripple {
    0% {
      box-shadow: 0 0 0 15px rgba(190, 210, 236, 0.1),
        0 0 0 30px rgba(177, 201, 231, 0.1), 0 0 0 45px rgba(188, 209, 236, 0.1);
    }
  }
}

.singer-dialog {
  .desc {
    display: flex;
    align-items: center;
    margin-bottom: 40px;
    border-radius: $br-30;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      box-shadow: $img-shadow2;
      margin-right: 25px;
    }
    span {
      font-size: $large-f;
      font-weight: 700;
      color: #000;
    }
  }
  p {
    color: $black;
    text-indent: 2em;
  }
}

.singer-detail {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 30px;
  .singer-album {
    margin-left: 30px;
    margin-top: 50px;
  }
  .singer-songs {
    width: 95%;
    position: relative;
  }
}
</style>