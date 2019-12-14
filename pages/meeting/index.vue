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
					<text class="cuIcon-title text-orange"></text> 最近预定 {{status.length > 0 ? '('+status+')' : ''}}
				</view>
			</view>
			<view class="cu-list menu">
				<navigator class="cu-item">
					<view class="content">
						<text class="cuIcon-tagfill text-red  margin-right-xs"></text>
						<text class="text-grey">会议室</text>
					</view>
					<view class="action">
						<view class="cu-tag round bg-orange light">
							{{status.length > 0 ? building_name + '('+room_number+')' : '无'}}
						</view>
					</view>
				</navigator>
				<navigator class="cu-item">
					<view class="content">
						<text class="cuIcon-tagfill text-red  margin-right-xs"></text>
						<text class="text-grey">会议时间</text>
					</view>
					<view class="action">
						<view class="cu-tag round bg-orange light">{{status.length > 0 ? start_time + '—' + end_time : '无'}}</view>
					</view>
				</navigator>
				<navigator class="cu-item">
					<view class="content">
						<text class="cuIcon-tagfill text-red  margin-right-xs"></text>
						<text class="text-grey">预定时间</text>
					</view>
					<view class="action">
						<view class="cu-tag round bg-orange light">{{status.length > 0 ? create_time : '无'}}</view>
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
				totalCount: 0,
				successCount: 0,
				cancleCount: 0,
				failCount: 0,
				waitCheckCount: 0,
				building_name: "",
				room_number: "",
				status: "",
				start_time: "",
				end_time: "",
				create_time: ""
			}
		},
		onLoad() {
			//获取会务概览
			global.$http.post('/meeting/record/myCountByStatus', {
				params: {},
			}).then(res => {
				if (res.status === "0") {
					var totalCount = 0;
					for (var i = 0; i < res.data.length; i++) {
						if(res.data[i].status === -2){
							this.cancleCount = res.data[i].total;
						}else if(res.data[i].status === -1){
							this.failCount = res.data[i].total;
						}else if(res.data[i].status === 0){
							this.waitCheckCount = res.data[i].total;
						}else if(res.data[i].status === 1){
							this.successCount = res.data[i].total;
						}
						totalCount += res.data[i].total;
					}
					this.totalCount = totalCount;
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
				}
			}).catch(err => {
				uni.hideLoading();
				uni.showToast({
					title: err.message,
					icon: 'none'
				});
			});
			//获取最近预定
			global.$http.post('/meeting/record/myLatelyRecord', {
				params: {},
			}).then(res => {
				if (res.status === "0") {
					if(res.data){
						this.building_name = res.data.building_name;
						this.room_number = res.data.room_number;
						if(res.data.status === -2){
							this.status = '取消预定';
						}else if(res.data.status === -1){
							this.status = '预定失败';
						}else if(res.data.status === 0){
							this.status = '待审批';
						}else if(res.data.status === 1){
							this.status = '预定成功';
						}
					}
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
				}
			}).catch(err => {
				uni.hideLoading();
				uni.showToast({
					title: err.message,
					icon: 'none'
				});
			});
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
