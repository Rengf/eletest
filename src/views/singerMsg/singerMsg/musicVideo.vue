<template>
  <scroll class="musicVideo">
    <div class="videoList">
      <button @click="getmv()">dfhasj</button>
      <ul>
        <li v-for="(mv,index) of singerMv" :key="index" @click="playMv(mv.id)">
          <div class="mvLeft mv">
            <img :src="mv.imgurl" :alt="mv.name" />
          </div>
          <div class="mvRight mv">发神经的复活卡国家会计师的环境卡仕达</div>
        </li>
      </ul>
    </div>
  </scroll>
</template>
<script>
import scroll from "@/components/common/scroll";
import VideoPlay from "@/components/video/videoPlay";
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getSingerMv", this.singerArtist.id);
  },
  computed: {
    ...mapGetters(["singerMv", "singerArtist"])
  },
  methods: {
    getmv() {
      console.log(this.singerArtist, this.singerMv);
    },
    playMv(id) {
      this.$store.dispatch("playVideo", id);
    }
  },
  components: {
    scroll,
    VideoPlay
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
          flex: 3;
          img {
            width: 100%;
            height: 80px;
            border-radius: 5px;
          }
        }
        .mvRight {
          flex: 5;
        }
      }
    }
  }
}
</style>
