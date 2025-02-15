<template>
  <div class=" flex h-full flex-col justify-between">
    <div class=" flex-1">
      <router-view></router-view>
    </div>
      <TabBar style="position: relative !important;" />
  </div>
</template>

<script setup lang="ts">
import TabBar from '@/components/tabBar.vue';
</script>
<style lang="scss" scoped>


</style>
