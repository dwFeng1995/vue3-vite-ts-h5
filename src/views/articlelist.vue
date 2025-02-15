<template>
    <div class="top-box"></div>
    <div class="main-contain pt-100">
      <div ref="container">
        <van-sticky :offset-top="100" :container="container">
          <van-search v-model="searchValue" show-action placeholder="请输入搜索关键词" @search="onSearch">
            <template #action>
              <div @click="onClickButton">搜索</div>
            </template>
          </van-search>
        </van-sticky>
      </div>
      <van-sticky :offset-top="100">
        <van-tabs v-model:active="activeTab" @click="onClickTab">
            <van-tab :title="item.label" v-for="(item,index) in tabData"></van-tab>
        </van-tabs>
      </van-sticky>
      <div class="list-box">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list offset="10" v-model:loading="loading" :immediate-check="false" :finished="finished"
            finished-text="没有更多了" @load="onLoad">
            <ArticlesList :articlesData='articlesData' />
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
  
  </template>
  
  <script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue';
  import { getArticleApi } from '@/utils/api'
  import type { ArticleRes } from '@/utils/api';
  import ArticlesList from '@/views/components/articlesList.vue'
  import { cloneDeep, orderBy, omit, pick, groupBy, intersection, difference} from 'lodash-es'
  
  const tabIndex = ref(0)
  type Aaa ={
    info: {
      
    }
  }
  let detailInfo = reactive<Aaa>({info:{}})
  // const type = ref<ArticleType>('front')
  const tabData = ref<Record<string, any>[]>([{ id: 1, label: '全部', value: '', checked: true },
  { id: 2, label: '关注', value: '1'},
  { id: 3, label: '问答', value: '2'},
  { id: 4, label: '学习1111', value: '3'},
  { id: 5, label: '学习333', value: '3' }, 
  { id: 6, label: '学习444', value: '3' },
  { id: 7, label: '学习5555', value: '3' }, 
])
  const articlesData = ref<ArticleRes['articles']>([])
  const searchValue = ref<string>('')
  const page = ref<number>(1);
  const page_size = ref(3);
  const refreshing = ref(false);
  const loading = ref<boolean>(false);//将 loading 设置为 true，表示处于加载状态，不触发load事件，false--触发
  const finished = ref<boolean>(false);//将 finished 设置为 true，表示处于已加载完成，不触发load事件，false--触发
  const total = ref(0)
  const container = ref(null);
  const activeTab = ref('')
  const onClickTab = () =>{
    console.log('activeTab---',activeTab)
  }
  const onLoad = () => {
    console.log('上拉加载')
    getArticleList()
  }
  const onSearch = () => {
  
  }
  const onClickButton = () => {
    getArticleList()
  }
  const onRefresh = () => {
    page.value = 1
    // 清空列表数据
    finished.value = false;
    // 重新加载数据
    // 将 loading 设置为 true，表示处于加载状态
    loading.value = true;
    getArticleList()
  };
  onMounted(() => {
    onLoad()
  })
  const getArticleList = async () => {
    if (refreshing.value) {
      articlesData.value = []
      refreshing.value = false;
    }
    const res = await getArticleApi({
      page: page.value,
      page_size: page_size.value,
      articles_type: ''
    })
    if (page.value > 1) {
      articlesData.value = [...articlesData.value, ...res.articles]
    } else {
      articlesData.value = res.articles
    }
    //加载状态结束
    loading.value = false;
    //更新总条数
    total.value = res.total
    if (articlesData.value.length >= total.value) {
      finished.value = true //已加载完所有数据
    } else {
      finished.value = false
      page.value++
    }
    console.log('获取文章列表page.value', page.value)
    console.log('获取文章列表长度', articlesData.value.length)
    console.log('获取文章列表总数', total.value)
  }
  const clickTab = (index: number) => {
    tabIndex.value = index
  }
  </script>
  
  <style lang="scss" scoped>
  @import url('../styles/common.css');
  
  .top-box {
    width: 100%;
    height: 100px;
    background-color: red;
    position: fixed;
    top:0;
    z-index: 100;
  }
  
  .main-contain {
    background-color: #F2F4FA;
  }
  
  .list-box {
     //height: calc(100vh - 127px);
    // overflow-y: auto;
  }
  
  .tab-list {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 11px;
    background-color: #F2F4FA;
    .tab-item {
      color: #A4A4A4;
      font-size: 14px;
      position: relative;
    }
  
    .active-tab {
      color: #272D4D;
      font-size: 16px;
  
      &::after {
        content: '';
        background-color: #4363FF;
        position: absolute;
        width: 20px;
        height: 4px;
        bottom: -5px;
        left: 5px;
      }
    }
  }
  </style>
  