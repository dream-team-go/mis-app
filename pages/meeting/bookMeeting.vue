<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">预定会议室</block>
		</cu-custom>
		<form  v-show="isShowBottomModal == false">
			<view class="cu-form-group">
				<view class="title">姓名</view>
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
						会议室
					</view>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">参会领导</view>
				<input name="input" v-model="para.attend_leader"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">备注</view>
				<input name="input" v-model="para.desc"></input>
			</view>
		</form>
		
		<view id="meeting-list-modal" class="cu-modal bottom-modal" :class="isShowBottomModal?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-gradual-blue" :style="[{'padding-top':StatusBar + 'px'},{height:CustomBar + 'px'}]">
					<view class="action text-white" @tap="hideBottomModal">取消</view>
					<view class="action text-white text-lg" style="text-align: center;margin-right: 15px;">选择会议室</view>
					<view class="action"></view>
				</view>
					<list class="cu-list menu text-left" :style="[{height:(ScreenHeight-CustomBar) + 'px'}]">
					    <cell class="cu-item arrow" v-for="(item,index) in 100" :key="index">
					      <view>Item {{index +1}}</view>
					    </cell>
					</list>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';

	function getDate(addDay) {
		const date = new Date();
		if (addDay > 0) {
			date.setDate(date.getDate() + addDay);
		}
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;

		return `${year}-${month}-${day}`;
	}

	function getTime() {
		const date = new Date();
		var tmpMinute = date.getMinutes();
		if (tmpMinute < 30) {
			date.setMinutes(30);
		} else if (tmpMinute > 30 && tmpMinute <= 59) {
			date.setMinutes(60);
		}

		let hour = date.getHours();
		let minute = date.getMinutes();

		hour = hour > 9 ? hour : '0' + hour;;
		minute = minute > 9 ? minute : '0' + minute;

		return `${hour}:${minute}`;
	}
	export default {
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
				para: {
					user_name: "",
					user_tel: "",
					people_num: 1,
					start_time: getDate() + " " + getTime(),
					end_time: "",
					desc: "",
					attend_leader: "",
					meeting_id: "",
					building_name: "",
					room_number: ""
				}
			}
		},
		computed: mapState(['userInfo']),
		onLoad() {
			this.para.user_name = this.userInfo.user.userCnName;
			this.para.user_tel = this.userInfo.user.username;
		},
		methods: {
			DateChange: function(e) {
				this.date = e.detail.value
			},
			ChangeHours: function(e) {
				this.hourIndex = e.detail.value;
			},
			ChangePeoples: function(e) {
				this.peopleIndex = e.detail.value;
				this.para.people_num = peoples[e.detail.value];
			},
			showBottomModal: function(e) {
				this.isShowBottomModal = true;
			},
			hideBottomModal: function(e) {
				this.isShowBottomModal = false;
			},
			itemTap: function(e){
				console.log(e);
			}
		}
	}
</script>

<style>
	#meeting-list-modal {
		z-index: 10000;
	}
	
	#meeting-list-modal .cu-dialog{
		height: 100vh;
	}
	
	#meeting-list-modal.cu-modal.show .cu-list{
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
