import Vue from 'vue'
import App from './App'
import store from './store'
import Request from './js_sdk/pocky-request/index.js'

global.$http = Request();
Vue.prototype.$store = store

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
