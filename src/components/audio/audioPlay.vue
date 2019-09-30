<template>
  <div class="audioPaly">
    <audio ref="audio" @ended="ended()" autoplay :src="currentSong" @canplay="getDuration()">
      <source :src="currentSong" type="audio/mpeg" />
    </audio>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      currentSong: ""
    };
  },
  computed: {
    ...mapGetters(["playMusic", "playing"])
  },
  watch: {
    playMusic() {
      this.currentSong = this.playMusic.url;
    },
    playing() {}
  },
  methods: {
    ended() {},
    getDuration() {}
  }
};
</script>
<style lang="scss">
</style>
