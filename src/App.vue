<template>
  <div id="app">
    <router-view></router-view>
    <AudioPlay></AudioPlay>
  </div>
</template>

<script>
import AudioPlay from "@/components/audio/audioPlay";
export default {
  name: "app",
  components: {
    AudioPlay
  }
};
</script>

<style>
#app {
  min-width: 100%;
  min-height: 100%;
}
</style>
