import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userInfo: null,
		hasLogin: false
	},
	mutations: {
		setLoginInfo(state){
			var userInfo = uni.getStorageSync('userInfo') || '';
			if (userInfo && userInfo.user) {
				state.hasLogin = true;
				state.userInfo = userInfo;
			}
		},
		setLogoutInfo(state) {
			state.hasLogin = false;
			state.userInfo = null;
			uni.removeStorage({
				key: 'userInfo'
			});
			// uni.removeStorage({
			// 	key: 'userIdentity'
			// });
		}
	}
})

export default store
