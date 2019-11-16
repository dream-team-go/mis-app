<template>
	<view class="container">
		<form>
			<view class="cu-form-group">
				<view class="title">手机号码</view>
				<input name="input" v-model="username"></input>
			</view>
			<view class="cu-form-group password-inut">
				<view class="title">密码</view>
				<input type="password" name="input" v-model="password"></input>
			</view>
			<button class="confirm-btn" @click="toLogin">登录</button>
			<view class="forget-section">
				忘记密码?
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
			...mapMutations(['getUserInfo']),
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
					if (res.status === "0") {
						this.getUserInfo();
					} else {
						uni.hideLoading();
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
			}
		},

	}
</script>

<style lang='scss'>
	.container {
		padding-top: 115px;
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #fff;
	}

	.password-inut {
		border-bottom: 1upx solid #eee;
	}

	.confirm-btn {
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 70upx;
		background: #fa436a;
		color: #fff;
		font-size: 32upx;

		&:after {
			border-radius: 100px;
		}
	}

	.forget-section {
		font-size: 26upx;
		color: #4399fc;
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
			color: #4399fc;
			margin-left: 10upx;
		}
	}
</style>
