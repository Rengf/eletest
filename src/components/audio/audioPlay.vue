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
    ...mapGetters([
      "playMusic",
      "playing",
      "loopIndex",
      "sheetMusicLists",
      "musicMsg",
      "playIndex"
    ])
  },
  watch: {
    playMusic() {
      this.currentSong = this.playMusic.url;
    },
    playing() {
      var audio = this.$refs.audio;
      if (this.playing == true) {
        audio.play();
      } else {
        audio.pause();
      }
    },
    loopIndex: {
      handler(newval, oldval) {
        return newval;
      }
    },
    musicMsg: {
      handler() {
        var audio = this.$refs.audio;
        audio.volume = this.musicMsg.volume;
      },
      deep: true
    }
  },
  methods: {
    ended() {
      this.next();
    },
    next() {
      var index = 0;
      if (this.loopIndex == 0) {
        index = this.playIndex;
      } else if (this.loopIndex == 1) {
        index = this.playIndex + 1;
      } else {
        index = parseInt(Math.random() * this.sheetMusicLists.length);
      }
      var playMusic = [
        this.sheetMusicLists[index].id,
        this.sheetMusicLists[index].name,
        this.sheetMusicLists[index].ar[0].name
      ];
      this.$store.dispatch("playMusicIndex", index);
      this.$store.dispatch("getPlayMusic", playMusic);
    },
    getDuration() {
      var audio = this.$refs.audio;
      var musicMsg = {
        duration: audio.duration,
        volume: 0.5,
        currentTime: audio.currentTime,
        playbackRate: audio.playbackRate
      };
      this.$store.dispatch("setPlayMusicMsg", musicMsg);
      var timer = setInterval(() => {
        this.$store.dispatch("setMusic", ["currentTime", audio.currentTime]);
      }, 1000);
    }
  }
};
</script>
<style lang="scss">
</style>
