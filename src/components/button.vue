<template>
  <!-- 常用按钮组件 -->
  <div class="button-container">
    <i class="iconfont" :class="btnicon"></i>
    <span>{{ btntext }}</span>
  </div>
</template>

<script>
export default {
  name: 'Button',
  props: ['btntext', 'btnicon'],
}
</script>

<style lang="scss" scoped>
$width: 100px;
$height: 40px;
.button-container {
  display: inline-block;
  width: $width;
  height: $height;
  background-color: rgba($blue, 0.1);
  border-radius: $br-10;
  text-align: center;
  line-height: $height;
  margin-right: 30px;
  cursor: pointer;
  transition: all 0.4s ease-in-out;

  &:hover {
    transform: scale(1.1);
    box-shadow: $img-shadow;
  }

  i {
    font-size: $big-f;
    color: $blue;
    margin-right: 10px;
  }

  span {
    font-size: $normal-f;
    font-weight: 700;
    color: $blue;
    letter-spacing: 1px;
  }
}
</style>