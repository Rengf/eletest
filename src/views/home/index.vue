<template>
  <div class="indexWrap">
    <transition name="slider-slide-fade">
      <SliderBar v-if="isShowSlider" @showSliderBar="showSliderBar"></SliderBar>
    </transition>
    <HeaderBar @showSliderBar="showSliderBar"></HeaderBar>
    <router-view></router-view>
    <transition name="slide-fade">
      <MusicList v-if="isShowList" @showMusicList="showMusicList"></MusicList>
    </transition>
    <NavBar @showMusicList="showMusicList"></NavBar>
    <!-- <MusicPlay @showMusicList="showMusicList"></MusicPlay> -->
  </div>
</template>

<script>
import HeaderBar from "@/components/common/headerBar";
import NavBar from "@/components/common/navBar"; // 组件
import MusicList from "@/components/musicList/musicList";
import SliderBar from "@/components/sliderBar/sliderBar";
import MusicPlay from "views/play/index";
export default {
  name: "home",
  components: {
    NavBar,
    MusicList,
    HeaderBar,
    SliderBar,
    MusicPlay
  },
  data() {
    return {
      isShowList: false,
      isShowSlider: false
    };
  },

  created() {
    //
  },

  mounted() {
    //
  },
  methods: {
    showMusicList(showMusicList) {
      this.isShowList = showMusicList;
    },
    showSliderBar(showSliderBar) {
      console.log();
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

