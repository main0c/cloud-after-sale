import Vue from 'vue'
import App from './App'
//http请求
import api from '@/components/vmeitime-http/'

import validate from '@/components/form-validate/ys-validate.js'

//系统文件访问基础路径
Vue.prototype.$fileBasePath = "http://localhost:8081/"

// 验证挂载到全局
Vue.prototype.$validate = validate

// 接口请求挂在
Vue.prototype.$api = api

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
