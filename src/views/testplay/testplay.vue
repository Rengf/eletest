<template>
  <div class="wrapper">
    <scroll class="middle-r" ref="lyricList" :data="currentLyric && currentLyric.lines">
      <div class="lyric-wrapper">
        <div v-if="currentLyric">
          <p
            ref="lyricLine"
            class="text"
            :class="{'current': currentLineNum === index}"
            v-for="(line, index) in currentLyric.lines"
            :key="line.time"
          >{{line.txt}}</p>
        </div>
      </div>
    </scroll>
  </div>
</template>
<script>
import scroll from "@/components/common/scroll";
import Lyric from "lyric-parser";
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      currentLyric: null,
      currentLineNum: 0,
      currentTime: 1000
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getlyric();
    });
  },
  computed: {
    ...mapGetters(["playMusic", "sheetMusicLists"])
  },
  components: {
    scroll
  },
  methods: {
    getlyric() {
      axios.get("http://localhost:3000/lyric?id=1330348068").then(res => {
        if (res.data.code == 200) {
          var lyric = res.data.lrc.lyric;
          this.currentLyric = new Lyric(lyric, this.handl);
          this.currentLyric.seek(this.currentTime * 1000);
        }
      });
    },
    handl({ lineNum, txt }) {
      console.log({ lineNum, txt });
      this.currentLineNum = lineNum;
      // 若当前行大于5,开始滚动,以保歌词显示于中间位置
      if (lineNum > 5) {
        let lineEl = this.$refs.lyricLine[lineNum - 5]; // 结合better-scroll，滚动歌词
        this.$refs.lyricList.scrollToElement(lineEl, 1000);
      } else {
        this.$refs.lyricList.scrollToElement(0, 0, 1000);
      }
    }
  }
};
</script>
<style lang="scss">
.current {
  color: #ba12b2;
  font-size: 18px;
}
.middle-r {
  width: 100%;
  height: 500px;
  overflow: hidden;
  .lyric-wrapper {
    font-size: 16px;
    color: #acb134;
    line-height: 30px;
    text-align: center;
  }
}
</style>
