import Vue from 'vue'
import App from './App'

// 接口请求挂载
import api from '@/components/vmeitime-http/'
Vue.prototype.$api = api

// 验证挂载到全局
import validate from '@/components/form-validate/ys-validate.js'
Vue.prototype.$validate = validate

//系统文件访问基础路径
Vue.prototype.$fileBasePath = "http://192.168.1.101:8081/"

Vue.prototype.$imageType = ["png", "jpg", "xbm", "bmp", "webp", "jpeg", "svgz", "git", "ico", "tiff", "svg", "jiff", "pjpeg", "pjp", "tif"]
Vue.prototype.$officeType = ["docx", "doc", "xls", "xlsx", "ppt", "pptx", "wps", "et", "dps", "csv", "pdf"]
Vue.prototype.$vedioType = ["mp4", "rm", "rmvb", "wmv", "avi", "3gp", "mkv"]
Vue.prototype.$packageType = ["zip", "rar"]
Vue.prototype.$epubType = ["epub"]
Vue.prototype.$aceType = ["txt", "sql", "java", "css", "html", "htm", "json", "js", "tpl"]

// 注册全局组件
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
