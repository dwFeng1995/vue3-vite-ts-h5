import { httpRequest } from "./request";
//登录
export function loginApi(data = {}) {
    return httpRequest<{ token: string }>('/auth/login', {
        data,
        type: 'post',
        headers: {}
    })
}
//注册
export function registerApi(data = {}) {
    return httpRequest<null>('/register', {
        data,
        type: 'post',
        headers: {}
    })
}
//发送验证码
export function sendCodeApi(data = {}) {
    return httpRequest('/send_code', {
        params: data,
        type: 'get',
        headers: {}
    })
}

//退出登录
export function logoutApi(data = {}) {
    return httpRequest('/auth/logout', {
        params: data,
        type: 'post',
        headers: {}
    })
}


export interface ArticlesItem {
    id: number,
    title: string,
    slug: string,
    content: string,
    author_id: number,
    author_name:string,
    category_id: number,
    tags: string,
    status: string,
    view_count: number,
    like_count: number,
    comment_count: number,
    thumbnail: string,
    is_featured: boolean,
    published_at: string,
    created_at: string,
    updated_at: string,
    type: ArticleType
}

export type ArticleRes = {
    articles: ArticlesItem[],
    page: number,
    page_size: number
    total: number
    totalPages: number
}

export type ArticleDetailRes = {
    article: {
        detail:Object
    }
}


const ARTICLE_TYPE = {
   FRONT: 'front',
   JAVA: 'java',
   PHP: 'php1'
} as const;

export type ArticleType = typeof ARTICLE_TYPE[keyof typeof ARTICLE_TYPE]
// type ArticleRes1 = ArticleRes & {a: number} //合并类型
// type ArticleRes2 = Omit<ArticleRes,'totalPages' | 'total'> //剔除key
// item.type === ARTICLE_TYPE.PHP

//获取用户文章列表
export function getArticleApi(data = {}) {
    return httpRequest<ArticleRes>('/article/list', {
        data,
        type: 'post',
        headers: {}
    })
}

//获取用户文章详情
export function getArticleDetailApi(data = {}) {
    return httpRequest<ArticleDetailRes>('/article/detail', {
        data,
        type: 'post',
        headers: {}
    })
}

//获取用户文章浏览量
export function getArticleViewApi(data = {}) {
    return httpRequest<ArticleDetailRes>('/article/view', {
        data,
        type: 'post',
        headers: {}
    })
}
