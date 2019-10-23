<template>
  <scroll class="album" :pullup="pullup" @scrollToEnd="getMoreAlbum()">
    <div class="albumList">
      <ul>
        <li
          v-for="(album,index) of singerAlbumList"
          :key="index"
          @click="toAlbum(album.id,album.name)"
        >
          <div class="albumLeft album">
            <img :src="album.picUrl" :alt="album.name" />
          </div>
          <div class="albumRight album">
            <div class="albumName">{{album.name}}</div>
            <div class="publishTime">{{album.publishTime|dateformat("YYYY-MM-DD")}} 歌曲{{album.size}}</div>
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
    this.$store.dispatch("getSingerAlbumList", [data, this.$route.query.id]);
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
    ...mapGetters(["singerAlbumList", "singerArtist"])
  },
  methods: {
    toAlbum(id, name) {
      this.$store.dispatch("playVideo", [id, name]).then(() => {
        this.$router.push("/musicVideo?id=" + id);
      });
    },
    getMoreAlbum() {
      if (this.page * this.limit > this.singerArtist.albumSize) {
        return;
      } else {
        this.page = this.page + 1;
        var data = {
          id: this.singerArtist.id,
          limit: this.limit,
          offset: (this.page - 1) * 10
        };
        this.$store.dispatch("getSingerAlbumList", [
          data,
          this.$route.query.id
        ]);
      }
    }
  },
  components: {
    scroll
  }
};
</script>
<style lang="scss" scoped>
.album {
  width: 100%;
  height: 348px;
  overflow: hidden;
  .albumList {
    width: 100%;
    ul {
      width: 95%;
      margin: auto;
      li {
        width: 100%;
        height: 57px;
        margin: 10px 0;
        display: flex;
        .albumLeft {
          position: relative;
          flex: 2;
          img {
            width: 100%;
            height: 57px;
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
          flex: 10;
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
