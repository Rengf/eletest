<template>
  <div class="navBar">
    <audio ref="audio" @ended="nextsong()">
      <source src="../../assets/music/许嵩 - 玫瑰花的葬礼.mp3" type="audio/mpeg" />
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
              <div class="grid-content musicPlay">
                <i class="iconfont" @click="musicPlay" v-html="playIcon"></i>
              </div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content musicList" @click="showMusicList">
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
      currentSong: "../../assets/music/许嵩 - 玫瑰花的葬礼.mp3"
    };
  },
  methods: {
    musicPlay() {
      var audio = this.$refs.audio;
      console.log(audio);
      audio.play();
      if (this.playIcon === "&#xe658;") {
        this.playIcon = "&#xe775;";
      } else {
        this.playIcon = "&#xe658;";
      }
    },
    showMusicList() {
      this.$emit("showMusicList", true);
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
      text-align: center;
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
