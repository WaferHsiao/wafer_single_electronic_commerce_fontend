import axios from 'axios'


let apiBaseUrl = 'http://154.64.245.39:8081'
//console.log("apiBaseUrl= ",apiBaseUrl)
// 创建 axios 实例
const service = axios.create({
    baseURL: apiBaseUrl, // api base_url
    timeout: 300000 // 请求超时时间
})

export {
    service as axios
}