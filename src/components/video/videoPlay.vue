<template>
  <div class="videoWrap" @click="showControls()">
    <video :src="videoUrl" preload="auto" ref="video" @canplay="getDuration()" @ended="ended">
      <source :src="videoUrl" type="video/mp4" />
      <source :src="videoUrl" type="video/ogg" />
    </video>
    <transition name="slide-fade">
      <div class="controls" :class="{active:isShowControls}">
        <div class="controlsMain">
          <i class="iconfont" v-html="playIcon" @click.stop="playPaused()"></i>
        </div>
        <div class="controlsFooter">
          <div class="playMsg">
            <div class="playTime">{{currentTime|filterTime}}/{{duration|filterTime}}</div>
            <div class="fullScreen">
              <i class="iconfont">&#xe6aa;</i>
            </div>
          </div>
          <div class="progressBar">
            <div class="timeBar" ref="timeBar" @click.stop="jumpTime"></div>
            <div class="timedBar" ref="timedBar" @click.stop="jumpTime">
              <span class="timePoint" ref="timePoint" @touchstart="startTime" @touchmove="dragTime"></span>
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
      default: ""
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
    this.$nextTick(() => {
      this.$refs.video.play();
      this.playIcon = "&#xe775;";
    });
    this.initDefault();
  },
  destroyed() {
    clearInterval(this.timer);
  },
  watch: {},
  methods: {
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
      var video = this.$refs.video;
      this.duration = Math.ceil(video.duration);
      var pageX = (this.timeBarLength - 10) / this.duration; //减去时间点的宽度
      this.timer = setInterval(() => {
        this.currentTime = Math.ceil(video.currentTime);
        this.$refs.timedBar.style.width = pageX * this.currentTime + "px";
        this.$refs.timePoint.style.left = pageX * this.currentTime + "px";
      }, 1000);
    },
    startTime(e) {
      console.log(e.touches[0]);
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
    }
  }
};
</script>
<style lang="scss" scoped>
.iconfont {
  color: #fff;
  font-size: 25px;
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

.videoWrap {
  width: 100%;
  position: relative;
  video {
    width: 100%;
    // height: 300px;
  }
  .controls {
    position: absolute;
    top: 0px;
    width: 100%;
    height: 203px;
    z-index: 999;
    .controlsMain {
      width: 25px;
      height: 25px;
      margin: auto;
      margin-top: 22%;
    }
    .controlsFooter {
      width: 100%;
      height: 35px;
      position: absolute;
      bottom: -6px;
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
