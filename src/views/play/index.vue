<template>
  <div class="playWrap">
    <div class="playBox">
      <div class="palyHeader">
        <ul>
          <li class="return">
            <i class="iconfont">&#xe62d;</i>
          </li>
          <li class="musicMsg">
            <span class="musicName">2002年的第一场雪</span>
            <span class="singer">
              刀郎
              <i class="iconfont">&#xe60c;</i>
            </span>
          </li>
          <li class="live">
            <i class="iconfont">&#xe6b7;</i>
          </li>
          <li class="share">
            <i class="iconfont">&#xe63c;</i>
          </li>
        </ul>
      </div>
      <div class="playMain">
        <div class="musicImg" v-if="showImg"></div>
        <div class="musicLyric" v-else>
          <div class="volume">
            <span class="volumeImg iconfont">&#xec0a;</span>
            <div class="volumeBar" ref="volumeBar" @click.stop="jumpVolume"></div>
            <div class="volumedBar" ref="volumedBar">
              <span
                ref="volumePoint"
                class="volumePoint"
                @touchstart="startVolume"
                @touchmove="dragVolume"
              ></span>
            </div>
          </div>
          <div class="lyric">
            <scroll class="lyricList" ref="lyricList" :data="lyricData">
              <div class="lyricBox">
                <div v-if="lyricData">
                  <p
                    v-for="(line,index) in lyricData"
                    ref="lyricLine"
                    class="text"
                    :class="{'current': currentLineNum === index}"
                    :key="index"
                  >{{line.txt}}</p>
                </div>
              </div>
            </scroll>
          </div>
          <div clsss="subMenu"></div>
        </div>
      </div>
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
              <i class="iconfont" v-html="playIcon" @click="playPause()"></i>
            </li>
            <li>
              <i class="iconfont" @click="next()">&#xe7a9;</i>
            </li>
            <li>
              <i class="iconfont" @click="showMusicList()">&#xe605;</i>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <audio ref="audio" @ended="ended()" :src="currentSong" @canplay="getDuration">
      <source :src="currentSong" type="audio/mpeg" />
    </audio>
    <transition name="slide-fade">
      <MusicList v-if="isShowList" @showMusicList="showMusicList"></MusicList>
    </transition>
  </div>
</template>
<script>
import MusicList from "@/components/musicList/musicList";
import scroll from "@/components/common/scroll";
import { mapGetters } from "vuex";
import axios from "axios";
import Lyric from "lyric-parser";
export default {
  data() {
    return {
      isShowList: false,
      $timeBar: "",
      startX: 0, //点击时间时时间的开始位置
      timeBarLength: 0, //  滑竿多长距离
      positionX: 0, //时间点距离
      timer: "", //定时器
      autox: 0, //每秒移动距离
      playIcon: "&#xe75e;",
      loopIndex: 0,
      switchLoopData: ["&#xe603;", "&#xe600;", "&#xe628;"],
      currentSong: "",
      duration: 0, //总时长，按秒为单位
      currentTime: 0, //已播放时长，秒
      playBackRate: 1, //播放速度
      showImg: false,
      startVolumeX: 0,
      volumePositionX: 0,
      volumeBarLength: 0,
      lyric: null,
      currentLineNum: 0
    };
  },
  created() {
    this.$nextTick(() => {
      this.initDefault();
    });
  },
  mounted() {},
  components: {
    MusicList,
    scroll
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
  computed: {
    ...mapGetters(["playMusic", "sheetMusicLists", "playIndex"]),
    lyricData() {
      return this.lyric ? this.lyric.lines : [];
    }
  },
  watch: {
    playMusic() {
      if (this.lyric) {
        this.lyric.stop();
        this.currentLineNum = 0;
        this.currentTime = 0;
        this.lyric = null;
      }

      this.positionX = 0;
      this.$refs.timePoint.style.left = this.positionX + "px";
      this.currentLineNum = 0;
      this.currentTime = 0;
      this.lyric = null;
      this.musicPlay();
    }
  },
  destroyed() {
    clearTimeout(this.timer);
  },
  methods: {
    getLyric() {
      axios
        .get("http://localhost:3000/lyric?id=" + this.playMusic.id)
        .then(res => {
          if (res.data.code == 200) {
            this.lyric = new Lyric(res.data.lrc.lyric, this.handl);
            this.lyric.seek(this.currentTime * 1000);
          }
        });
    },
    handl({ lineNum, txt }) {
      console.log(lineNum, txt);
      this.lyricBoxDrift();
      if (!this.$refs.lyricLine) {
        return;
      }
      this.currentLineNum = lineNum;
      if (lineNum > 5) {
        let lineEl = this.$refs.lyricLine[lineNum - 5];
        this.$refs.lyricList.scrollToElement(lineEl, 1000);
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000);
      }
    },
    getDuration() {
      var audio = this.$refs.audio;
      this.duration = audio.duration;
    },
    showMusicList(showMusicList) {
      if (showMusicList == undefined) {
        this.isShowList = true;
      } else {
        this.isShowList = showMusicList;
      }
    },
    playPause() {
      var audio = this.$refs.audio;
      if (audio.paused || audio.ended) {
        audio.play();
        this.autoPlay();
        this.playIcon = "&#xe775;";
      } else {
        clearInterval(this.timer);
        audio.pause();
        this.playIcon = "&#xe75e;";
      }
    },
    musicPlay() {
      this.getLyric();
      this.currentSong = this.playMusic.url;
      if (this.currentSong == undefined) {
        return;
      }
      var audio = this.$refs.audio;
      this.$nextTick(() => {
        this.playBackRate = audio.playbackRate = 1;
        audio.play();
        this.autoPlay();
        this.playIcon = "&#xe775;";
      });
    },
    ended() {
      var audio = this.$refs.audio;
      this.positionX = 0;
      this.$refs.timePoint.style.left = this.positionX + "px";
      if (this.loopIndex == 0) {
        this.musicPlay();
      } else if (this.loopIndex == 1) {
        this.next();
      }
    },
    next() {
      this.$store.dispatch("playMusicIndex", this.playIndex + 1);
      this.$store.dispatch(
        "getPlayMusic",
        this.sheetMusicLists[this.playIndex + 1].id
      );
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
      var audio = this.$refs.audio;
      var _this = this;
      this.$timeBar = this.$refs.timeBar;
      this.$volumeBar = this.$refs.volumeBar;
      this.timeBarLength = this.$timeBar.clientWidth;
      this.volumeBarLength = this.$volumeBar.clientWidth;
      this.volumePositionX = 0.5 * this.volumeBarLength;
      audio.volume = this.volumePositionX / this.volumeBarLength;
      this.$refs.volumePoint.style.left = this.volumePositionX + "px";
      this.$refs.volumedBar.style.width = this.volumePositionX + "px";
      this.currentSong = this.playMusic.url;
    },
    controlStart(e) {
      this.startX = e.touches[0].pageX;
    },
    dragTime(e) {
      var slidedis = e.touches[0].pageX;
      if (slidedis - 43 > this.timeBarLength || slidedis - 43 < 0) {
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
        this.currentTime = audio.currentTime;
        this.positionX += this.autox;
        if (this.timeBarLength < this.positionX + this.autox) {
          this.$refs.timePoint.style.left = this.timeBarLength - 5 + "px";
          clearInterval(this.timer);
        } else {
          this.$refs.timePoint.style.left = this.positionX + "px";
        }
      }, 1000);
    },
    jumpVolume(e) {},
    startVolume(e) {
      this.startVolumeX = e.touches[0].pageX;
    },
    dragVolume(e) {
      var audio = this.$refs.audio;
      var slidedis = parseInt(e.touches[0].pageX);
      if (slidedis - 44 > this.volumeBarLength || slidedis - 44 < 0) {
        return;
      } else {
        this.volumePositionX = slidedis - 44;
        audio.volume = this.volumePositionX / this.volumeBarLength;
        this.$refs.volumePoint.style.left = this.volumePositionX + "px";
        this.$refs.volumedBar.style.width = this.volumePositionX + "px";
      }
    },
    lyricBoxDrift() {
      var fa = this.$refs.lyricList.$el.style;
      console.log(fa);
    }
  }
};
</script>
<style lang="scss" scoped>
.iconfont {
  font-size: 20px;
  color: #fff;
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

.playWrap {
  width: 100%;
  .playBox {
    width: 100%;
    .palyHeader {
      width: 95%;
      margin: auto;
      height: 40px;
      background: #ccc;
      ul {
        display: flex;
        li {
          height: 40px;
          border: 1px solid #ccc;
        }
        .return {
          flex: 1;
          line-height: 40px;
        }
        .musicMsg {
          flex: 5;
          .musicName {
            margin: 5px 0;
            font-size: 16px;
            display: block;
            color: #fff;
          }
          .singer {
            font-size: 14px;
            color: #eee;
            i {
              font-size: 16px;
              color: #eee;
              line-height: 16px;
              margin-left: -6px;
            }
          }
        }
        .live {
          flex: 1;
          text-align: center;
          line-height: 40px;
        }
        .share {
          flex: 1;
          text-align: center;
          line-height: 40px;
        }
      }
    }
    .playMain {
      width: 95%;
      margin: 10px auto;
      height: 530px;
      background: #bcbcbc;
      .musicLyric {
        width: 100%;
        .volume {
          position: relative;
          width: 100%;
          height: 20px;
          display: flex;
          .volumeImg {
            flex: 1;
          }
          .volumeBar {
            flex: 15;
            margin: 0 30px 0 10px;
            height: 2px;
            background: #888;
            border-radius: 1px;
            float: right;
            margin-top: 9px;
          }
          .volumedBar {
            position: absolute;
            width: 0px;
            height: 2px;
            background: #fff;
            margin: 9px 0px 9px 30px;
            .volumePoint {
              position: absolute;
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background: #fff;
              top: -4px;
            }
          }
        }
        .lyric {
          position: relative;
          height: 500px;
          overflow: hidden;
          .lyricList {
            width: 100%;
            height: 100%;
            overflow: hidden;
            .lyricBox {
              position: absolute;
              width: 100%;
              text-align: center;
              .text {
                line-height: 32px;
                color: rgba(255, 255, 255, 0.5);
                font-size: 16px;
              }
              .current {
                color: #ff6c32;
              }
            }
          }
        }
      }
    }
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
