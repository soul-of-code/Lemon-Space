import axios from 'axios'

//api请求地址枚举
this.urlEnum = {
    http: "http://myblog.city:5000",
    https: "https://myblog.city:4000"
}

/**
 * 当https的接口失效时，转换到http接口
 */
export default class LemonAxios {
    constructor() {
        //当前请求环境
        this.environment = 'https';
        //请求的baseAxios
        this.createRequest()
    }
    //构造axios
    createRequest() {
        this.lemonRequest = axios.create({
            baseURL: urlEnum[this.environment]
        })
    }

    //get请求
    get(apiUrl, data, options = {}) {
        return new Promise(async (resolve, reject) => {
            await this.lemonRequest.get(apiUrl, { params: data, ...options })
                .then((res) => resolve(res))
                .catch((err) => {
                    //如果当前访问的网址已经是https，跳转到http
                    if (location.href.includes('https')) {
                        location.href = location.href.replace('https', 'http');
                        reject(err)
                        return;
                    }
                    //如果当前api环境是https，则切换到http
                    if (this.environment === 'https') {
                        this.environment = 'http';
                        createRequest();
                        return this.get(apiUrl, data, options);
                    }
                    reject(err)
                })
        })
    }
}