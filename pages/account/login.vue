<template>
	<view class="container">
		<view class="top-box">
			<image src="../../static/logo.png"></image>
			<view class="title">开远数字机关事务</view>
		</view>
		<form>
			<view class="cu-form-group">
				<image class="ico" src="../../static/login/phone.png"></image>
				<input class="ipt" name="input" v-model="username" placeholder="请输入手机号"></input>
			</view>
			<view class="cu-form-group">
				<image class="pass-ico" src="../../static/login/password.png"></image>
				<input class="ipt" type="password" name="input" v-model="password" placeholder="请输入密码"></input>
			</view>
			<button class="confirm-btn" @click="toLogin">登录</button>
			<view class="forget-section">
				<text @click="findPassword">忘记密码?</text>
			</view>
		</form>
		<view class="register-section">
			还没有账号?
			<text @click="toRegist">马上注册</text>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex';

	export default {
		data() {
			return {
				username: '',
				password: ''
			}
		},
		onLoad() {
			var userIdentity = uni.getStorageSync('userIdentity') || '';
			if (userIdentity) {
				this.username = userIdentity.username;
				this.password = userIdentity.password;
			}
		},
		methods: {
			...mapMutations(['setLoginInfo']),
			toLogin() {
				if (this.username.length < 5) {
					uni.showToast({
						icon: 'none',
						title: '账号最短为 5 个字符'
					});
					return;
				}
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}
				uni.showLoading({
					title: '登录中',
					mask: false
				});
				global.$http.post('/core/login/doLogin', {
					params: {
						username: this.username,
						password: this.password
					},
				}).then(res => {
					uni.hideLoading();
					if (res.status === "0") {
						global.$http.post('/core/func/getUserAndMenu')
							.then(res => {
								if (res.status === "0") {
									uni.setStorageSync("userIdentity", {username: this.username, password: this.password});
									uni.setStorageSync("userInfo", res.data);
									this.setLoginInfo();
									uni.reLaunch({
										url: "/pages/index/home"
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
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
				}).catch(err => {
					uni.hideLoading();
					uni.showToast({
						title: err.message,
						icon: 'none'
					});
				});
			},
			toRegist(){
				uni.navigateTo({
					url: "register"
				});
			},
			findPassword(){
				uni.navigateTo({
					url:"findPassword"
				})
			}
		},

	}
</script>

<style lang='scss'>
	.container {
		position: relative;
		width: 100vw;
		height: 100vh;
		background: #FFFFFF;
		.top-box {
			color: #11c0ac;
			text-align: center;
			line-height: 60upx;
			padding-top: 130upx;
			padding-bottom: 80upx;
			image {
				width: 240upx;
				height: 240upx;
			}
			.title {
				font-size: 44upx;
				font-weight: 500;
			}
		}
		
		.cu-form-group {
			width: 90%;
			margin-left: 5%;
			background: transparent;
			border: 1px solid #ccc;
			border-radius: 50upx;
			margin-bottom: 20upx;
			height: 86upx;
			.ico {
				width: 40upx;
				height: 40upx;
				margin-right: 10upx;
			}
			.pass-ico {
				width: 30upx;
				height: 36upx;
				margin-right: 10upx;
			}
			.ipt {
				color: #11c0ac;
			}
		}
	}

	
	.confirm-btn {
		width: 90%;
		height: 86upx;
		line-height: 86upx;
		border-radius: 50px;
		margin-top: 60upx;
		background-image: linear-gradient(45deg, #44d7b6, #36bdbd);
		color: #ffffff;
		font-size: 32upx;
		&:after {
			border-radius: 100px;
		}
	}

	.forget-section {
		font-size: 26upx;
		color: #11c0ac;
		text-align: center;
		margin-top: 40upx;
	}

	.register-section {
		position: absolute;
		left: 0;
		bottom: 50upx;
		width: 100%;
		font-size: 26upx;
		color: #606266;
		text-align: center;

		text {
			color: #1cccd6;
			margin-left: 10upx;
		}
	}
</style>
