<template>
  <div class="sheetWrap">
    <div class="sheetBox">
      <div class="sheetHeader">
        <span>
          {{sheetTitle}}
          <i>{{sheetSubTitle}}</i>
        </span>
        <router-link to="/login">{{sheetMore}}</router-link>
      </div>
      <div class="sheetMain">
        <div
          class="sheet"
          v-for="(sheet,index) of sheetLists"
          :key="index"
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
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    sheetTitle: {
      type: String,
      default: "推荐歌单"
    },
    sheetSubTitle: {
      type: String,
      default: ""
    },
    sheetMore: {
      type: String,
      default: "歌单广场"
    }
    // sheetList: {
    //   type: Object,
    //   default: {}
    // }
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
  mounted() {
    this.$store.dispatch("getSheetList");
  },
  computed: {
    ...mapGetters(["sheetLists"])
  },
  methods: {
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
.sheetWrap {
  margin-top: 20px;
  border-top: 1px solid #ccc;
  width: 100%;
  .sheetBox {
    width: 100%;
    .sheetHeader {
      width: 100%;
      height: 40px;
      margin-top: 20px;
      span {
        font-size: 18px;
        font-weight: bold;
        margin-left: 15px;
        line-height: 30px;
        i {
          font-size: 13px;
          color: #888;
        }
      }
      a {
        color: #888;
        float: right;
        margin-right: 15px;
        border: 1px solid #ccc;
        border-radius: 10px;
        font-size: 12px;
        margin-top: 15px;
        padding: 3px 6px;
      }
    }
    .sheetMain {
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
  }
}
</style>
