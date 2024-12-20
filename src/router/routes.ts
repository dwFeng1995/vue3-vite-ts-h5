
export const constantroute = [
    {
        path:'/',
        name:'Login',
        component:() => import("../views/login.vue"),
        meta: {
            title:'登录',
        }
    },
    {
        path:'/register',
        name:'Register',
        component:() => import("../views/register.vue"),
        meta: {
            title:'注册',
        }
    },
    {
        path:'/home',
        name:'Home',
        component:() => import("../views/home.vue"),
        meta: {
            title:'首页',
            tabBar: true
        }
    },
    {
        path:'/mine',
        name:'Mine',
        component:() => import("../views/mine.vue"),
        meta: {
            title:'我的',
            tabBar: true
        }
    },
]