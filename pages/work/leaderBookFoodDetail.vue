<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			
			<block slot="content">工作餐详情</block>
		</cu-custom>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 用餐领导：
				<text class="text-bold">{{info.lead}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 用餐类型：
				<text class="text-bold">{{getStatusStr(info.type)}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 用餐日期：
				<text class="text-bold">{{info.dining_date.substring(0,10)}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 用餐人数：
				<text class="text-bold">{{info.num}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 订餐人：
				<text class="text-bold">{{info.user_cn_name}}（{{info.tel_no}}）</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 订餐时间：
				<text class="text-bold">{{info.create_time}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 用餐要求：
				<text class="text-bold">{{info.desc}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import misEnum from '../../common/mis-enum.js';
	export default {
		data() {
			return {
				info: {}
			}
		},
		onLoad(option) {
			this.info = JSON.parse(decodeURIComponent(option.para));
		},
		methods: {
			getStatusStr(status) {
				return misEnum.LeaderBookFoodEnumMap.get(status);
			},
		}
	}
</script>

<style>

</style>
