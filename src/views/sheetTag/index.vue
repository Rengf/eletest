<template>
  <div class="sheetTag">
    <ReturnHeader :title="title"></ReturnHeader>
    <div class="tagLists">
      <ul>
        <li class="tagCategory">
          <span>我的歌单</span>
          <ul>
            <li
              class="tags"
              v-for="(mytag,index) of mySheetTags"
              :key="index"
              @click="subMySheet(mytag,index)"
            >{{mytag.name}}</li>
          </ul>
        </li>
        <li
          v-for="(tagCategory,index) of sheetCategoryLists.tagCategory"
          :key="index"
          class="tagCategory"
        >
          <span>{{tagCategory}}</span>
          <ul>
            <li
              v-for="(tag,i) of sheetCategoryLists.tagLists[index]"
              :key="i"
              class="tags"
              @click="addMySheet(tag)"
            >{{tag.name}}</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import ReturnHeader from "@/components/common/returnHeader";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      title: "歌单标签"
    };
  },
  mounted() {
    this.$store.dispatch("getSheetCategoryList");
    this.$store.dispatch("getLocalSheetTags");
  },
  computed: {
    ...mapGetters(["sheetCategoryLists", "mySheetTags"])
  },
  methods: {
    //添加我的歌单分类标签
    addMySheet(tag) {
      this.$store.dispatch("setMySheetTags", ["add", tag]);
    },
    //删除我的歌单分类标签
    subMySheet(tag, index) {
      if (index <= 2) {
        return;
      } else {
        this.$store.dispatch("setMySheetTags", ["sub", tag]);
      }
    }
  },
  components: {
    ReturnHeader
  }
};
</script>
<style lang="scss">
.sheetTag {
  width: 100%;
  margin: auto;
  .tagLists {
    width: 95%;
    margin: auto;
    .tagCategory {
      width: 100%;
      line-height: 40px;
      font-size: 18px;
      box-sizing: border-box;
      margin: 20px 0px;
      .tags {
        display: inline-block;
        width: 23%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background: #ececec;
        border-radius: 15px;
        margin: 10px 3px;
        font-size: 13px;
      }
    }
  }
}
</style>
