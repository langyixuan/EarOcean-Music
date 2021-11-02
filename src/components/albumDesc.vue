<template>
  <div class="album-desc">
    <div class="albumslist">
      <div
        class="albumcard"
        v-for="album in albumData"
        :key="album.id"
        @click="toAlbumDetail(album.id)"
      >
        <img v-lazy="album.picUrl" alt="" />
        <img src="../assets/record/record-black2.png" alt="" class="record" />
        <div class="detial">
          <span>{{ album.name }}</span>
          <i>{{ album.artists | artistsFilter }}</i>
          <i>{{ album.publishTime | timeFormat('YYYY-MM-DD h:mm:ss a') }}</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlbumDesc',
  props: ['albumData'],
  methods: {
    // 跳转到专辑详情页面
    toAlbumDetail(id) {
      this.$router.push(`/album/${id}`)
      console.log(this.$router)
    },
  },
}
</script>

<style lang="scss" scoped>
.album-desc {
  width: 97%;
  margin-top: 20px;
  .albumslist {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
  }

  .albumcard {
    width: 30%;
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    margin: 10px 20px;
    background-image: linear-gradient(
      to right,
      #fff,
      rgb(244, 248, 255),
      rgb(120, 190, 255)
    );
    background-size: 200%;
    transition: background-position 1s ease-in-out;
    cursor: pointer;
    img {
      width: 80px;
      height: 80px;
      background-size: cover;
      border-radius: $br-album;
      z-index: 1;
      box-shadow: $img-shadow;
    }
    .record {
      position: absolute;
      left: 0;
      transition: all 0.6s ease-in-out;
      z-index: 0;
      box-shadow: none;
    }

    &:hover {
      background-position: 65% 0;
    }

    &:hover .record {
      position: absolute;
      left: 30px;
    }
  }

  .detial {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 35px;
    padding: 5px;
    span {
      width: 60%;
      font-size: $small-f;
      font-weight: 700;
      @include hidden;
    }
    i {
      font-size: $mini-f;
      color: $gray;
      font-weight: 700;
    }
  }
}
</style>