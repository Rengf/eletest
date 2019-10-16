<template>
  <div class="singerWrap">
    <ReturnHeader :title="title"></ReturnHeader>
    <div class="singerCategoryTag">
      <ul>
        <li
          v-for="(area,index) of singerCategory.area"
          :key="index"
          @click="setArea(index,area.id)"
        >
          <span :class="{active:index==scIndex}">{{area.name}}</span>
        </li>
      </ul>
      <ul>
        <li v-for="(sex,index) of singerCategory.sex" :key="index" @click="setSex(index,sex.id)">
          <span :class="{active:index==sexIndex}">{{sex.name}}</span>
        </li>
      </ul>
    </div>
    <ul>
      <li v-for="(singer,index) of singerLists" :key="index">
        <img :src="singer.img1v1Url" alt />
        {{index+1}}------{{singer.name}}
      </li>
    </ul>
    <button @click="next()">下一页</button>
    <span>当前第{{page}}页</span>
  </div>
</template>
<script>
import ReturnHeader from "@/components/common/returnHeader";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      title: "歌手",
      page: 1,
      scIndex: 0,
      sexIndex: 0,
      singerCategory: {
        area: [
          { id: "000", name: "全部" },
          { id: 100, name: "华语" },
          { id: 200, name: "港台" },
          { id: 200, name: "欧美" },
          { id: 200, name: "日本" },
          { id: 200, name: "韩国" },
          { id: 200, name: "其他" }
        ],
        sex: [
          { id: 0, name: "全部" },
          { id: 1, name: "男" },
          { id: 2, name: "女" },
          { id: 3, name: "组合" }
        ]
      }
    };
  },
  mounted() {
    var data = {
      limit: 30,
      page: (this.page - 1) * 30
    };
    this.$store.dispatch("getSingerList", data);
  },
  computed: {
    ...mapGetters(["singerLists"])
  },
  methods: {
    next() {
      this.page = this.page + 1;
      var data = {
        limit: 30,
        page: (this.page - 1) * 30
      };
      this.$store.dispatch("getSingerList", data);
    },
    setArea(index) {
      this.scIndex = index;
    },
    setSex(index) {
      this.sexIndex = index;
    }
  },
  components: {
    ReturnHeader
  }
};
</script>
<style lang="scss" scoped>
.active {
  background: rgb(253, 1, 1);
  color: #fff;
}
.singerWrap {
  width: 100%;
  .singerCategoryTag {
    width: 95%;
    margin: auto;
    overflow: hidden;
    ul {
      width: 100%;
      margin: 15px;
      li {
        width: 14%;
        float: left;
        span {
          display: block;
          width: 100%;
          height: 24px;
          border-radius: 12px;
          line-height: 24px;
          font-size: 15px;
          text-align: center;
        }
      }
    }
  }
}
img {
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
</style>
