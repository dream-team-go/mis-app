<template>
	<view>
		<scroll-view scroll-y class="page">
			<cu-custom bgColor="bg-linear-blue">
				<block slot="content">会务</block>
			</cu-custom>

			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action index-title">
					<image src="../../static/common/house.png" class="title-ico"></image> 会务预定概况
				</view>
				<view class="action">
					<button class="cu-btn bg-linear-blue shadow" @tap="toBookMeeting">预定</button>
				</view>
			</view>
			
			<view class="cu-list grid no-border col-3">
				<view class="cu-item">
					<navigator hover-class="navigator-hover" url="../meeting/myMeetingRecordList" open-type="navigate">
						<text class="text-orange text-lg">{{meetingData.totalCount}}</text>
						<text>共预定</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator hover-class="navigator-hover" url="../meeting/myMeetingRecordList?status=1" open-type="navigate">
						<text class="text-orange text-lg">{{meetingData.successCount}}</text>
						<text>预定成功</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator hover-class="navigator-hover" url="../meeting/myMeetingRecordList?status=-1" open-type="navigate">
						<text class="text-orange text-lg">{{meetingData.failCount}}</text>
						<text>预定失败</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator hover-class="navigator-hover" url="../meeting/myMeetingRecordList?status=-2" open-type="navigate">
						<text class="text-orange text-lg">{{meetingData.cancleCount}}</text>
						<text>取消预定</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator hover-class="navigator-hover" url="../meeting/myMeetingRecordList?status=0" open-type="navigate">
						<text class="text-orange text-lg">{{meetingData.waitCheckCount}}</text>
						<text>待审批</text>
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
					<text class="title">会议室</text>
					<text class="content">{{meetingData.status.length > 0 ? meetingData.building_name : '无'}}</text>
				</view>
				<view class="item">
					<text class="title">会议时间</text>
					<text class="content">{{meetingData.status.length > 0 ? meetingData.start_time + '—' + meetingData.end_time : '无'}}</text>
				</view>
				<view class="item">
					<text class="title">预定时间</text>
					<text class="content">{{meetingData.status.length > 0 ? meetingData.create_time : '无'}}</text>
				</view>
				<view class="item">
					<text class="title">状态</text>
					<text class="content">{{meetingData.status.length > 0 ? meetingData.status : '无'}}</text>
				</view>
				<view class="reason-box">
					<view class="title">会议主题</view>
					<view class="reason">{{meetingData.status.length > 0 ? meetingData.desc : '无'}}</view>
				</view>
			</view>
			<view class="cu-tabbar-height"></view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props:['meetingData'],
		data() {
			return {
				
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

<style lang="scss" scoped>
	@import "style/mystyle.scss";
	.cu-list.grid>.cu-item .text-orange{
		color: #f37b1d;
	}
	.cu-list.grid>.cu-item .text-lg{
		font-size: 32upx;
	}
</style>
