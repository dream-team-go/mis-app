<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">预定会议室</block>
		</cu-custom>
		<form v-show="isShowBottomModal == false">
			<view class="cu-form-group">
				<view class="title">会议主题</view>
				<input name="input" v-model="para.desc"></input>
			</view>
			
			<view class="cu-form-group">
				<view class="title">预定人</view>
				<input name="input" v-model="para.user_name"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">手机号</view>
				<input name="input" v-model="para.user_tel"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">日期</view>
				<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="DateChange">
					<view class="picker">
						{{date}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">时间</view>
				<picker mode="time" :value="time" start="startTime" @change="TimeChange">
					<view class="picker">
						{{time}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">会议时长</view>
				<picker @change="ChangeHours" :value="hourIndex" :range="hours">
					<view class="picker">
						{{hourIndex>-1?hours[hourIndex] + "小时" : "请选择"}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">参会人数</view>
				<picker @change="ChangePeoples" :value="peopleIndex" :range="peoples">
					<view class="picker">
						{{peopleIndex>-1?peoples[peopleIndex] + "人" : "请选择"}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">会议室</view>
				<view class="modal-group" @tap="showBottomModal" data-target="Modal">
					<view class="picker">
						{{ para.room_number.length > 0 ? (para.room_number + '('+para.building_name+')') : '请选择' }}
					</view>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">参会领导</view>
				<input name="input" v-model="para.attend_leader"></input>
			</view>
			
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-orange margin-tb-sm lg" @click="Submit">提交</button>
			</view>
		</form>

		<view id="meeting-list-modal" class="cu-modal bottom-modal" :class="isShowBottomModal?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-gradual-blue" :style="[{'padding-top':StatusBar + 'px'},{height:CustomBar + 'px'}]">
					<view class="action text-white" @tap="hideBottomModal">取消</view>
					<view class="action text-white text-lg" style="text-align: center;margin-right: 15px;">选择会议室</view>
					<view class="action"></view>
				</view>
				
				<view id="list-view" :style="[{height:(ScreenHeight-CustomBar) + 'px'}]">
					<view class="cu-list menu text-left">
						<view class="cu-item arrow" v-for="meeting in meetings" :key="meeting.id" @click="getMeeting(meeting)" style="padding-top: 10rpx;padding-bottom: 10rpx;">
							<view class="content">
								<view class="text-grey">{{meeting.number}}({{meeting.name}})</view>
								<view class="text-gray text-sm flex">
									<view class="text-cut">
										{{meeting.address}}
									</view>
								</view>
							</view>
							<view class="action">
								<view class="text-grey text-xs">容纳{{meeting.capacity}}人</view>
								<view class="cu-tag round bg-orange sm">{{meeting.num > 0 ? '已被预定' : '可预订'}}</view>
							</view>
						</view>
					</view>
					<uni-load-more :status="status" :content-text="contentText" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import uniLoadMore from '@/colorui/components/uni-load-more.vue';

	function getDate(addDay) {
		const date = new Date();
		if (addDay > 0) {
			date.setDate(date.getDate() + addDay);
		}
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		month = month > 9 ? month : '0' + month;
		day = day > 9 ? day : '0' + day;

		return `${year}-${month}-${day}`;
	}

	function getTime(addMinute) {
		const date = new Date();
		var tmpMinute = date.getMinutes();
		if (tmpMinute < 30) {
			date.setMinutes(30);
		} else if (tmpMinute > 30 && tmpMinute <= 59) {
			date.setMinutes(60);
		}

		if (addMinute > 0) {
			date.setMinutes(date.getMinutes() + addMinute);
		}

		let hour = date.getHours();
		let minute = date.getMinutes();

		hour = hour > 9 ? hour : '0' + hour;;
		minute = minute > 9 ? minute : '0' + minute;

		return `${hour}:${minute}`;
	}

	function getEndTime(startTime, addHour) {
		//特殊处理IOS日期，用‘/’代替‘-’
		startTime = startTime.replace(/-/g, '/');
		var date = new Date(startTime);
		date.setHours(date.getHours() + addHour);
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		let hour = date.getHours();
		let minute = date.getMinutes();

		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;
		hour = hour > 9 ? hour : '0' + hour;;
		minute = minute > 9 ? minute : '0' + minute;

		return `${year}-${month}-${day} ${hour}:${minute}`;
	}

	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				ScreenHeight: this.ScreenHeight,
				date: getDate(),
				startDate: getDate(),
				endDate: getDate(30),
				time: getTime(),
				startTime: getTime(),
				hourIndex: 0,
				hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
				peopleIndex: 0,
				peoples: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
					30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50
				],
				isShowBottomModal: false,
				meetings: [],
				status: 'more',
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				page: 1,
				pageSize: 100,
				para: {
					user_name: "",
					user_tel: "",
					people_num: 1,
					desc: "",
					attend_leader: "",
					meeting_id: "",
					building_name: "",
					room_number: ""
				}
			}
		},
		computed: {
			...mapState(['userInfo']),
			start_time: function(){
				return this.date + " " + this.time;
			},
			end_time: function(){
				return getEndTime(this.start_time, this.hours[this.hourIndex]);
			}
		},
		onLoad() {
			this.para.user_name = this.userInfo.user.userCnName;
			this.para.user_tel = this.userInfo.user.username;
		},
		onPullDownRefresh() {
			
		},
		onReachBottom() {
			this.status = 'more';
			this.page += 1;
			this.getMeetingListData();
		},
		methods: {
			DateChange: function(e) {
				this.date = e.detail.value;
			},
			TimeChange: function(e){
				this.time = e.detail.value;
			},
			ChangeHours: function(e) {
				this.hourIndex = e.detail.value;
			},
			ChangePeoples: function(e) {
				this.peopleIndex = e.detail.value;
				this.para.people_num = this.peoples[e.detail.value];
			},
			showBottomModal: function(e) {
				this.page = 1;
				this.meetings = [];
				this.isShowBottomModal = true;
				this.getMeetingListData();
			},
			hideBottomModal: function(e) {
				this.isShowBottomModal = false;
			},
			getMeetingListData: function() {
				this.status = 'loading';
				global.$http.post('/meeting/info/meetingList', {
					params: {
						start_time: this.para.start_time,
						end_time: this.para.end_time,
						page: this.page,
						pageSize: this.pageSize
					},
				}).then(res => {
					if (res.status === "0") {
						this.status = 'noMore';
						this.meetings = res.data.list;
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
				}).catch(err => {
					uni.showToast({
						title: err.message,
						icon: 'none'
					});
				});
			},
			getMeeting: function(e) {
				this.para.meeting_id = e.id;
				this.para.building_name = e.name;
				this.para.room_number = e.number;
				this.isShowBottomModal = false;
			},
			Submit: function(e){
				this.para.start_time = this.start_time;
				this.para.end_time = this.end_time;
				//验证数据
				if(this.para.desc.length <= 0){
					uni.showToast({
						icon: 'none',
						title: '请填写会议主题'
					});
					return;
				}
				if(this.para.desc.length > 15){
					uni.showToast({
						icon: 'none',
						title: '会议主题不超过15字'
					});
					return;
				}
				if(this.para.user_name.length <= 0){
					uni.showToast({
						icon: 'none',
						title: '请填写姓名'
					});
					return;
				}
				if(this.para.user_tel.length <= 0){
					uni.showToast({
						icon: 'none',
						title: '请填写手机号'
					});
					return;
				}
				if(this.para.meeting_id <= 0){
					uni.showToast({
						icon: 'none',
						title: '请选择会议室'
					});
					return;
				}
				
				//提交数据
				uni.showLoading({
					title: '提交中',
					mask: false
				});
				global.$http.post('/meeting/record/saveRecord', {
					params: this.para,
				}).then(res => {
					uni.hideLoading();
					if (res.status === "0") {
						uni.showToast({
							icon: 'none',
							title: '提交成功'
						});
						uni.navigateBack();
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
		}
	}
</script>

<style>
	#meeting-list-modal {
		z-index: 10000;
	}

	#meeting-list-modal .cu-dialog {
		height: 100vh;
	}

	#meeting-list-modal.cu-modal.show #list-view {
		overflow-x: hidden;
		overflow-y: scroll;
		pointer-events: auto;
	}

	.cu-form-group .modal-group {
		flex: 1;
		padding-right: 40upx;
		overflow: hidden;
		position: relative;
	}

	.cu-form-group .modal-group .picker {
		line-height: 100upx;
		font-size: 28upx;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		width: 100%;
		text-align: right;
	}

	.cu-form-group .modal-group::after {
		font-family: cuIcon;
		display: block;
		content: "\e6a3";
		position: absolute;
		font-size: 34upx;
		color: #8799a3;
		line-height: 100upx;
		width: 60upx;
		text-align: center;
		top: 0;
		bottom: 0;
		right: -20upx;
		margin: auto;
	}
</style>
