<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">修改密码</block>
		</cu-custom>
		
		<form>
			<view class="cu-form-group password-inut">
				<view class="title">旧密码</view>
				<input type="password" name="input" v-model="password"></input>
			</view>
			
			<view class="cu-form-group password-inut">
				<view class="title">新密码</view>
				<input type="password" name="input" v-model="newPassword"></input>
			</view>
		
			<view class="cu-form-group password-inut">
				<view class="title">重复密码</view>
				<input type="password" name="input" v-model="rPassword"></input>
			</view>
		
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-orange margin-tb-sm lg" @click="Submit">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				password: "",
				newPassword: "",
				rPassword: ""
			}
		},
		computed: mapState(['userInfo']),
		methods: {
			Submit: function(e) {
				//验证数据
				if (this.password.length < 6 || this.newPassword.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}
				if (this.newPassword !== this.rPassword) {
					uni.showToast({
						icon: 'none',
						title: '重复密码不一致'
					});
					return;
				}
				//提交数据
				uni.showLoading({
					title: '提交中',
					mask: false
				});
				global.$http.post('/core/user/doModify', {
					params: {
						username: this.userInfo.user.username,
						password: this.password,
						newPassword: this.newPassword
					},
				}).then(res => {
					uni.hideLoading();
					if (res.status === "0") {
						uni.showToast({
							icon: 'none',
							title: '提交成功'
						});
						//更新密码
						uni.setStorageSync("userIdentity", {username: this.userInfo.user.username, password: this.newPassword});
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
