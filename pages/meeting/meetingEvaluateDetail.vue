<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="content">会议预定服务评价</block>
		</cu-custom>

		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 环境：
				<text v-for="(value,key) in 5" :key="key"
					:class="key < environmentStarCount ? 'cuIcon-favorfill text-yellow' : 'cuIcon-favor text-gray'"></text>
			</view>
		</view>

		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 服务：
				<text v-for="(value,key) in 5" :key="key"
					:class="key < serviceStarCount ? 'cuIcon-favorfill text-yellow' : 'cuIcon-favor text-gray'"></text>
			</view>
		</view>

		<view class="cu-bar bg-white solid-bottom padding-top padding-bottom">
			<view class="action" style="min-width: 150upx;margin-left: 30upx;">
				<text class="cuIcon-title text-orange"></text> 评价：
				<text style="margin-left: 20upx;">{{message ? message : '无'}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				environmentStarCount: 0,
				serviceStarCount: 0,
				message: ""
			}
		},
		onLoad(option) {
			if (option) {
				var info = JSON.parse(decodeURIComponent(option.para));
				this.serviceStarCount = info.fw_score;
				this.environmentStarCount = info.hj_score;
				this.message = info.message;
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
