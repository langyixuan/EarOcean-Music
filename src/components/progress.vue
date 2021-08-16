<template>
  <div class="progress-container" ref="totalWidth" @click="clickProgress">
    <!-- 进度条上的小圆圈 -->
    <div
      class="progress-btn"
      ref="btnWidth"
      @mousedown.prevent="handelDrag"
    ></div>
    <!-- 以播放进度显示 -->
    <div class="has-progress" ref="hasBarWidth"></div>
  </div>
</template>

<script>
export default {
  name: 'Progress',
  props: {
    currentPercent: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    // 对props中currentPercent进行监听，变化时出发has-progress的改变
    currentPercent(newPercent) {
      // 为了防止进度条拖拽过程中发生跳动
      if (newPercent >= 0 && !this.click.initiated) {
        let barWidth =
          this.$refs.totalWidth.clientWidth - this.$refs.btnWidth.clientWidth
        let offsetWidth = newPercent * barWidth
        this.offset_(offsetWidth)
      }
    },
  },
  created() {
    // 用于定义在拖拽进度条过程中的一些公共数据
    this.click = {}
  },
  methods: {
    // 鼠标点下
    handelDrag(e) {
      // 鼠标点下时进行初始化
      this.click.initiated = true
      this.click.startX = e.clientX
      this.click.left = this.$refs.hasBarWidth.clientWidth
      // 鼠标拖拽
      document.onmousemove = (e) => {
        if (!this.click.initiated) return false
        // 计算拖动的距离
        let moveX = e.clientX - this.click.startX
        // 让整个offsetWidth不能小于0，并且不能大于进度条总宽度
        let offsetWidth = Math.min(
          this.$refs.totalWidth.clientWidth - this.$refs.btnWidth.clientWidth,
          Math.max(0, this.click.left + moveX)
        )
        this.offset_(offsetWidth)
      }
      // 鼠标抬起时
      document.onmouseup = () => {
        this.click.initiated = false
        this.changePercent()
      }
    },

    // 控件和以播放进度条的偏移
    offset_(offsetWidth) {
      // 以播放进度条的偏移
      this.$refs.hasBarWidth.style.width = `${offsetWidth}px`
      // 控件的偏移
      this.$refs.btnWidth.style.transform = `translateX(${offsetWidth}px)`
    },
    // 通知父组件改变进度条
    changePercent() {
      let barWidth =
        this.$refs.totalWidth.clientWidth - this.$refs.btnWidth.clientWidth
      let percent = this.$refs.hasBarWidth.clientWidth / barWidth
      this.$emit('changePercent', percent)
    },
    // 点击进度条上的位置进行跳转
    clickProgress(e) {
      let offsetWidth = e.offsetX
      this.offset_(offsetWidth)
      this.changePercent()
    },
  },
}
</script>

<style lang="scss" scoped>
.progress-container {
  display: flex;
  align-items: center;
  position: relative;
  width: 450px;
  height: 6px;
  border-radius: $br-10;
  background-color: rgb(185, 218, 245);

  .progress-btn {
    position: absolute;
    left: 0;
    width: 20px;
    height: 20px;
    border: 6px solid rgb(192, 239, 253);
    border-radius: 50%;
    background-color: $aqua-green;
    cursor: pointer;
  }

  .has-progress {
    position: absolute;
    left: 0;
    width: 0;
    height: 100%;
    background-color: $aqua-green;
    border-radius: $br-10;
  }
}
</style>