import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userInfo: {},
		hasLogion: false
	},
	mutations: {
		login(state, userInfo) {
			state.hasLogion = true;
			state.userInfo = userInfo;
			//缓存用户登陆状态
			uni.setStorage({
				key: 'userInfo',
				data: provider
			});
		},
		logout(state) {
			state.hasLogion = false;
			state.userInfo = {};
			uni.removeStorage({
				key: 'userInfo'
			});
		}
	}
})
