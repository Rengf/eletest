<template>
  <div class="searchWrap">
    <div class="searchHeader">
      <div class="returnBox" @click="returnPre()">
        <i class="iconfont">&#xe62d;</i>
      </div>
      <div class="searchBox">
        <input type="text" :placeholder="palceHolder" v-model="keyWords" @keyup.enter="search()" />
      </div>
      <router-link class="singer" to="/singer">
        <i class="iconfont">&#xe647;</i>
      </router-link>
    </div>
    <scroll class="hotSearch">
      <div class="hotLists">
        <h2 class="hotName">热搜榜</h2>
        <ul>
          <li
            v-for="(hotSearch,index) of hotSearchLists"
            :key="index"
            @click="search(hotSearch.searchWord)"
          >
            <div class="listIndex">
              <span>{{index+1}}</span>
            </div>
            <div class="searchMsg">
              <span class="searchWord">
                {{hotSearch.searchWord}}
                <img
                  :src="hotSearch.iconUrl"
                  alt="图标"
                  v-if="hotSearch.iconUrl"
                />
              </span>
              <span class="searchContent">{{hotSearch.content}}</span>
            </div>
            <div class="score">
              <span>{{hotSearch.score}}</span>
            </div>
          </li>
        </ul>
      </div>
    </scroll>
    <NavBar v-if="isMusicPlay"></NavBar>
  </div>
</template>
<script>
import scroll from "@/components/common/scroll";
import NavBar from "@/components/navBar/navBar";
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      isMusicPlay: false,
      palceHolder: "人们都在搜",
      hotSearchLists: [],
      keyWords: ""
    };
  },
  mounted() {
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
  watch: {
    playMusic() {
      this.isMusicPlay = true;
    }
  },
  computed: {
    ...mapGetters(["playMusic"])
  },
  methods: {
    search(keywords) {
      if (keywords) {
        this.keyWords = keywords;
      } else {
        this.keyWords = this.palceHolder;
      }
      this.$router.push("/searchdetail?keywords=" + this.keyWords);
    },
    returnPre() {
      this.$router.go(-1);
    }
  },
  components: {
    scroll,
    NavBar
  }
};
</script>
<style lang="scss" scoped>
.searchWrap {
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
      flex: 14;
      max-width: 77%;
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
    }
    .singer {
      flex: 2;
      text-align: center;
      line-height: 30px;
      .iconfont {
        font-size: 20px;
        color: #000;
        font-weight: bold;
      }
    }
  }
  .hotSearch {
    width: 100%;
    height: 560px;
    overflow: hidden;
    margin-top: 10px;
    .hotLists {
      width: 100%;
      .hotName {
        margin-top: 20px;
        margin-left: 10px;
        line-height: 30px;
        font-size: 15px;
        color: #000;
        font-weight: bold;
      }
      ul {
        width: 100%;
        li {
          width: 100%;
          height: 50px;
          display: flex;
          .listIndex {
            flex: 2;
            font-size: 16px;
            color: #444;
            line-height: 50px;
            text-align: center;
          }
          .searchMsg {
            flex: 12;
            max-width: 66%;
            span {
              display: block;
            }
            .searchWord {
              font-size: 16px;
              font-weight: bold;
              line-height: 25px;
              img {
                height: 15px;
                vertical-align: top;
              }
            }
            .searchContent {
              font-size: 12px;
              color: #484848;
            }
          }
          .score {
            flex: 4;
            font-size: 12px;
            color: #888;
            line-height: 50px;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
