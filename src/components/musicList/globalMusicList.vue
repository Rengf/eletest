<template>
  <div class="listsWrap">
    <div>
      <div class="musicListHeader">
        <div class="playAll" @click="playAllSongs()">
          <i class="iconfont">&#xe75e;</i>
          <span>播放全部（共{{musicLists.tracks.length}}首）</span>
        </div>
        <div class="shareMusicList">
          <div class="shareBox">
            <i class="iconfont">&#xe64a;</i>
            <span>收藏（{{musicLists.subscribedCount|playCountFilter}}）</span>
          </div>
        </div>
      </div>
      <scroll class="songList">
        <div class="list">
          <ul>
            <li v-for="(song,index) of musicLists.tracks" :key="index" @click="playMusic(index)">
              <div class="listIndex">
                <span>{{index+1}}</span>
              </div>
              <div class="songMsg">
                <span class="songName">{{song.name}}</span>
                <span class="singer">{{song.ar[0].name}}-{{song.al.name}}</span>
              </div>
              <div class="musicVideo">
                <i class="iconfont">&#xe60f;</i>
              </div>
              <div class="moreMsg">
                <i class="iconfont">&#xe60d;</i>
              </div>
            </li>
          </ul>
        </div>
      </scroll>
    </div>
    <div class></div>
  </div>
</template>
<script>
import scroll from "@/components/common/scroll";
export default {
  props: {
    musicLists: {
      type: Object,
      default: [{}]
    }
  },
  filters: {
    playCountFilter(value) {
      if (value > 100000) {
        return (value / 10000).toFixed(1) + "万";
      } else {
        return value;
      }
    }
  },
  methods: {
    playAllSongs() {
      this.$emit("playAllSongs");
    },
    playMusic(index) {
      this.$emit("playMusic", index);
    }
  },
  components: {
    scroll
  }
};
</script>
<style lang="scss" scoped>
.listsWrap {
  width: 100%;
  background: #fff;
  z-index: 9999;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  .musicListHeader {
    width: 100%;
    overflow: hidden;
    .playAll {
      float: left;
      width: 50%;
      height: 40px;
      font-size: 14px;
      font-weight: bold;
      line-height: 40px;
      i {
        margin-left: 15px;
      }
      span {
        margin-left: 10px;
      }
    }
    .shareMusicList {
      position: relative;
      float: left;
      width: 50%;
      height: 40px;
      .shareBox {
        position: absolute;
        left: 50%;
        margin-left: -50px;
        top: 50%;
        margin-top: -15px;
        width: 130px;
        height: 30px;
        border-radius: 15px;
        background: rgb(253, 2, 2);
        font-size: 12px;
        color: #fff;
        text-align: center;
        i {
          line-height: 30px;
        }
        span {
          line-height: 30px;
          vertical-align: top;
        }
      }
    }
  }

  .songList {
    width: 100%;
    min-height: calc(100vh - 260px);
    max-height: calc(100vh - 40px);
    overflow: hidden;
    ul {
      width: 100%;
      li {
        width: 100%;
        display: flex;
        height: 50px;
        margin: 10px 0px;
        .listIndex {
          flex: 1;
          line-height: 50px;
          text-align: center;
        }
        .songMsg {
          flex: 12;
          max-width: 80%;
          span {
            display: block;
            line-height: 18px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .songName {
            font-size: 15px;
            color: #000;
          }
          .singer {
            font-size: 12px;
            color: #888;
          }
        }
        .musicVideo {
          flex: 1;
          line-height: 50px;
          text-align: center;
        }
        .moreMsg {
          flex: 1;
          line-height: 50px;
          text-align: center;
        }
      }
    }
  }
}
</style>
