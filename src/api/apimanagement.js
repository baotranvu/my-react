import axios from 'axios'
import { BASE_URL } from '../config/constant.js'

const api = axios.create({
    baseURL: BASE_URL
})


 
api.interceptors.request.use(
    async (config) => {
    // Cấu hình thời gian timeout
        config.timeout = 30000 // 30s

        // Cấu hình header
        config.headers = {
            ...config.headers,
            'content-type': 'application/json'
        }

       

        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

/*
 |--------------------------------------------------------------------------
 | Configs
 |--------------------------------------------------------------------------
 | Cấu hình sau khi request thành công
 | See: https://www.npmjs.com/package/axios#interceptors
 */
api.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        return Promise.reject(error)
    }
)

export default api
