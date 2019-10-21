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
      currentSong: "",
      timer: ""
    };
  },
  computed: {
    ...mapGetters([
      "playMusic",
      "playing",
      "loopIndex",
      "playLists",
      "musicMsg",
      "playIndex",
      "newCurrentTime"
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
    },
    newCurrentTime() {
      var audio = this.$refs.audio;
      audio.currentTime = this.newCurrentTime;
      this.$store.dispatch("setMusic", ["currentTime", this.newCurrentTime]);
    }
  },
  methods: {
    //播放结束
    ended() {
      clearInterval(this.timer);
      this.next();
    },
    //下一曲
    next() {
      var index = 0;
      if (this.loopIndex == 0) {
        index = this.playIndex;
      } else if (this.loopIndex == 1) {
        index = this.playIndex + 1;
      } else {
        index = parseInt(Math.random() * this.playLists.length);
      }
      var playMusic = [
        this.playLists[index].id,
        this.playLists[index].name,
        this.playLists[index].ar[0].name,
        this.playLists[index].al.picUrl,
        this.playLists[index].ar[0].id
      ];
      this.$store.dispatch("playMusicIndex", index);
      this.$store.dispatch("getPlayMusic", playMusic);
    },
    //获取音乐信息
    getDuration() {
      var audio = this.$refs.audio;
      var musicMsg = {
        duration: audio.duration,
        volume: 0.5,
        currentTime: audio.currentTime,
        playbackRate: audio.playbackRate
      };
      this.$store.dispatch("setPlayMusicMsg", musicMsg);
      this.timer = setInterval(() => {
        this.$store.dispatch("setMusic", ["currentTime", audio.currentTime]);
      }, 1000);
    }
  }
};
</script>
<style lang="scss">
</style>
