<template>
    <div class="line-container">
        <div ref="chartRef" class="chart-container"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref<HTMLElement | null>(null)
let myChart: echarts.ECharts | null = null

// 图表数据
const chartData = {
    xAxis: ['1月', '2月', '3月', '4月', '5月', '6月'],
    series: [
        {
            name: '收入',
            data: [80, 90, 70, 84, 75, 95],
            color: '#FF4B4B'
        },
        {
            name: '支出',
            data: [83, 93, 78, 82, 65, 85],
            color: '#4B96FF'
        }
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
            data: chartData.xAxis,
            axisLine: {
                lineStyle: {
                    color: '#ddd'
                }
            },
            axisLabel: {
                color: '#666',
                fontSize: 12
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#666',
                fontSize: 12
            },
            splitLine: {
                lineStyle: {
                    color: '#eee',
                    type: 'dashed'
                }
            }
        },
        series: chartData.series.map((item) => ({
            name: item.name,
            type: 'line',
            data: item.data,
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: {
                color: '#fff',
                borderWidth: 2,
                borderColor: item.color
            },
            lineStyle: {
                color: item.color,
                width: 2
            },
            label: {
                show: true,
                formatter: function (params) {
                    const index = params.dataIndex;
                    const values = chartData.series.map(s => s.data[index]); // 获取当前 x 轴的所有 y 值
                    console.log('values', values)
                    const maxValue = Math.max(...values);

                    return params.value === maxValue
                        ? `{topStyle|${params.value} \n aaa}`  // 最大值 -> 上方
                        : `{bottomStyle|${params.value}\nbbb}`; // 最小值 -> 下方
                },
                rich: {
                    topStyle: {
                        color: item.color,
                        fontSize: 12,
                        align: 'center',
                        padding: [-10, 0, 10, 0] // 负 padding 向上移动
                    },
                    bottomStyle: {
                        color: item.color,
                        fontSize: 12,
                        align: 'center',
                        padding: [100, 0, -100, 0] // 正 padding 向下移动
                    }
                }
            }
        }))


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
.line-container {
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.chart-container {
    width: 100%;
    height: 400px;
}
</style>
