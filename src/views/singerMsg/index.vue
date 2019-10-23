<template>
  <div class="singerMsgWrap">
    <div
      class="singerMsgHeader"
      :style="{backgroundImage:'url('+singerArtist.picUrl+')',backgroundSize:'100% 100%',backgroundRepeat:'no-repeat'}"
    >
      <div class="headerTop">
        <div class="returnBox">
          <i class="iconfont" @click="returnPre()">&#xe62d;</i>
        </div>
        <div class="shareBox">
          <i class="iconfont">&#xe63c;</i>
        </div>
      </div>
    </div>
    <div class="singerMsgMain">
      <div class="mainTop">
        <div
          class="mainTopTag"
          v-for="(mainTag,index) of mainTags"
          :key="index"
          @click="switchTag(index)"
        >
          <span :class="{active:index==mainTagIndex}">{{mainTag.name}}</span>
          <i
            v-if="index==2||index==3||index==4"
          >{{index==2?singerArtist.albumSize:(index==3?singerArtist.mvSize:0)}}</i>
        </div>
      </div>
      <div class="singerMsg">
        <HomePage v-if="mainTagIndex==0"></HomePage>
        <SongLists v-if="mainTagIndex==1"></SongLists>
        <Album v-if="mainTagIndex==2"></Album>
        <MusicVideo v-if="mainTagIndex==3"></MusicVideo>
      </div>
    </div>
  </div>
</template>
<script>
import HomePage from "./singerMsg/homePage";
import SongLists from "./singerMsg/songLists";
import MusicVideo from "./singerMsg/musicVideo";
import Album from "./singerMsg/album";
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      title: "歌手信息",
      isShow: false,
      mainTags: [
        { name: "主页" },
        { name: "单曲" },
        { name: "专辑" },
        { name: "视频" },
        { name: "动态" }
      ],
      mainTagIndex: 0
    };
  },
  created() {
    var id = this.$route.query.id;
    this.$store.dispatch("getSingerArtists", id);
  },
  computed: {
    ...mapGetters(["singerArtist"])
  },
  methods: {
    returnPre() {
      this.$router.go(-1);
    },
    switchTag(index) {
      this.mainTagIndex = index;
    }
  },
  components: {
    HomePage,
    SongLists,
    MusicVideo,
    Album
  }
};
</script>
<style lang="scss" scoped>
.iconfont {
  color: #fff;
}
.active {
  color: rgb(255, 2, 2);
  border-bottom: 2px solid rgb(255, 2, 2);
}
.singerMsgWrap {
  width: 100%;
  .singerMsgHeader {
    width: 100%;
    height: 292px;
    margin: auto;
    .headerTop {
      width: 95%;
      margin: auto;
      div {
        margin-top: 10px;
        display: inline-block;
      }
      .shareBox {
        float: right;
      }
    }
  }
  .singerMsgMain {
    width: 100%;
    height: 348px;
    position: relative;
    top: -30px;
    .mainTop {
      display: flex;
      width: 100%;
      height: 30px;
      background: #fff;
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;
      .mainTopTag {
        flex: 1;
        height: 30px;
        border-bottom: 1px solid #efefef;
        text-align: center;
        line-height: 30px;
        span {
          font-size: 14px;
          padding: 4px 0;
        }
        i {
          font-size: 12px;
          color: #888;
        }
      }
    }

    .singerMsg {
      height: 348px;
      overflow: hidden;
    }
  }
}
</style>
