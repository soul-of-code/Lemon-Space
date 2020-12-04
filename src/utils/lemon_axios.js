import axios from 'axios'

/**
 * 当https的接口失效时，转换到http接口
 */
export default class LemonAxios {
    constructor(interFace) {
        //当前请求环境
        this.environment = window.location.href.includes('https') ? 'https://myblog.city:4000' : 'http://myblog.city:5000';
        this.interFace = interFace.startsWith('/') ? interFace : "/" + interFace;
        //请求的baseAxios
        this.createRequest()
    }
    //构造axios
    createRequest() {
        const { interFace } = this;
        this.lemonRequest = axios.create({
            baseURL: this.environment + interFace
        })
    }

    //get请求
    get(apiUrl, data = {}, options = {}) {
        return this.lemonRequest.get(apiUrl, { params: data, ...options })
    }
}