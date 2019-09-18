<template>
  <div class="carouselWrap">
    <div class="carouselBox">
      <div class="imageBox">
        <transition-group tag="ul" name="image">
          <li v-show="lunboIndex === index" v-for="(image,index) in imageList" :key="index">
            <img :src="image.url" :alt="index+'.png'" />0
          </li>
        </transition-group>
      </div>
      <div class="buttonBox">
        <ul>
          <li v-for="(image,index) in imageList" :key="index">
            <i @click="jump(index)" :class="{active:index===lunboIndex}"></i>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      lunboIndex: 0,
      imageList: [
        {
          url: require("../../../../assets/images/avatar.png")
        },
        {
          url: require("../../../../assets/images/avatar.png")
        },
        {
          url: require("../../../../assets/images/avatar.png")
        },
        {
          url: require("../../../../assets/images/avatar.png")
        },
        {
          url: require("../../../../assets/images/avatar.png")
        },
        {
          url: require("../../../../assets/images/avatar.png")
        },
        {
          url: require("../../../../assets/images/avatar.png")
        }
      ]
    };
  },
  mounted() {
    this.jumpadd();
  },
  methods: {
    jump(index) {
      this.lunboIndex = index;
    },
    jumpadd() {
      setInterval(() => {
        this.lunboIndex++;
        if (this.lunboIndex == 7) {
          this.lunboIndex = 0;
        }
      }, 3000);
    }
  }
};
</script>
<style lang="scss" scoped>
.active {
  background: rgb(248, 2, 2) !important;
}
.carouselWrap {
  position: relative;
  width: 100%;
  height: 150px;
  .carouselBox {
    width: 100%;
    height: 100%;
    margin: auto;
    .imageBox {
      width: 100%;
      height: 100%;
      ul {
        position: relative;
        li {
          position: absolute;
          width: 100%;
          height: 150px;
          img {
            display: block;
            width: 95%;
            height: 150px;
            margin: auto;
          }
        }
      }
    }
  }
  .buttonBox {
    width: 22%;
    z-index: 99999;
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    margin: 0 auto;
    ul {
      li {
        width: 7px;
        height: 7px;
        float: left;
        margin: 2px;
        i {
          width: 7px;
          height: 7px;
          display: block;
          background: #ccc;
          border-radius: 50%;
        }
      }
    }
  }
}
.image-enter-active {
  // 过渡
  // transform: translateX(0);
  transition: all 1s linear;
}

.image-leave-active {
  // 过渡
  // transform: translateX(-100%);
  transition: all 1s linear;
}

.image-enter {
  //  开始进入动画的位置
  transform: translateX(100%);
}

.image-leave-to {
  // 结束消失的位置
  transform: translateX(-100%);
}
</style>
