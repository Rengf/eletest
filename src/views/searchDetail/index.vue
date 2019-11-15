<template>
  <div class="searchDetailWrap">
    <div class="searchHeader">
      <div class="returnBox">
        <i class="iconfont" @click="returnPre()">&#xe62d;</i>
      </div>
      <div class="searchBox">
        <input type="text" :placeholder="palceHolder" v-model="keyWords" @keyup.enter="search()" />
        <i class="iconfont" v-if="keyWords" @click="clearKeyWords()">&#xe607;</i>
      </div>
    </div>
    <scroll class="categoryList" :scrollX="true" :scrollY="false">
      <ul>
        <li
          v-for="(tag,index) of myTags"
          :key="index"
          @click="getTags(index,tag.tag)"
          :class="{active:activeIndex==index}"
        >{{tag.name}}</li>
      </ul>
    </scroll>
    <div
      :is="currentView"
      :searchData="searchData"
      :keyWords="keyWords"
      @more="more"
      @showControl="showControl"
    ></div>
    <NavBar v-if="isMusicPlay"></NavBar>
    <transition name="slide-fade">
      <MusicControl v-if="isShowControl" @showControl="showControl" :songMsg="songMsg"></MusicControl>
    </transition>
  </div>
</template>
<script>
import NavBar from "@/components/navBar/navBar";
import scroll from "@/components/common/scroll";
import MusicList from "./component/musicLists";
import Comprehensive from "./component/comprehensive";
import MusicControl from "./component/musicControl";
import Video from "./component/video";
import Artist from "./component/artist";
import PlayList from "./component/playList";
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      keyWords: "",
      isMusicPlay: false,
      palceHolder: "人们都在搜",
      myTags: [
        { name: "综合", tag: "comprehensive", type: "1018" },
        { name: "单曲", tag: "MusicList", type: "1" },
        { name: "云村" },
        { name: "视频", tag: "Video" },
        { name: "歌手", tag: "Artist" },
        { name: "专辑" },
        { name: "歌单", tag: "PlayList" },
        { name: "主播电台" },
        { name: "用户" }
      ],
      activeIndex: 0,
      currentView: "Comprehensive",
      searchData: {},
      isShowControl: false,
      songMsg: ""
    };
  },
  mounted() {
    this.keyWords = this.$route.query.keywords;
    this.search(this.keyWords);
    if (this.playMusic.name) {
      this.isMusicPlay = true;
    }
    axios.get("http://localhost:3000/search/default").then(res => {
      if (res.status == 200) {
        this.palceHolder = res.data.data.showKeyword;
      }
    });
  },
  computed: {
    ...mapGetters(["playMusic"])
  },
  watch: {
    playMusic() {
      this.isMusicPlay = true;
    }
  },
  methods: {
    search(keywords) {
      if (keywords) {
        this.keyWords = keywords;
      }
      axios
        .get(
          "http://localhost:3000/search?keywords=" +
            this.keyWords +
            "&type=1018"
        )
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            this.searchData = res.data.result;
          }
        });
    },
    clearKeyWords() {
      this.keyWords = "";
    },
    getTags(index, tag) {
      this.activeIndex = index;
      this.currentView = tag;
    },
    more(tag, index) {
      this.activeIndex = index;
      this.currentView = tag;
    },
    showControl(data) {
      if (data.id) {
        axios
          .get("http://localhost:3000/song/detail?ids=" + data.id)
          .then(res => {
            if (res.status == 200) {
              this.songMsg = res.data.songs[0];
              this.isShowControl = data.isShowControl;
            }
          });
      } else {
        this.isShowControl = data.isShowControl;
      }
    },
    returnPre() {
      this.$router.go(-1);
    },

    showCoverImg() {
      this.isShowCover = !this.isShowCover;
    },
    showControl(data) {
      if (data.id) {
        axios
          .get("http://localhost:3000/song/detail?ids=" + data.id)
          .then(res => {
            if (res.status == 200) {
              this.songMsg = res.data.songs[0];
              this.isShowControl = data.isShowControl;
            }
          });
      } else {
        this.isShowControl = data.isShowControl;
      }
    }
  },
  components: {
    scroll,
    NavBar,
    MusicList,
    Comprehensive,
    Video,
    MusicControl,
    Artist,
    PlayList
  }
};
</script>
<style lang="scss" scoped>
.active {
  font-weight: bold;
  color: rgb(255, 25, 25);
  border-bottom: 2px solid rgb(255, 25, 25);
}
.searchDetailWrap {
  width: 100%;
  .searchHeader {
    width: 95%;
    margin: auto;
    height: 30px;
    display: flex;
    .returnBox {
      flex: 2;
      text-align: center;
      line-height: 30px;
      .iconfont {
        font-size: 16px;
        color: #000;
      }
    }
    .searchBox {
      position: relative;
      flex: 18;
      max-width: 90%;
      input {
        width: 100%;
        height: 30px;
        line-height: 30px;
        border-top: none;
        border-left: none;
        border-right: none;
        border-bottom: 1px solid #444;
        outline: none;
      }
      .iconfont {
        position: absolute;
        right: 0px;
        font-size: 30px;
      }
    }
  }
  .categoryList {
    margin-top: 20px;
    width: 100%;
    height: 31px;
    overflow: hidden;
    ul {
      height: 30px;
      white-space: nowrap;
      display: inline-block;
      border-bottom: 1px solid #efefef;
      li {
        display: inline-block;
        height: 28px;
        margin: 0 20px;
        line-height: 28px;
        letter-spacing: 1px;
        font-size: 14px;
      }
    }
  }
}
</style>
