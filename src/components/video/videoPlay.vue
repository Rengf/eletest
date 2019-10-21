<template>
  <div class="videoWrap">
    <video :src="playVideo.url" autoplay ref="video">
      <source :src="playVideo.url" type="video/mp4" />
    </video>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["playVideo"])
  },
  mounted() {
    console.log(this.playVideo);
  },
  watch: {
    playVideo: {
      handler(newval, oldval) {
        console.log(this.$refs.video);
      },
      deep: true
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
