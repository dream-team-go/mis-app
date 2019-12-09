<template name="user">
	<view>
		<scroll-view scroll-y class="page">
			<cu-custom bgColor="bg-gradual-pink">
				<block slot="content">我的</block>
			</cu-custom>
			<view class="cu-list menu">
				<view class="cu-item" :class="arrow">
					<view class="content padding-tb-sm">
						<view>
							<!-- :style="'background-image:url(' + userInfo.user.head_img + ')'" -->
							<view class="cu-avatar lg round margin-left bg-red">
								<text class="cuIcon-people"></text>
							</view>
							<text class="text-bold text-lg">{{userInfo.user.userCnName}}</text>
						</view>
						<view class="text-gray text-lg text-right">
							开远市机关事务局
						</view>
					</view>
				</view>
			</view>

			<view class="cu-list menu margin-top">
				<view class="cu-item arrow">
					<navigator class="content" hover-class="none" url="..//" open-type="navigate">
						<text class="cuIcon-discoverfill text-orange"></text>
						<text class="text-grey">消息管理</text>
					</navigator>
				</view>
				<navigator class="cu-item arrow" hover-class="none" url="../user/editPassword" open-type="navigate">
					<view class="content">
						<text class="cuIcon-discoverfill text-orange"></text>
						<text class="text-grey">修改密码</text>
					</view>
				</navigator>
				<view class="cu-item arrow"  @click="logout">
					<view class="content">
						<text class="cuIcon-btn text-green"></text>
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

<style>
	.page {
		height: 100vh;
	}
</style>
