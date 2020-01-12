<template>
	<view>
		<scroll-view scroll-y class="page">
			<cu-custom bgColor="bg-linear-blue">
				<block slot="content">订餐</block>
			</cu-custom>

			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action index-title">
					<image src="../../static/common/food.png" class="title-ico"></image> 订餐概况
				</view>
				<view class="action">
					<button class="cu-btn bg-linear-blue shadow" @tap="toBookfood">预定</button>
				</view>
			</view>
			
			<view class="cu-list grid no-border col-3">
				<view class="cu-item">
					<navigator hover-class="navigator-hover" url="../food/myFoodRecordList" open-type="navigate">
						<text class="text-orange text-lg">{{foodData.totalCount}}</text>
						<text>共预定</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator hover-class="navigator-hover" url="../food/myFoodRecordList?status=1" open-type="navigate">
						<text class="text-orange text-lg">{{foodData.successCount}}</text>
						<text>已确认</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator hover-class="navigator-hover" url="../food/myFoodRecordList?status=-1" open-type="navigate">
						<text class="text-orange text-lg">{{foodData.failCount}}</text>
						<text>驳回</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator hover-class="navigator-hover" url="../food/myFoodRecordList?status=-2" open-type="navigate">
						<text class="text-orange text-lg">{{foodData.cancleCount}}</text>
						<text>取消预定</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator hover-class="navigator-hover" url="../food/myFoodRecordList?status=0" open-type="navigate">
						<text class="text-orange text-lg">{{foodData.waitCheckCount}}</text>
						<text>待确认</text>
					</navigator>
				</view>
			</view>
			
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action index-title">
					<image src="../../static/common/clock.png" class="title-ico"></image> 最近预定
				</view>
			</view>
			<view class="card">
				<view class="item">
					<text class="title">包房</text>
					<text class="content">{{foodData.status.length > 0 ? foodData.building_name + '('+foodData.room_number+')' : '无'}}</text>
				</view>
				<view class="item">
					<text class="title">用餐时间</text>
					<text class="content">{{foodData.status.length > 0 ? foodData.start_time + '—' + foodData.end_time : '无'}}</text>
				</view>
				<view class="item">
					<text class="title">预定时间</text>
					<text class="content">{{foodData.status.length > 0 ? foodData.create_time : '无'}}</text>
				</view>
				<view class="item">
					<text class="title">状态</text>
					<text class="content">{{foodData.status.length > 0 ? foodData.status : '无'}}</text>
				</view>
				<view class="reason-box">
					<view class="title">订餐原由</view>
					<view class="reason">{{foodData.status.length > 0 ? foodData.desc : '无'}}</view>
				</view>
			</view>
			<view class="cu-tabbar-height"></view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props:['foodData'],
		data() {
			return {
				
			}
		},
		methods: {
			toBookfood: function(){
				uni.navigateTo({
					url: "../food/bookFood",
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "style/mystyle.scss";
	.cu-list.grid>.cu-item .text-orange{
		color: #f37b1d;
	}
	.cu-list.grid>.cu-item .text-lg{
		font-size: 32upx;
	}
</style>
