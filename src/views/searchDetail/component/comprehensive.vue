<template>
  <scroll class="scrollWrap">
    <div>
      <div class="maylike"></div>
      <div class="songs" v-if="song">
        <div class="songsHeader">
          <span class="typeName">单曲</span>
          <span class="playAll">
            <i class="iconfont">&#xe658;</i>播放全部
          </span>
        </div>
        <ul>
          <li v-for="(song,index) in song.songs" :key="index">
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
        <div class="more" v-if="song.more">
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
      <div class="playList"></div>
      <div class="video"></div>
      <div class="simquery"></div>
      <div class="mlog"></div>
      <div class="artist"></div>
      <div class="album"></div>
      <div class="djRadio"></div>
      <div class="user"></div>
    </div>
  </scroll>
</template>
<script>
import scroll from "@/components/common/scroll";
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
    }
  },
  methods: {},
  components: {
    scroll
  }
};
</script>
<style lang="scss" scoped>
.typeName {
  font-size: 18px;
  font-weight: bold;
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
}
</style>
