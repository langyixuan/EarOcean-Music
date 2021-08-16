<template>
  <!-- 歌单广场页面 -->
  <div class="songlist-container">
    <ul
      class="hottags"
      data-aos="fade-left"
      data-aos-offset="200"
      data-aos-delay="50"
      data-aos-duration="700"
      data-aos-easing="ease-in-out"
    >
      <li
        v-for="item in hotTags"
        :key="item.id"
        @click="selectTag(item.name)"
        :class="[item.name === selectedTag ? 'activetag' : '']"
      >
        {{ item.name }}
      </li>
    </ul>
    <div
      class="songlist"
      v-if="!selectedTag"
      data-aos="fade-left"
      data-aos-offset="200"
      data-aos-delay="50"
      data-aos-duration="900"
      data-aos-easing="ease-in-out"
    >
      <SonglistCard
        v-for="item in allSonglist"
        :key="item.id"
        :id="item.id"
        :img="item.coverImgUrl"
        :name="item.name"
        :creator="item.creator.nickname"
        :trackcount="item.trackCount"
      />
    </div>
    <div
      class="songlist"
      v-else
      data-aos="fade-left"
      data-aos-offset="200"
      data-aos-delay="50"
      data-aos-duration="900"
      data-aos-easing="ease-in-out"
    >
      <SonglistCard
        v-for="item in currentSonglist"
        :key="item.id"
        :id="item.id"
        :img="item.coverImgUrl"
        :name="item.name"
        :creator="item.creator.nickname"
        :trackcount="item.trackCount"
      />
    </div>
    <div class="pagination">
      <Pagination
        ref="pagination"
        :selectedTag="selectedTag"
        :songlistCount="songlistCount"
        @getSonglist="getSonglist"
      />
    </div>
  </div>
</template>

<script>
import Pagination from './pagination'
import SonglistCard from '@/components/songlistCard'
import { getSonglistHotTags, getSonglist } from '@/api/songlist.js'
export default {
  name: 'Playlist',
  components: { SonglistCard, Pagination },
  data() {
    return {
      hotTags: [],
      selectedTag: '全部',
      currentSonglist: [],
      songlistCount: 0,
      currentPage: 0,
    }
  },
  created() {
    // 获取热门歌单分类
    getSonglistHotTags().then((res) => {
      this.hotTags = res.data.tags
    })
    // 刚进入页面还没有选择tag时，默认请求tag="全部"的歌单数据
    this.selectTag(this.selectedTag, 0)
  },
  methods: {
    selectTag(tagname) {
      this.selectedTag = tagname
      this.getSonglist(this.selectedTag, 0)
    },
    getSonglist(tagname, currentPage) {
      getSonglist({
        cat: tagname,
        limit: 18,
        offset: currentPage * 18,
      }).then((res) => {
        this.currentSonglist = res.data.playlists
        this.$refs.pagination.backPageOne()
        if (currentPage === 0) {
          this.songlistCount = res.data.total
        }
      })
      console.log(currentPage)
    },
  },
}
</script>

<style lang="scss" scoped>
.songlist-container {
  width: 100%;
  margin-top: 30px;
  .title {
    @include tagstyle;
    margin-left: 3%;
  }
  .hottags {
    float: right;
    width: 70%;
    height: 35px;
    line-height: 35px;
    text-align: center;
    display: flex;
    justify-content: space-between;
    // background-color: black;
    margin-bottom: 20px;
    margin-right: 50px;

    li {
      display: inline-block;
      padding: 0 20px;
      font-size: $small-f;
      font-weight: 900;
      border-radius: $br-30;
      background: linear-gradient(
        200deg,
        $white,
        rgba($blue, 0.1),
        rgba($blue, 0.3)
      );
      cursor: pointer;
      transition: all 0.4s ease-in-out;
    }
    li:hover {
      transform: scale(0.95);
      box-shadow: $img-shadow2;
    }

    .activetag {
      color: rgba($blue, 0.8);
      box-shadow: $img-shadow2;
    }
  }

  .songlist {
    width: 95%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
  }
  .pagination {
    display: flex;
    justify-content: center;
    margin: 30px 0;
  }
}
</style>
