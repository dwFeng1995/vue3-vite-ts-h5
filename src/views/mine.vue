<template>

  <div class="head-style">
    <div class="flex flex-hc">
      <img class="head-picture" src="../assets/images/bg_art.png" alt="">
      <p class="my-name">张三</p>
    </div>
    <img class="w-11 h-20" src="../assets/images/right_icon.png" alt="">
  </div>
  <div class="pl-24">
    <p @click="logoutHandle" class="my-name">退出登录</p>
  </div>

</template>

<script setup lang='ts'>
import { showConfirmDialog,showToast } from 'vant';
import { logoutApi } from '../utils/api'
import { clearAllPiniaSessionStorage } from '../utils/common'
import { useRouter } from 'vue-router'
const router = useRouter()
const logout = async () => {
    const res = await logoutApi()
    console.log('退出登录成功----', res)
    showToast('退出登录成功');
    clearAllPiniaSessionStorage()
    sessionStorage.clear()
    router.push('/')
}
const logoutHandle = () =>{
  showConfirmDialog(
    { message:'退出登录',}).then(() => {
    // on confirm
    logout()
  })
  .catch(() => {
    // on cancel
  });
}
</script>
<style lang="scss" scoped>
@import url('../styles/common.css');
.head-style{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
  margin-left: 24px;
  padding-right: 21px;
}
.head-picture{
  width: 75px;
  height: 75px;
  border-radius: 50%;
}
.my-name{
  font-size: 18px;
  color: #000000;
  margin-left: 10px;
}
</style>