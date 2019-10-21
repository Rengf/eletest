<template>
  <scroll
    class="songList"
    @scrollToEnd="scrolls"
    @scroll="scrolls"
    :pullup="pullup"
    :listenScroll="listenScroll"
  >
    <div>
      <div class="collectAll" @click="collectAll()">
        <i class="iconfont">&#xe625;</i>
        <span>全部收藏</span>
      </div>
      <div class="list">
        <ul>
          <li v-for="(song,index) of singerHotSongs" :key="index">
            <div class="listIndex">
              <span>{{index+1}}</span>
            </div>
            <div class="songMsg" @click="playMusic(index)">
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
    </div>
  </scroll>
</template>
<script>
import scroll from "@/components/common/scroll";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      pullup: true,
      listenScroll: true
    };
  },
  computed: {
    ...mapGetters(["singerHotSongs"])
  },
  methods: {
    playMusic(index) {
      var playMusic = [
        this.singerHotSongs[index].id,
        this.singerHotSongs[index].name,
        this.singerHotSongs[index].ar[0].name,
        this.singerHotSongs[index].al.picUrl
      ];
      this.$store.dispatch("playMusicIndex", 0);
      this.$store.dispatch("getPlayMusic", playMusic);
      this.$store.dispatch("isPlaying", true);
    },
    collectAll() {},
    scrolls(pos) {}
  },
  components: {
    scroll
  }
};
</script>
<style lang="scss" scoped>
.songList {
  width: 100%;
  height: 348px;
  overflow: hidden;
  .collectAll {
    width: 100%;
    height: 40px;
    font-size: 16px;
    font-weight: bold;
    line-height: 40px;
    margin: 5px 0;
    i {
      margin-left: 15px;
    }
    span {
      margin-left: 10px;
    }
  }
  .list {
    width: 100%;
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
          span {
            display: block;
            line-height: 25px;
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
