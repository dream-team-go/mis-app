<template>
	<view>
		<scroll-view scroll-y class="page">
			<cu-custom bgColor="bg-gradual-pink">
				<block slot="content">订餐</block>
			</cu-custom>

			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange"></text> 订餐概况
				</view>
				<view class="action">
					<button class="cu-btn bg-green shadow" @tap="toBookfood">预定</button>
				</view>
			</view>
			
			<view class="cu-list grid no-border col-3">
				<view class="cu-item">
					<navigator hover-class="none" url="../food/myFoodRecordList" open-type="navigate">
						<text class="text-orange text-lg">{{foodData.totalCount}}</text>
						<text>共预定</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator hover-class="none" url="../food/myFoodRecordList?status=1" open-type="navigate">
						<text class="text-orange text-lg">{{foodData.successCount}}</text>
						<text>已确认</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator hover-class="none" url="../food/myFoodRecordList?status=-1" open-type="navigate">
						<text class="text-orange text-lg">{{foodData.failCount}}</text>
						<text>驳回</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator hover-class="none" url="../food/myFoodRecordList?status=-2" open-type="navigate">
						<text class="text-orange text-lg">{{foodData.cancleCount}}</text>
						<text>取消预定</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator hover-class="none" url="../food/myFoodRecordList?status=0" open-type="navigate">
						<text class="text-orange text-lg">{{foodData.waitCheckCount}}</text>
						<text>待确认</text>
					</navigator>
				</view>
			</view>
			
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange"></text> 最近预定
				</view>
			</view>
			<view class="cu-list menu">
				<view class="cu-item">
					<view class="content">
						<text class="cuIcon-tagfill text-red  margin-right-xs"></text>
						<text class="text-grey">接待对象</text>
					</view>
					<view class="action">
						<view class="cu-tag round bg-orange light">
							{{foodData.status.length > 0 ? foodData.receive_people : '无'}}
						</view>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="cuIcon-tagfill text-red  margin-right-xs"></text>
						<text class="text-grey">包房</text>
					</view>
					<view class="action">
						<view class="cu-tag round bg-orange light">
							{{foodData.status.length > 0 ? foodData.building_name + '('+foodData.room_number+')' : '无'}}
						</view>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="cuIcon-tagfill text-red  margin-right-xs"></text>
						<text class="text-grey">用餐时间</text>
					</view>
					<view class="action">
						<view class="cu-tag round bg-orange light">{{foodData.status.length > 0 ? foodData.start_time + '—' + foodData.end_time : '无'}}</view>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="cuIcon-tagfill text-red  margin-right-xs"></text>
						<text class="text-grey">预定时间</text>
					</view>
					<view class="action">
						<view class="cu-tag round bg-orange light">{{foodData.status.length > 0 ? foodData.create_time : '无'}}</view>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="cuIcon-tagfill text-red  margin-right-xs"></text>
						<text class="text-grey">状态</text>
					</view>
					<view class="action">
						<view class="cu-tag round bg-orange light">
							{{foodData.status.length > 0 ? foodData.status : '无'}}
						</view>
					</view>
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

<style>
	.cu-list.grid>.cu-item .text-orange{
		color: #f37b1d;
	}
	.cu-list.grid>.cu-item .text-lg{
		font-size: 32upx;
	}
</style>
