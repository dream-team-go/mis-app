<template>
	<view>
		<view class="small-card-detial">
			<view class="title-box solid-bottom">
				<text class="id">{{record.desc}}</text>
				<text class="status text-food">{{getStatusStr(record.status)}}</text>
			</view>
			<view class="info-box">
				<text class="label">楼房</text>
				<text class="info">{{record.building_name}}</text>
			</view>
			<view class="info-box">
				<text class="label">包房</text>
				<text class="info">{{record.room_number}}</text>
			</view>
			<view class="info-box">
				<text class="label">用餐日期</text>
				<text class="info">{{record.ydrq}}</text>
			</view>
			<view class="info-box">
				<view class="label">午/晚餐</view>
				<view class="info">{{record.ydsjd == 1 ? "午餐" : "晚餐"}}</view>
			</view>
			<view class="info-box" v-if="record.cd_status != 0">
				<view class="label">菜单状态</view>
				<view class="info">
					<text v-if="record.cd_status != 0" class="text-orange">{{getSqxgStatus(record.cd_status)}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import misEnum from '../../common/mis-enum.js';
	export default {
		name:"food-item",
		props:{
			record: {}
		},
		data() {
			return {
				
			};
		},
		methods:{
			getStatusStr(status) {
				return misEnum.FoodRecordEnumMap.get(status);
			},
			getSqxgStatus(status){
				return misEnum.FoodMenuEnumMap.get(status);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "style/mystyle.scss";
</style>
