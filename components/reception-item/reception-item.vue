<template>
	<view>
		<view class="small-card-detial">
			<view class="title-box solid-bottom">
				<text class="id">日期：{{record.jd_date ? record.jd_date.substring(0,10) : ""}}</text>
				<text class="status text-food">{{getStatusStr(record.status)}}</text>
			</view>
			<view class="info-box">
				<text class="label">接待对象：</text>
				<text class="info">{{record.jd_object}}</text>
			</view>
			<view class="info-box">
				<text class="label">接待事由：</text>
				<text class="info">{{record.jd_reason}}</text>
			</view>
			<view class="info-box">
				<view class="label">接待类型：</view>
				<view class="info">{{getTypeStr(record.jd_type)}}</view>
			</view>
			<view class="info-box">
				<view class="label">拟人数：</view>
				<view class="info">{{record.jd_num}}</view>
			</view>
			<view class="info-box">
				<view class="label">接待依据：</view>
				<view class="info">{{getJsyjTypeStr(record.jdyj_type)}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import misEnum from '../../common/mis-enum.js';
	export default {
		name:"reception-item",
		props:{
			record:{}
		},
		data() {
			return {
				
			};
		},
		methods:{
			getTypeStr(status) {
				return misEnum.ReceptionTypeEnumMap.get(status);
			},
			getJsyjTypeStr(status){
				return misEnum.ReceptionGistEnumMap.get(status);
			},
			getStatusStr(status) {
				return misEnum.ReceptionStatusEnumMap.get(status);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "style/mystyle.scss";
</style>
