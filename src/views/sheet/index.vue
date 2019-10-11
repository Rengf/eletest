<template>
  <div class="sheetWrap">
    <div class="sheetBox">
      <ReturnHeader :title="title"></ReturnHeader>
      <div class="sheetCategory">
        <scroll class="categoryList" :scrollX="true" :scrollY="false">
          <ul>
            <li
              v-for="(category,index) of mySheetTags"
              :key="index"
              @click="getSheet(index,category.name)"
              :class="{active:activeIndex==index}"
            >{{category.name}}</li>
          </ul>
        </scroll>
        <div class="categoryIcon" @click="toSheetTag()">
          <i class="iconfont">&#xe636;</i>
        </div>
      </div>
    </div>
    <div class="hotSheet">
      <button @click="getds()">获取</button>
    </div>
    <div class="sheetList">
      <AllSheet :sheetLists="sheetLists"></AllSheet>
    </div>
  </div>
</template>
<script>
import AllSheet from "@/components/sheet/sheet";
import scroll from "@/components/common/scroll";
import ReturnHeader from "@/components/common/returnHeader";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      title: "歌单广场",
      activeIndex: 0,
      tags: []
    };
  },
  mounted() {
    this.$store.dispatch("getSheetCategoryList");
  },
  computed: {
    ...mapGetters(["mySheetTags", "sheetLists"])
  },
  methods: {
    getSheet(index, name) {
      this.activeIndex = index;
      this.$store.dispatch("getSheetList", name);
    },
    toSheetTag() {
      this.$router.push("/sheetTag");
    },
    getds() {
      console.log(this.sheetCategoryLists);
    }
  },
  components: {
    ReturnHeader,
    scroll,
    AllSheet
  }
};
</script>
<style lang="scss">
.iconfont {
  font-size: 20px;
}
.active {
  font-weight: bold;
  color: rgb(255, 25, 25);
  font-size: 18px;
  border-bottom: 2px solid rgb(255, 25, 25);
}
.sheetWrap {
  width: 100%;
  .sheetBox {
    width: 100%;
    .sheetCategory {
      width: 100%;
      height: 30px;
      border-bottom: 1px solid #eeeefe;
      .categoryList {
        width: 88%;
        height: 30px;
        float: left;
        overflow: hidden;
        ul {
          width: 2000px;
          overflow: hidden;
          height: 30px;
          li {
            float: left;
            height: 28px;
            margin: 0 10px;
            line-height: 28px;
            letter-spacing: 1px;
          }
        }
      }
      .categoryIcon {
        width: 10%;
        height: 30px;
        float: right;
        line-height: 30px;
        text-align: center;
      }
    }
  }
  .sheetList {
    width: 100%;
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
