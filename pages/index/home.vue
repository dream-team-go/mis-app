<template>
	<view>
		<contacts v-if="PageCur=='contacts'" :contactsData='contactsData'></contacts>
		<car v-if="PageCur=='car'" :carData="carData"></car>
		<meeting v-if="PageCur=='meeting'" :meetingData="meetingData"></meeting>
		<food v-if="PageCur=='food'" :foodData="foodData"></food>
		<main-page v-if="PageCur=='main'" :mainData="mainData"></main-page>
		<user v-if="PageCur=='user'" :userData="userData"></user>
		<work v-if="PageCur=='work'"></work>
		<view class="cu-bar tabbar bg-white shadow foot">
			<!-- <view class="action" @click="NavChange" data-cur="car" v-if="CarPermission">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/car' + [PageCur=='car'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='car'?'text-bluelight':'text-black'">用车</view>
			</view>
			<view class="action" @click="NavChange" data-cur="meeting" v-if="MeetingPermission">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/meeting' + [PageCur == 'meeting'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='meeting'?'text-bluelight':'text-black'">会务</view>
			</view>
			<view class="action" @click="NavChange" data-cur="food" v-if="FoodPermission">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/food' + [PageCur == 'food'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='food'?'text-bluelight':'text-black'">订餐</view>
			</view> -->
			<view class="action" @click="NavChange" data-cur="main">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/main' + [PageCur == 'main'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='main'?'text-bluelight':'text-black'">首页</view>
			</view>
			<!-- <view class="action" @click="NavChange" data-cur="contacts">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/contacts' + [PageCur == 'contacts'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='contacts'?'text-bluelight':'text-black'">电话簿</view>
			</view> -->
			<view class="action" @click="NavChange" data-cur="work" v-if="WorkPermission">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/work' + [PageCur == 'work'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='work'?'text-bluelight':'text-black'">工作台</view>
			</view>
			<view class="action" @click="NavChange" data-cur="user">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/user' + [PageCur == 'user'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='user'?'text-bluelight':'text-black'">我的</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import misEnum from '../../common/mis-enum.js'; 
	import MainPage from './main.vue'
	export default {
		components: {
			MainPage
		},
		data() {
			return {
				PageCur: "",
				CarPermission: false,
				MeetingPermission: false,
				FoodPermission: false,
				WorkPermission: false,
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
				},
				foodData: {
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
				},
				carData:{
					totalCount: "",
					approveCount: "",
					cancleCount: "",
					failCount: "",
					waitCheckCount: "",
					finishDispatchCount: "",
					centerCancleCount: "",
					underwayCount: "",
					successCount: "",
					reason: "",
					people_num: "",
					predict_start_time: "",
					predict_end_time: "",
					start_place: "",
					end_place: "",
					status: ""
				},
				contactsData:[],
				userData:{
					msgCount: 0
				},
				mainData:{
					imgs:[],
					informs: []
				}
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		onShow() {
			if (this.PageCur === "user")
				this.getUnReadMsg();
		},
		onLoad() {
			//设置权限
			if(this.userInfo.key.includes("use_car:apply")){
				this.CarPermission = true;
				if(!this.PageCur)
					this.PageCur = "main";
			}
			if(this.userInfo.key.includes("meeting:order")){
				this.MeetingPermission = true;
				if(!this.PageCur)
					this.PageCur = "main";
			}
			if(this.userInfo.key.includes("dining:order")){
				this.FoodPermission = true;
				if(!this.PageCur)
					this.PageCur = "main";
			}
			//设置工作台权限
			if(this.userInfo.key.includes("dining:manage") || this.userInfo.key.includes("dining:list") || 
			// this.userInfo.key.includes("dining_lead:order") || 
			this.userInfo.key.includes("dining_lead:manage") || this.userInfo.key.includes("reception:fgsp") ||
			this.userInfo.key.includes("reception:sp") || this.userInfo.key.includes("reception:task") ||
			this.userInfo.key.includes("meeting:manage") || this.userInfo.key.includes("meeting:list") ||
			this.userInfo.key.includes("use_car:sp") || this.userInfo.key.includes("fix_car:jzsp") ||
			this.userInfo.key.includes("car:manage") || this.userInfo.key.includes("driver:manage") ||
			this.userInfo.key.includes("use_car:list") || this.userInfo.key.includes("use_car:dispatch") ||
			this.userInfo.key.includes("fix_car:list") || this.userInfo.key.includes("fix_car:zzsp") ||
			this.userInfo.key.includes("fix_car:zrsp") || this.userInfo.key.includes("fix_car:shop") ||
			this.userInfo.key.includes("use_car:driver") || this.userInfo.key.includes("fix_car:apply")||
			this.userInfo.key.includes("service:manage") || this.userInfo.key.includes("lost:manage") ||
			this.userInfo.key.includes("find:manage")){
				this.WorkPermission = true;
				if(!this.PageCur)
					this.PageCur = "work";
			}
			if(!this.PageCur)
				this.PageCur = "user";
			this.loadData();
		},
		methods: {
			getUnReadMsg(){
				uni.showLoading({
					title: '加载中',
					mask: false
				});
				//获取未读消息数量
				global.$http.post('/core/warn/getNoReadCount', {
					params: {},
				}).then(res => {
					if (res.status === "0") {
						this.userData.msgCount = res.data;
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
			},
			loadData() {
				if(this.PageCur === "car"){
					uni.showLoading({
						title: '加载中',
						mask: false
					});
					//获取车辆概览
					global.$http.post('/car/apply/myCountByStatus', {
						params: {},
					}).then(res => {
						if (res.status === "0") {
							console.log(this.$store)
							this.carData.totalCount = 0;
							this.carData.waitCheckCount = 0;
							this.carData.cancleCount = 0;
							this.carData.approveCount = 0;
							this.carData.failCount = 0;
							this.carData.finishDispatchCount = 0;
							this.carData.centerCancleCount = 0;
							this.carData.underwayCount = 0;
							this.carData.successCount = 0;
							var totalCount = 0;
							for (var i = 0; i < res.data.length; i++) {
								if (res.data[i].status === 0) {
									this.carData.waitCheckCount = res.data[i].total;
								} else if (res.data[i].status === -3) {
									this.carData.cancleCount = res.data[i].total;
								} else if (res.data[i].status === 1) {
									this.carData.approveCount = res.data[i].total;
								} else if (res.data[i].status === -1) {
									this.carData.failCount = res.data[i].total;
								}else if (res.data[i].status ===2) {
									this.carData.finishDispatchCount = res.data[i].total;
								}else if (res.data[i].status === -2) {
									this.carData.centerCancleCount = res.data[i].total;
								}else if (res.data[i].status === 3) {
									this.carData.underwayCount = res.data[i].total;
								}else if (res.data[i].status === 4) {
									this.carData.successCount = res.data[i].total;
								}
								totalCount += res.data[i].total;
							}
							this.carData.totalCount = totalCount;
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
					global.$http.post('/car/apply/myLatelyRecord', {
						params: {},
					}).then(res => {
						if (res.status === "0") {
							if (res.data) {
								this.carData.reason = res.data.reason;
								this.carData.people_num = res.data.people_num;
								this.carData.predict_start_time = res.data.predict_start_time;
								this.carData.status = misEnum.UseCarRecordEnumMap.get(res.data.status);
								this.carData.start_place = res.data.start_place;
								this.carData.end_place = res.data.end_place;
								this.carData.predict_end_time = res.data.predict_end_time;
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
				else if (this.PageCur === "meeting") {
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
				}else if (this.PageCur === "food") {
					uni.showLoading({
						title: '加载中',
						mask: false
					});
					//获取会务概览
					global.$http.post('/dining/record/myCountByStatus', {
						params: {},
					}).then(res => {
						if (res.status === "0") {
							this.foodData.totalCount = 0;
							this.foodData.successCount = 0;
							this.foodData.cancleCount = 0;
							this.foodData.failCount = 0;
							this.foodData.waitCheckCount = 0;
							var totalCount = 0;
							for (var i = 0; i < res.data.length; i++) {
								if (res.data[i].status === -2) {
									this.foodData.cancleCount = res.data[i].total;
								} else if (res.data[i].status === -1) {
									this.foodData.failCount = res.data[i].total;
								} else if (res.data[i].status === 0) {
									this.foodData.waitCheckCount = res.data[i].total;
								} else if (res.data[i].status === 1) {
									this.foodData.successCount = res.data[i].total;
								}
								totalCount += res.data[i].total;
							}
							this.foodData.totalCount = totalCount;
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
					global.$http.post('/dining/record/myLatelyRecord', {
						params: {},
					}).then(res => {
						if (res.status === "0") {
							if (res.data) {
								this.foodData.desc = res.data.desc;
								this.foodData.building_name = res.data.building_name;
								this.foodData.room_number = res.data.room_number;
								this.foodData.status = misEnum.FoodRecordEnumMap.get(res.data.status);
								this.foodData.start_time = res.data.start_time;
								this.foodData.end_time = res.data.end_time;
								this.foodData.create_time = res.data.create_time;
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
				}else if (this.PageCur === "user") {
					//获取未读消息数量
					this.getUnReadMsg();
				}else if (this.PageCur === "contacts") {
					uni.showLoading({
						title: '加载中',
						mask: false
					});
					//获取行政单位数据
					global.$http.post('/core/organization/organizationPage', {
						params: {
							page: 1,
							pageSize: 10000,
							name: ''
						},
					}).then(res => {
						if (res.status === "0") {
							let list = [];
							for (let i = 0; i < res.data.list.length; i++) {
								list[i] = res.data.list[i];
							}
							this.contactsData = list;
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
				}else if (this.PageCur === "main") {
					//获取轮播图数据
					global.$http.post('/core/setting/getListByType', {
						params: {
							appid: this.AppId,
							limit: 5,
							type: 1
						},
					}).then(res => {
						if (res.status === "0") {
							if(!res.data || res.data.length == 0){
								this.mainData.imgs = [
									'/static/home/photo-1.jpg',
									'/static/home/photo-2.jpg',
									'/static/home/photo-3.jpg',
									'/static/home/photo-4.jpg',
									'/static/home/photo-5.jpg'
								];
							}else{
								res.data.forEach(c=>{
									this.mainData.imgs.push(c.url);
								});
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
					//获取通知数据
					global.$http.post('/core/setting/getListByType', {
						params: {
							appid: this.AppId,
							limit: 5,
							type: 2
						},
					}).then(res => {
						if (res.status === "0") {
							if(!res.data || res.data.length == 0){
								this.mainData.informs = ["主办单位：开远市机关事务局", "“指尖上的形式主义”投诉建议电话：0873-7231999"];
							}else{
								res.data.forEach(c=>{
									this.mainData.informs.push(c.msg);
								});
							}
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
				}
			},
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur;
				this.loadData();
			}
		}
	}
</script>

<style lang='scss'>
</style>
