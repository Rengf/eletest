<template>
  <div class="musicVideo">
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
      <MyVideo :videoUrl="playVideo.url||videoDetail.brs[1080]" @showControls="showHeader"></MyVideo>
      <scroll class="videoMain">
        <div>
          <div class="videoDetail">
            <div class="detailTop">
              <div class="videoName">
                <span>{{videoDetail.name}}</span>
              </div>
              <div class="detailShow">
                <i class="iconfont" style="color:#000" @click="getvideo()">&#xe609;</i>
              </div>
            </div>
            <div class="playCount">{{videoDetail.playCount|playCountFilter}}次观看</div>
            <transition name="slide-fade">
              <div class="videoDesc" v-show="isShowDesc">
                <div class="durationmsTime">{{videoDetail.durationmsTime}} 发布</div>
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
              <span class="count">{{videoDetail.subscribeCount}}</span>
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
                <span @click="getSimiVideo()">&nbsp;收&nbsp;藏</span>
              </div>
            </div>
          </div>
          <div class="relevantVideo">
            <h2>相关视频</h2>
            <ul>
              <li
                v-for="(video,index) of simiVideoLists"
                :key="index"
                @click="toPlayVideo(video.vid,video.title,video.type)"
              >
                <div class="mvLeft video">
                  <img :src="video.coverUrl" :alt="video.title" />
                  <span class="clickTotal">
                    <i class="iconfont">&#xe602;</i>
                    {{video.playTime|playCountFilter}}
                  </span>
                </div>
                <div class="mvRight video">
                  <div class="videoName">
                    <i v-if="video.type==0">video</i>
                    <span>{{video.title}}</span>
                  </div>
                  <div
                    class="durationmsTime"
                  >{{video.durationms|filterTime}} by {{video.creator[0].userName}}</div>
                </div>
              </li>
            </ul>
          </div>
          <div class="videoComment">
            <h2>精彩评论</h2>
            <ul>
              <li></li>
            </ul>
          </div>
        </div>
      </scroll>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import MyVideo from "@/components/video/videoPlay";
import scroll from "@/components/common/scroll";
import axios from "axios";
export default {
  data() {
    return {
      isShowHeader: false,
      showDescIcon: "",
      isShowDesc: false,
      simiVideoLists: []
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
    },
    filterTime(value) {
      if (!value) {
        return "00:00";
      }
      var timeString = "";
      var min = parseInt(value / 60000);
      var seconds = parseInt(value % 60000);
      if (min >= 10000) {
        timeString = min + ":";
      } else {
        timeString = "0" + min + ":";
      }
      seconds = parseInt(seconds / 1000);
      if (seconds >= 10) {
        timeString = timeString + seconds;
      } else {
        timeString = timeString + "0" + seconds;
      }
      return timeString;
    }
  },
  created() {
    this.$store.dispatch("getVideoDetail", this.$route.query.videoId);
    this.$store.dispatch("getSingerArtists", this.$route.query.singerId);
  },
  mounted() {
    this.getSimiVideo();
  },
  computed: {
    ...mapGetters(["playVideo", "videoDetail", "singerArtist"])
  },
  watch: {
    $route: {
      handler(newval, oldval) {
        this.getSimiVideo();
      }
    }
  },
  methods: {
    returnPre() {
      this.$router.go(-1);
    },
    showHeader(data) {
      this.isShowHeader = data;
    },
    getvideo() {},
    showDetail() {
      this.isShowDesc = !this.isShowDesc;
    },
    getSimiVideo() {
      axios
        .get(
          "http://localhost:3000/related/allvideo?id=" +
            this.$route.query.videoId
        )
        .then(
          res => {
            if (res.status == 200) {
              this.simiVideoLists = res.data.data;
              console.log(this.simiVideoLists);
            }
          },
          res => {
            console.log(res);
          }
        );
    },
    toPlayVideo(id, name, type) {
      if (type == 0) {
        this.$store.dispatch("playVideo", [id, name]).then(() => {
          this.$router.push(
            "/musicVideo?mvId=" + id + "&singerId=" + this.$route.query.singerId
          );
        });
      } else if (type == 1) {
        this.$store.dispatch("playVideo", [id, name]).then(() => {
          this.$router.push(
            "/musicVideo?videoId=" +
              id +
              "&singerId=" +
              this.$route.query.singerId
          );
        });
      }
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
    .videoMain {
      width: 100%;
      height: 435px;
      overflow: hidden;
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
          .durationmsTime {
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
            margin-top: 3px;
            border-radius: 50%;
            float: right;
          }
        }
        .singerName {
          flex: 1;
          text-align: center;
          font-size: 13px;
          line-height: 35px;
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
      .relevantVideo {
        width: 100%;
        h2 {
          font-size: 16px;
          color: #222;
          line-height: 30px;
          margin-left: 15px;
          font-weight: bold;
        }
        ul {
          width: 95%;
          margin: auto;
          li {
            width: 100%;
            height: 80px;
            margin: 10px 0;
            display: flex;
            .mvLeft {
              position: relative;
              flex: 3;
              img {
                width: 100%;
                height: 80px;
                border-radius: 5px;
              }
              .clickTotal {
                position: absolute;
                font-size: 8px;
                transform: scale(0.8);
                color: #fff;
                top: -1px;
                right: -2px;
              }
            }
            .mvRight {
              flex: 5;
              .videoName {
                width: 90%;
                margin: auto;
                span {
                  line-height: 20px;
                  font-size: 14px;
                  color: #222;
                }
                i {
                  display: inline-block;
                  width: 25px;
                  height: 15px;
                  text-align: center;
                  line-height: 15px;
                  font-size: 12px;
                  color: rgb(253, 4, 4);
                  border: 1px solid rgb(253, 4, 4);
                  border-radius: 3px;
                }
              }
              .durationmsTime {
                width: 90%;
                margin: auto;
                font-size: 12px;
                line-height: 20px;
                color: #888;
              }
            }
          }
        }
      }
    }
  }
}
</style>
