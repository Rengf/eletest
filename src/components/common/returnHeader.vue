<template>
  <div class="returnHeader">
    <span>
      <i class="iconfont">&#xe62d;</i>
    </span>
    <span class="title">{{title}}</span>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "音乐"
    }
  }
};
</script>
<style lang="scss">
.returnHeader {
  width: 95%;
  margin: auto;
  height: 30px;
  span {
    line-height: 30px;
  }
  .title {
    letter-spacing: 1px;
    font-size: 18px;
    margin-left: 20px;
  }
}
</style>
