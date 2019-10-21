<template>
  <div class="musicListWrap" @click.self="showMusicList" :class="{showback:isback}">
    <div class="musicListBox">
      <div class="musicListHeader">
        <el-row>
          <el-col :span="15">
            <div class="grid-content loopPlay" @click="switchLoop">
              <i class="iconfont" v-html="switchLoopData[loopIndex].loopIcon"></i>
              <span>{{switchLoopData[loopIndex].loopString}}（{{playLists.length}}）</span>
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
      <scroll
        class="musicListMain"
        ref="musicListMain"
        @scrollToEnd="scrolls"
        @scroll="scrolls"
        :pullup="pullup"
        :listenScroll="listenScroll"
      >
        <ul>
          <li v-for="(music,index) of playLists" :key="index" :class="{active:index==playIndex}">
            <p>
              <span>
                <i class="iconfont" v-if="index==playIndex">&#xec0a;</i>
              </span>
              <span class="musicName" @click="playMusic(index)">{{music.name}}</span>
              <span class="musicSinger">-{{music.ar[0].name}}</span>
            </p>
            <span class="delete" @click="deleteMusic(index)">
              <i class="iconfont">&#xe607;</i>
            </span>
          </li>
        </ul>
      </scroll>
    </div>
  </div>
</template>

<script>
import scroll from "@/components/common/scroll";
import { mapGetters } from "vuex";
export default {
  name: "musicList",
  components: {},

  // data
  data() {
    return {
      switchLoopData: [
        { loopIcon: "&#xe603;", loopString: "单曲循环" },
        { loopIcon: "&#xe600;", loopString: "列表循环" },
        { loopIcon: "&#xe628;", loopString: "随机播放" }
      ],
      pullup: true,
      listenScroll: true,
      isback: false
    };
  },

  created() {
    //
  },
  components: {
    scroll
  },
  mounted() {
    setTimeout(() => {
      this.$refs.musicListMain.scrollTo(0, -(this.playIndex - 4) * 36, 0);
      this.isback = true;
    }, 300);
  },
  computed: {
    ...mapGetters(["playLists", "loopIndex", "playIndex"])
  },
  methods: {
    //设置循环方式
    switchLoop() {
      if (this.loopIndex < 2) {
        this.$store.dispatch("setSwitchLoop", this.loopIndex + 1);
      } else {
        this.$store.dispatch("setSwitchLoop", 0);
      }
    },
    //删除播放列表的音乐
    deleteMusic(index) {
      if (index == undefined) {
        this.$store.dispatch("deletePlayListMusic", [0, this.playLists.length]);
      } else {
        this.$store.dispatch("deletePlayListMusic", [index, 1]);
      }
    },
    collectAll() {},
    //关闭音乐列表
    showMusicList() {
      this.$emit("showMusicList", false);
    },
    //播放音乐
    playMusic(index) {
      var playMusic = [
        this.playLists[index].id,
        this.playLists[index].name,
        this.playLists[index].ar[0].name,
        this.playLists[index].al.picUrl,
        this.playLists[index].ar[0].id
      ];
      this.$store.dispatch("playMusicIndex", index);
      this.$store.dispatch("getPlayMusic", playMusic);
      this.$store.dispatch("isPlaying", true);
    },
    scrolls(pos) {}
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

.showback {
  background: rgba($color: #888, $alpha: 0.3);
}
.musicListWrap {
  position: fixed;
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
      overflow: hidden;
      .active span {
        color: rgb(248, 4, 4) !important;
      }
      ul {
        width: 100%;
        position: relative;
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
