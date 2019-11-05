<template>
  <div
    class="musicListWrap"
    :style="{backgroundImage:'url('+musicList.coverImgUrl+')',backgroundSize:'150% 150%;',backgroundRepeat:'no-repeat'}"
  >
    <div class="returnHeader">
      <div class="returnBox" @click="returnPrv">
        <i class="iconfont">&#xe62d;</i>
      </div>
      <div class="musicListName">{{musicList.name}}</div>
      <div class="shareBox">
        <i class="iconfont">&#xe630;</i>
        <i class="iconfont">&#xe60d;</i>
      </div>
    </div>
    <scroll class="allScroll">
      <div>
        <div class="musicListMsg">
          <div class="msgMain" @click="showCoverImg()">
            <div class="musicListImg">
              <img :src="musicList.coverImgUrl||require('../../assets/images/avatar.png')" alt="图片" />
              <span>
                <i class="iconfont">&#xe602;</i>
              </span>
            </div>
            <div class="otherMsg">
              <div class="msgName">
                <span>{{musicList.name}}</span>
              </div>
              <div class="msgAuthor">
                <img
                  :src="musicList.creator.avatarUrl||require('../../assets/images/avatar.png')"
                  alt="图片"
                />
                <router-link to="/login">
                  {{musicList.creator.nickname}}
                  <i class="iconfont">&#xe60c;</i>
                </router-link>
              </div>
              <div class="msgDesc">
                <span>最近更新:{{musicList.trackUpdateTime|dateformat("MM月DD日")}}</span>
                <span>
                  {{musicList.description}}
                  <i class="iconfont">&#xe60c;</i>
                </span>
              </div>
            </div>
          </div>
          <div class="like">
            <div>
              <i class="iconfont">&#xe60e;</i>
              <span class="count">{{musicList.commentCount|playCountFilter}}</span>
            </div>
            <div>
              <i class="iconfont">&#xe63c;</i>
              <span class="count">{{musicList.shareCount|playCountFilter}}</span>
            </div>
            <div>
              <i class="iconfont">&#xe609;</i>
              <span class="count">下载</span>
            </div>
            <div>
              <i class="iconfont">&#xe611;</i>
              <span class="count">多选</span>
            </div>
          </div>
        </div>
        <MusicList :musicLists="musicList" @playAllSongs="playAllSongs()" @playMusic="toPlayMusic"></MusicList>
      </div>
    </scroll>
    <NavBar v-if="isMusicPlay"></NavBar>
    <div
      class="coverImg"
      :style="{backgroundImage:'url('+musicList.coverImgUrl+')',backgroundSize:'100% 100%',backgroundRepeat:'no-repeat'}"
      v-if="isShowCover"
    >
      <div class="closeButton" @click="showCoverImg()">
        <i class="iconfont">&#xe607;</i>
      </div>
      <scroll class="scrollCover">
        <div>
          <div class="nameCover">
            <img :src="musicList.coverImgUrl" alt="图片" />
            <span>{{musicList.name}}</span>
          </div>
          <div class="tagDesc">
            <div class="tags">
              <span>标签：</span>
              <span class="tag" v-for="(tag,index) of musicList.tags" :key="index">{{tag}}</span>
            </div>
            <div class="desc">
              <p v-html="musicList.description"></p>
            </div>
          </div>
        </div>
      </scroll>
      <div class="saveCover">保存封面</div>
    </div>
  </div>
</template>
<script>
import NavBar from "@/components/navBar/navBar";
import scroll from "@/components/common/scroll";
import ReturnHeader from "@/components/common/returnHeader";
import MusicList from "@/components/musicList/globalMusicList";
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      title: "歌单",
      musicListName: "歌单",
      musicList: { creator: { avatarUrl: "" }, tracks: [] },
      isMusicPlay: false,
      isShowCover: false
    };
  },
  created() {
    this.getMusicLsit();
  },
  mounted() {
    if (this.playMusic.name) {
      this.isMusicPlay = true;
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
  computed: {
    ...mapGetters(["playLists", "sheetMusicLists", "playMusic"])
  },
  watch: {
    playMusic() {
      this.isMusicPlay = true;
    }
  },
  methods: {
    getMusicLsit() {
      if (this.$route.query.sheetId) {
        this.$store
          .dispatch("getSheetMusicList", this.$route.query.sheetId)
          .then(() => {
            this.musicList = this.sheetMusicLists;
          });
      } else if (this.$route.query.topId)
        axios.get("http://localhost:3000/top/list?idx=24").then(res => {
          if (res.status == 200) {
            this.musicList = res.data.playlist;
          }
        });
    },
    playAllSongs() {
      if (this.playLists.length == 0) {
        this.$store
          .dispatch("getSheetMusicList", this.musicList.tracks)
          .then(() => {
            this.toPlayMusic(0);
          });
      } else {
        this.$store.dispatch("getSheetMusicList", this.musicList.tracks);
      }
    },
    toPlayMusic(index) {
      var playMusic = [
        this.musicList.tracks[index].id,
        this.musicList.tracks[index].name,
        this.musicList.tracks[index].ar[0].name,
        this.musicList.tracks[index].al.picUrl,
        this.$route.query.id
      ];
      var oneSong = [this.musicList.tracks[index]];
      this.$store.dispatch("getSheetMusicList", oneSong);
      this.$store.dispatch("playMusicIndex", this.playLists.length - 1);
      this.$store.dispatch("getPlayMusic", playMusic);
      this.$store.dispatch("isPlaying", true);
    },
    showCoverImg() {
      this.isShowCover = !this.isShowCover;
    },
    returnPrv() {
      this.$router.go(-1);
    }
  },
  components: {
    ReturnHeader,
    MusicList,
    scroll,
    NavBar
  }
};
</script>
<style lang="scss" scoped>
.coverImg:after,
.musicListWrap:after {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: inherit;
  filter: blur(6px);
  z-index: -1;
}
.musicListWrap {
  position: relative;
  width: 100%;
  height: 100%;
  top: 0;
  overflow: hidden;
  z-index: 0;
  .returnHeader {
    width: 95%;
    height: 40px;
    display: flex;
    z-index: 9999;
    .returnBox {
      flex: 1;
      line-height: 40px;
      i {
        color: #fff;
      }
    }
    .musicListName {
      line-height: 40px;
      flex: 12;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #fff;
      font-size: 14px;
      margin: 0 5px;
      i {
        color: #fff;
      }
    }
    .moreControls,
    .shareBox {
      flex: 1;
      line-height: 40px;
      i {
        margin: 0px 5px;
        color: #fff;
      }
    }
  }
  .allScroll {
    width: 100%;
    height: calc(100vh - 40px);
    overflow: hidden;
    .musicListMsg {
      width: 90%;
      height: 200px;
      margin: auto;
      z-index: 9999;
      .msgMain {
        margin-top: 20px;
        margin-bottom: 30px;
        width: 100%;
        height: 120px;
        display: flex;
        .musicListImg {
          height: 120px;
          position: relative;
          flex: 3;
          img {
            width: 120px;
            height: 120px;
            border-radius: 5px;
          }
          span {
            position: absolute;
            right: 20px;
            color: #fff;
            font-size: 12px;
          }
        }
        .otherMsg {
          flex: 4;
          position: relative;
          .msgName {
            width: 100%;
            span {
              font-size: 18px;
              color: #fff;
              font-weight: bold;
            }
          }
          .msgAuthor {
            width: 100%;
            height: 25px;
            margin-top: 5px;
            img {
              width: 25px;
              height: 25px;
              border-radius: 50%;
              vertical-align: middle;
            }
            a {
              display: inline-block;
              margin-left: 5px;
              height: 25px;
              font-size: 13px;
              color: #fafafa;
              line-height: 25px;
              vertical-align: middle;
            }
          }
          .msgDesc {
            width: 100%;
            position: absolute;
            bottom: 0;
            span {
              display: block;
              width: 100%;
              font-size: 12px;
              line-height: 18px;
              color: #ececec;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
      .like {
        width: 90%;
        margin: auto;
        height: 40px;
        display: flex;
        div {
          flex: 1;
          text-align: center;
          i {
            color: #fff;
            font-size: 20px;
          }
          .count {
            display: block;
            height: 20px;
            width: 100%;
            font-size: 12px;
            line-height: 20px;
            color: #bfbfbf;
          }
        }
      }
    }
  }
  .coverImg {
    position: fixed;
    width: 100%;
    height: 100;
    top: 0;
    bottom: 0;

    .closeButton {
      width: 30px;
      height: 30px;
      float: right;
      line-height: 30px;
      text-align: center;
      i {
        font-size: 30px;
        color: #fff;
      }
    }
    .scrollCover {
      width: 100%;
      height: 565px;
      margin-top: -270px;
      overflow: hidden;
      .nameCover {
        position: relative;
        width: 100%;
        height: 250px;
        text-align: center;
        border-bottom: 1px solid transparent;
        border-image: -webkit-linear-gradient(
            left,
            rgba(136, 136, 136, 0) 0%,
            #bababa 50%,
            rgba(136, 136, 136, 0) 100%
          )
          5;
        img {
          display: block;
          width: 200px;
          height: 200px;
          margin: auto;
          border-radius: 10px;
        }
        span {
          color: #fff;
          font-weight: bold;
          font-size: 16px;
          line-height: 50px;
        }
      }
      .tagDesc {
        position: relative;
        width: 90%;
        margin: auto;
        top: 50%;
        margin-top: 15px;
        .tags {
          font-size: 12px;
          color: #fff;
          line-height: 20px;
          span {
            padding: 0 10px;
          }
          .tag {
            background: rgba(143, 143, 143, 0.62);
            border-radius: 10px;
            margin: 3px 5px;
          }
        }
        .desc {
          margin-top: 20px;
          padding: 0 10px;
          color: #fff;
          font-size: 12px;
          line-height: 20px;
          width: 90%;
          p {
            white-space: pre-wrap;
          }
        }
      }
    }

    .saveCover {
      position: fixed;
      bottom: 20px;
      left: 50%;
      margin-left: -40px;
      width: 80px;
      height: 20px;
      border: 1px solid #acacac;
      border-radius: 10px;
      line-height: 20px;
      text-align: center;
      font-size: 12px;
      color: #fff;
      background: rgba(143, 143, 143, 0.42);
    }
  }
}
</style>
