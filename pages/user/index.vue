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
				<view class="cu-item arrow">
					<navigator class="content" hover-class="none" url="../user/editPassword" open-type="navigate">
						<text class="cuIcon-discoverfill text-orange"></text>
						<text class="text-grey">修改密码</text>
					</navigator>
				</view>
				<view class="cu-item arrow">
					<navigator class="content" hover-class="none" url="../list/list" open-type="navigate">
						<text class="cuIcon-discoverfill text-orange"></text>
						<text class="text-grey">退出登录</text>
					</navigator>
				</view>
			</view>

			<view class="cu-tabbar-height"></view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		mapState
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
			toChild(e) {
				uni.navigateTo({
					url: e.currentTarget.dataset.url
				})
			},
		},
	}
</script>

<style>
	.page {
		height: 100vh;
	}
</style>
