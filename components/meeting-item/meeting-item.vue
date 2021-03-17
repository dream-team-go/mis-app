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
				<text class="label">会议室</text>
				<text class="info">{{record.room_number}}</text>
			</view>
			<view class="info-box">
				<text class="label">会议日期</text>
				<text class="info">{{record.ydrq}}</text>
			</view>
			<view class="info-box">
				<view class="label">上/下午</view>
				<view class="info">{{record.ydsjd == 1 ? "上午" : "下午"}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import misEnum from '../../common/mis-enum.js';
	export default {
		name:"meeting-item",
		props:{
			record: {}
		},
		data() {
			return {
				
			};
		},
		methods:{
			getStatusStr(status) {
				return misEnum.MeetingRecordEnumMap.get(status);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "style/mystyle.scss";
</style>
