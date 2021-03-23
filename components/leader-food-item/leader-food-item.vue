<template>
	<view>
		<view class="small-card-detial">
			<view class="title-box solid-bottom">
				<text class="id">日期：{{record.dining_date.substring(0,10)}}</text>
				<text class="status text-food">{{getStatusStr(record.status)}}</text>
				<!-- <image src="../../static/common/next.png" class="arrow"></image> -->
			</view>
			<view class="info-box">
				<text class="label">用餐领导：</text>
				<text class="info">{{record.lead}}</text>
			</view>
			<view class="info-box">
				<text class="label">用餐人数：</text>
				<text class="info">{{record.num}}人</text>
			</view>
			<view class="info-box">
				<view class="label">午/晚餐：</view>
				<view class="info">{{getTypeStr(record.type)}}</view>
			</view>
			<view class="info-box">
				<view class="label">用餐时间：</view>
				<view class="info">{{record.dining_date.substring(11,16)}}</view>
			</view>
			<!-- <view class="info-box">
				<view class="label">订餐人：</view>
				<view class="info">{{record.user_cn_name}}</view>
			</view> -->
			<!-- <view class="info-box">
				<view class="label">订餐时间：</view>
				<view class="info">{{record.create_time}}</view>
			</view> -->
			<!-- <view class="info-box">
				<view class="label">用餐要求：</view>
				<view class="info">{{record.desc}}</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	import misEnum from '../../common/mis-enum.js';
	export default {
		name:"leader-food-item",
		props:{
			record:{}
		},
		data() {
			return {
				
			};
		},
		methods:{
			getTypeStr(status) {
				return misEnum.LeaderBookFoodEnumMap.get(status);
			},
			getStatusStr(status) {
				return misEnum.LeaderFoodEnumMap.get(status);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "style/mystyle.scss";
</style>
