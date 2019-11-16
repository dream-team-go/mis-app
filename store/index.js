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
			if (userInfo && userInfo.id) {
				state.hasLogin = true;
				state.userInfo = userInfo;
				uni.reLaunch({
					url: "/pages/index/home"
				});
				return;
			}
			var userIdentity = uni.getStorageSync('userIdentity') || '';
			if (userIdentity && userIdentity.username) {
				global.$http.post('/core/login/doLogin', {
					params: {
						username: userIdentity.username,
						password: userIdentity.password
					},
				}).then(res => {
					if (res.status === "0") {
						this.getUserInfo();
					} else {
						uni.reLaunch({
							url: "pages/account/login"
						});
					}
				}).catch(err => {
					uni.showToast({
						title: err.message,
						icon: 'none'
					});
				});
			} else {
				uni.reLaunch({
					url: "pages/account/login"
				});
			}
		},
		getUserInfo(state) {
			global.$http.post('/core/func/getUserAndMenu')
				.then(res => {
					uni.hideLoading();
					if (res.status === "0") {
						state.hasLogin = true;
						state.userInfo = res;
						uni.reLaunch({
							url: "/pages/index/home"
						});
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({
						title: err.message,
						icon: 'none'
					});
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
