<template>
    <svg aria-hidden="true" class="svg-icon" :width="props.width" :height="props.height">
      <use :xlink:href="symbolId" :fill="props.color" />
    </svg>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  const props = defineProps({
    prefix:{
        type:String,
        default:'icon'
    },
    name:String,  //接收父组件传过来的图标名称
    color:{  //接收父组件传过来的图标颜色
        type:String,
        default:''
    },
    width:{  //接收父组件传过来的图标宽度
        type:String,
        default:'16px'
    },
    height:{  //接收父组件传过来的图标高度
        type:String,
        default:'16px'
    },
  })
  
  const symbolId = computed(() => `#${props.prefix}-${props.name}`)
  </script>