<template>
  <div class="navBar">
    <el-row>
      <el-col :span="24">
        <div class="bg-purple-dark" @click="toPlay">
          <el-row>
            <el-col :span="3">
              <div class="grid-content musicImg">
                <img :src="playMusic.image||circleUrl" />
              </div>
            </el-col>
            <el-col :span="15">
              <div class="grid-content musicMessage">
                <div class="musicName">{{playMusic.name}}</div>
                <div class="musicSinger">{{playMusic.singer}}</div>
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
    <transition name="slide-fade">
      <MusicList v-if="isShowList" @showMusicList="showMusicList"></MusicList>
    </transition>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import MusicList from "@/components/musicList/musicList";
export default {
  data() {
    return {
      circleUrl: require("../../assets/images/avatar.png"),
      playIcon: "&#xe658;",
      fg1: 0,
      fg2: 0,
      currentTime: 0, //当前播放时长
      duration: 0, //总时长
      timer: "",
      isActive: false,
      isShowList: false
    };
  },
  mounted() {
    this.getPlaying();
  },
  computed: {
    ...mapGetters(["playing", "playMusic"])
  },
  watch: {
    playing() {
      this.getPlaying();
    }
  },

  methods: {
    //播放图标显示控制
    getPlaying() {
      if (this.playing == true) {
        this.playIcon = "&#xe775;";
      } else {
        this.playIcon = "&#xe658;";
      }
    },
    //点击事件设置
    cancelBubble(e) {
      var evt = e ? e : window.event;
      if (evt.stopPropagation) {
        evt.stopPropagation();
      } else {
        evt.cancelBubble = true;
      }
    },
    //播放控制
    musicPlay(e) {
      this.cancelBubble(e);
      if (this.playing == true) {
        this.$store.dispatch("isPlaying", false);
      } else {
        this.$store.dispatch("isPlaying", true);
      }
    },
    //显示音乐列表
    showMusicList(e) {
      this.cancelBubble(e);
      this.isShowList = !this.isShowList;
    },
    //跳转到播放页
    toPlay() {
      this.$router.push({ path: "/play" });
    }
  },
  components: {
    MusicList
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
      img {
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
      overflow: hidden;
      .musicName {
        width: auto;
        margin: 5px 0;
        font-size: 14px;
        display: inline-block;
        color: #535353;
        white-space: nowrap;
        animation: 10s wordsLoop linear infinite normal;
      }
      .stop {
        width: auto;
        margin: 5px 0;
        font-size: 16px;
        display: inline-block;
        color: #fff;
        white-space: nowrap;
      }
      .musicSinger {
        width: 100%;
        height: 14px;
        font-size: 12px;
        line-height: 14px;
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
