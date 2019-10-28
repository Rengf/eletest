<template>
  <div class="videoWrap" ref="videoWrap" @click="showControls()">
    <video
      :src="videoUrl"
      preload="auto"
      ref="video"
      @canplay="getDuration()"
      @ended="ended"
      autoplay
    >
      <source :src="videoUrl" type="video/mp4" />
      <source :src="videoUrl" type="video/ogg" />
    </video>
    <transition name="slide-fade">
      <div class="controls" :class="{active:isShowControls}" ref="controls">
        <div class="controlsMain">
          <i class="iconfont" v-html="playIcon" @click.stop="playPaused()"></i>
        </div>
        <div class="controlsFooter">
          <div class="playMsg">
            <div class="playTime">{{currentTime|filterTime}}/{{duration|filterTime}}</div>
            <div class="fullScreen">
              <i class="iconfont" @click.stop="fullScreen()">&#xe6aa;</i>
            </div>
          </div>
          <div class="progressBar">
            <div class="timeBar" ref="timeBar" @click.stop="jumpTime"></div>
            <div class="timedBar" ref="timedBar" @click.stop="jumpTime">
              <span class="timePoint" ref="timePoint" @touchmove="dragTime"></span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  props: {
    videoUrl: {
      type: String,
      default: require("../../assets/video/overview.webm")
    }
  },
  data() {
    return {
      playIcon: "&#xe75e;",
      isShowControls: false,
      duration: 0,
      currentTime: 0,
      timeBarLength: 0,
      timedBarLength: 0,
      timer: null
    };
  },
  filters: {
    filterTime(value) {
      if (!value) {
        return "00:00";
      }
      var timeString = "";
      var min = parseInt(value / 60);
      var seconds = parseInt(value % 60);
      if (min >= 10) {
        timeString = min + ":";
      } else {
        timeString = "0" + min + ":";
      }
      if (seconds >= 10) {
        timeString = timeString + seconds;
      } else {
        timeString = timeString + "0" + seconds;
      }
      return timeString;
    }
  },
  computed: {},
  mounted() {
    // this.setyl();
    this.initDefault();
  },
  destroyed() {
    clearInterval(this.timer);
  },
  watch: {},
  methods: {
    setyl() {
      this.$refs.video.muted = false;
    },
    initDefault() {
      this.timeBarLength = this.$refs.timeBar.offsetWidth;
      this.timeeBarLength = this.$refs.timedBar.offsetWidth;
    },
    showControls() {
      this.isShowControls = !this.isShowControls;
      this.$emit("showControls", this.isShowControls);
    },
    playPaused() {
      if (this.$refs.video.paused) {
        this.$refs.video.play();
        this.playIcon = "&#xe775;";
        this.getDuration();
      } else {
        this.$refs.video.pause();
        this.playIcon = "&#xe75e;";
        clearInterval(this.timer);
      }
    },
    getDuration() {
      try {
        this.$refs.video.play();
        this.playIcon = "&#xe775;";
        clearInterval(this.timer);
        var video = this.$refs.video;
        this.duration = Math.ceil(video.duration);
        var pageX = (this.timeBarLength - 10) / this.duration; //减去时间点的宽度
        this.timer = setInterval(() => {
          this.currentTime = Math.ceil(video.currentTime);
          this.$refs.timedBar.style.width = pageX * this.currentTime + "px";
          this.$refs.timePoint.style.left = pageX * this.currentTime + "px";
        }, 1000);
      } catch (e) {
        console.log(e);
      }
    },
    dragTime(e) {
      var video = this.$refs.video;
      var slidedis = e.touches[0].pageX;
      if (slidedis > this.timeBarLength || slidedis < 0) {
        return;
      }
      var newTime = (slidedis / this.timeBarLength) * this.duration;
      video.currentTime = newTime;
      this.$refs.timedBar.style.width = slidedis + "px";
      this.$refs.timePoint.style.left = slidedis + "px";
    },
    jumpTime(e) {
      var video = this.$refs.video;
      var slidedis = e.offsetX;
      var newTime = (slidedis / this.timeBarLength) * this.duration;
      video.currentTime = newTime;
      this.$refs.timedBar.style.width = slidedis + "px";
      this.$refs.timePoint.style.left = slidedis + "px";
    },
    ended() {
      setTimeout(() => {
        clearInterval(this.timer);
        this.playIcon = "&#xe75e;";
      }, 1000);
    },

    //全屏切换
    fullScreen() {
      if (
        this.$refs.videoWrap.scrollHeight === window.screen.height &&
        this.$refs.videoWrap.scrollWidth === window.screen.width
      ) {
        if (document.exitFullScreen) {
          document.exitFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (element.msExitFullscreen) {
          element.msExitFullscreen();
        }
      } else {
        if (this.$refs.videoWrap.requestFullscreen) {
          this.$refs.videoWrap.requestFullscreen();
        } else if (this.$refs.videoWrap.mozRequestFullScreen) {
          this.$refs.videoWrap.mozRequestFullScreen();
        } else if (this.$refs.videoWrap.webkitRequestFullscreen) {
          this.$refs.videoWrap.webkitRequestFullscreen();
        } else if (this.$refs.videoWrap.msRequestFullscreen) {
          this.$refs.videoWrap.msRequestFullscreen();
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.iconfont {
  color: #fff;
  font-size: 20px;
}

.active {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s linear;
}

.slide-fade-leave-active {
  transition: all 0.3s linear;
}

.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
}

video::-webkit-media-controls {
  display: none !important;
}

.videoWrap {
  width: 100%;
  position: relative;
  video {
    position: relative;
    width: 100%;
    height: 100%;
    left: 50%;
    margin-left: -50%;
  }
  .controls {
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100%;
    z-index: 999;
    .controlsMain {
      position: relative;
      width: 25px;
      height: 25px;
      left: 50%;
      top: 50%;
      margin-left: -13px;
      margin-top: -13px;
    }
    .controlsFooter {
      width: 100%;
      height: 35px;
      position: absolute;
      bottom: 0;
      .playMsg {
        width: 95%;
        height: 25px;
        margin: auto;
        div {
          display: inline-block;
          color: #fff;
          line-height: 25px;
        }
        .playTime {
          font-size: 12px;
        }
        .fullScreen {
          float: right;
        }
      }
      .progressBar {
        width: 100%;
        height: 10px;
        .timeBar {
          position: relative;
          width: 100%;
          height: 2px;
          background: rgb(255, 255, 255, 0.4);
          top: 2px;
        }
        .timedBar {
          top: 0px;
          width: 0px;
          position: relative;
          height: 2px;
          background: rgb(253, 2, 2);
          .timePoint {
            position: absolute;
            display: block;
            width: 10px;
            height: 10px;
            top: -4px;
            background: rgb(255, 1, 1);
            border-radius: 50%;
          }
        }
      }
    }
  }
}
</style>
