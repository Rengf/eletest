<template>
  <scroll class="musicVideo" :pullup="pullup" @scrollToEnd="getMoreMv()">
    <div class="videoList">
      <ul>
        <li v-for="(mv,index) of singerMvList" :key="index" @click="playMv(mv.id,mv.name)">
          <div class="mvLeft mv">
            <img :src="mv.imgurl" :alt="mv.name" />
            <span class="clickTotal">
              <i class="iconfont">&#xe602;</i>
              {{mv.playCount|playCountFilter}}
            </span>
          </div>
          <div class="mvRight mv">
            <div class="videoName">{{mv.name}}</div>
            <div class="publishTime">{{mv.publishTime}}</div>
          </div>
        </li>
      </ul>
    </div>
  </scroll>
</template>
<script>
import scroll from "@/components/common/scroll";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      pullup: true,
      page: 1,
      limit: 10
    };
  },
  mounted() {
    var data = {
      id: this.$route.query.id,
      limit: this.limit,
      offset: 0
    };
    this.$store.dispatch("getSingerMvList", [data, this.singerArtist.id]);
  },
  filters: {
    playCountFilter(value) {
      if (value > 100000) {
        return parseInt(value / 10000) + "万";
      } else {
        return value;
      }
    }
  },
  computed: {
    ...mapGetters(["singerMvList", "singerArtist"])
  },
  methods: {
    playMv(id, name) {
      this.$store.dispatch("playMv", [id, name]).then(() => {
        this.$router.push(
          "/musicVideo?mvId=" + id + "&singerId=" + this.$route.query.id
        );
      });
    },
    getMoreMv() {
      if (this.page * this.limit > this.singerArtist.mvSize) {
        return;
      } else {
        this.page = this.page + 1;
        var data = {
          id: this.singerArtist.id,
          limit: this.limit,
          offset: (this.page - 1) * 10
        };
        this.$store.dispatch("getSingerMvList", [data, this.singerArtist.id]);
      }
    }
  },
  components: {
    scroll
  }
};
</script>
<style lang="scss" scoped>
.musicVideo {
  width: 100%;
  height: 348px;
  overflow: hidden;
  .videoList {
    width: 100%;
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
