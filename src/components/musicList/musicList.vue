<template>
  <div class="musicListWrap" @click.self="showMusicList">
    <div class="musicListBox">
      <div class="musicListHeader">
        <el-row>
          <el-col :span="15">
            <div class="grid-content loopPlay" @click="switchLoop">
              <i class="iconfont" v-html="switchLoopData[loopIndex].loopIcon"></i>
              <span>{{switchLoopData[loopIndex].loopString}}||（{{musicList.length}}）</span>
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
          <li v-for="(music,index) in musicList" :key="index">
            <span class="musicName">{{music.name}}</span>
            <span class="musicSinger">-{{music.singer}}</span>
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
export default {
  name: "musicList",
  components: {},

  // data
  data() {
    return {
      componentName: "musicList",
      loopIndex: 0,
      switchLoopData: [
        { loopIcon: "&#xe603;", loopString: "单曲循环" },
        { loopIcon: "&#xe501;", loopString: "列表循环" },
        { loopIcon: "&#xe628;", loopString: "随机播放" }
      ],
      musicList: [
        { name: "好多个科室1", singer: "肥牛饭" },
        { name: "好多个科室2", singer: "肥牛饭" },
        { name: "好多个科室3", singer: "肥牛饭" },
        { name: "好多个科室4", singer: "肥牛饭" },
        { name: "好多个科室5", singer: "肥牛饭" },
        { name: "好多个科室6", singer: "肥牛饭" },
        { name: "好多个科室7", singer: "肥牛饭" },
        { name: "好多个科室8", singer: "肥牛饭" },
        { name: "好多个科室9", singer: "肥牛饭" },
        { name: "好多个科室10", singer: "肥牛饭" },
        { name: "好多个科室11", singer: "肥牛饭" },
        { name: "好多个科室12", singer: "肥牛饭" },
        { name: "好多个科室13", singer: "肥牛饭" },
        { name: "好多个科室14", singer: "肥牛饭" },
        { name: "好多个科室15", singer: "肥牛饭" },
        { name: "好多个科室16", singer: "肥牛饭" },
        { name: "好多个科室17", singer: "肥牛饭" },
        { name: "好多个科室18", singer: "肥牛饭" },
        { name: "好多个科室19", singer: "肥牛饭" }
      ]
    };
  },

  created() {
    //
  },

  mounted() {
    //
  },
  methods: {
    switchLoop() {
      if (this.loopIndex < 2) {
        this.loopIndex++;
      } else {
        this.loopIndex = 0;
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
  position: absolute;
  background: rgba($color: #888, $alpha: 0.3);
  top: 0px;
  width: 100%;
  height: 100%;
  overflow: hidden;
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
          .musicName {
            margin-left: 10px;
            font-size: 18px;
            color: #333;
          }
          .musicSinger {
            font-size: 12px;
            color: #888;
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
