<template>
  <scroll class="scrollWrap">
    <div class="scrollBox">
      <ul>
        <li v-for="(user,index) in users.userprofiles" :key="index">
          <div class="userBox">
            <div class="userImg">
              <img :src="user.avatarUrl" alt="头像" />
            </div>
            <div class="userName">
              <span class="nickName">
                {{user.nickname}}
                <i class="iconfont"></i>
              </span>
              <span class="userDes">{{user.description}}</span>
            </div>
            <div class="add">
              <span>+ 关注</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </scroll>
</template>
<script>
import scroll from "@/components/common/scroll";
import axios from "axios";
export default {
  name: "musicList",
  props: {
    keyWords: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      users: {}
    };
  },
  mounted() {
    this.getSearchData();
  },
  filters: {
    playCountFilter(value) {
      if (value > 100000) {
        return (value / 10000).toFixed(1) + "万";
      } else {
        return value;
      }
    }
  },
  methods: {
    getSearchData() {
      axios
        .get(
          "http://localhost:3000/search?keywords=" +
            this.keyWords +
            "&type=1002"
        )
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            this.users = res.data.result;
          }
        });
    },
    playAllSongs() {},
    playMv() {},
    showMore(id) {}
  },
  components: {
    scroll
  }
};
</script>
<style lang="scss" scoped>
.scrollWrap {
  width: 100%;
  height: 559px;
  overflow: hidden;
  .scrollBox {
    width: 95%;
    margin: auto;
    ul {
      width: 100%;
      li {
        width: 100%;
        margin-top: 10px;
        .userBox {
          width: 100%;
          height: 80px;
          display: flex;
          .userImg {
            flex: 3;
            img {
              width: 80px;
              height: 80px;
              border-radius: 40px;
            }
          }
          .userName {
            flex: 5;
            span {
              display: block;
              font-size: 16px;
              color: #000;
              i {
                color: #555;
              }
            }
            .nickName {
              margin-top: 10px;
              line-height: 30px;
            }
            .userDes {
              font-size: 12px;
              color: #444;
            }
          }
          .add {
            flex: 2;
            span {
              position: relative;
              padding: 2px 10px;
              border: 1px solid rgb(255, 0, 0);
              color: rgb(255, 0, 0);
              font-size: 12px;
              border-radius: 10px;
              top: 25px;
            }
          }
        }
      }
    }
  }
}
</style>
