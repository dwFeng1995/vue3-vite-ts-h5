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
  <div id="main" class="main-box"></div>

</template>

<script setup lang='ts'>

import * as echarts from 'echarts';
import { showConfirmDialog,showToast } from 'vant';
import { logoutApi } from '../utils/api'
import { clearAllPiniaSessionStorage } from '../utils/common'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue';
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


onMounted(()=>{
  var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
var option = {
  radar: {
    shape: 'circle',
    indicator: [
      { name: 'Sales', max: 6500 },
      { name: 'Administration', max: 16000 },
      { name: 'Information Technology', max: 30000 },
      { name: 'Customer Support', max: 38000 },
      { name: 'Development', max: 52000 },
      { name: 'Marketing', max: 25000 }
    ],
    axisLine:{
      show:true,               //是否展示轴线
            symbol:'arrow',          //轴线两边的箭头
            symbolSize:[10,10],      //轴线两边的箭头大小
            symbolOffset:[10,10],    //轴线两边的箭头偏移量
    },
    // 坐标轴 分隔线配置
    // splitLine:{
    //     show:true,
    //     lineStyle:{
    //         // ··· 与 axisLine 中的 lineStyle 内容一致                            
    //     },                    
    // },
    // 坐标轴 分隔区域配置
    // splitArea:{
    //         show:true,
    //         // 分隔区域样式    
    //         areaStyle:{
    //             color:['red','#fff'],         //间隔区域的颜色
    //             shadowBlur:10,                //间隔区域阴影大小
    //             shadowColor:'red',            //间隔区域阴影的颜色
    //             shadowOffsetX:10,             //间隔区域阴影水平偏移量
    //             shadowOffsetY:10,             //间隔区域阴影竖直偏移量
    //             opacity:0.8,                  //间隔区域的透明度            
    //         },                            
    //     },
  },
  series: [
    {
      name: 'Budget vs spending',
      type: 'radar',
      symbol: 'circle', // 标记点样式
        symbolSize: 8, // 标记点大小
        
      data: [
        {
          value: [4200, 3000, 20000, 35000, 50000, 18000],
          name: 'Allocated Budget',
          symbolOffset: [100, -100], // 偏移量，x轴偏移 10px，y轴偏移 -10px
        },
        {
          value: [5000, 14000, 28000, 26000, 42000, 21000],
          name: 'Actual Spending',
          symbolOffset: [100, -100], // 偏移量，x轴偏移 10px，y轴偏移 -10px
        }
      ]
    }
  ],
  // 使用 graphic 绘制两条交叉的虚线
  graphic: [
        // 垂直虚线
        {
            type: 'line',
            z: 1000, // 提升层级，确保在图表之上
            shape: {
                x1: 200, y1: 0,  // 从上方的中心点开始
                x2: 200, y2: 400 // 到下方的中心点结束
            },
            style: {
                stroke: 'red',
                lineWidth: 1,
                lineDash: 'dashed'  // 设置为虚线
            }
        },
        // 水平虚线
        {
            type: 'line',
            z: 1000, // 提升层级，确保在图表之上
            shape: {
                x1: '0%', y1: '50%',  // 从左侧的中心点开始
                x2: '100%', y2: '50%' // 到右侧的中心点结束
            },
            style: {
                stroke: 'red',
                lineWidth: 50,
                // type: 'dashed'  // 设置为虚线/
            }
        }
    ]
};

console.log(option)
option && myChart.setOption(option);
})



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

.main-box{
  width:100%;
  height:400px;
}
.line-box{
  position: fixed;
  left: 50%;
  width:1px;
  height: 400px;
  background-color: red;
}
</style>