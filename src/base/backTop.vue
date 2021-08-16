<template>
  <div class="backtop" v-show="isShow">
    <!-- 回到顶部组件 -->
    <svg
      t="1614697653389"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="2846"
      width="25"
      height="25"
    >
      <path
        d="M656.551271 845.731014a52.448287 51.260065 90 0 1-51.108699 52.190965H297.526475a52.243943 51.055721 90 0 1-51.10113-52.243943V478.252432H92.387829c-56.3838 0-69.711569-33.202112-29.629876-74.275251L415.326993 43.211678a52.607221 51.41143 90 0 1 72.375608 0l352.561472 360.87146c40.089261 40.914205 26.81447 74.222273-29.728265 74.222272H656.551271V845.731014z"
        p-id="2847"
        fill="#ffffff"
      ></path>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'backTop',
  data() {
    return {
      isShow: false,
    }
  },
  mounted() {
    /**
     * 当页面滚动超过一屏的高度时，显示backtop按钮
     */
    let winHeight = document.documentElement.clientHeight
    console.log(winHeight)
    this.$nextTick(() => {
      window.addEventListener(
        'scroll',
        () => {
          let scrollTop =
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            window.pageYOffset
          console.log(scrollTop)
          if (scrollTop > winHeight) {
            this.isShow = true
          } else {
            this.isShow = false
          }
        },
        true
      )
    })
  },
}
</script>

<style lang="scss" scoped>
.backtop {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: 30px;
  bottom: 130px;
  z-index: 1000;
  background-color: $aqua-green;
  border-radius: $br-10;
  opacity: 0.5;
  transition: all 0.5s ease-in-out;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
}
</style>