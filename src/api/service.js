import axios from 'axios'

/**
 * @desc 请求环境地址配置
 * development 开发环境
 * production 生产环境
 */

switch (process.env.NODE_ENV) {
    case 'development': 
        axios.defaults.baseURL = '/api';
        break;
    case 'production':
        axios.defaults.baseURL = window.location.origin + '/api';
        break;
    default:
        break;
}

axios.defaults.headers.post['Content-Type'] = 'application/json';

/**
 * @desc jsonp格式转json格式
 * @param {String} str 
 */
function jsonpChangeJson (str) {
    
    let matches = str.match(/^\w+\((\{[^()]+\})\)$/);
    console.log(matches)
    if (matches) {
        return JSON.parse(matches[1]);
    }
}

const service = {
    /**
     * @desc GET 请求
     * @param {String} url 请求地址
     * @param {Object} params 请求参数
     */
    get (url, params) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: params
            })
            .then(res => {
                resolve(jsonpChangeJson(res.data));
            })
            .catch(err => {
                reject(err.data);
            })
        })
    },
    /**
     * @desc POST 请求
     * @param {String} url 请求地址
     * @param {Object} params 请求参数
     */
    post () {
        return new Promise((resolve, reject) => {
            axios.post(url, JSON.stringify(params))
            .then(res => {
                resolve(jsonpChangeJson(res.data));
            })
            .catch(err => {
                reject(err.data);
            })
      })
    }
}

export default service