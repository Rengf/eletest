<template>
  <div class="videoWrap" @click="showControls()">
    <video :src="videoUrl" preload="auto" ref="video" @canplay="getDuration()">
      <source :src="videoUrl" type="video/mp4" />
      <source :src="videoUrl" type="video/ogg" />
    </video>
    <transition name="slide-fade">
      <div class="controls" v-show="isShowControls">
        <div class="controlsMain">
          <i class="iconfont" v-html="playIcon" @click.stop="playPaused()"></i>
        </div>
        <div class="controlsFooter">
          <div class="playMsg">
            <div class="playTime">{{currentTime|filterTime}}/{{duration|filterTime}}</div>
            <div class="fullScreen">
              <i class="iconfont">&#xe607;</i>
            </div>
          </div>
          <div class="progressBar">
            <div class="timeBar" ref="timeBar"></div>
            <div class="timedBar">
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
  watch: {},
  methods: {
    initDefault() {
      console.log(this.$refs.timeBar.clientWidth);
      this.timeBarLength = this.$refs.timeBar.clientWidth;
    },
    showControls() {
      this.isShowControls = !this.isShowControls;
      this.$emit("showControls", this.isShowControls);
    },
    playPaused() {
      if (this.$refs.video.paused) {
        this.$refs.video.play();
        this.playIcon = "&#xe775;";
      } else {
        this.$refs.video.pause();
        this.playIcon = "&#xe75e;";
      }
    },
    getDuration() {
      var video = this.$refs.video;
      this.duration = video.duration;
      this.timer = setInterval(() => {
        this.currentTime = video.currentTime;
        // this.$refs.timePoint.style.left = pageX + "px";
      }, 1000);
    },
    startTime(e) {
      console.log(e.touches[0]);
    },
    dragTime() {}
  }
};
</script>
<style lang="scss" scoped>
.iconfont {
  color: #fff;
  font-size: 25px;
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
      height: 30px;
      position: absolute;
      bottom: -2px;
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
        height: 5px;
        .timeBar {
          position: relative;
          width: 100%;
          height: 1px;
          background: rgba(199, 198, 198, 0.486);
          top: 2px;
        }
        .timedBar {
          top: 0px;
          position: relative;
          width: 100%;
          height: 1px;
          background: rgb(253, 2, 2);
          .timePoint {
            position: absolute;
            display: block;
            width: 5px;
            height: 5px;
            top: -2px;
            background: rgb(255, 1, 1);
            border-radius: 50%;
          }
        }
      }
    }
  }
}
</style>
