// src/types/global.d.ts
export {}

declare global {
  interface HTMLElement {
    __loadingVNode__?: any; // 为 HTMLElement 添加 __loading__ 属性，类型为 any
  }
}
