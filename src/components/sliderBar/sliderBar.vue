<template>
  <div class="sliderBarWrap" @click.self="showSliderBar">
    <div class="sliderBarBox"></div>
  </div>
</template>
<script>
export default {
  methods: {
    showSliderBar() {
      this.$emit("showSliderBar", false);
    }
  }
};
</script>
<style lang="scss" scoped>
.sliderBarWrap {
  position: fixed;
  width: 100%;
  min-height: 100%;
  left: 0;
  background: rgba($color: #888, $alpha: 0.3);
  z-index: 9999;
  .sliderBarBox {
    position: fixed;
    width: 85%;
    min-height: 100%;
    background: #fff;
  }
}
</style>
