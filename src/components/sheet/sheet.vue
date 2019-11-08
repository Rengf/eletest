<template>
  <div class="sheetBox">
    <router-link
      class="sheet"
      v-for="(sheet,index) of sheetLists"
      :key="sheet.id"
      :to="'/musicList?sheetId='+sheet.id"
    >
      <span class="clickTotal">
        <i class="iconfont">&#xe602;</i>
        {{sheet.playCount|playCountFilter}}
      </span>
      <img :src="sheet.coverImgUrl||sheet.picUrl" :alt="index+'.png'" />
      <span class="sheetTip">{{sheet.name}}</span>
    </router-link>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    sheetLists: {
      type: Array,
      default: []
    }
  },
  filters: {
    playCountFilter(value) {
      if (value > 10000) {
        return parseInt(value / 10000) + "万";
      } else {
        return value;
      }
    }
  },
  computed: {
    ...mapGetters(["playLists"])
  },
  methods: {
    //获取歌单音乐列表
    getSheetMusicList(id) {
      if (this.playLists.length == 0) {
        this.$store.dispatch("getSheetMusicList", id).then(() => {
          this.playMusic(0);
        });
      } else {
        this.$store.dispatch("getSheetMusicList", id);
      }
    },
    playMusic(index) {
      var playMusic = [
        this.playLists[index].id,
        this.playLists[index].name,
        this.playLists[index].ar[0].name,
        this.playLists[index].al.picUrl,
        this.playLists[index].ar[0].id
      ];
      this.$store.dispatch("playMusicIndex", index);
      this.$store.dispatch("getPlayMusic", playMusic);
      this.$store.dispatch("isPlaying", true);
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
    color: #333;
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
