import axios from 'axios';
import { JSEncrypt } from 'jsencrypt'
const Encrypt = new JSEncrypt ();

let encryptor = new JSEncrypt() // 新建JSEncrypt对象

let publicKey = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtN
FOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76
xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4
gwQco1KRMDSmXSMkDwIDAQAB`
encryptor.setPublicKey(publicKey) // 设置公钥
let secretWord = encryptor.encrypt({ name: '张三' })
console.log(secretWord)


let privateKey = 'MIICXQIBAAKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6khyfD1Yt3YiCgQ\n' +
    'WMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76xFxdU6jE0NQ+Z+zEdhUTooNR\n' +
    'aY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4gwQco1KRMDSmXSMkDwIDAQAB\n' +
    'AoGAfY9LpnuWK5Bs50UVep5c93SJdUi82u7yMx4iHFMc/Z2hfenfYEzu+57fI4fv\n' +
    'xTQ//5DbzRR/XKb8ulNv6+CHyPF31xk7YOBfkGI8qjLoq06V+FyBfDSwL8KbLyeH\n' +
    'm7KUZnLNQbk8yGLzB3iYKkRHlmUanQGaNMIJziWOkN+N9dECQQD0ONYRNZeuM8zd\n' +
    '8XJTSdcIX4a3gy3GGCJxOzv16XHxD03GW6UNLmfPwenKu+cdrQeaqEixrCejXdAF\n' +
    'z/7+BSMpAkEA8EaSOeP5Xr3ZrbiKzi6TGMwHMvC7HdJxaBJbVRfApFrE0/mPwmP5\n' +
    'rN7QwjrMY+0+AbXcm8mRQyQ1+IGEembsdwJBAN6az8Rv7QnD/YBvi52POIlRSSIM\n' +
    'V7SwWvSK4WSMnGb1ZBbhgdg57DXaspcwHsFV7hByQ5BvMtIduHcT14ECfcECQATe\n' +
    'aTgjFnqE/lQ22Rk0eGaYO80cc643BXVGafNfd9fcvwBMnk0iGX0XRsOozVt5Azil\n' +
    'psLBYuApa66NcVHJpCECQQDTjI2AQhFc1yRnCU/YgDnSpJVm1nASoRUnU8Jfm3Oz\n' +
    'uku7JUXcVpt08DFSceCEX9unCuMcT72rAQlLpdZir876'
let decrypt = new JSEncrypt() // 新建JSEncrypt对象
decrypt.setPrivateKey(privateKey)
console.log(decrypt.decrypt(secretWord))

const service = axios.create({
    baseURL: 'https://10.15.85.197:7002',
    timeout: 5000,
});

// 添加请求拦截器
service.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么
        config.headers['auth-token'] = localStorage.getItem('auth-token');
        console.log(config)
        // console.log(config.data = encryptor.encrypt(config.data))
        if(config.method === 'get') {

        }else if(config.method === 'post') {

        }
        return config;
    },
    error => {
        // 对请求错误做些什么
        return Promise.reject(error);
    },
);

// 添加响应拦截器
service.interceptors.response.use(
    response => {
        // 对响应数据做点什么
        console.log(response)
        return response
        // if(response.data.code === 'AAAAAAAAAA') {
        //     return response;
        // }else if(response.data.code === '401') {
        //     console.log('token失效')
        //     return doRequest(response.config)
        // }else{
        //     return Promise.reject('请求出错');
        // }
    },
    error => {
        // 对响应错误做点什么
        return Promise.reject(error);
    },
);

// 刷新逻辑
let doRequest = async function (config) {
    let refreashToken = localStorage.getItem('refreashToken')
    let tokenRes = await service({
        method: 'get',
        url: `/login/refreashToken/${refreashToken}`,
        data: {}
    })
    console.log(11111)

    if(tokenRes.data.code === 'AAAAAAAAAA') {
        console.log('token已刷新,失效时间' + new Date(tokenRes.data.data.token).toLocaleTimeString())
        console.log('刷新token已刷新,失效时间' + new Date(tokenRes.data.data.refreashToken).toLocaleTimeString())

        localStorage.setItem('auth-token', tokenRes.data.data.token);
        localStorage.setItem('refreashToken', tokenRes.data.data.refreashToken);
    }
    return await service(config)
}
export const a = 2
export default service;
