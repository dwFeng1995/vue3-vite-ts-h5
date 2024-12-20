<template>
  
    <div class="wrap-list">
      <div class="wrap-item" v-for="(item) in props.articlesData" :key="item.id">
        <div>
          <span class="p-name">{{ item.author_name }}</span>
        </div>
        <div class="flex flex-hc flex-jsb">
          <div class="flex flex-dc flex-jsb">
            <p class="title-font">{{ item.title }}</p>
            <div class="show-box">
              <div class="flex flex-hc mr-14">
                <span>{{ item.view_count }}</span>
                <span>阅读</span>
              </div>
              <div class="flex flex-hc mr-14">
                <span>18</span>
                <span>点赞</span>
              </div>
              <div class="flex flex-hc">
                <span>18</span>
                <span>收藏</span>
              </div>
            </div>
          </div>
          <img class="w-65 h-65" src="../../assets/images/bg_art.png" alt="">
        </div>
      </div>
    </div>
    

</template>
<script setup lang='ts'>
import type { ArticlesItem } from '../../utils/api';
import type { PropType } from 'vue';
import { watch } from 'vue';
const props = defineProps({
  articlesData: {
    type: Array as PropType<ArticlesItem[]>,
    default: () => []
  }
})
watch(() => props.articlesData, () => {
  // console.log('子组件---', props.articlesData)
}, { deep: true })
</script>
<style lang="scss" scoped>
@import url('../../styles/common.css');

.wrap-list {
  padding: 0 12px;

  .wrap-item {
    padding: 12px;
    background-color: #fff;
    margin-bottom: 10px;
    overflow: hidden;
  }
}

.p-name {
  font-size: 14px;
  color: #A4A4A4;
}

.title-font {
  font-size: 17px;
  color: #515673;
}

.show-box {
  display: flex;
  align-items: center;

  span {
    font-size: 13px;
    color: #A4A4A4;
  }
}
</style>