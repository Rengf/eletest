<template>
  <div class="musicListWrap">
    <div class="returnHeader">
      <div class="returnBox">
        <i class="iconfont">&#xe62d;</i>
      </div>
      <div class="musicListName">{{musicListName}}</div>
      <div class="shareBox">
        <i class="iconfont">&#xe630;</i>
        <i class="iconfont">&#xe60d;</i>
      </div>
    </div>
    <div class="musicListMsg">
      <div class="msgMain">
        <div class="musicListImg">
          <img src="../../assets/images/avatar.png" alt />
          <span>
            <i class="iconfont">&#xe602;</i>
          </span>
        </div>
        <div class="otherMsg">
          <div class="msgName">
            <span>云音乐说唱榜</span>
          </div>
          <div class="msgAuthor">
            <img src="../../assets/images/avatar.png" alt="图片" />
            <span>网易云音乐</span>
          </div>
          <div class="msgDesc">
            <span>最近更新:11月1日</span>
            <span>数据的发货时刻的加法和思考发神经的罚款是静待花开</span>
          </div>
        </div>
      </div>
      <div class="like">
        <div>
          <i class="iconfont">&#xe60e;</i>
          <span class="count"></span>
        </div>
        <div>
          <i class="iconfont">&#xe63c;</i>
          <span class="count"></span>
        </div>
        <div>
          <i class="iconfont">&#xe609;</i>
          <span class="count"></span>
        </div>
        <div>
          <i class="iconfont">&#xe63c;</i>
          <span class="count"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import scroll from "@/components/common/scroll";
import ReturnHeader from "@/components/common/returnHeader";
import axios from "axios";
export default {
  data() {
    return {
      title: "歌单",
      musicListName: "歌单"
    };
  },
  mounted() {
    this.getMusicLsit();
  },
  methods: {
    getMusicLsit() {
      axios.get("http://localhost:3000/top/list?idx=6").then(res => {
        if (res.status == 200) {
          console.log(res);
        }
      });
    }
  },
  components: {
    ReturnHeader
  }
};
</script>
<style lang="scss" scoped>
.musicListWrap {
  width: 100%;
  height: 100%;
  top: 0;
  overflow: hidden;
  background: rgb(240, 43, 43);
  .returnHeader {
    width: 95%;
    height: 25px;
    display: flex;
    z-index: 9999;
    background: #123;
    .returnBox {
      flex: 1;
      line-height: 25px;
      i {
        color: #fff;
      }
    }
    .musicListName {
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
  .musicListMsg {
    width: 90%;
    height: 200px;
    margin: auto;
    .msgMain {
      margin-top: 20px;
      margin-bottom: 30px;
      width: 100%;
      height: 120px;
      display: flex;
      .musicListImg {
        height: 120px;
        position: relative;
        flex: 3;
        img {
          width: 120px;
          height: 120px;
          border-radius: 5px;
        }
        span {
          position: absolute;
          right: 20px;
          color: #fff;
          font-size: 12px;
        }
      }
      .otherMsg {
        flex: 4;
        position: relative;
        .msgName {
          width: 100%;
          span {
            font-size: 18px;
            color: #fff;
            font-weight: bold;
          }
        }
        .msgAuthor {
          width: 100%;
          height: 25px;
          margin-top: 5px;
          img {
            width: 25px;
            height: 25px;
            border-radius: 50%;
            vertical-align: middle;
          }
          span {
            display: inline-block;
            margin-left: 5px;
            height: 25px;
            font-size: 13px;
            color: #fafafa;
            line-height: 25px;
            vertical-align: middle;
          }
        }
        .msgDesc {
          width: 100%;
          position: absolute;
          bottom: 0;
          span {
            display: block;
            width: 100%;
            font-size: 12px;
            line-height: 18px;
            color: #ececec;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
    .like {
      width: 90%;
      margin: auto;
      height: 40px;
      display: flex;
      div {
        flex: 1;
        text-align: center;
        i {
          color: #fff;
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
  }
}
</style>
