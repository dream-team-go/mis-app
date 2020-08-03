<template>
	<view>
			<image src="/static/lead.png" :style="'width: 750upx;height:'+ ScreenHeight +'px;'"></image>
		</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				ScreenHeight: this.ScreenHeight
			};
		},
		methods: {
			...mapMutations(['setLoginInfo', 'setLogoutInfo'])
		},
		onLoad() {
			//判断是否保存用户identity信息
			var userIdentity = uni.getStorageSync('userIdentity') || '';
			if (userIdentity && userIdentity.username) {
				//判断用户是否远程登录
				global.$http.post('/core/login/isLogin').then(res => {
					if (res.status === "0") {
						this.setLoginInfo();
						uni.reLaunch({
							url: "../index/home"
						});
					} else {
						this.setLogoutInfo();
						//进行登录
						global.$http.post('/core/login/doLogin', {
							params: {
								username: userIdentity.username,
								password: userIdentity.password
							},
						}).then(res => {
							if (res.status === "0") {
								global.$http.post('/core/func/getUserAndMenu')
									.then(res => {
										if (res.status === "0") {
											uni.setStorageSync("userInfo", res.data);
											this.setLoginInfo();
											uni.reLaunch({
												url: "../index/home"
											});
										} else {
											uni.showToast({
												title: res.msg,
												icon: 'none'
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
									url: "../account/login"
								});
							}
						}).catch(err => {
							uni.showToast({
								title: err.message,
								icon: 'none'
							});
						});
					}
				}).catch(err => {
					uni.showToast({
						title: err.message,
						icon: 'none'
					});
				});
			} else {
				//跳转到登录页面
				uni.reLaunch({
					url: "../account/login"
				});
			}
		}
	}
</script>

<style>
</style>
