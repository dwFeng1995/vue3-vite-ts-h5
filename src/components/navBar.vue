<template>

    <van-nav-bar @click-left="onClickLeft" :title="title" left-text="返回" right-text="按钮" left-arrow />

</template>

<script setup lang='ts'>
import { computed } from 'vue'
import useCommon from '@/hooks/useCommon'
const hooks = useCommon()
const onClickLeft = () => {
    history.back();
}
const title:any = computed(() => {
    return hooks.route.meta.title
}) 
</script>
<style scoped></style>