
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
        },
        redirect: 'home/article',
        children: [
            {
                path:'/home/article',
                name:'Article',
                component:() => import("../views/articlelist.vue"),
            },
            {
                path:'/home/me',
                name:'MyInfo',
                component:() => import("../views/mine.vue"),
            }
        ]
    },
    {
        path:'/articleDetail',
        name:'ArticleDetail',
        component:() => import("../views/articleDetail.vue"),
        meta: {
            title:'文章详情',
            tabBar: false
        }
    },
]