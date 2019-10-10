<template>
  <div class="sheetTag">
    <button @click="gettag()">获取标签</button>
    <ul>
      <li v-for="(tagCategory,index) in sheetCategoryLists" :key="index"></li>
    </ul>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getSheetCategoryList");
  },
  computed: {
    ...mapGetters(["sheetCategoryLists"])
  },
  methods: {
    gettag() {
      console.log(this.sheetCategoryLists);
    }
  }
};
</script>
<style lang="scss">
</style>
