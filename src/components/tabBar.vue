<template>

    <van-tabbar v-model="active" @change="onChange">
        <van-tabbar-item name="/home" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item name="/mine" icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>

</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
const active = ref('/');
const router = useRouter()
const onChange = (val: string) => {
    console.log('val---', val)
    router.push(val)
}
</script>
<style scoped></style>