<template>
  <div class="singerMsgWrap">
    <div
      class="singerMsgHeader"
      :style="{backgroundImage:'url('+singerArtists.artist.picUrl+')',backgroundSize:'100% 100%',backgroundRepeat:'no-repeat'}"
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
        </div>
      </div>
      <scroll>
        <div class="singer"></div>
      </scroll>
    </div>
  </div>
</template>
<script>
import scroll from "@/components/common/scroll";
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
  computed: {
    ...mapGetters(["singerArtists"])
  },
  methods: {
    getmsg() {
      console.log(this.singerArtists);
      axios.get("http://localhost:3000/artist/desc?id=6452").then(res => {
        console.log(res);
      });
    },
    returnPre() {
      this.$router.go(-1);
    },
    switchTag(index) {
      this.mainTagIndex = index;
    }
  },
  components: {
    scroll
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
      background: #ccc;
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;
      .mainTopTag {
        flex: 1;
        height: 30px;
        span {
          display: block;
          font-size: 14px;
          text-align: center;
          line-height: 30px;
        }
      }
    }
  }
}
</style>
