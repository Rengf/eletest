<template>
  <scroll class="scrollWrap">
    <div>
      <div class="maylike"></div>
      <div class="songs" v-if="song">
        <div class="songsHeader">
          <span class="typeName">单曲</span>
          <span class="playAll" @click="playAllSongs()">
            <i class="iconfont">&#xe658;</i>播放全部
          </span>
        </div>
        <ul>
          <li v-for="(song,index) in song.songs" :key="index" @click="playMusic(index)">
            <div class="songMsg">
              <span class="songName">{{song.name}}</span>
              <span class="singer">{{song.ar[0].name}}-{{song.al.name}}</span>
              <span class="msg" v-if="song.alia.length!=0">{{song.alia[0]}}</span>
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
        <div class="more" v-if="song.more" @click="more('musicList', 1)">
          <span>{{song.moreText}}></span>
        </div>
      </div>
      <div class="talk" v-if="talk">
        <h2 class="typeName">主题</h2>
        <ul>
          <li v-for="(talk,index) in talk.talks" :key="index">
            <div class="talkImg">
              <img :src="talk.showCover.url" alt="图片" />
            </div>
            <div class="talkMsg">
              <span class="talkName"># {{talk.talkName}}</span>
              <p>
                <span>{{talk.follows}}人关注</span>|
                <span>{{talk.mlogCount}}人参与</span>
              </p>
            </div>
          </li>
        </ul>
        <div class="more" v-if="talk.more">
          <span>{{talk.moreText}}></span>
        </div>
      </div>
      <div class="playList" v-if="playList">
        <h2 class="typeName">歌单</h2>
        <ul>
          <li
            v-for="(play,index) in playList.playLists"
            :key="index"
            @click="toMusicLists(play.id)"
          >
            <div class="playListImg">
              <img :src="play.coverImgUrl" alt="图片" />
            </div>
            <div class="playListMsg">
              <span class="playListName"># {{play.name}}</span>
              <p>
                <span>{{play.trackCount}}首 by{{play.creator.nickname}},</span>
                <span>播放{{play.playCount|playCountFilter}}次</span>
              </p>
            </div>
          </li>
        </ul>
        <div class="more" v-if="playList.more" @click="more('playList', 6)">
          <span>{{playList.moreText}}></span>
        </div>
      </div>
      <div class="video" v-if="video">
        <h2 class="typeName">视频</h2>
        <ul>
          <li v-for="(mv,index) of video.videos" :key="index" @click="playMv(mv.id,mv.name)">
            <div class="mvLeft mv">
              <img :src="mv.coverUrl" :alt="mv.title" />
              <span class="clickTotal">
                <i class="iconfont">&#xe602;</i>
                {{mv.playTime|playCountFilter}}
              </span>
            </div>
            <div class="mvRight mv">
              <div class="videoName">{{mv.title}}</div>
              <div
                class="publishTime"
              >{{mv.durationms|dateformat('mm:ss')}} by{{mv.creator[0].userName}}</div>
            </div>
          </li>
        </ul>
        <div class="more" v-if="video.more" @click="more('video', 3)">
          <span>{{video.moreText}}></span>
        </div>
      </div>
      <div class="simquery" v-if="simquery">
        <h2 class="typeName">相关搜索</h2>
        <ul>
          <li v-for="(sim_query,index) of simquery.sim_querys" :key="index">{{sim_query.keyword}}</li>
        </ul>
      </div>
      <div class="mlog" v-if="mlog">
        <h2 class="typeName">Mlog</h2>
        <ul>
          <li v-for="(mymlog,index) of mlog.mlogs" :key="index">
            <div class="mlogBox">
              <div class="mlogImg">
                <img :src="mymlog.resource.mlogBaseData.coverUrl" alt="图片" />
              </div>
              <div class="mlogMsg">
                <div class="mlogDes">
                  <span>{{mymlog.resource.mlogBaseData.text}}</span>
                </div>
                <div class="msg">
                  <img :src="mymlog.resource.userProfile.avatarUrl" alt="tupian" />
                  <span>{{mymlog.resource.userProfile.nickname}}</span>
                  <span class="likeCount">{{mymlog.resource.mlogExtVO.likedCount}}赞</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="more" v-if="mlog.more" @click="more('mlog', 2)">
          <span>{{mlog.moreText}}></span>
        </div>
      </div>
      <div class="artist" v-if="artist">
        <h2 class="typeName">歌手</h2>
        <ul>
          <li v-for="(singer,index) in artist.artists" :key="index">
            <div class="artistBox" @click="getSingerArtists(singer.id)">
              <div class="artistImg">
                <img :src="singer.img1v1Url" alt="头像" />
              </div>
              <div class="artistName">
                <span>
                  {{singer.name}}
                  <i v-if="singer.alias[0]">({{singer.alias[0]}})</i>
                </span>
              </div>
              <div class="settledIn"></div>
            </div>
          </li>
        </ul>
        <div class="more" v-if="artist.more" @click="more('artist', 4)">
          <span>{{artist.moreText}}></span>
        </div>
      </div>
      <div class="album" v-if="album">
        <h2 class="typeName">专辑</h2>
        <ul>
          <li
            v-for="(album,index) of album.albums"
            :key="index"
            @click="toAlbum(album.id,album.name)"
          >
            <div class="albumLeft album">
              <img :src="album.picUrl" :alt="album.name" />
            </div>
            <div class="albumRight album">
              <div class="albumName">{{album.name}}</div>
              <div
                class="publishTime"
              >{{album.artist.name}} {{album.publishTime|dateformat("YYYY.MM.DD")}}</div>
            </div>
          </li>
        </ul>
        <div class="more" v-if="album.more" @click="more('album',5)">
          <span>{{album.moreText}}></span>
        </div>
      </div>
      <div class="djRadio" v-if="djRadio">
        <h2 class="typeName">电台</h2>
        <ul>
          <li
            v-for="(djRadio,index) of djRadio.djRadios"
            :key="index"
            @click="toAlbum(djRadio.id,djRadio.name)"
          >
            <div class="albumLeft album">
              <img :src="djRadio.picUrl" :alt="djRadio.name" />
            </div>
            <div class="albumRight album">
              <div class="albumName">{{djRadio.name}}</div>
              <div class="publishTime">{{djRadio.dj.nickname}}</div>
            </div>
          </li>
        </ul>
        <div class="more" v-if="djRadio.more" @click="more('djRadio', 7)">
          <span>{{djRadio.moreText}}></span>
        </div>
      </div>
      <div class="user" v-if="user">
        <h2 class="typeName">用户</h2>
        <ul>
          <li v-for="(user,index) in user.users" :key="index">
            <div class="userBox">
              <div class="userImg">
                <img :src="user.avatarUrl" alt="头像" />
              </div>
              <div class="userName">
                <span class="nickName">
                  {{user.nickname}}
                  <i class="iconfont"></i>
                </span>
                <span class="userDes">{{user.description}}</span>
              </div>
              <div class="add">
                <span>+ 关注</span>
              </div>
            </div>
          </li>
        </ul>
        <div class="more" v-if="user.more" @click="more('user', 8)">
          <span>{{user.moreText}}></span>
        </div>
      </div>
    </div>
  </scroll>
</template>
<script>
import scroll from "@/components/common/scroll";
import { mapGetters } from "vuex";
export default {
  props: {
    searchData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {};
  },
  computed: {
    song() {
      if (this.searchData.song) {
        return this.searchData.song;
      }
    },
    talk() {
      if (this.searchData.talk) {
        return this.searchData.talk;
      }
    },
    playList() {
      if (this.searchData.playList) {
        return this.searchData.playList;
      }
    },
    video() {
      if (this.searchData.video) {
        return this.searchData.video;
      }
    },
    simquery() {
      if (this.searchData.sim_query) {
        return this.searchData.sim_query;
      }
    },
    mlog() {
      if (this.searchData.mlog) {
        return this.searchData.mlog;
      }
    },
    artist() {
      if (this.searchData.artist) {
        return this.searchData.artist;
      }
    },
    album() {
      if (this.searchData.album) {
        return this.searchData.album;
      }
    },
    djRadio() {
      if (this.searchData.djRadio) {
        return this.searchData.djRadio;
      }
    },
    user() {
      if (this.searchData.user) {
        return this.searchData.user;
      }
    },
    ...mapGetters(["playLists"])
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
    more(tag, index) {
      this.$emit("more", tag, index);
    },
    playAllSongs() {
      if (this.playLists.length == 0) {
        this.$store.dispatch("getSheetMusicList", this.song.songs).then(() => {
          this.playMusic(0);
        });
      } else {
        this.$store.dispatch("getSheetMusicList", this.song.songs);
      }
    },
    playMusic(index) {
      var playMusic = [
        this.song.songs[index].id,
        this.song.songs[index].name,
        this.song.songs[index].ar[0].name,
        this.song.songs[index].al.picUrl,
        this.$route.query.id
      ];
      var oneSong = [this.song.songs[index]];
      this.$store.dispatch("getSheetMusicList", oneSong);
      this.$store.dispatch("playMusicIndex", this.playLists.length - 1);
      this.$store.dispatch("getPlayMusic", playMusic);
      this.$store.dispatch("isPlaying", true);
    },
    showMore(id) {
      var data = {
        id: id,
        isShowControl: true
      };
      this.$emit("showControl", data);
    },
    playMv(id, name, singerId) {
      this.$store.dispatch("playMv", [id, name]).then(() => {
        this.$router.push("/musicVideo?mvId=" + id + "&singerId=" + singerId);
      });
    },
    getSingerArtists(id) {
      this.$store.dispatch("getSingerArtists", id).then(() => {
        this.$router.push("/singerMsg?id=" + id);
      });
    },
    toMusicLists(id) {
      this.$router.push("/musicList?sheetId=" + id);
    }
  },
  components: {
    scroll
  }
};
</script>
<style lang="scss" scoped>
.typeName {
  font-size: 18px;
  font-weight: bold;
  margin: 20px 0 10px 0;
}
.more {
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  span {
    display: inline-block;
    width: 100%;
    height: 100%;
    text-align: center;
  }
}
.scrollWrap {
  width: 100%;
  max-height: 559px;
  overflow: hidden;
  .songs {
    width: 95%;
    margin: auto;
    .songsHeader {
      height: 30px;
      margin-top: 20px;
      .playAll {
        border: 1px solid #ebebeb;
        padding: 2px 5px;
        font-size: 12px;
        border-radius: 12px;
        font-weight: bold;
        float: right;
        .iconfont {
          margin-right: 5px;
          font-size: 12px;
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
  .talk {
    width: 95%;
    margin: auto;
    ul {
      width: 100%;
      li {
        width: 100%;
        display: flex;
        margin-top: 10px;
        .talkImg {
          flex: 4;
          max-width: 40%;
          img {
            width: 120px;
            height: 80px;
            border-radius: 5px;
          }
        }
        .talkMsg {
          flex: 6;
          max-width: 60%;
          .talkName {
            display: block;
            margin-top: 20px;
            font-weight: bold;
            font-size: 16px;
          }
          p {
            width: 100%;
            height: 25px;
            line-height: 25px;
            color: #888;
            font-size: 13px;
          }
        }
      }
    }
  }
  .playList {
    width: 95%;
    margin: auto;
    ul {
      width: 100%;
      li {
        width: 100%;
        display: flex;
        margin-top: 10px;
        .playListImg {
          flex: 3;
          max-width: 40%;
          img {
            width: 80px;
            height: 80px;
            border-radius: 5px;
          }
        }
        .playListMsg {
          flex: 7;
          max-width: 70%;
          .playListName {
            display: block;
            margin-top: 20px;
            font-weight: bold;
            font-size: 14px;
          }
          p {
            width: 100%;
            height: 25px;
            line-height: 25px;
            color: #888;
            font-size: 12px;
          }
        }
      }
    }
  }
  .video {
    width: 95%;
    margin: auto;
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
            font-size: 14px;
            color: #222;
            line-height: 20px;
          }
          .publishTime {
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
  .simquery {
    width: 95%;
    margin: auto;
    ul {
      width: 100%;
      li {
        display: inline-block;
        height: 20px;
        padding: 3px 10px;
        margin: 10px 5px;
        border-radius: 13px;
        background: #f1f1f1;
        color: #444;
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
  .mlog {
    width: 95%;
    margin: auto;
    ul {
      width: 100%;
      li {
        display: inline-block;
        width: 50%;
        .mlogBox {
          width: 90%;
          margin: auto;
          box-shadow: 0px 0px 1px 1px rgba(218, 218, 218, 0.637);
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
          .mlogImg {
            width: 100%;
            height: 154px;
            img {
              width: 100%;
              height: 154px;
              border-top-left-radius: 10px;
              border-top-right-radius: 10px;
            }
          }
          .mlogMsg {
            width: 90%;
            margin: 10px auto;
            .mlogDes {
              width: 100%;
              span {
                display: block;
                font-size: 13px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
                -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
                -webkit-line-clamp: 2; /** 显示的行数 **/
              }
            }
            .msg {
              position: relative;
              width: 100%;
              height: 30px;
              margin-top: 5px;
              img {
                width: 16px;
                height: 16px;
                border-radius: 8px;
                vertical-align: middle;
              }
              span {
                font-size: 12px;
                line-height: 30px;
              }
              .likeCount {
                position: absolute;
                right: 0px;
              }
            }
          }
        }
      }
    }
  }
  .artist {
    width: 95%;
    margin: auto;
    ul {
      width: 100%;
      li {
        width: 100%;
        margin-top: 10px;
        .artistBox {
          width: 100%;
          height: 80px;
          display: flex;
          .artistImg {
            flex: 3;
            img {
              width: 80px;
              height: 80px;
              border-radius: 40px;
            }
          }
          .artistName {
            flex: 5;
            line-height: 80px;
            span {
              font-size: 16px;
              color: #000;
              i {
                color: #555;
              }
            }
          }
          .settledIn {
            flex: 2;
          }
        }
      }
    }
  }
  .album,
  .djRadio {
    width: 95%;
    margin: auto;
    ul {
      width: 95%;
      margin: auto;
      li {
        width: 100%;
        height: 80px;
        margin: 10px 0;
        display: flex;
        .albumLeft {
          position: relative;
          flex: 4;
          img {
            width: 80;
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
        .albumRight {
          flex: 8;
          .albumName {
            width: 90%;
            margin: auto;
            font-size: 14px;
            color: #222;
            line-height: 20px;
          }
          .publishTime {
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
  .user {
    width: 95%;
    margin: auto;
    ul {
      width: 100%;
      li {
        width: 100%;
        margin-top: 10px;
        .userBox {
          width: 100%;
          height: 80px;
          display: flex;
          .userImg {
            flex: 3;
            img {
              width: 80px;
              height: 80px;
              border-radius: 40px;
            }
          }
          .userName {
            flex: 5;
            span {
              display: block;
              font-size: 16px;
              color: #000;
              i {
                color: #555;
              }
            }
            .nickName {
              margin-top: 10px;
              line-height: 30px;
            }
            .userDes {
              font-size: 12px;
              color: #444;
            }
          }
          .add {
            flex: 2;
            span {
              position: relative;
              padding: 2px 10px;
              border: 1px solid rgb(255, 0, 0);
              color: rgb(255, 0, 0);
              font-size: 12px;
              border-radius: 10px;
              top: 25px;
            }
          }
        }
      }
    }
  }
}
</style>
