<template>
  <div class="sheetWrap">
    <div class="sheetBox">
      <ReturnHeader :title="title"></ReturnHeader>
      <div class="sheetCategory">
        <scroll class="categoryList" :scrollX="true" :scrollY="false">
          <ul>
            <li
              v-for="(category,index) in sheetCategoryLists.sub"
              :key="index"
              @click="getSheet(index)"
              :class="{active:activeIndex==index}"
            >{{category.name}}</li>
          </ul>
        </scroll>
        <div class="categoryIcon" @click="toSheetTag()">
          <i class="iconfont">&#xe636;</i>
        </div>
      </div>
    </div>
    <div class="hotSheet"></div>
    <div class="sheetList"></div>
  </div>
</template>
<script>
import scroll from "@/components/common/scroll";
import ReturnHeader from "@/components/common/returnHeader";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      title: "歌单广场",
      activeIndex: 0
    };
  },
  mounted() {
    this.$store.dispatch("getSheetCategoryList");
  },
  computed: {
    ...mapGetters(["sheetCategoryLists"])
  },
  methods: {
    getSheet(index) {
      this.activeIndex = index;
      console.log(this.sheetCategoryLists);
    },
    toSheetTag() {}
  },
  components: {
    ReturnHeader,
    scroll
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
          width: 4500px;
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
}
</style>
