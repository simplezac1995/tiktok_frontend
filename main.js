import Vue from 'vue'
import App from './App'

import uView from "uview-ui";
Vue.use(uView);

import helper from './common/helper.js'
Vue.prototype.helper = helper

import service from './components/service.vue'
Vue.component('service-online',service)

Vue.config.productionTip = false

// https://blog.csdn.net/yfx000/article/details/108186719 设置onLoad 在 onLaunch 之后执行
Vue.prototype.$onLaunched = new Promise(resolve => {
    Vue.prototype.$isResolve = resolve
})

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

 



