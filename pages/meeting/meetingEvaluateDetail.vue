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
			<view class="action" style="min-width: 150upx;margin-left: 20upx;">
				<text class="cuIcon-title text-orange"></text> 评价：
				<text>{{message}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				environmentStarCount: 3,
				serviceStarCount: 4,
				message: "挺不错的房间打扫路口附近的拉萨空间警方辣椒粉都是垃圾分类卡时间反雷达收发机拉萨机"
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
