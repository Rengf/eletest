<template>
  <div class="topListWrap">
    <ReturnHeader :title="title"></ReturnHeader>
    <scroll class="topList">
      <div>
        <div class="guanfang">
          <h2>官方榜</h2>
          <div class="topBox" v-for="(top,index) of topOriginalLists" :key="index">
            <div class="topImg">
              <img :src="top.coverImgUrl" alt="图片" />
              <span>{{top.updateFrequency}}</span>
            </div>
            <div class="topMusic">
              <div v-for="(music,index) of top.tracks" :key="music.first">
                <span>{{index+1}}.{{music.first}}-{{music.second}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="gengduo">
          <h2>更多榜单</h2>
          <router-link
            class="topBox"
            v-for="(top,index) of topOtherLists"
            :key="index"
            :to="'/musicList?topId='+top.id"
          >
            <div class="topImg">
              <img :src="top.coverImgUrl" alt="图片" />
              <span>{{top.updateFrequency}}</span>
            </div>
            <div class="topName">
              <span>{{top.name}}</span>
            </div>
          </router-link>
        </div>
      </div>
    </scroll>
  </div>
</template>
<script>
import ReturnHeader from "@/components/common/returnHeader";
import scroll from "@/components/common/scroll";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      title: "排行榜"
    };
  },
  mounted() {
    this.$store.dispatch("getTopList");
  },
  computed: {
    ...mapGetters(["topOriginalLists", "topOtherLists"])
  },
  methods: {},
  components: {
    ReturnHeader,
    scroll
  }
};
</script>
<style lang="scss" scoped>
.topListWrap {
  width: 100%;
  .topList {
    width: 100%;
    height: calc(100vh - 30px);
    overflow: hidden;
    .guanfang {
      width: 95%;
      margin: auto;
      h2 {
        color: #000;
        font-weight: bold;
        font-size: 15px;
        line-height: 30px;
      }
      .topBox {
        width: 100%;
        height: 100px;
        margin-top: 10px;
        display: flex;
        .topImg {
          flex: 3;
          height: 100px;
          position: relative;
          img {
            width: 100px;
            height: 100px;
            border-radius: 5px;
          }
          span {
            position: absolute;
            font-size: 12px;
            color: #efefef;
            left: 5px;
            bottom: 5px;
          }
        }
        .topMusic {
          flex: 6;
          width: 100%;
          height: 100px;
          overflow: hidden;
          div {
            width: 100%;
            height: 33%;
            line-height: 33px;
            span {
              font-size: 14px;
              color: #888;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
    }
    .gengduo {
      width: 95%;
      margin: 10px auto;
      overflow: hidden;
      h2 {
        color: #000;
        font-weight: bold;
        font-size: 15px;
        line-height: 30px;
      }
      .topBox {
        width: 33.333%;
        height: 150px;
        float: left;
        .topImg {
          position: relative;
          width: 100px;
          height: 100px;
          margin: auto;
          img {
            width: 100px;
            height: 100px;
            border-radius: 5px;
          }
          span {
            position: absolute;
            font-size: 12px;
            color: #efefef;
            left: 5px;
            bottom: 5px;
          }
        }
        .topName {
          width: 100px;
          height: 50px;
          margin: auto;
          span {
            font-size: 12px;
            color: #888;
          }
        }
      }
    }
  }
}
</style>
