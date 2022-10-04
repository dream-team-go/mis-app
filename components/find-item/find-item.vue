<template>
	<view>
		<view class="small-card-detial">
			<view class="title-box solid-bottom">
				<text class="id">{{record.thing_info}}</text>
				<text class="status text-food">{{getRecordStatus(record.status)}}</text>
			</view>
			<view class="info-box">
				<text class="label">联系电话</text>
				<text class="info">{{record.tel}}</text>
			</view>
			<view class="info-box">
				<text class="label">遗失地点</text>
				<text class="info">{{record.lost_place}}</text>
			</view>
			<view class="info-box">
				<text class="label">发布时间</text>
				<text class="info">{{record.create_time}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import misEnum from '../../common/mis-enum.js';
	export default {
		name:"find-item",
		props:{
			record: {}
		},
		data() {
			return {
				StatusEnumMap: misEnum.FindStatusEnumMap
			};
		},
		methods: {
			getRecordStatus: function(status) {
				return this.StatusEnumMap.get(status);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "style/mystyle.scss";
</style>