<template>
  <!-- 歌单详情页面 -->
  <div class="songlist-detial-container">
    <!-- 头部歌单描述区域 -->
    <div class="header" v-if="songlist.creator">
      <HeadDesc
        :img="songlist.coverImgUrl"
        :name="songlist.name"
        :desc="songlist.description"
        :creator="songlist.creator.nickname"
        :createTime="songlist.createTime"
        :playCount="songlist.playCount"
        :trackCount="songlist.trackCount"
        :needAlbum="false"
      />
    </div>
    <!-- 歌单相应单曲 -->
    <div class="songs">
      <SongsCard :songsData="songsDetail" :needImg="true"></SongsCard>
    </div>
  </div>
</template>

<script>
import { getSonglistDetial } from '@/api/songlist.js'
import { getSongDetail } from '@/api/song.js'
import SongsCard from '@/components/songsCard'
import HeadDesc from '@/components/headDesc'
export default {
  name: 'SonglistDetail',
  components: { HeadDesc, SongsCard },
  props: {
    id: {
      type: [String, Number],
    },
  },
  data() {
    return {
      // 歌单详情数据
      songlist: {},
      // 抽取出来的歌单单曲ids
      songsIds: '',
      // 获取到的歌曲详情
      songsDetail: '',
    }
  },
  watch: {
    // 因为songsIds在mouted阶段更改时，获取歌曲的参数没有办法获取及时获取到更新后的数据，所以放在watch中监听
    songsIds: {
      handler(newVal, oldVal) {
        // 获取歌单歌曲数据
        if (newVal != oldVal) {
          getSongDetail({ ids: newVal }).then((res) => {
            this.songsDetail = res.data
            // console.log(this.songsDetail)
          })
        }
      },
      immediate: true,
    },
  },
  mounted() {
    // 获取歌单详情数据
    getSonglistDetial({ id: this.id }).then((res) => {
      this.songlist = res.data.playlist
      // 将歌单中单曲的id提取出来
      this.songlist.trackIds.forEach((item) => (this.songsIds += item.id + ','))
      // 拼接id的时候最后多出一个逗号
      this.songsIds = this.songsIds.substr(0, this.songsIds.length - 1)
    })
  },
}
</script>

<style lang="scss" scoped>
.songlist-detial-container {
  width: 100%;
  .header,
  .songs {
    width: 90%;
    margin: 20px auto;
  }

  .songs {
    margin-top: 70px;
  }
}
</style>