<template>
	<view>
		<scroll-view scroll-y class="page">
			<cu-custom bgColor="bg-gradual-pink">
				<block slot="content">会务</block>
			</cu-custom>

			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange"></text> 会务预定概况
				</view>
				<view class="action">
					<button class="cu-btn bg-green shadow" @tap="toBookMeeting">预定</button>
				</view>
			</view>
			
			<view class="cu-list grid no-border col-3">
				<view class="cu-item">
					<navigator hover-class="none" url="../meeting/myMeetingRecordList" open-type="navigate">
						<text class="text-orange text-lg">{{totalCount}}</text>
						<text>共预定</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator hover-class="none" url="../meeting/myMeetingRecordList?status=1" open-type="navigate">
						<text class="text-orange text-lg">{{successCount}}</text>
						<text>预定成功</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator hover-class="none" url="../meeting/myMeetingRecordList?status=-1" open-type="navigate">
						<text class="text-orange text-lg">{{failCount}}</text>
						<text>预定失败</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator hover-class="none" url="../meeting/myMeetingRecordList?status=-2" open-type="navigate">
						<text class="text-orange text-lg">{{cancleCount}}</text>
						<text>取消预定</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator hover-class="none" url="../meeting/myMeetingRecordList?status=0" open-type="navigate">
						<text class="text-orange text-lg">{{waitCheckCount}}</text>
						<text>待审批</text>
					</navigator>
				</view>
			</view>
			
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange"></text> 最近预定 （{{status}}）
				</view>
			</view>
			<view class="cu-list menu">
				<navigator class="cu-item">
					<view class="content">
						<text class="cuIcon-tagfill text-red  margin-right-xs"></text>
						<text class="text-grey">会议室</text>
					</view>
					<view class="action">
						<view class="cu-tag round bg-orange light">{{building_name}}（{{room_number}}）</view>
					</view>
				</navigator>
				<navigator class="cu-item">
					<view class="content">
						<text class="cuIcon-tagfill text-red  margin-right-xs"></text>
						<text class="text-grey">会议时间</text>
					</view>
					<view class="action">
						<view class="cu-tag round bg-orange light">{{start_time}} — {{end_time}}</view>
					</view>
				</navigator>
				<navigator class="cu-item">
					<view class="content">
						<text class="cuIcon-tagfill text-red  margin-right-xs"></text>
						<text class="text-grey">预定时间</text>
					</view>
					<view class="action">
						<view class="cu-tag round bg-orange light">{{create_time}}</view>
					</view>
				</navigator>
			</view>
			<view class="cu-tabbar-height"></view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				totalCount: 22,
				successCount: 12,
				cancleCount: 10,
				failCount: 11,
				waitCheckCount: 13,
				building_name: "华夏大厦",
				room_number: "2007",
				status: "预定成功",
				start_time: "2019-10-1 19:20",
				end_time: "2019-10-1 21:20",
				create_time: "2019-10-1 19:32:32"
			}
		},
		methods: {
			toBookMeeting: function(){
				uni.navigateTo({
					url: "../meeting/bookMeeting",
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
