<template>
  <!-- 前进后退导航 -->
  <div class="navbtn">
    <div class="prev" @click="goBtn('prev')">
      <svg width="60" height="42">
        <polyline class="prevline" points="52,27 21,27 31,18 21,27 31,38" />
      </svg>
    </div>
    <div class="next" @click="goBtn('next')">
      <svg width="60" height="42">
        <polyline class="nextline" points="21,27 52,27 42,17 52,27 42,37" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBtn',
  methods: {
    // 前进后退
    goBtn(type) {
      type === 'prev' ? this.$router.go(-1) : this.$router.go(1)
    },
  },
}
</script>

<style lang="scss" scoped>
.navbtn {
  width: 200px;
  height: $header-height;
  // background-color: blue;
}

.navbtn {
  .prev,
  .next {
    display: inline-block;
    cursor: pointer;
    // background-color: burlywood;
  }
  .nextline,
  .prevline {
    fill: none;
    stroke: #ccc;
    stroke-width: 4px;
    stroke-linecap: round;
    stroke-linejoin: round;
    cursor: pointer;
    transition: stroke 0.5s ease-in-out;
  }
  .next:hover .nextline {
    stroke-dasharray: 100;
    stroke-dashoffset: 60;
    stroke: $aqua-green;
    animation: next 0.6s ease-in-out;
    animation-fill-mode: forwards;
  }
  @keyframes next {
    from {
      stroke-dashoffset: 60;
    }
    to {
      stroke-dashoffset: 0;
    }
  }
  .prev:hover .prevline {
    stroke-dasharray: 100;
    stroke-dashoffset: 60;
    stroke: $aqua-green;
    animation: prev 0.6s ease-in-out;
    animation-fill-mode: forwards;
  }
  @keyframes prev {
    from {
      stroke-dashoffset: 60;
    }
    to {
      stroke-dashoffset: 0;
    }
  }
}
</style>