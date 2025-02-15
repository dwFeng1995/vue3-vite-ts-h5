

<template>
  <div class="app h-full w-full">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  /*overflow: hidden;  /* 防止横向滚动 */
  width: 100%;
  height: 100%;
}
/* 页面内容最大宽度设置，防止超出屏幕 */
body {
  /* max-width: 100vw;
  max-height: 100vh; */
}

.app {
  height: 100%;
}
</style>
