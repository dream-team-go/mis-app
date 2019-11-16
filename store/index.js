import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userInfo: {},
		hasLogin: false
	},
	mutations: {
		login(state) {
			var userInfo = uni.getStorageSync('userInfo') || '';
			if(userInfo && userInfo.id){
				state.hasLogin = true;
				state.userInfo = userInfo;
				return;
			}
			var userIdentity = uni.getStorageSync('userIdentity') || '';
			if(userIdentity && userIdentity.username){
				var res = global.$http.post('"/core/login/doLogin"', {params: userIdentity});
			}
			uni.reLaunch({
				url:"pages/account/login"
			})
			//缓存用户登陆状态
			uni.setStorage({
				key: 'userInfo',
				data: provider
			});
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({
				key: 'userInfo'
			});
		}
	}
})

export default store