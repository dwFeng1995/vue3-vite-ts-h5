import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.ts'
import pinia from './store/index.ts'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
pinia.use(piniaPluginPersistedstate);
import { Tabbar, TabbarItem ,Checkbox,Loading} from 'vant'
import loadingDirective from './directives/loading'  // 引入自定义指令
// 注册全局自定义指令
import './styles/font.scss'
import './styles/global.scss'
import 'tailwindcss/tailwind.css'
import './styles/tailwind.css'

// 2. 引入组件样式
import 'vant/lib/index.css';
console.log('环境变量：',import.meta.env)
const app = createApp(App)
app.use(router).use(pinia)
app.use(Tabbar);
app.use(TabbarItem);
app.use(Checkbox);
app.use(Loading);
app.directive('loading', loadingDirective)

app.mount('#app')

