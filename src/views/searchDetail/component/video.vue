<template>
  <scroll class="scrollWrap">
    <div class="scrollBox">
      <ul>
        <li
          v-for="(mv,index) of videoLists.videos"
          :key="index"
          @click="playMv(mv.vid,mv.title,mv.creator[0].userId)"
        >
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
    </div>
  </scroll>
</template>
<script>
import scroll from "@/components/common/scroll";
import axios from "axios";
export default {
  name: "musicList",
  props: {
    keyWords: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      videoLists: {}
    };
  },
  mounted() {
    this.getSearchData();
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
    getSearchData() {
      axios
        .get(
          "http://localhost:3000/search?keywords=" +
            this.keyWords +
            "&type=1014"
        )
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            this.videoLists = res.data.result;
          }
        });
    },
    playAllSongs() {},
    playMv() {},
    showMore(id) {}
  },
  components: {
    scroll
  }
};
</script>
<style lang="scss" scoped>
.scrollWrap {
  width: 100%;
  height: 559px;
  overflow: hidden;
  .scrollBox {
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
}
</style>
