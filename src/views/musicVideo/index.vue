<template>
  <div class="musicVideo">
    <div class="videoMsg">
      <transition name="slide-fade">
        <div class="videoMsgHeader" v-show="isShowHeader">
          <div class="returnBox">
            <i class="iconfont" @click="returnPre()">&#xe62d;</i>
          </div>
          <div class="videoName" :title="playVideo.name">{{playVideo.name}}</div>
          <div class="shareBox">
            <i class="iconfont">&#xe63c;</i>
            <i class="iconfont">&#xe60d;</i>
          </div>
        </div>
      </transition>
      <div class="video">
        <MyVideo :videoUrl="playVideo.url" @showControls="showHeader"></MyVideo>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import MyVideo from "@/components/video/videoPlay";
export default {
  data() {
    return {
      isShowHeader: false
    };
  },
  components: {
    MyVideo
  },
  computed: {
    ...mapGetters(["playVideo"])
  },
  methods: {
    returnPre() {
      this.$router.go(-1);
    },
    showHeader(data) {
      this.isShowHeader = data;
    }
  }
};
</script>
<style lang="scss" scoped>
.iconfont {
  color: #fff;
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
  width: 100%;
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
  }
}
</style>
