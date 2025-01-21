import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import pxToViewport from 'postcss-px-to-viewport-8-plugin'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [VantResolver()],
    }),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  css:{
    postcss:{
        plugins:[
          tailwindcss, 
          autoprefixer,
          pxToViewport({
            unitToConvert: "px", // 要转化的单位
            viewportWidth: 375, // UI设计稿的宽度
            unitPrecision: 6, // 转换后的精度，即小数点位数
            propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
            viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
            fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
            selectorBlackList: ["ignore-"], // 指定不转换为视窗单位的类名，
            minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
            mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
            replace: true, // 是否转换后直接更换属性值
            landscape: false, // 是否处理横屏情况
          })
        ]
    },
  },
  //配置@为src目录
  // resolve:{
  //   alias: {
  //     '@': path.resolve(_dirname, 'src')
  //   }
  // }
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src') // 将 '@' 映射到 src 目录
    }
  },
  server:{
    host:'0.0.0.0',
    port:8081,
    open:true,
    // proxy: {
    //   '/article': {
    //     target: 'http://8.138.148.74',   // 目标服务器
    //     changeOrigin: true,              // 修改请求头中的 Origin 字段
    //     rewrite: (path) => path.replace(/^\/article/, ''),  // 重写路径，去掉 /article
    //   },
    // },
  }
})
