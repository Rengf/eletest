<template>
  <div class="searchDetailWrap">
    <div class="searchHeader">
      <div class="returnBox">
        <i class="iconfont">&#xe62d;</i>
      </div>
      <div class="searchBox">
        <input type="text" :placeholder="palceHolder" v-model="keyWords" @keyup.enter="search()" />
        <i class="iconfont" v-if="keyWords" @click="clearKeyWords()">&#xe607;</i>
      </div>
    </div>
    <NavBar v-if="isMusicPlay"></NavBar>
  </div>
</template>
<script>
import NavBar from "@/components/navBar/navBar";
import scroll from "@/components/common/scroll";
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      keyWords: "",
      isMusicPlay: false,
      palceHolder: "人们都在搜"
    };
  },
  mounted() {
    this.keyWords = this.$route.query.keywords;
    this.search(this.keyWords);
    if (this.playMusic.name) {
      this.isMusicPlay = true;
    }
    axios.get("http://localhost:3000/search/default").then(res => {
      if (res.status == 200) {
        this.palceHolder = res.data.data.showKeyword;
      }
    });
    axios.get("http://localhost:3000/search/hot/detail").then(res => {
      if (res.status == 200) {
        this.hotSearchLists = res.data.data;
      }
    });
  },
  computed: {
    ...mapGetters(["playMusic"])
  },
  watch: {
    playMusic() {
      this.isMusicPlay = true;
    }
  },
  methods: {
    search(keywords) {
      if (keywords) {
        this.keyWords = keywords;
      }
      axios
        .get("http://localhost:3000/search?keywords=" + this.keyWords)
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            // this.hotSearchLists = res.data.data;
          }
        });
    },
    clearKeyWords() {
      this.keyWords = "";
    }
  },
  components: {
    scroll,
    NavBar
  }
};
</script>
<style lang="scss" scoped>
.searchDetailWrap {
  width: 100%;
  .searchHeader {
    width: 100%;
    height: 30px;
    display: flex;
    .returnBox {
      flex: 2;
      text-align: center;
      line-height: 30px;
      .iconfont {
        font-size: 16px;
        color: #000;
      }
    }
    .searchBox {
      position: relative;
      flex: 18;
      max-width: 90%;
      input {
        width: 100%;
        height: 30px;
        line-height: 30px;
        border-top: none;
        border-left: none;
        border-right: none;
        border-bottom: 1px solid #444;
        outline: none;
      }
      .iconfont {
        position: absolute;
        right: 0px;
        font-size: 30px;
      }
    }
  }
}
</style>
