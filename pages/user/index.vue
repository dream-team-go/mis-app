<template name="user">
	<view>
		<scroll-view scroll-y class="page">
			<cu-custom bgColor="bg-linear-blue">
				<block slot="content">我的</block>
			</cu-custom>
			<view class="cu-list menu">
				<view class="cu-item" >
					<view class="content padding-tb-sm">
						<view>
							<!-- :style="'background-image:url(' + userInfo.user.head_img + ')'" -->
							<view class="margin-left ">
								<image src="../../static/common/user.png" class="heard"></image>
							</view>
							<text class="text-bold text-lg ml20">{{userInfo?userInfo.user.userCnName:""}}</text>
						</view>
						<view class="text-gray text-lg text-right">
							开远市机关事务局
						</view>
					</view>
				</view>
			</view>

			<view class="cu-list menu margin-top">
				<view class="cu-item arrow">
					<navigator class="content" hover-class="none" url="../user/warnList" open-type="navigate">
						<text class="cuIcon-message text-orange"></text>
						<text class="text-grey">消息管理</text>
					</navigator>
				</view>
				<navigator class="cu-item arrow" hover-class="none" url="../user/editPassword" open-type="navigate">
					<view class="content">
						<image src="../../static/login/password.png" class="ico"></image>
						<text class="text-grey">修改密码</text>
					</view>
				</navigator>
				<view class="cu-item arrow"  @click="logout">
					<view class="content">
						<image src="../../static/common/loginout.png" class="login-ico"></image>
						<text class="text-grey">退出登录</text>
					</view>
				</view>
			</view>

			<view class="cu-tabbar-height"></view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		name: "user",
		data() {
			return {
				menuBorder: false,
				menuArrow: true,
				menuCard: true,
				gridCol: 3,
				gridBorder: false
			};
		},
		computed: mapState(['userInfo']),
		methods: {
			...mapMutations(['setLogoutInfo']),
			toChild(e) {
				uni.navigateTo({
					url: e.currentTarget.dataset.url
				})
			},
			logout(){
				uni.showModal({
					title: '提示',
					content: '确定退出登录？',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if(res.cancel) return;
						uni.showLoading({
							title: '退出登录中',
							mask: false
						});
						global.$http.post('/core/login/logout', {
							params: {},
						}).then(res => {
							uni.hideLoading();
							if (res.status === "0") {
								//清除密码
								this.setLogoutInfo();
								//跳转登陆页
								uni.reLaunch({
									url:"../account/login"
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
					fail: () => {},
					complete: () => {}
				});
				
			}
		},
	}
</script>

<style scoped lang="scss">
	.page {
		height: 100vh;
	}
	.heard {
		width: 80upx;
		height: 80upx;
	}
	.ml20 {
		margin-left: 40upx;
	}
	.ico {
		width: 28upx !important;
		height: 28upx !important;
		margin: 0 20upx 0 10upx !important;
	}
	.login-ico {
		width: 34upx !important;
		height: 34upx !important;
		margin: 0 18upx 0 4upx !important;
	}
</style>
