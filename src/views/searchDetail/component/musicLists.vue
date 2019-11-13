<template>
  <scroll class="scrollWrap">
    <div class="scrollBox">
      <div class="musicListHeader">
        <div class="playAll" @click="playAllSongs()">
          <i class="iconfont">&#xe75e;</i>
          <span>播放全部（共{{songs.songCount}}首）</span>
        </div>
        <div class="chooseMusicList">
          <div class="chooseBox">
            <i class="iconfont">&#xe611;</i>
            <span>多选</span>
          </div>
        </div>
      </div>
      <ul>
        <li v-for="(song,index) in songs.songs" :key="index">
          <div class="songMsg">
            <span class="songName">{{song.name}}</span>
            <span class="singer">{{song.artists[0].name}}-{{song.album.name}}</span>
            <span class="msg" v-if="song.alias.length!=0">{{song.alias[0]}}</span>
          </div>
          <div class="musicVideo">
            <i
              class="iconfont"
              v-show="song.mv!=0"
              @click.stop="playMv(song.mv,song.name,song.ar[0].id)"
            >&#xe60f;</i>
          </div>
          <div class="moreMsg" @click.stop="showMore(song.id)">
            <i class="iconfont">&#xe60d;</i>
          </div>
        </li>
      </ul>
    </div>
  </scroll>
</template>
<script>
import scroll from "@/components/common/scroll";
import axios from "axios";
export default {
  name: "musicList",
  props: {
    keyWords: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      songs: {}
    };
  },
  mounted() {
    this.getSearchData();
  },
  methods: {
    getSearchData() {
      axios
        .get(
          "http://localhost:3000/search?keywords=" + this.keyWords + "&type=1"
        )
        .then(res => {
          if (res.status == 200) {
            this.songs = res.data.result;
            console.log(this.songs);
          }
        });
    },
    playAllSongs() {},
    playMv(mv, name, id) {},
    showMore(id) {}
  },
  components: {
    scroll
  }
};
</script>
<style lang="scss" scoped>
.scrollWrap {
  width: 100%;
  height: 559px;
  overflow: hidden;
  .scrollBox {
    width: 95%;
    margin: auto;
    .musicListHeader {
      width: 100%;
      overflow: hidden;
      .playAll {
        float: left;
        width: 60%;
        height: 40px;
        font-size: 14px;
        font-weight: bold;
        line-height: 40px;
        span {
          margin-left: 10px;
        }
      }
      .chooseMusicList {
        position: relative;
        float: left;
        width: 40%;
        height: 40px;
        .chooseBox {
          position: absolute;
          right: 0;
          top: 50%;
          margin-top: -15px;
          width: 50px;
          height: 30px;
          font-size: 12px;
          color: #444;
          text-align: center;
          i {
            line-height: 30px;
            color: #444;
          }
          span {
            line-height: 30px;
            vertical-align: top;
          }
        }
      }
    }
    ul {
      width: 100%;
      li {
        width: 100%;
        display: flex;
        margin-top: 10px;
        .songMsg {
          flex: 14;
          max-width: 87%;
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
          .msg {
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
