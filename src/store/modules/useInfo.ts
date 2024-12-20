import { defineStore } from "pinia";
import { ref } from 'vue'
let useUserStore = defineStore('User', () => {
    //单个小模块仓库存储数据地方
    const token = ref('')
    const count = ref(2)
    
    function changeCount() {
        count.value += 10
    }
    function saveToken(val:string) {
        token.value = val
    }
    function clearToken() {
        token.value = ''
    }
    return { count, token, changeCount,saveToken ,clearToken}
},
    //开启数据缓存
    {
        persist: {
            key: 'loginInfo',
            storage: sessionStorage,
            // omit: ['token']
        }
    }
)

//对外暴露获取模块小仓库
export default useUserStore;