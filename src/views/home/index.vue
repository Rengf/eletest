<template>
  <div class="indexWrap">
    <transition name="slider-slide-fade">
      <SliderBar v-if="isShowSlider" @showSliderBar="showSliderBar"></SliderBar>
    </transition>
    <HeaderBar @showSliderBar="showSliderBar"></HeaderBar>
    <router-view></router-view>
    <NavBar></NavBar>
  </div>
</template>

<script>
import HeaderBar from "@/components/common/headerBar";
import NavBar from "@/components/navBar/navBar"; // 组件
import SliderBar from "@/components/sliderBar/sliderBar";
import MusicPlay from "views/play/index";
import { mapGetters } from "vuex";
export default {
  name: "home",
  components: {
    NavBar,
    HeaderBar,
    SliderBar,
    MusicPlay
  },
  data() {
    return {
      isShowSlider: false
    };
  },

  created() {
    //
  },

  mounted() {},
  computed: {
    ...mapGetters(["sheetCategoryLists"])
  },
  methods: {
    //显示设置页
    showSliderBar(showSliderBar) {
      this.isShowSlider = showSliderBar;
    }
  }
};
</script>

<style lang="scss" scoped>
.indexWrap {
  width: 100%;
  overflow: hidden;
}

.slide-fade-enter-active {
  transition: all 0.3s linear;
}

.slide-fade-leave-active {
  transition: all 0.3s linear;
}

.slide-fade-enter,
.slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */

 {
  transform: translateY(100%);
  opacity: 1;
}

.slier-slide-fade-enter-active {
  transition: all 0.5s linear;
}

.slier-slide-fade-leave-active {
  transition: all 0.5s linear;
}

.slier-slide-fade-enter,
.slier-slide-fade-leave-to {
  transform: translateY(100%);
  opacity: 1;
}
</style>

