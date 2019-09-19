<template>
  <div class="homeWrap">
    <Carousel></Carousel>
    <Menu></Menu>
    <Sheet :sheetList="sheetList"></Sheet>
  </div>
</template>
<script>
import Carousel from "views/home/find/find/carousel";
import Menu from "views/home/find/find/menu";
import Sheet from "views/home/find/find/sheet";
export default {
  data() {
    return {
      sheetList: {}
    };
  },
  components: {
    Carousel,
    Menu,
    Sheet
  }
};
</script>
<style lang="scss" scoped>
</style>
