<template>
  <scroll class="scrollWrap">
    <div class="scrollBox">
      <ul>
        <li v-for="(singer,index) in artist.artists" :key="index">
          <div class="artistBox" @click="getSingerArtists(singer.id)">
            <div class="artistImg">
              <img :src="singer.img1v1Url" alt="头像" />
            </div>
            <div class="artistName">
              <span>
                {{singer.name}}
                <i v-if="singer.alias[0]">({{singer.alias[0]}})</i>
              </span>
            </div>
            <div class="settledIn"></div>
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
      artist: {}
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
          "http://localhost:3000/search?keywords=" + this.keyWords + "&type=100"
        )
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            this.artist = res.data.result;
          }
        });
    },
    getSingerArtists(id) {
      this.$store.dispatch("getSingerArtists", id).then(() => {
        this.$router.push("/singerMsg?id=" + id);
      });
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
        margin-top: 10px;
        .artistBox {
          width: 100%;
          height: 80px;
          display: flex;
          .artistImg {
            flex: 3;
            img {
              width: 80px;
              height: 80px;
              border-radius: 40px;
            }
          }
          .artistName {
            flex: 5;
            line-height: 80px;
            span {
              font-size: 16px;
              color: #000;
              i {
                color: #555;
              }
            }
          }
          .settledIn {
            flex: 2;
          }
        }
      }
    }
  }
}
</style>
