<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			
			<block slot="content">{{isAdd ? '预定包房' : '编辑预定包房'}}</block>
		</cu-custom>
		<form v-show="isShowBottomModal == false">
			<view class="cu-form-group">
				<view class="title">订餐原由</view>
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
				<!-- <picker mode="date" :value="date" :start="startDate" :end="endDate" @change="DateChange"> -->
				<picker mode="date" :value="date" :start="startDate" :end="endDate">
					<view class="picker">
						{{date}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">时间</view>
				<!-- <picker mode="time" :value="time" @change="TimeChange"> -->
				<picker mode="time" :value="time">
					<view class="picker">
						{{time}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">用餐时长</view>
				<!-- <picker @change="ChangeHours" :value="hourIndex" :range="hours"> -->
				<picker :value="hourIndex" :range="hours">
					<view class="picker">
						{{hourIndex>-1?hours[hourIndex] + "小时" : "请选择"}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">用餐人数</view>
				<picker @change="ChangePeoples" :value="peopleIndex" :range="peoples">
					<view class="picker">
						{{peopleIndex>-1?peoples[peopleIndex] + "人" : "请选择"}}
					</view>
				</picker>
			</view>

			<view class="cu-form-group">
				<view class="title">上菜时间</view>
				<picker mode="time" :value="mealTime" @change="MealTimeChange">
					<view class="picker">
						{{mealTime}}
					</view>
				</picker>
			</view>

			<view class="cu-form-group">
				<view class="title">包房</view>
				<!-- <view class="modal-group" @tap="showBottomModal" data-target="Modal"> -->
				<view class="modal-group" data-target="Modal">
					<view class="picker">
						{{ para.room_number.length > 0 ? (para.room_number + '('+para.building_name+')') : '请选择' }}
					</view>
				</view>
			</view>
			
			<view class="cu-form-group">
				<view class="title">清真人数</view>
				<picker @change="ChangeHasHz" :value="hzIndex" :range="hzPeoples">
					<view class="picker">
						{{hzIndex>-1?hzPeoples[hzIndex] + "人" : "请选择"}}
					</view>
				</picker>
			</view>

			<view class="cu-form-group">
				<view class="title">用餐标准</view>
				<input name="input" v-model="para.meal_spec"></input>
			</view>

			<view class="cu-form-group">
				<view class="title">接待对象</view>
				<input name="input" v-model="para.receive_people"></input>
			</view>

			<view class="cu-form-group">
				<view class="title">陪同领导</view>
				<input name="input" v-model="para.lender"></input>
			</view>

			<view class="cu-form-group">
				<view class="title">特殊要求</view>
				<input name="input" v-model="para.meal_request"></input>
			</view>

			<view class="padding flex flex-direction">
				<button class="cu-btn bg-linear-blue margin-tb-sm lg" @click="Submit">提交</button>
			</view>
		</form>

		<view id="dining-list-modal" class="cu-modal bottom-modal" :class="isShowBottomModal?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-linear-blue" :style="[{'padding-top':StatusBar + 'px'},{height:CustomBar + 'px'}]">
					<view class="action text-white" @tap="hideBottomModal">取消</view>
					<view class="action text-white text-lg" style="text-align: center;margin-right: 15px;">选择包房</view>
					<view class="action"></view>
				</view>

				<view id="list-view" :style="[{height:(ScreenHeight-CustomBar) + 'px'}]">
					<view class="cu-list menu text-left">
						<view class="cu-item arrow" v-for="dining in dinings" :key="dining.id" @click="getdining(dining)" style="padding-top: 10rpx;padding-bottom: 10rpx;">
							<view class="content">
								<view class="text-grey">{{dining.number}}({{dining.name}})</view>
								<view class="text-gray text-sm flex">
									<view class="text-cut">
										{{dining.address}}
									</view>
								</view>
							</view>
							<view class="action">
								<view class="text-grey text-xs">容纳{{dining.capacity}}人</view>
								<view class="cu-tag round bg-orange sm">{{dining.num > 0 ? '已被预定' : '可预订'}}</view>
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
	
	//计算两个时间相差了几个小时
	     function getIntervalHour(startDate, endDate) {
			 startDate = new Date(startDate.replace(/-/g, '/'));
			 endDate = new Date(endDate.replace(/-/g, '/'));
	            var ms = endDate.getTime() - startDate.getTime();
	            if (ms < 0) return 0;
	            return Math.floor(ms/1000/60/60);
	        }

	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				isAdd: true,
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				ScreenHeight: this.ScreenHeight,
				date: getDate(),
				startDate: getDate(),
				endDate: getDate(7),
				time: getTime(),
				mealTime: getTime(),
				hourIndex: 0,
				hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
				peopleIndex: 0,
				peoples: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
					30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50
				],
				isShowBottomModal: false,
				dinings: [],
				status: 'more',
				hzIndex: 0,
				hzPeoples: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
					30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50
				],
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				page: 1,
				pageSize: 100,
				para: {
					id: "",
					desc: "",
					user_name: "",
					user_tel: "",
					people_num: 1,
					receive_people: "",
					lender: "",
					dining_id: "",
					building_name: "",
					meal_spec: "",
					room_number: "",
					has_hz: 0,
					meal_request: ""
				}
			}
		},
		computed: {
			...mapState(['userInfo']),
			start_time: function() {
				return this.date + " " + this.time;
			},
			end_time: function() {
				return getEndTime(this.start_time, this.hours[this.hourIndex]);
			},
			meal_time: function() {
				return this.date + " " + this.mealTime;
			}
		},
		onLoad(option) {
			var info = JSON.parse(decodeURIComponent(option.para));
			this.date = info.start_time.substring(0, 10);
			this.time = info.start_time.substring(11, 16);
			this.hourIndex = getIntervalHour(info.start_time, info.end_time) - 1;
			this.para.dining_id = info.dining_id;
			this.para.building_name = info.building_name;
			this.para.room_number = info.room_number;
			if (info.id > 0) {
				this.isAdd = false;
				this.para.id = info.id;
				this.para.desc = info.desc;
				this.para.user_name = info.user_name;
				this.para.user_tel = info.user_tel;
				this.para.people_num = info.people_num;
				this.peopleIndex = info.people_num - 1;
				this.para.receive_people = info.receive_people;
				this.para.lender = info.lender;
				this.para.meal_spec = info.meal_spec;
				this.para.has_hz = info.has_hz;
				this.mealTime = info.meal_time.substring(11, 16);
				this.hzIndex = info.has_hz;
				this.para.meal_request = info.meal_request;
			} else {
				this.para.user_name = this.userInfo.user.userCnName;
				this.para.user_tel = this.userInfo.user.username;
			}
		},
		onPullDownRefresh() {

		},
		onReachBottom() {
			this.status = 'more';
			this.page += 1;
			this.getdiningListData();
		},
		methods: {
			DateChange: function(e) {
				this.date = e.detail.value;
			},
			TimeChange: function(e) {
				this.time = e.detail.value;
			},
			MealTimeChange: function(e) {
				this.mealTime = e.detail.value;
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
				this.dinings = [];
				this.isShowBottomModal = true;
				this.getdiningListData();
			},
			hideBottomModal: function(e) {
				this.isShowBottomModal = false;
			},
			ChangeHasHz: function(e) {
				this.hzIndex = e.detail.value;
				this.para.has_hz = this.hzPeoples[e.detail.value];
			},
			getdiningListData: function() {
				this.status = 'loading';
				global.$http.post('/dining/info/diningList', {
					params: {
						start_time: this.para.start_time,
						end_time: this.para.end_time,
						page: this.page,
						pageSize: this.pageSize
					},
				}).then(res => {
					if (res.status === "0") {
						this.status = 'noMore';
						this.dinings = res.data.list;
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
			getdining: function(e) {
				this.para.dining_id = e.id;
				this.para.building_name = e.name;
				this.para.room_number = e.number;
				this.isShowBottomModal = false;
			},
			Submit: function(e) {
				this.para.start_time = this.start_time + ":00";
				this.para.end_time = this.end_time + ":00";
				this.para.meal_time = this.meal_time + ":00";
				//验证数据
				if (this.para.desc.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写订餐原由'
					});
					return;
				}
				if (this.para.desc.length > 20) {
					uni.showToast({
						icon: 'none',
						title: '订餐原由不超过20字'
					});
					return;
				}
				if (this.para.user_name.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写姓名'
					});
					return;
				}
				if (this.para.user_tel.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写手机号'
					});
					return;
				}
				if (this.para.dining_id <= 0) {
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
				global.$http.post('/dining/record/saveRecord', {
					params: this.para,
				}).then(res => {
					uni.hideLoading();
					if (res.status === "0") {
						uni.showToast({
							icon: 'none',
							title: '提交成功'
						});
						uni.navigateBack({delta: 3});
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
	#dining-list-modal {
		z-index: 10000;
	}

	#dining-list-modal .cu-dialog {
		height: 100vh;
	}

	#dining-list-modal.cu-modal.show #list-view {
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
