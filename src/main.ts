import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.ts'
import pinia from './store/index.ts'
import svgIcon from "@/components/SvgIcon.vue";
import 'virtual:svg-icons-register'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
pinia.use(piniaPluginPersistedstate);
import loadingDirective from './directives/loading'  // 引入自定义指令
// 注册全局自定义指令
import './styles/font.scss'
import './styles/global.scss'
import 'tailwindcss/tailwind.css'
import './styles/tailwind.css'
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
const app = createApp(App)
app.use(router).use(pinia)
app.component('svg-icon', svgIcon)
app.directive('loading', loadingDirective)

app.mount('#app')

