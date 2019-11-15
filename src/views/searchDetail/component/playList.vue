<template>
  <scroll class="scrollWrap">
    <div class="scrollBox">
      <ul>
        <li v-for="(play,index) in playList.playlists" :key="index" @click="toMusicLists(play.id)">
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
    </div>
  </scroll>
</template>
<script>
import scroll from "@/components/common/scroll";
import axios from "axios";
export default {
  name: "Artist",
  props: {
    keyWords: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      playList: {}
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
            "&type=1000"
        )
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            this.playList = res.data.result;
          }
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
.scrollWrap {
  width: 100%;
  height: 559px;
  overflow: hidden;
  .scrollBox {
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
}
</style>
