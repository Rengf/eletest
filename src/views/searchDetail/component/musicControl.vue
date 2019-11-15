<template>
  <div class="musicControlBox" @click.self="showControl()">
    <div class="musicControl">
      <div class="musicMsgBox">
        <div class="musicMsg">
          <div class="msgImg">
            <img :src="songMsg.al.picUrl" alt="图片" />
          </div>
          <div class="nameSinger">
            <span class="name">歌曲：{{songMsg.name}}</span>
            <span class="singer">{{songMsg.ar[0].name}}</span>
          </div>
          <div class="tips">
            <span>VIP首开5元</span>
          </div>
        </div>
        <div class="downTips">
          <p>开通VIP畅享千万曲库下载特权</p>
        </div>
      </div>
      <scroll class="controlList">
        <ul>
          <li @click="nextPlay()">
            <span class="iconfontBox">
              <i class="iconfont">&#xe658;</i>
            </span>
            <span class="controlName">下一首播放</span>
          </li>
          <li @click="getMsg()">
            <span class="iconfontBox">
              <i class="iconfont">&#xe625;</i>
            </span>
            <span class="controlName">收藏到歌单</span>
          </li>
          <li>
            <span class="iconfontBox">
              <i class="iconfont">&#xe609;</i>
            </span>
            <span class="controlName">下载</span>
          </li>
          <li>
            <span class="iconfontBox">
              <i class="iconfont">&#xe60e;</i>
            </span>
            <span class="controlName">评论</span>
          </li>
          <li>
            <span class="iconfontBox">
              <i class="iconfont">&#xe63c;</i>
            </span>
            <span class="controlName">分享</span>
          </li>
          <li>
            <span class="iconfontBox">
              <i class="iconfont">&#xe647;</i>
            </span>
            <span class="controlName">歌手：{{songMsg.ar[0].name}}</span>
          </li>
          <li>
            <span class="iconfontBox">
              <i class="iconfont">&#xe675;</i>
            </span>
            <span class="controlName">专辑</span>
          </li>
          <li>
            <span class="iconfontBox">
              <i class="iconfont">&#xe613;</i>
            </span>
            <span class="controlName">设为铃声</span>
          </li>
          <li>
            <span class="iconfontBox">
              <i class="iconfont">&#xe612;</i>
            </span>
            <span class="controlName">购买单曲</span>
          </li>
          <li>
            <span class="iconfontBox">
              <i class="iconfont">&#xe6b7;</i>
            </span>
            <span class="controlName">查看视频</span>
          </li>
          <li>
            <span class="iconfontBox">
              <i class="iconfont">&#xe6ec;</i>
            </span>
            <span class="controlName">人气榜应援</span>
          </li>
          <li>
            <span class="iconfontBox">
              <i class="iconfont">&#xe626;</i>
            </span>
            <span class="controlName">屏蔽歌曲或歌手</span>
          </li>
        </ul>
      </scroll>
    </div>
  </div>
</template>
<script>
import scroll from "@/components/common/scroll";
export default {
  props: {
    songMsg: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {};
  },
  methods: {
    showControl() {
      var data = {
        isShowControl: false
      };
      this.$emit("showControl", data);
    },
    nextPlay() {
      this.$store.dispatch("setNextPlayMusic", this.songMsg);
      var data = {
        isShowControl: false
      };
      this.$emit("showControl", data);
    },
    getMsg() {}
  },
  components: {
    scroll
  }
};
</script>
<style lang="scss" scoped>
.musicControlBox {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  background: rgba($color: #bbbbbb, $alpha: 0.5);
  overflow: hidden;
  .musicControl {
    width: 100%;
    position: fixed;
    height: 85%;
    bottom: 0;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    background: #fff;
    z-index: 99999;
    .musicMsgBox {
      width: 100%;
      height: 100px;
      .musicMsg {
        display: flex;
        width: 100%;
        height: 70px;
        .msgImg {
          flex: 3;
          img {
            display: block;
            margin: 10px auto;
            width: 50px;
            height: 50px;
            border-radius: 5px;
          }
        }
        .nameSinger {
          flex: 10;
          max-width: 62%;
          span {
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .name {
            font-size: 14px;
            color: #010101;
            font-weight: bold;
            line-height: 40px;
          }
          .singer {
            font-size: 13px;
            color: #787878;
          }
        }
        .tips {
          flex: 3;
          span {
            display: block;
            width: 70px;
            height: 20px;
            border-radius: 10px;
            line-height: 20px;
            text-align: center;
            margin-top: 25px;
            margin-right: 5px;
            font-size: 12px;
            color: #fd0202;
            border: 1px solid #fd0202;
          }
        }
      }
      .downTips {
        width: 100%;
        height: 20px;
        border-bottom: 1px solid #efefef;
        p {
          font-size: 12px;
          color: #787878;
          margin-left: 30px;
        }
      }
    }
    .controlList {
      width: 100%;
      height: 445px;
      overflow: hidden;
      ul {
        width: 100%;
        li {
          width: 100%;
          height: 50px;
          span {
            display: inline-block;
            line-height: 50px;
          }
          .iconfontBox {
            width: 15%;
            text-align: center;
            i {
              font-size: 20px;
              font-weight: bold;
            }
          }
          .controlName {
            width: 85%;
            font-size: 14px;
            border-bottom: 1px solid #dfdfdf;
          }
        }
      }
    }
  }
}
</style>
