<template>
	<view>
		<scroll-view scroll-y class="page">
			<cu-custom bgColor="bg-linear-blue" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">会务</block>
			</cu-custom>

			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action index-title">
					<image src="../../static/common/house.png" class="title-ico"></image>
					会务预定概况
				</view>
				<view class="action"><button class="cu-btn bg-linear-blue shadow" @tap="toBookMeeting">预定</button></view>
			</view>

			<view class="cu-list grid no-border col-3">
				<view class="cu-item">
					<navigator hover-class="navigator-hover" url="../meeting/myMeetingRecordList" open-type="navigate">
						<text class="text-orange text-lg">{{ meetingData.totalCount }}</text>
						<text>共预定</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator hover-class="navigator-hover" url="../meeting/myMeetingRecordList?status=1" open-type="navigate">
						<text class="text-orange text-lg">{{ meetingData.successCount }}</text>
						<text>预定成功</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator hover-class="navigator-hover" url="../meeting/myMeetingRecordList?status=-1" open-type="navigate">
						<text class="text-orange text-lg">{{ meetingData.failCount }}</text>
						<text>预定失败</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator hover-class="navigator-hover" url="../meeting/myMeetingRecordList?status=-2" open-type="navigate">
						<text class="text-orange text-lg">{{ meetingData.cancleCount }}</text>
						<text>取消预定</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator hover-class="navigator-hover" url="../meeting/myMeetingRecordList?status=0" open-type="navigate">
						<text class="text-orange text-lg">{{ meetingData.waitCheckCount }}</text>
						<text>待审批</text>
					</navigator>
				</view>
			</view>

			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action index-title">
					<image src="../../static/common/clock.png" class="title-ico"></image>
					最近预定
				</view>
			</view>
			<view class="card">
				<view class="item">
					<text class="title">会议室</text>
					<text class="content">{{ meetingData.status.length > 0 ? meetingData.building_name : '无' }}</text>
				</view>
				<view class="item">
					<text class="title">会议时间</text>
					<text class="content">{{ meetingData.status.length > 0 ? meetingData.start_time + '—' + meetingData.end_time : '无' }}</text>
				</view>
				<view class="item">
					<text class="title">预定时间</text>
					<text class="content">{{ meetingData.status.length > 0 ? meetingData.create_time : '无' }}</text>
				</view>
				<view class="item">
					<text class="title">状态</text>
					<text class="content">{{ meetingData.status.length > 0 ? meetingData.status : '无' }}</text>
				</view>
				<view class="reason-box">
					<view class="title">会议主题</view>
					<view class="reason">{{ meetingData.status.length > 0 ? meetingData.desc : '无' }}</view>
				</view>
			</view>
			<view class="cu-tabbar-height"></view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			meetingData: {
				totalCount: '',
				successCount: '',
				cancleCount: '',
				failCount: '',
				waitCheckCount: '',
				desc: '',
				building_name: '',
				room_number: '',
				status: '',
				start_time: '',
				end_time: '',
				create_time: ''
			}
		};
	},
	onLoad() {
		uni.showLoading({
			title: '加载中',
			mask: false
		});
		//获取会务概览
		global.$http
			.post('/meeting/record/myCountByStatus', {
				params: {}
			})
			.then(res => {
				if (res.status === '0') {
					this.meetingData.totalCount = 0;
					this.meetingData.successCount = 0;
					this.meetingData.cancleCount = 0;
					this.meetingData.failCount = 0;
					this.meetingData.waitCheckCount = 0;
					var totalCount = 0;
					for (var i = 0; i < res.data.length; i++) {
						if (res.data[i].status === -2) {
							this.meetingData.cancleCount = res.data[i].total;
						} else if (res.data[i].status === -1) {
							this.meetingData.failCount = res.data[i].total;
						} else if (res.data[i].status === 0) {
							this.meetingData.waitCheckCount = res.data[i].total;
						} else if (res.data[i].status === 1) {
							this.meetingData.successCount = res.data[i].total;
						}
						totalCount += res.data[i].total;
					}
					this.meetingData.totalCount = totalCount;
					uni.hideLoading();
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
				}
			})
			.catch(err => {
				uni.hideLoading();
				uni.showToast({
					title: err.message,
					icon: 'none'
				});
			});
		//获取最近预定
		global.$http
			.post('/meeting/record/myLatelyRecord', {
				params: {}
			})
			.then(res => {
				if (res.status === '0') {
					if (res.data) {
						this.meetingData.desc = res.data.desc;
						this.meetingData.building_name = res.data.building_name;
						this.meetingData.room_number = res.data.room_number;
						this.meetingData.status = misEnum.MeetingRecordEnumMap.get(res.data.status);
						this.meetingData.start_time = res.data.start_time;
						this.meetingData.end_time = res.data.end_time;
						this.meetingData.create_time = res.data.create_time;
					}
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
				}
			})
			.catch(err => {
				uni.hideLoading();
				uni.showToast({
					title: err.message,
					icon: 'none'
				});
			});
	},
	methods: {
		toBookMeeting: function() {
			uni.navigateTo({
				url: '../meeting/selectTime'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
@import 'style/mystyle.scss';
.cu-list.grid > .cu-item .text-orange {
	color: #f37b1d;
}
.cu-list.grid > .cu-item .text-lg {
	font-size: 32upx;
}
</style>
