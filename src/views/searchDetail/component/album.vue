<template>
  <scroll class="scrollWrap">
    <div class="scrollBox">
      <ul>
        <li
          v-for="(album,index) of albums.albums"
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
    </div>
  </scroll>
</template>
<script>
import scroll from "@/components/common/scroll";
import axios from "axios";
export default {
  name: "Album",
  props: {
    keyWords: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      albums: {}
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
          "http://localhost:3000/search?keywords=" + this.keyWords + "&type=10"
        )
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            this.albums = res.data.result;
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
}
</style>
