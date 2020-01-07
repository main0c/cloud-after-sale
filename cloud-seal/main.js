import Vue from 'vue'
import App from './App'
//http请求
import api from '@/components/vmeitime-http/'

Vue.config.productionTip = false

Vue.prototype.$api = api

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
