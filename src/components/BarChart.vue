<template>
  <div ref="chartRef" class="chart-container" style="width: 100%; height: 400px;"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref<HTMLElement | null>(null)
let myChart: echarts.ECharts | null = null

// 模拟数据
const data = {
  xAxis: ['1月', '2月', '3月', '4月', '5月', '6月'],
  values: [120, 200, 150, 80, 170, 110],
  markPoints: [2], // 标记第3个月的位置（索引从0开始）
  markPointValue: '接收' // 标记点显示的文字
}

const initChart = () => {
  if (!chartRef.value) return
  
  // 自定义图标（向下的三角形）
  const customSymbol = (x: number, y: number, w: number, h: number) => {
    // 使用两个路径：一个圆形背景，一个向下的三角形（顶点在下）
    return 'path://M16 8 A8 8 0 1 1 0 8 A8 8 0 0 1 16 8 M4 4 L12 4 L8 10 Z'
  }
  
  myChart = echarts.init(chartRef.value)
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: data.xAxis,
      axisTick: {
        alignWithLabel: true
      }
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        type: 'bar',
        data: data.values,
        barWidth: '40%',
        itemStyle: {
          color: '#4B96FF'
        },
        markPoint: {
          symbol: customSymbol,
          symbolSize: [24, 24],
          silent: true,
          label: {
            show: true,
            formatter: data.markPointValue,
            position: 'top',
            distance: 10,
            color: '#506dfe',
            fontSize: 12
          },
          data: data.markPoints.map(index => ({
            xAxis: index,
            yAxis: 'max',
            symbol: customSymbol,
            symbolSize: [24, 24],
            symbolOffset: [0, -8],
            itemStyle: {
              color: '#506dfe'
            }
          }))
        },
        markLine: {
          symbol: ['none', 'none'],
          data: data.markPoints.map(index => ({
            xAxis: index,
            lineStyle: {
              type: 'dashed',
              color: '#506dfe',
              width: 1
            },
            label: {
              show: false  // 隐藏markLine的标签
            }
          }))
        }
      }
    ]
  }

  myChart.setOption(option)
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
.chart-container {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
}
</style>