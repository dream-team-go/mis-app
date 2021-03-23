<template>
	<view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<image src="../../static/common/newIcon/food_record.png"></image>
				<text class="text-lg text-black">预定进度</text>
			</view>
			<view class="action right text-food">{{getStatusStr(info.status)}}</view>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top-xs">
			<view class="action">
				 用餐领导：
				<text class="text-black">{{info.lead}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 用餐人数：
				<text class="text-black">{{info.num}}</text>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom margin-top-xs">
			<view class="action">
				 用餐日期：
				<text class="text-black">{{info.dining_date ? info.dining_date.substring(0,10) : ""}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 午/晚餐：
				<text class="text-black">{{getTypeStr(info.type)}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 用餐日期：
				<text class="text-black">{{info.dining_date ? info.dining_date.substring(11,16) : ""}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 用餐要求：
				<text class="text-black">{{info.desc}}</text>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom margin-top-xs">
			<view class="action">
				 菜品建议：
				<text class="text-black">{{info.cp_advise}}</text>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom">
			<view class="action" style="display: inline-block;">
				<image v-for="item in info.tjcps" :key="item.id" :src="item.cp_img" style="width: 218upx;height: 218upx;"></image>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom margin-top-xs">
			<view class="action">
				 预定人：
				<text class="text-black">{{info.user_cn_name}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 预定时间：
				<text class="text-black">{{info.create_time}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import misEnum from '../../common/mis-enum.js';
	export default {
		name:"leader-food-detail",
		props:{
			info: {}
		},
		data() {
			return {
				
			};
		},
		methods: {
			getTypeStr(status) {
				return misEnum.LeaderBookFoodEnumMap.get(status);
			},
			getStatusStr(status) {
				return misEnum.LeaderFoodEnumMap.get(status);
			}
		}
	}
</script>

<style>

</style>
