<template>
  <div class="playWrap">
    <div class="playBox">
      <div class="palyHeader"></div>
      <div class="playMain"></div>
      <div class="playBar">
        <div class="timeAxisBox">
          <span class="currentTime">{{currentTime|filterTime}}</span>
          <div class="timeAxis">
            <div class="timeBar" ref="timeBar" @click.stop="jumpTime"></div>
            <span
              ref="timePoint"
              class="timePoint"
              @touchstart="controlStart"
              @touchmove="dragTime"
            ></span>
          </div>
          <span class="duration">{{duration|filterTime}}</span>
        </div>
        <div class="playControl">
          <ul>
            <li>
              <i class="iconfont" v-html="switchLoopData[loopIndex]" @click="switchLoop">&#xe628;</i>
            </li>
            <li>
              <i class="iconfont">&#xe604;</i>
            </li>
            <li>
              <i class="iconfont" v-html="playIcon" @click="musicPlay"></i>
            </li>
            <li>
              <i class="iconfont">&#xe7a9;</i>
            </li>
            <li>
              <i class="iconfont">&#xe605;</i>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <audio ref="audio" @ended="ended()">
      <source :src="currentSong" type="audio/mpeg" />
    </audio>
  </div>
</template>
<script>
export default {
  data() {
    return {
      $timeBar: "",
      startX: 0,
      timeBarLength: 0, //  滑竿多长距离
      positionX: 0,
      timer: "",
      autox: 0,
      playIcon: "&#xe75e;",
      loopIndex: 0,
      switchLoopData: ["&#xe603;", "&#xe600;", "&#xe628;"],
      currentSong: require("../../assets/music/许嵩 - 玫瑰花的葬礼.mp3"),
      duration: 0,
      currentTime: 0,
      playBackRate: 1 //播放速度
    };
  },
  created() {
    this.$nextTick(() => {
      this.initDefault();
    });
  },
  filters: {
    filterTime(value) {
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
  methods: {
    musicPlay() {
      var audio = this.$refs.audio;

      this.playBackRate = audio.playbackRate = 1;
      this.duration = audio.duration;
      if (audio.paused || audio.ended) {
        audio.play();
        this.autoPlay();
      } else {
        clearInterval(this.timer);
        audio.pause();
      }
      if (this.playIcon === "&#xe75e;") {
        this.playIcon = "&#xe775;";
      } else {
        this.playIcon = "&#xe75e;";
      }
    },
    ended() {
      var audio = this.$refs.audio;
      this.positionX = 0;
      this.$refs.timePoint.style.left = this.positionX + "px";
      if (this.loopIndex == 0) {
        this.musicPlay();
      }
      if (this.playIcon === "&#xe75e;") {
        this.playIcon = "&#xe775;";
      } else {
        this.playIcon = "&#xe75e;";
      }
    },
    switchLoop() {
      var audio = this.$refs.audio;
      if (this.loopIndex < 2) {
        this.loopIndex++;
      } else {
        this.loopIndex = 0;
      }
    },
    initDefault() {
      var _this = this;
      this.$timeBar = this.$refs.timeBar;
      this.timeBarLength = this.$timeBar.clientWidth;
      console.log(this.timeBarLength);
    },
    controlStart(e) {
      this.startX = e.touches[0].pageX;
      console.log(this.startX);
    },
    dragTime(e) {
      var slidedis = e.touches[0].pageX;
      if (this.timeBarLength < this.positionX + this.autox + 5) {
        return;
      }
      this.positionX = slidedis - 43;
      this.$refs.timePoint.style.left = this.positionX + "px";
    },
    jumpTime(e) {
      var audio = this.$refs.audio;
      this.positionX = e.offsetX;
      this.$refs.timePoint.style.left = this.positionX + "px";
      audio.currentTime = (this.positionX / this.timeBarLength) * this.duration;
      if (this.timeBarLength < this.positionX + 5) {
        clearInterval(this.timer);
        this.$refs.timePoint.style.left = this.timeBarLength - 5 + "px";
      } else {
        this.autoPlay();
      }
    },
    autoPlay() {
      var audio = this.$refs.audio;
      clearInterval(this.timer);
      this.autox = (this.timeBarLength / this.duration) * this.playBackRate;
      this.timer = setInterval(() => {
        console.log(audio.played);
        this.currentTime = audio.currentTime;
        this.positionX += this.autox;
        if (this.timeBarLength < this.positionX + this.autox) {
          this.$refs.timePoint.style.left = this.timeBarLength - 5 + "px";
          clearInterval(this.timer);
        } else {
          this.$refs.timePoint.style.left = this.positionX + "px";
        }
      }, 1000);
    }
  }
};
</script>
<style lang="scss" scoped>
.iconfont {
  font-size: 20px;
  color: #fff;
}
.playWrap {
  width: 100%;
  .playBox {
    width: 100%;
    .playBar {
      width: 100%;
      .timeAxisBox {
        display: flex;
        width: 95%;
        height: 15px;
        margin: auto;
        background: #ccc;
        .timeAxis {
          flex: 12;
          position: relative;
          .timeBar {
            width: 100%;
            margin: auto;
            height: 1px;
            margin-top: 7px;
            border-radius: 1px 1px 1px 1px;
            background: #bc381c;
          }
          .timePoint {
            top: 5px;
            position: absolute;
            width: 5px;
            height: 5px;
            display: block;
            border-radius: 50%;
            background: #1b2af2;
          }
        }
        span {
          display: block;
          font-size: 12px;
          line-height: 15px;
          flex: 2;
          text-align: center;
        }
      }
      .playControl {
        width: 95%;
        margin: auto;
        ul {
          width: 100%;
          height: 30px;
          background: #bcbcbc;
          display: flex;
          li {
            flex: 1;
            line-height: 30px;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
