<template>
  <div class="navBar">
    <audio ref="audio" @ended="nextsong()">
      <source :src="currentSong" type="audio/mpeg" />
    </audio>
    <el-row>
      <el-col :span="24">
        <div class="bg-purple-dark">
          <el-row>
            <el-col :span="3">
              <div class="grid-content musicImg">
                <el-avatar :src="circleUrl"></el-avatar>
              </div>
            </el-col>
            <el-col :span="15">
              <div class="grid-content musicMessage">
                <div class="musicName">江南</div>
                <div class="musicSinger">林俊杰</div>
              </div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content musicPlay" @click="musicPlay">
                <span
                  class="fg1"
                  :class="{active:isActive}"
                  :style="{transform: 'rotate'+'('+fg1+'deg'+')'}"
                ></span>
                <span class="fg2" :style="{transform: 'rotate'+'('+fg2+'deg'+')'}"></span>
                <span class="iconfontBox">
                  <i class="iconfont" v-html="playIcon"></i>
                </span>
              </div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content musicList" @click="showMusicList()">
                <i class="iconfont">&#xe605;</i>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      circleUrl:
        "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
      playIcon: "&#xe658;",
      currentSong: require("../../assets/music/许嵩 - 玫瑰花的葬礼.mp3"),
      fg1: 0,
      fg2: 0,
      currentTime: 0, //当前播放时长
      duration: 0, //总时长
      timer: "",
      isActive: false
    };
  },
  mounted() {},
  methods: {
    musicPlay() {
      clearInterval(this.timer);
      var audio = this.$refs.audio;
      audio.playbackRate = 2;
      if (audio.paused || audio.ended) {
        audio.play();
        this.getCurrentTime();
      } else {
        audio.pause();
      }
      if (this.playIcon === "&#xe658;") {
        this.playIcon = "&#xe775;";
      } else {
        this.playIcon = "&#xe658;";
      }
    },
    showMusicList() {
      this.$emit("showMusicList", true);
    },
    nextsong() {
      this.currentSong = require("../../assets/music/李欣芸 - 宁静的海.mp3");
      this.musicPlay();
    },
    getCurrentTime() {
      var audio = this.$refs.audio;
      this.timer = setInterval(() => {
        this.currentTime = audio.currentTime;
        this.duration = audio.duration;
        this.fg1 = (this.currentTime / this.duration) * 360;
        if (this.fg1 >= 180) {
          this.isActive = true;
          this.fg1 = 0;
          this.fg2 = (this.currentTime / this.duration) * 360 - 180;
        }
      }, 1000);
    }
  }
};
</script>
<style lang="scss" scoped>
.iconfont {
  font-family: "iconfont" !important;
  font-size: 32px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.active {
  background: rgb(251, 3, 3) !important;
}
.navBar {
  position: fixed;
  bottom: 0;
  width: 100%;
  .bg-purple-dark {
    background: #fff;
    min-height: 36px;
    .musicImg {
      span {
        width: 36px;
        height: 36px;
        display: block;
        border-radius: 50%;
        margin: auto;
      }
    }
    .musicMessage {
      width: 100%;
      height: 100%;
      .musicName {
        width: 100%;
        height: 18px;
        font-size: 16px;
        line-height: 18px;
        font-weight: bold;
        color: #555;
      }
      .musicSinger {
        width: 100%;
        height: 18px;
        font-size: 13px;
        line-height: 18px;
        color: #888;
        letter-spacing: 1px;
      }
    }
    .musicPlay {
      position: relative;
      width: 36px;
      height: 36px;
      text-align: center;
      border-radius: 50%;
      background: rgb(251, 3, 3);
      .iconfontBox {
        position: absolute;
        width: 32px;
        height: 32px;
        left: 2px;
        top: 2px;
        background: #fff;
        border-radius: 50%;
        z-index: 2;
      }
      .fg1 {
        position: absolute;
        width: 18px;
        height: 36px;
        right: 0;
        top: 0px;
        background: #fff;
        border-top-right-radius: 18px 18px;
        border-bottom-right-radius: 18px 18px;
        transform-origin: 0% 50%;
        z-index: 1;
      }
      .fg2 {
        position: absolute;
        width: 18px;
        height: 36px;
        left: 0;
        top: 0;
        background: #fff;
        border-top-left-radius: 18px 18px;
        border-bottom-left-radius: 18px 18px;
        transform-origin: 100% 50%;
        z-index: 0;
      }
    }
    .musicList {
      text-align: center;
    }
    .grid-content {
      min-height: 36px;
    }
  }
}
</style>
