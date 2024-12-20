import axios from 'axios';
import { showToast } from 'vant';
import { storeToRefs } from 'pinia';
import useUserStore from '../store/modules/useInfo';
import type { AxiosRequestConfig,AxiosError } from 'axios';
//创建axios实例
const instance = axios.create({
    baseURL:import.meta.env.VITE_APP_API_URL,//设置API的基础URL
})
let userStore = useUserStore();
const {token} = storeToRefs(userStore)
//请求拦截器
instance.interceptors.request.use(
    (config: AxiosRequestConfig<any>):any => {
        //可在请求发送前对config进行修改，如添加请求头等
        const headers = config.headers || {};
        headers['Authorization'] = token.value?`Bearer ${token.value}`:'';
        config.headers = headers;
        return config;
    },
    (error:AxiosError) => {
        //处理请求错误
        return Promise.reject(error);
    }
)

//响应拦截器
instance.interceptors.response.use(
    (response): any => {
        //对响应数据进行处理
        console.log('响应拦截器response--',response)
        if(response.data.code == 401){//无效token、token格式错误
            location.href = '/'
        }
        if(response.data.code !== 200){
            showToast(response?.data.message)
            return;
        }
        return response;
    },
    (error:AxiosError) => {
        //处理响应错误
        return Promise.reject(error);
    }
)

//封装axios的post请求
export function httpRequest<T> (url:string,options:any): Promise<T>{
    let opt = options || {}
    let data = Object.assign({},opt.data)
    return new Promise((resolve,reject)=>{
        instance({
            method:opt.type || 'post',
            url:url,
            params:Object.assign({},opt.params),
            data:data || {},
            responseType: opt.dataType || 'json',
            //设置默认请求头
            headers: opt.headers || {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
            }).then(response => {
                const {data} = response.data;
                resolve(data);
            }).catch(error => {
                reject(error)
            })
        })
    }
