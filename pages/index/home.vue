<template>
	<view>
		<car v-if="PageCur=='car'"></car>
		<meeting v-if="PageCur=='meeting'" :meetingData="meetingData"></meeting>
		<food v-if="PageCur=='food'"></food>
		<user v-if="PageCur=='user'"></user>
		<work v-if="PageCur=='work'"></work>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="car">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/car' + [PageCur=='car'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='car'?'text-green':'text-gray'">用车</view>
			</view>
			<view class="action" @click="NavChange" data-cur="meeting">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/meeting' + [PageCur == 'meeting'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='meeting'?'text-green':'text-gray'">会务</view>
			</view>
			<view class="action" @click="NavChange" data-cur="food">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/food' + [PageCur == 'food'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='food'?'text-green':'text-gray'">订餐</view>
			</view>
			<view class="action" @click="NavChange" data-cur="work">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/work' + [PageCur == 'work'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='work'?'text-green':'text-gray'">工作台</view>
			</view>
			<view class="action" @click="NavChange" data-cur="user">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/user' + [PageCur == 'user'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='user'?'text-green':'text-gray'">我的</view>
			</view>
		</view>
	</view>
</template>

<script>
	import misEnum from '../../common/mis-enum.js'; 
	export default {
		data() {
			return {
				PageCur: 'car',
				meetingData: {
					totalCount: "",
					successCount: "",
					cancleCount: "",
					failCount: "",
					waitCheckCount: "",
					desc: "",
					building_name: "",
					room_number: "",
					status: "",
					start_time: "",
					end_time: "",
					create_time: ""
				}
			}
		},
		onLoad() {

		},
		onShow() {
			this.loadData();
		},
		methods: {
			loadData() {
				if (this.PageCur === "meeting") {
					uni.showLoading({
						title: '加载中',
						mask: false
					});
					//获取会务概览
					global.$http.post('/meeting/record/myCountByStatus', {
						params: {},
					}).then(res => {
						if (res.status === "0") {
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
					}).catch(err => {
						uni.hideLoading();
						uni.showToast({
							title: err.message,
							icon: 'none'
						});
					});
				}
			},
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur;
				this.loadData();
			}
		}
	}
</script>

<style>

</style>
