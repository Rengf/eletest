<template>
  <div class="musicListWrap" @click.self="showMusicList">
    <div class="musicListBox">
      <div class="musicListHeader">
        <el-row>
          <el-col :span="15">
            <div class="grid-content loopPlay" @click="switchLoop">
              <i class="iconfont" v-html="switchLoopData[loopIndex].loopIcon"></i>
              <span>{{switchLoopData[loopIndex].loopString}}||（{{playLists.length}}）</span>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="grid-content collectAll" @click="collectAll()">
              <i class="iconfont">&#xe625;</i>
              <span>全部收藏</span>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content deleteAll" @click="deleteMusic()">
              <i class="iconfont">&#xe601;</i>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="musicListMain">
        <ul>
          <li v-for="(music,index) of playLists" :key="index">
            <p>
              <span class="musicName" @click="playMusic(index)">{{music.name}}</span>
              <span class="musicSinger">-{{music.ar[0].name}}</span>
            </p>
            <span class="delete" @click="deleteMusic(index)">
              <i class="iconfont">&#xe607;</i>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "musicList",
  components: {},

  // data
  data() {
    return {
      componentName: "musicList",
      switchLoopData: [
        { loopIcon: "&#xe603;", loopString: "单曲循环" },
        { loopIcon: "&#xe600;", loopString: "列表循环" },
        { loopIcon: "&#xe628;", loopString: "随机播放" }
      ]
    };
  },

  created() {
    //
  },

  mounted() {
    // this.$store.dispatch("getSheetMusicList");
  },
  computed: {
    ...mapGetters(["playLists", "loopIndex"])
  },
  methods: {
    switchLoop() {
      if (this.loopIndex < 2) {
        this.$store.dispatch("setSwitchLoop", this.loopIndex + 1);
      } else {
        this.$store.dispatch("setSwitchLoop", 0);
      }
    },
    deleteMusic(id) {
      if (id !== undefined) {
        this.musicList.splice(id, 1);
      } else {
        this.musicList.splice(0, this.musicList.length);
      }
    },
    collectAll() {},
    showMusicList() {
      this.$emit("showMusicList", false);
    },
    playMusic(index) {
      var playMusic = [
        this.playLists[index].id,
        this.playLists[index].name,
        this.playLists[index].ar[0].name,
        this.playLists[index].al.picUrl
      ];
      this.$store.dispatch("playMusicIndex", index);
      this.$store.dispatch("getPlayMusic", playMusic);
      this.$store.dispatch("isPlaying", true);
    }
  }
};
</script>

<style lang="scss" scoped>
.iconfont {
  font-family: "iconfont" !important;
  font-size: 20px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.musicListWrap {
  position: fixed;
  background: rgba($color: #888, $alpha: 0.3);
  top: 0px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 99999;
  .musicListBox {
    position: relative;
    width: 100%;
    line-height: 36px;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    margin-top: 70%;
    z-index: 9999;
    background: #fff;
    .musicListHeader {
      height: 36px;
      font-size: 14px;
      border-bottom: 1px solid #eee;
      .loopPlay {
        i {
          font-weight: bold;
          font-size: 18px;
          margin-left: 10px;
          margin-right: 5px;
        }
      }
      .collectAll {
        i {
          margin-left: 5px;
        }
        span {
          padding: 0 8px;
        }
      }
      .deleteAll {
        text-align: center;
      }
    }

    .musicListMain {
      width: 100%;
      height: 350px;
      overflow: scroll;
      ul {
        width: 100%;
        li {
          position: relative;
          width: 100%;
          height: 36px;
          p {
            display: inline-block;
            max-width: 90%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .musicName {
              margin-left: 10px;
              font-size: 14px;
              color: #333;
            }
            .musicSinger {
              font-size: 12px;
              color: #888;
            }
          }
          .delete {
            position: absolute;
            width: 30px;
            right: 0;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
