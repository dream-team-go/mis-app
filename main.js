import Vue from 'vue'
import App from './App'
import store from './store'
import Request from './js_sdk/pocky-request/index.js'

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

import car from './pages/car/index.vue'
Vue.component('car',car)

import meeting from './pages/meeting/index.vue'
Vue.component('meeting',meeting)

import food from './pages/food/index.vue'
Vue.component('food',food)

import work from './pages/work/index.vue'
Vue.component('work',work)

import user from './pages/user/index.vue'
Vue.component('user',user)

global.$http = Request();
Vue.prototype.$store = store

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
