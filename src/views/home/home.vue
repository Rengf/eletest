<template>
  <div class="homeWrap">
    <transition name="slide-fade">
      <MusicList v-if="isShowList" @showMusicList="showMusicList"></MusicList>
    </transition>
    <NavBar @showMusicList="showMusicList"></NavBar>
  </div>
</template>

<script src="./home.js"></script>

<style lang="scss">
@import "./home.scss";
</style>

