// src/types/global.d.ts
export {}

declare global {
  interface HTMLElement {
    __loadingVNode__?: any; // 为 HTMLElement 添加 __loading__ 属性，类型为 any
  }
}
declare module 'vant' {
  export const showToast: (message: string | object) => void;
  export const showConfirmDialog: (options: object) => Promise<any>;
  export const showNotify: (options: string | object) => void;
  export const showImagePreview: (images: string[] | object) => void;
}
