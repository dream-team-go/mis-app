<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	import {
	    mapMutations
	} from 'vuex';
	export default {
		methods: {
			...mapMutations(['setLoginInfo', 'setLogoutInfo'])
		},
		data() {
			return {
				title: '身份认证中...'
			}
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
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50upx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
