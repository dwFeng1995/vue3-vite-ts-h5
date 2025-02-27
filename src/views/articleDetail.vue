<template>
  <div class=" flex h-full  flex-col justify-between">
    <NavBar />
    <div class=" flex-1 overflow-y-auto">
      <div class="h-[450px]">文章详情内容</div>
      <div class="h-[450px]">文章详情内容</div>
    </div>
    <div class=" sticky bottom-0 flex items-center justify-between w-full pl-5 pr-5">
      <div class="w-[60px] h-[30px] flex items-center justify-center bg-[#fff]
       text-[#000] text-[12px] border-[1px] border-[red] text-center ">
        <svg-icon name="noLike" width="20px" height="20px"></svg-icon>
        <span>赞</span>
      </div>
      <div class=" flex">
        <div class=" flex flex-col items-center" @click="openPopup">
          <svg-icon name="comment" width="20px" height="20px"></svg-icon>
          <span class="">评论</span>
        </div>
        <div class=" flex flex-col items-center ml-10">
          <svg-icon name="noCollect" width="20px" height="20px"></svg-icon>
          <span class="">5</span>
        </div>
      </div>
    </div>
  </div>

  <van-popup v-model:show="showBottomPopup" round position="bottom" class="flex flex-col" :style="{ height: '80%' }">
    <div class="popup-header flex items-center justify-between">
      <svg-icon name="close" width="20px" height="20px" @click="() => showBottomPopup = false"></svg-icon>
      <div class="comment-value">全部21条评论</div>
      <div></div>
    </div>
    <div class=" flex-1 overflow-y-auto">
      <div class="p-3 mt-3 border-t-[1px] border-[#eee]">
        <div class=" flex items-center">
          <svg-icon name="headPic" width="20px" height="20px"></svg-icon>
          <span class="text-[13px] text-[#000]  font-bold ml-2">张三</span>
        </div>
        <p class="ml-29 text-[13px]">防腐剂哦的风景发呆发剪短发就发呆发剪短发家</p>
        <p class="ml-29 text-[12px]">
          11小时前
          <span class="text-[skyblue]">回复</span>
        </p>
      </div>
    </div>
    <van-field v-show="isFixedInput" ref="inputbox" :style="{position:'fixed',bottom:keyboardHeight+'px'}" v-model="inputValue" @focus="handleFocus" @blur="handleBlur" placeholder="写评论..." />
    <div class="h-[50px] p-3 border-t-[1px] border-[#eee] flex items-center" @click="onClickWrite">
      <svg-icon name="headPic" width="20px" height="20px"></svg-icon>
      <div>写评论222</div>
    </div>
  </van-popup>
</template>

<script setup lang='ts'>
import NavBar from '@/components/navBar.vue';
import { ref, onMounted, onBeforeUnmount,reactive,nextTick } from 'vue';
import { getArticleViewApi, getArticleDetailApi } from '@/utils/api'
import useCommon from '@/hooks/useCommon'
const hooks = useCommon()
let detailInfo = reactive({})
const showBottomPopup = ref(false)
const inputValue = ref('')
const inputbox = ref<HTMLInputElement | null>(null)
const isFixedInput = ref(false)
const keyboardHeight = ref(0);
// const handleResize = () => {
//   inputbox.value?.addEventListener('focus',function(){
//     const previousHeight = window.innerHeight;
//     const documentHeight = document.documentElement.clientHeight
//     keyboardHeight.value = documentHeight - previousHeight
//   })
// };

const handleFocus = () => {
  // 输入框获取焦点时，更新高度
  // handleResize();
};
const handleBlur = () => {
  alert(`键盘高度${keyboardHeight.value}`)

  // 输入框失去焦点时，更新高度
  keyboardHeight.value = 0;
  isFixedInput.value = false

};
onBeforeUnmount(() => {
  // 组件销毁时，移除事件监听
  // window.removeEventListener('resize', handleResize);
});
onMounted(() => {
  console.log('接收参数', hooks.route)
  // 监听 resize 事件
  // window.addEventListener('resize', handleResize);
  inputbox.value?.addEventListener('focus',function(){
    const previousHeight = window.innerHeight;
    const documentHeight = document.documentElement.clientHeight
    keyboardHeight.value = documentHeight - previousHeight
  })
  
  getArticleView()
})
const onClickWrite = () => {
  isFixedInput.value = true
  nextTick(()=>{
    // 在调用之前确保 inputbox.value 不为 null
    if (inputbox.value) {
        inputbox.value.focus();
      }
  })
}
const openPopup = () => {
  showBottomPopup.value = true
}
const getArticleView = async () => {
  const res = await getArticleViewApi({
    id: Number(hooks.route.query.articleId)
  })
  getArticleDetail()
}
const getArticleDetail = async () => {
  const res = await getArticleDetailApi({
    id: Number(hooks.route.query.articleId)
  })
  detailInfo = res.article
}
</script>
<style lang="scss" scoped>
.popup-header {
  border-radius: 8px 8px 0 0;
  padding-left: 10px;
  margin-top: 10px;
  .comment-value {
    font-size: 16px;
    color: #272d4d;
  }
}
</style>