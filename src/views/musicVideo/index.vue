<template>
  <scroll class="musicVideo">
    <div class="videoMsg">
      <transition name="slide-fade">
        <div class="videoMsgHeader" :class="{active:isShowHeader}">
          <div class="returnBox">
            <i class="iconfont" @click="returnPre()">&#xe62d;</i>
          </div>
          <div class="videoName" :title="videoDetail.name">{{videoDetail.name}}</div>
          <div class="shareBox">
            <i class="iconfont">&#xe63c;</i>
            <i class="iconfont">&#xe60d;</i>
          </div>
        </div>
      </transition>
      <MyVideo :videoUrl="videoDetail.brs[1080]" @showControls="showHeader"></MyVideo>
      <div class="videoDetail">
        <div class="detailTop">
          <div class="videoName">
            <span>{{videoDetail.name}}</span>
          </div>
          <div class="detailShow">
            <i class="iconfont" style="color:#000" @click="showDetail()">&#xe609;</i>
          </div>
        </div>
        <div class="playCount">{{videoDetail.playCount|playCountFilter}}次观看</div>
        <transition name="slide-fade">
          <div class="videoDesc" v-show="isShowDesc">
            <div class="publishTime">{{videoDetail.publishTime}} 发布</div>
            <div class="videoDesc">{{videoDetail.desc}}</div>
          </div>
        </transition>
      </div>
      <div class="like">
        <div>
          <i class="iconfont">&#xe610;</i>
          <span class="count">{{videoDetail.likeCount}}</span>
        </div>
        <div>
          <i class="iconfont">&#xe625;</i>
          <span class="count">{{videoDetail.subCount}}</span>
        </div>
        <div>
          <i class="iconfont">&#xe60e;</i>
          <span class="count">{{videoDetail.commentCount}}</span>
        </div>
        <div>
          <i class="iconfont">&#xe63c;</i>
          <span class="count">{{videoDetail.shareCount}}</span>
        </div>
      </div>
      <div class="singerMsg">
        <div class="singerImg">
          <img :src="singerArtist.picUrl" :alt="singerArtist.name" />
        </div>
        <div class="singerName">{{singerArtist.name}}</div>
        <div class="subSinger">
          <div class="subSingerBox">
            <i class="iconfont">&#xe64a;</i>
            <span>&nbsp;收&nbsp;藏</span>
          </div>
        </div>
      </div>
      <div class="relevantVideo"></div>
      <div class="videoComment"></div>
    </div>
  </scroll>
</template>
<script>
import { mapGetters } from "vuex";
import MyVideo from "@/components/video/videoPlay";
import scroll from "@/components/common/scroll";
export default {
  data() {
    return {
      isShowHeader: false,
      showDescIcon: "",
      isShowDesc: false
    };
  },
  components: {
    MyVideo,
    scroll
  },
  filters: {
    playCountFilter(value) {
      if (value > 100000) {
        return parseInt(value / 10000) + "万";
      } else {
        return value;
      }
    }
  },
  created() {
    this.$store.dispatch("getVideoDetail", this.$route.query.mvId);
    this.$store.dispatch("getSingerArtists", this.$route.query.singerId);
  },
  mounted() {},
  computed: {
    ...mapGetters(["playVideo", "videoDetail", "singerArtist"])
  },
  methods: {
    returnPre() {
      this.$router.go(-1);
    },
    showHeader(data) {
      this.isShowHeader = data;
    },
    getvideo() {
      console.log(this.videoDetail);
    },
    showDetail() {
      this.isShowDesc = !this.isShowDesc;
    }
  }
};
</script>
<style lang="scss" scoped>
.active {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s linear;
}

.slide-fade-leave-active {
  transition: all 0.3s linear;
}

.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
}
.musicVideo {
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .videoMsg {
    width: 100%;
    .videoMsgHeader {
      margin-top: 8px;
      width: 95%;
      height: 25px;
      position: absolute;
      display: flex;
      left: 2.5%;
      z-index: 9999;
      .returnBox {
        flex: 1;
        line-height: 25px;
        i {
          color: #fff;
        }
      }
      .videoName {
        line-height: 25px;
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
        line-height: 25px;
        i {
          margin: 0px 5px;
        }
      }
    }
    .videoDetail {
      width: 95%;
      margin: auto;
      margin-top: 5px;
      .detailTop {
        height: 30px;
        display: flex;
        .videoName {
          height: 30px;
          line-height: 30px;
          font-size: 16px;
          font-weight: bold;
          flex: 10;
        }
        .detailShow {
          height: 30px;
          line-height: 30px;
          flex: 1;
        }
      }
      .playCount {
        width: 100%;
        font-size: 13px;
        line-height: 30px;
        color: #888;
      }
      .videoDesc {
        width: 100%;
        .publishTime {
          font-size: 13px;
          line-height: 30px;
        }
        .videoDesc {
          font-size: 14px;
          line-height: 20px;
        }
      }
    }
    .like {
      width: 100%;
      height: 40px;
      display: flex;
      border-bottom: 1px solid #efefef;
      div {
        flex: 1;
        text-align: center;
        i {
          color: #555;
          font-size: 20px;
        }
        .count {
          display: block;
          width: 100%;
          font-size: 12px;
          color: #888;
        }
      }
    }
    .singerMsg {
      display: flex;
      width: 100%;
      height: 35px;
      border-bottom: 1px solid #efefef;
      .singerImg {
        flex: 1;
        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          float: right;
        }
      }
      .singerName {
        flex: 1;
        height: 30px;
        text-align: center;
        font-size: 13px;
        line-height: 30px;
      }
      .subSinger {
        flex: 4;
        .subSingerBox {
          width: 60px;
          height: 20px;
          margin-top: 5px;
          color: #fff;
          font-size: 12px;
          border-radius: 12px;
          border: 1px solid #efefef;
          background: rgb(253, 2, 2);
          text-align: center;
          float: right;
          margin-right: 30px;
          span {
            line-height: 20px;
            font-size: 12px;
          }
          i {
            line-height: 20px;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
