<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="content">桌餐预定服务评价</block>
		</cu-custom>

		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 菜品：
				<text v-for="(value,key) in 5" :key="key"
					:class="key < menuStarCount ? 'cuIcon-favorfill text-yellow' : 'cuIcon-favor text-gray'"></text>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 卫生：
				<text v-for="(value,key) in 5" :key="key"
					:class="key < healthStarCount ? 'cuIcon-favorfill text-yellow' : 'cuIcon-favor text-gray'"></text>
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
			<view class="action" style="margin-left: 30upx;">
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
				menuStarCount: 0,
				healthStarCount: 0,
				serviceStarCount: 0,
				message: ""
			}
		},
		onLoad(option) {
			if (option) {
				var info = JSON.parse(decodeURIComponent(option.para));
				this.serviceStarCount = info.fw_score;
				this.menuStarCount = info.cp_score;
				this.healthStarCount = info.ws_score;
				this.message = info.message;
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
