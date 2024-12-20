<template>

    <van-nav-bar :title="title" left-text="返回" right-text="按钮" left-arrow />

</template>

<script setup lang='ts'>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
// const router = useRouter();
const route = useRoute();
// const onClickLeft = () => {
//     router.go(-1)
// }
const title:any = computed(() => {
    return route.meta.title
}) 
</script>
<style scoped></style>