import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userInfo: {},
		hasLogin: false
	},
	mutations: {
		setLoginInfo(state){
			var userInfo = uni.getStorageSync('userInfo') || '';
			if (userInfo && userInfo.id) {
				state.hasLogin = true;
				state.userInfo = userInfo;
			}
		},
		setLogoutInfo(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({
				key: 'userInfo'
			});
		}
	}
})

export default store
