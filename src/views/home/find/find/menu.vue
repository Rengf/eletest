<template>
  <div class="menuWrap">
    <div class="menuBox">
      <div class="menuList">
        <span class="imgIcon">
          <i class="iconfont">&#xe627;</i>
        </span>
        <span class="font">每日推荐</span>
      </div>
      <div class="menuList">
        <span class="imgIcon">
          <i class="iconfont">&#xe60a;</i>
        </span>
        <span class="font">歌单</span>
      </div>
      <div class="menuList">
        <span class="imgIcon">
          <i class="iconfont">&#xe6c2;</i>
        </span>
        <span class="font">排行榜</span>
      </div>
      <div class="menuList">
        <span class="imgIcon">
          <i class="iconfont">&#xe696;</i>
        </span>
        <span class="font">电台</span>
      </div>
      <div class="menuList">
        <span class="imgIcon">
          <i class="iconfont">&#xe690;</i>
        </span>
        <span class="font">直播</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.iconfont {
  font-family: "iconfont" !important;
  font-size: 20px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
}

.menuWrap {
  width: 100%;
  height: 65px;
  .menuBox {
    display: flex;
    width: 95%;
    height: 60px;
    margin: 5px auto;
    .menuList {
      flex: 1;
      text-align: center;
      .imgIcon {
        display: block;
        width: 40px;
        height: 40px;
        margin: auto;
        border-radius: 50%;
        background: rgb(253, 2, 2);
        text-align: center;
        line-height: 40px;
      }
      .font {
        font-size: 10px;
        color: #000;
        display: block;
        margin-top: 10px;
      }
    }
  }
}
</style>
