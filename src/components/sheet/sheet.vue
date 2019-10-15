<template>
  <div class="sheetBox">
    <div
      class="sheet"
      v-for="(sheet,index) of sheetLists"
      :key="sheet.id"
      @click="getSheetMusicList(sheet.id)"
    >
      <span class="clickTotal">
        <i class="iconfont">&#xe602;</i>
        {{sheet.playCount|playCountFilter}}
      </span>
      <img :src="sheet.coverImgUrl" :alt="index+'.png'" />
      <span class="sheetTip">{{sheet.name}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    sheetLists: {
      type: Array,
      default: []
    }
  },
  filters: {
    playCountFilter(value) {
      if (value > 100000) {
        return parseInt(value / 100000) + "万";
      } else {
        return value;
      }
    }
  },
  methods: {
    //获取歌单音乐列表
    getSheetMusicList(id) {
      this.$store.dispatch("getSheetMusicList", id);
    }
  }
};
</script>
<style lang="scss" scoped>
.iconfont {
  font-family: "iconfont" !important;
  font-size: 15px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.sheetBox {
  width: 95%;
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  .sheet {
    position: relative;
    width: 31%;
    height: 135px;
    margin: 1%;
    justify-content: center;
    .clickTotal {
      position: absolute;
      font-size: 8px;
      transform: scale(0.8);
      color: #fff;
      top: -1px;
      right: -2px;
    }
    img {
      width: 100%;
      height: 100px;
    }
    .sheetTip {
      display: block;
      width: 100%;
      font-size: 10px;
      line-height: 12px;
      height: 25px;
      display: -webkit-box;
      overflow: hidden;
      white-space: normal !important;
      text-overflow: ellipsis;
      word-wrap: break-word;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
