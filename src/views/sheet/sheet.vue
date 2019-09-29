<template>
  <div class="sheetWrap">
    <div class="sheetBox">
      <ReturnHeader :title="title"></ReturnHeader>
      <div class="sheetCategory">
        <scroll class="categoryList" :data="sheetCategoryLists" :scrollX="true" :scrollY="false">
          <ul>
            <li
              v-for="(category,index) in sheetCategoryLists"
              :key="index"
              @click="getSheet()"
            >{{category.name}}</li>
          </ul>
        </scroll>
        <div class="categoryIcon">
          <i></i>
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
      fad: true,
      fbd: false
    };
  },
  mounted() {
    this.$store.dispatch("getSheetCategoryList");
  },
  computed: {
    ...mapGetters(["sheetCategoryLists"])
  },
  methods: {
    getSheet() {
      console.log(this.sheetCategoryLists);
    }
  },
  components: {
    ReturnHeader,
    scroll
  }
};
</script>
<style lang="scss">
.sheetWrap {
  width: 100%;
  .sheetBox {
    width: 100%;
    .sheetCategory {
      width: 100%;
      height: 30px;
      .categoryList {
        width: 90%;
        height: 30px;
        overflow: hidden;
        li {
          display: inline-block;
          height: 30px;
          padding: 0 10px;
        }
      }
    }
  }
}
</style>
