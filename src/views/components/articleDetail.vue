<template>

  <div class="h-300">{{ detail.author_name }}</div>

</template>

<script setup lang='ts'>
import {ref,reactive, computed} from 'vue'
const props = defineProps({
    detailInfo: {
    type: Object,
    default: () => {}
  }
})
const info = computed(()=>props.detailInfo)

console.log('info--',info)
const detail = computed(()=> info.value?.detail??{})
</script>
<style scoped>

</style>