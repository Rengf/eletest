<template>
  <div class="sheetWrap" v-cloak>
    <div class="sheetBox">
      <div class="sheetHeader">
        <span>
          {{sheetTitle}}
          <i>{{sheetSubTitle}}</i>
        </span>
        <router-link to="/sheet">{{sheetMore}}</router-link>
      </div>
      <AllSheet :sheetLists="sheetLists"></AllSheet>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import AllSheet from "@/components/sheet/sheet";
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

  created() {
    var data = {
      limit: 12,
      cat: "怀旧",
      offset: 0
    };
    this.$store.dispatch("getSheetList", [data, "怀旧"]);
  },
  computed: {
    ...mapGetters(["sheetLists"])
  },
  methods: {},
  components: {
    AllSheet
  }
};
</script>
<style lang="scss" scoped>
[v-cloak] {
  display: none;
}
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
      margin-top: 10px;
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
  }
}
</style>
