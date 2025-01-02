import { DirectiveBinding } from 'vue'
import { createVNode, render } from 'vue'
import { Loading } from 'vant'

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    el.style.position = 'relative'
    if (binding.value) {
      // 创建 Vant Loading 组件的 VNode 实例
      const loadingVNode = createVNode(Loading, {
        text: binding.arg || '加载中...', // 设置加载文案，默认显示 '加载中...'
        type: binding.modifiers.spinner || 'spinner', // 加载动画类型，可传递 'circle', 'round' 等
        color: binding.modifiers.bg || '#1989fa', // 背景色
        fullscreen: binding.modifiers.fullscreen || false, // 是否全屏加载
        style: {
            position:"absolute",
            left:'0',
            right:'0',
            top:'0',
            bottom:'0',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            zIndex:'50',
            background:'#fff'
          }
      })

      // 挂载 VNode 到元素
      render(loadingVNode, el)

      // 将 VNode 保存在元素上，以便后续销毁
      el.__loadingVNode__ = loadingVNode
    }
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    if (binding.value !== binding.oldValue) {
      if (binding.value) {
        const loadingVNode = createVNode(Loading, {
          text: binding.arg || '加载中...', // 设置加载文案，默认显示 '加载中...'
          type: binding.modifiers.spinner || 'spinner', // 加载动画类型，可传递 'circle', 'round' 等
          color: binding.modifiers.bg || '#1989fa', // 背景色
          fullscreen: binding.modifiers.fullscreen || false, // 是否全屏加载
        })

        // 更新 VNode
        render(loadingVNode, el)

        // 保存更新后的 VNode
        el.__loadingVNode__ = loadingVNode
      } else {
        // 如果没有 loading 状态，销毁 VNode
        render(null, el)
      }
    }
  },
  beforeUnmount(el: HTMLElement) {
    // 在组件销毁时销毁加载动画
    render(null, el)
  }
}
