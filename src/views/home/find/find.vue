<template>
  <scroll class="homeWrap">
    <div>
      <Carousel></Carousel>
      <Menu></Menu>
      <Sheet></Sheet>
    </div>
  </scroll>
</template>
<script>
import scroll from "@/components/common/scroll";
import Carousel from "views/home/find/find/carousel";
import Menu from "views/home/find/find/menu";
import Sheet from "views/home/find/find/sheet";
export default {
  data() {
    return {};
  },
  components: {
    Carousel,
    Menu,
    Sheet,
    scroll
  }
};
</script>
<style lang="scss" scoped>
.homeWrap {
  width: 100%;
  height: calc(100vh - 76px);
  overflow: hidden;
}
</style>
