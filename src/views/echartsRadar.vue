<template>
    <div class="radar-container">
      <!-- 按钮组 -->
      <div class="button-group">
        <div 
          v-for="(item, index) in buttonData" 
          :key="index"
          :class="['button-item', { active: currentIndex === index }]"
          @click="handleButtonClick(index)"
        >
          {{ item.name }}
        </div>
      </div>
      
      <!-- 雷达图 -->
      <div ref="chartRef" class="chart-container"></div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'
  import * as echarts from 'echarts'
  
  const chartRef = ref<HTMLElement | null>(null)
  let myChart: echarts.ECharts | null = null
  
  // 当前选中的按钮索引
  const currentIndex = ref(0)
  
  // 按钮数据
  const buttonData = [
    { name: '全部', color: '#506dfe' },
    { name: '收入', color: '#FF4B4B' },
    { name: '支出', color: '#4B96FF' }
  ]
  
  // 雷达图数据
  const radarData = {
    indicator: [
      { name: '1月', max: 100 },
      { name: '2月', max: 100 },
      { name: '3月', max: 100 },
      { name: '4月', max: 100 },
      { name: '5月', max: 100 },
      { name: '6月', max: 100 }
    ],
    values: [
      [80, 90, 70, 85, 75, 95],  // 收入数据
      [70, 75, 60, 80, 65, 85]   // 支出数据
    ]
  }
  
  // 初始化图表
  const initChart = () => {
    if (!chartRef.value) return
    
    myChart = echarts.init(chartRef.value)
    updateChart()
  }
  
  // 更新图表
  const updateChart = () => {
    if (!myChart) return
  
    const option = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['收入', '支出'],
        bottom: 0
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        top: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['1月', '2月', '3月', '4月', '5月', '6月'],
        axisLine: {
          lineStyle: {
            color: '#ddd'
          }
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#ddd'
          }
        },
        splitLine: {
          lineStyle: {
            color: '#ddd'
          }
        }
      },
      series: [
        {
          name: '收入',
          type: 'line',
          data: radarData.values[0],
          symbol: 'circle',
          symbolSize: 8,
          itemStyle: {
            color: '#fff',
            borderWidth: 2,
            borderColor: '#FF4B4B'
          },
          lineStyle: {
            color: '#FF4B4B',
            width: 2
          },
          label: {
            show: true,
            formatter: '{c}',
            position: function(point: { data: number; dataIndex: number }) {
              // 获取当前数据点的值
              const value = point.data;
              // 获取支出数据中相同位置的值
              const otherValue = radarData.values[1][point.dataIndex];
              // 如果当前值大于支出值，标签显示在上方，否则显示在下方
              return value >= otherValue ? 'top' : 'bottom';
            },
            color: '#FF4B4B',
            fontSize: 12,
            distance: 5
          }
        },
        {
          name: '支出',
          type: 'line',
          data: radarData.values[1],
          symbol: 'circle',
          symbolSize: 8,
          itemStyle: {
            color: '#fff',
            borderWidth: 2,
            borderColor: '#4B96FF'
          },
          lineStyle: {
            color: '#4B96FF',
            width: 2
          },
          label: {
            show: true,
            formatter: '{c}',
            position: function(point: { data: number; dataIndex: number }) {
              // 获取当前数据点的值
              const value = point.data;
              // 获取收入数据中相同位置的值
              const otherValue = radarData.values[0][point.dataIndex];
              // 如果当前值大于收入值，标签显示在上方，否则显示在下方
              return value > otherValue ? 'top' : 'bottom';
            },
            color: '#4B96FF',
            fontSize: 12,
            distance: 5
          }
        }
      ]
    }
  
    myChart.setOption(option)
  }
  
  // 按钮点击处理
  const handleButtonClick = (index: number) => {
    currentIndex.value = index
    if (!myChart) return

    // 根据按钮索引设置高亮
    if (index === 1) { // 收入
      myChart.setOption({
        series: [{
          name: '收入',
          label: {
            show: true
          }
        }, {
          name: '支出',
          label: {
            show: false
          }
        }]
      })
    } else if (index === 2) { // 支出
      myChart.setOption({
        series: [{
          name: '收入',
          label: {
            show: false
          }
        }, {
          name: '支出',
          label: {
            show: true
          }
        }]
      })
    } else { // 全部
      updateChart()
    }
  }
  
  // 监听窗口大小变化
  const handleResize = () => {
    myChart?.resize()
  }
  
  onMounted(() => {
    initChart()
    window.addEventListener('resize', handleResize)
  })
  
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    myChart?.dispose()
  })
  </script>
  
  <style scoped>
  .radar-container {
    padding: 20px;
    background: #fff;
    border-radius: 8px;
  }
  
  .button-group {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    gap: 20px;
  }
  
  .button-item {
    padding: 8px 20px;
    border-radius: 20px;
    font-size: 14px;
    color: #666;
    cursor: pointer;
    transition: all 0.3s;
    border: 1px solid #ddd;
  }
  
  .button-item.active {
    color: #fff;
    background: #506dfe;
    border-color: #506dfe;
  }
  
  .chart-container {
    width: 100%;
    height: 400px;
  }
  </style>