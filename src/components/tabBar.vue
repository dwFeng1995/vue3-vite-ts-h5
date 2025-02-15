<template>

    <van-tabbar v-model="active" @change="onChange">
        <van-tabbar-item name="/home/article" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item name="/home/me" icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>

</template>

<script setup lang='ts'>
import { ref } from 'vue'
import useCommon from '@/hooks/useCommon'
const hooks = useCommon()
const active = ref('/home/article');
const onChange = (val: string) => {
    console.log('val---', val)
    hooks.router.push(val)
}
</script>
<style scoped></style>