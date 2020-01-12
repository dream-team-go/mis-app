<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">找回密码</block>
		</cu-custom>

		<form>
			<view class="cu-form-group">
				<view class="title">手机号</view>
				<input name="input" v-model="tel"></input>
			</view>

			<view class="cu-form-group password-inut">
				<view class="title">新密码</view>
				<input type="password" name="input" v-model="password"></input>
			</view>

			<view class="cu-form-group password-inut">
				<view class="title">重复密码</view>
				<input type="password" name="input" v-model="rPassword"></input>
			</view>

			<view class="cu-form-group">
				<view class="title">验证码</view>
				<input name="input" v-model="code"></input>
				<button class='cu-btn bg-linear-blue shadow' @click="SendCode" :disabled="disabled">验证码{{authCode}}</button>
			</view>

			<view class="padding flex flex-direction">
				<button class="cu-btn bg-linear-blue margin-tb-sm lg" @click="Submit">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tel: "",
				password: "",
				rPassword: "",
				code: "",
				authCode: "",
				disabled: false
			}
		},
		methods: {
			SendCode: function(e) {
				this.disabled = true;
				if (this.tel.length <= 0) {
					uni.showModal({
						content: '请填写手机号',
						showCancel: false
					});
					this.disabled = false;
					return;
				}
				global.$http.post('/core/login/forgetSms', {
					params: {
						tel: this.tel
					},
				}).then(res => {
					if (res.status === "0") {
						this.authCode = 60;
						//定时器
						var inteval = setInterval(this.SetAuthCode, 1000);
						setTimeout(function() {
							clearInterval(inteval);
						}, 60000);
					} else {
						this.disabled = false;
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
				}).catch(err => {
					this.disabled = false;
					uni.hideLoading();
					uni.showToast({
						title: err.message,
						icon: 'none'
					});
				});
			},
			SetAuthCode: function() {
				this.authCode -= 1;
				if (this.authCode == 0) {
					this.authCode = "";
					this.disabled = false;
				}
			},
			Submit: function(e) {
				//验证数据
				if (this.tel.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写手机号'
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
				if (this.password !== this.rPassword) {
					uni.showToast({
						icon: 'none',
						title: '重复密码不一致'
					});
					return;
				}
				if (this.code.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写验证码'
					});
					return;
				}
				//提交数据
				uni.showLoading({
					title: '提交中',
					mask: false
				});
				global.$http.post('/core/login/forgetPwd', {
					params: {
						password: this.password,
						code: this.code,
						tel: this.tel
					},
				}).then(res => {
					uni.hideLoading();
					if (res.status === "0") {
						uni.showToast({
							icon: 'none',
							title: '提交成功'
						});
						uni.navigateBack();
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
			}
		}
	}
</script>

<style>
</style>
