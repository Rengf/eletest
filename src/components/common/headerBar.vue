<template>
  <div class="headerWrap">
    <el-row>
      <el-col :span="4">
        <div class="grid-content menu" @click="jump('menu')">
          <i class="iconfont">&#xe606;</i>
        </div>
      </el-col>
      <el-col :span="4">
        <div
          class="grid-content myself"
          :class="{active:activeClass==='myself'}"
          @click="jump('myself')"
        >
          <span>我的</span>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content find" :class="{active:activeClass==='find'}" @click="jump('find')">
          <span>发现</span>
        </div>
      </el-col>
      <el-col :span="4">
        <div
          class="grid-content cloud"
          :class="{active:activeClass==='cloud'}"
          @click="jump('cloud')"
        >
          <span>云村</span>
        </div>
      </el-col>
      <el-col :span="4">
        <div
          class="grid-content vedio"
          :class="{active:activeClass==='vedio'}"
          @click="jump('vedio')"
        >
          <span>视频</span>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content search" @click="jump('search')">
          <i class="iconfont">&#xe630;</i>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "headerBar",
  data() {
    return {
      activeClass: "find"
    };
  },
  methods: {
    jump(val) {
      if (val === "myself") {
        this.activeClass = val;
        this.$router.push("/login");
      } else if (val === "find") {
        this.activeClass = val;
        this.$router.push("/login");
      } else if (val === "cloud") {
        this.activeClass = val;
        this.$router.push("/login");
      } else if (val === "vedio") {
        this.activeClass = val;
        this.$router.push("/login");
      } else if (val === "menu") {
        this.$emit("showSliderBar", true);
      } else if (val === "search") {
        this.$router.push("/search");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.iconfont {
  font-family: "iconfont" !important;
  font-size: 25px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.active {
  font-weight: bold;
  span {
    font-size: 20px;
    color: #000 !important;
  }
}
.headerWrap {
  height: 40px;
  width: 100%;
  .grid-content {
    line-height: 40px;
    letter-spacing: 1px;
    span {
      font-size: 16px;
      color: #777;
    }
  }
  .menu {
    i {
      margin-left: 10px;
    }
  }
  .myself {
    text-align: center;
  }
  .find {
    text-align: center;
  }
  .cloud {
    text-align: center;
  }
  .vedio {
    text-align: center;
  }
  .search {
    text-align: right;
    i {
      margin-right: 10px;
    }
  }
}
</style>
