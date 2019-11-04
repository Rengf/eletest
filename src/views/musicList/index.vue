<template>
  <div
    class="musicListWrap"
    :style="{backgroundImage:'url('+musicList.coverImgUrl+')',backgroundSize:'100% 100%',backgroundRepeat:'no-repeat'}"
  >
    <div class="returnHeader">
      <div class="returnBox" @click="returnPrv">
        <i class="iconfont">&#xe62d;</i>
      </div>
      <div class="musicListName">{{musicListName}}</div>
      <div class="shareBox">
        <i class="iconfont">&#xe630;</i>
        <i class="iconfont">&#xe60d;</i>
      </div>
    </div>
    <scroll class="allScroll">
      <div>
        <div class="musicListMsg">
          <div class="msgMain">
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
                <span>
                  {{musicList.creator.nickname}}
                  <i class="iconfont">&#xe60c;</i>
                </span>
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
        <MusicList :musicLists="musicList" @playAllSongs="playAllSongs()" @playMusic="playMusic"></MusicList>
      </div>
    </scroll>
  </div>
</template>
<script>
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
      musicList: { creator: { avatarUrl: "" }, tracks: [] }
    };
  },
  created() {
    this.getMusicLsit();
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
    ...mapGetters(["playLists", "sheetMusicLists"])
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
      this.$store.dispatch("getSheetMusicList", this.musicList.tracks);
    },
    playMusic(index) {
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
    returnPrv() {
      this.$router.go(-1);
    }
  },
  components: {
    ReturnHeader,
    MusicList,
    scroll
  }
};
</script>
<style lang="scss" scoped>
.musicListWrap:after {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: inherit;
  filter: blur(21px);
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
            span {
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
}
</style>
