<template>
  <div class="musicVideo">
    <div class="videoMsg">
      <transition name="slide-fade">
        <div class="videoMsgHeader" :class="{active:isShowHeader}">
          <div class="returnBox">
            <i class="iconfont" @click="returnPre()">&#xe62d;</i>
          </div>
          <div class="videoName" :title="mvDetail.name">{{mvDetail.name}}</div>
          <div class="shareBox">
            <i class="iconfont">&#xe63c;</i>
            <i class="iconfont">&#xe60d;</i>
          </div>
        </div>
      </transition>
      <MyVideo :videoUrl="playMv.url||mvDetail.brs[1080]" @showControls="showHeader"></MyVideo>
      <scroll class="videoMain">
        <div>
          <div class="mvDetail">
            <div class="detailTop">
              <div class="videoName">
                <span>{{mvDetail.name}}</span>
              </div>
              <div class="detailShow">
                <i class="iconfont" style="color:#000" @click="getvideo()">&#xe609;</i>
              </div>
            </div>
            <div class="playCount">{{mvDetail.playCount|playCountFilter}}次观看</div>
            <transition name="slide-fade">
              <div class="videoDesc" v-show="isShowDesc">
                <div class="durationmsTime">{{mvDetail.durationmsTime}} 发布</div>
                <div class="videoDesc">{{mvDetail.desc}}</div>
              </div>
            </transition>
          </div>
          <div class="like">
            <div>
              <i class="iconfont">&#xe610;</i>
              <span class="count">{{mvDetail.likeCount}}</span>
            </div>
            <div>
              <i class="iconfont">&#xe625;</i>
              <span class="count">{{mvDetail.subCount}}</span>
            </div>
            <div>
              <i class="iconfont">&#xe60e;</i>
              <span class="count">{{mvDetail.commentCount}}</span>
            </div>
            <div>
              <i class="iconfont">&#xe63c;</i>
              <span class="count">{{mvDetail.shareCount}}</span>
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
                <span @click="getSimiMv()">&nbsp;收&nbsp;藏</span>
              </div>
            </div>
          </div>
          <div class="relevantVideo">
            <h2>相关视频</h2>
            <ul>
              <li
                v-for="(mv,index) of simiMvLists"
                :key="index"
                @click="toPlayMv(mv.vid,mv.title,mv.type)"
              >
                <div class="mvLeft mv">
                  <img :src="mv.coverUrl" :alt="mv.title" />
                  <span class="clickTotal">
                    <i class="iconfont">&#xe602;</i>
                    {{mv.playTime|playCountFilter}}
                  </span>
                </div>
                <div class="mvRight mv">
                  <div class="videoName">
                    <i v-if="mv.type==0">mv</i>
                    <span>{{mv.title}}</span>
                  </div>
                  <div
                    class="durationmsTime"
                  >{{mv.durationms|filterTime}} by {{mv.creator[0].userName}}</div>
                </div>
              </li>
            </ul>
          </div>
          <div class="videoComment">
            <div class="comment">
              <h2>精彩评论</h2>
              <ul>
                <li v-for="(hotComments,index) of mvCommentLists.hotComments" :key="index">
                  <div class="commentMsg">
                    <div class="avatar">
                      <img :src="hotComments.user.avatarUrl" alt="头像" />
                    </div>
                    <div class="nickName">
                      <span class="name">{{hotComments.user.nickname}}</span>
                      <span class="time">{{hotComments.time|dateformat("YYYY-MM-DD")}}</span>
                    </div>
                    <div class="likeCount">
                      <span>{{hotComments.likedCount}}</span>
                      <i class="iconfont">&#xe610;</i>
                    </div>
                  </div>
                  <div class="commentContent" v-html="hotComments.content"></div>
                </li>
              </ul>
            </div>
            <div class="comment">
              <h2>精彩评论</h2>
              <ul>
                <li v-for="(comments,index) of mvCommentLists.comments" :key="index">
                  <div class="commentMsg">
                    <div class="avatar">
                      <img :src="comments.user.avatarUrl" alt="头像" />
                    </div>
                    <div class="nickName">
                      <span class="name">{{comments.user.nickname}}</span>
                      <span class="time">{{comments.time|dateformat("YYYY-MM-DD ")}}</span>
                    </div>
                    <div class="likeCount">
                      <span>{{comments.likedCount}}</span>
                      <i class="iconfont">&#xe610;</i>
                    </div>
                  </div>
                  <div class="commentContent" v-html="comments.content"></div>
                </li>
              </ul>
            </div>
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
      simiMvLists: [],
      mvCommentLists: []
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
    this.$store.dispatch("getMvDetail", this.$route.query.mvId);
    this.$store.dispatch("getSingerArtists", this.$route.query.singerId);
  },
  mounted() {
    this.getSimiMv();
    this.getMvComment();
  },
  computed: {
    ...mapGetters(["playMv", "mvDetail", "singerArtist"])
  },
  watch: {
    $route: {
      handler(newval, oldval) {
        this.getSimiMv();
        this.getMvComment();
        this.$store.dispatch("getMvDetail", this.$route.query.mvId);
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
    getSimiMv() {
      axios
        .get(
          "http://localhost:3000/related/allvideo?id=" + this.$route.query.mvId
        )
        .then(
          res => {
            if (res.status == 200) {
              this.simiMvLists = res.data.data;
            }
          },
          res => {
            console.log(res);
          }
        );
    },
    getMvComment() {
      axios
        .get(
          "http://localhost:3000/comment/mv?id=" +
            this.$route.query.mvId +
            "&limit=30"
        )
        .then(
          res => {
            if (res.status == 200) {
              console.log(res);
              this.mvCommentLists = res.data;
            }
          },
          res => {
            console.log(res);
          }
        );
    },
    toPlayMv(id, name, type) {
      if (type == 0) {
        this.$store.dispatch("playMv", [id, name]).then(() => {
          this.$router.push(
            "/musicVideo?mvId=" + id + "&singerId=" + this.$route.query.singerId
          );
          console.log(this.mvDetail);
        });
      } else if (type == 1) {
        this.$store.dispatch("playVideo", [id, name]).then(() => {
          this.$router.push(
            "/video?videoId=" + id + "&singerId=" + this.$route.query.singerId
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
          color: #fff;
        }
      }
    }
    .videoMain {
      width: 100%;
      height: 435px;
      overflow: hidden;
      .mvDetail {
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
      .videoComment {
        width: 95%;
        margin: auto;
        .comment {
          width: 100%;
          margin-top: 30px;
          h2 {
            font-size: 16px;
            font-weight: bold;
            color: #333;
          }
          ul {
            width: 100%;
            li {
              width: 100%;
              margin: 15px 0px;
            }
          }
        }
        .commentMsg {
          width: 100%;
          height: 30px;
          display: flex;
          .avatar {
            flex: 2;
            text-align: center;
            img {
              width: 30px;
              height: 30px;
              border-radius: 50%;
            }
          }
          .nickName {
            flex: 10;
            span {
              display: block;
              height: 15px;
            }
            .name {
              font-size: 14px;
              color: #000;
            }
            .time {
              font-size: 12px;
              color: #888;
            }
          }
          .likeCount {
            flex: 2;
            span {
              font-size: 12px;
              color: #888;
              line-height: 30px;
              margin-left: 50%;
            }
            i {
              font-size: 14px;
              color: #000;
              line-height: 30px;
            }
          }
        }
        .commentContent {
          width: 86%;
          margin-left: 14%;
          margin-top: 5px;
          padding-bottom: 15px;
          font-size: 14px;
          line-height: 18px;
          border-bottom: 1px solid #efefef;
        }
      }
    }
  }
}
</style>
