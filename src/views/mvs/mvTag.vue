<template>
  <div class="my-tag">
    <div class="tag-kind">
      <!-- 选择地区 -->
      <span>地区：</span>
      <ul>
        <li
          v-for="item in languageTags"
          :key="item"
          @click="selectLanguage(item)"
          :class="[item === sLanguage ? 'activetag' : '']"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <!-- 选择类型 -->
    <div class="tag-kind">
      <span>类型：</span>
      <ul>
        <li
          v-for="item in typeTags"
          :key="item"
          @click="selectType(item)"
          :class="[item === sType ? 'activetag' : '']"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <!-- 选择排序方式 -->
    <div class="tag-kind">
      <span>排序：</span>
      <ul>
        <li
          v-for="item in sortTags"
          :key="item"
          @click="selectSort(item)"
          :class="[item === sSort ? 'activetag' : '']"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MvTag',
  data() {
    return {
      // 语言标签
      languageTags: ['全部', '内地', '港台', '欧美', '韩国', '日本'],
      // 类别标签
      typeTags: ['全部', '官方版', '原声', '现场版', '网易出品'],
      // 排序标签
      sortTags: ['上升最快', '最热', '最新'],

      sLanguage: this.sLanguage ? this.sLanguage : '全部',
      sType: this.sType ? this.sortTags : '全部',
      sSort: this.sort ? this.sSort : '上升最快',
    }
  },

  methods: {
    selectLanguage(language) {
      this.sLanguage = language
      this.$emit('getMvList', language, this.sType, this.sSort, 0)
      // 每次触发Tag的选择时，将页数重新返回第一页
      this.$emit('backPageOne')
    },
    selectType(type) {
      this.sType = type
      this.$emit('getMvList', this.sLanguage, type, this.sSort, 0)
      this.$emit('backPageOne')
    },
    selectSort(sort) {
      this.sSort = sort
      this.$emit('getMvList', this.sLanguage, this.sType, sort, 0)
      this.$emit('backPageOne')
    },
  },
}
</script>

<style lang="scss" scoped>
.tag-kind {
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  span {
    font-size: $small-f;
    font-weight: 900;
  }
  ul {
    display: flex;
    li {
      margin-left: 20px;
      padding: 6px 20px;
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
}
</style>