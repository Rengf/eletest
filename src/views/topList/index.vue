<template>
  <div class="topLsit">
    <ReturnHeader :title="title"></ReturnHeader>
    <scroll>
      <div>
        <button @click="getList()">sfasda</button>
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
    ...mapGetters(["topLists"])
  },
  methods: {
    getLsit() {
      console.log(this.topList);
    }
  },
  components: {
    ReturnHeader,
    scroll
  }
};
</script>
<style lang="scss" scoped>
</style>
