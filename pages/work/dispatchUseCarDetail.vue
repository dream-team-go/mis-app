<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">车辆调度</block>
		</cu-custom>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 用车人数：
				<text class="text-bold">{{info.people_num}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 派车数量：
				<text class="text-bold">{{list.length}}辆</text>
			</view>
		</view>
		
		<view class="cu-item arrow margin-top" v-for="(dispatchOrder,index) in list" :key="dispatchOrder.id">
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-orange"></text> 派车单{{index+1}}
				</view>
			</view>
			
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-orange"></text> 乘车人数：
					<text class="text-bold">{{list.length}}</text>
				</view>
			</view>
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-orange"></text> 车辆：
					<text class="text-bold">{{dispatchOrder.brand + " " + dispatchOrder.color + " " + dispatchOrder.car_seat_num + "座)"}}</text>
				</view>
			</view>
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-orange"></text> 车牌：
					<text class="text-bold">{{dispatchOrder.car_number}}</text>
				</view>
			</view>
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-orange"></text> 司机：
					<text class="text-bold">{{dispatchOrder.driver_name + "("+ dispatchOrder.driver_phone +")"}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{},
				list:[]
			}
		},
		onLoad(option){
			var info = JSON.parse(decodeURIComponent(option.para));
			this.info = info;
			//获取派车单
			if(this.info.status >= 2){
				global.$http.post('/car/dispatch/getListByDispatch', {
					params: {
						order_code: this.info.order_code
					},
				}).then(res => {
					if (res.status === "0") {
						this.list = res.data;
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
		methods: {
			getCarListData() {
				this.status = 'loading';
				global.$http.post('/car/dispatch/dispatchCarList', {
					params: {
						order_code: this.info.order_code,
						page: this.page,
						pageSize: this.pageSize
					},
				}).then(res => {
					if (res.status === "0") {
						this.status = 'noMore';
						this.cars = res.data;
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
			getDriverListData() {
				this.status = 'loading';
				global.$http.post('/car/dispatch/dispatchDriverList', {
					params: {
						order_code: this.info.order_code,
						page: this.page,
						pageSize: this.pageSize
					},
				}).then(res => {
					if (res.status === "0") {
						this.status = 'noMore';
						this.drivers = res.data;
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
			ChangeNumber: function(e) {
				this.numberIndex = Number(e.detail.value);
				var orderCount = this.para.list.length;
				if (orderCount > this.numberIndex + 1) {
					this.para.list.length = this.numberIndex + 1;
				} else if (orderCount < this.numberIndex + 1) {
					for (var i = 0; i < this.numberIndex + 1 - orderCount; i++) {
						this.para.list.push({
							car_id: 0,
							car_number: "",
							car_seat_num: "",
							people_num: 0,
							driver_id: "",
							driver_name: "",
							driver_phone: ""
						});
					}
				}
			},
			showCarModal: function(e) {
				this.editIndex = e;
				this.page = 1;
				this.cars = [];
				this.isShowCarModal = true;
				this.getCarListData();
			},
			hideCarModal: function(e){
				this.isShowCarModal = false;
			},
			getCar: function(e) {
				this.para.list[this.editIndex].car_id = e.id;
				this.para.list[this.editIndex].car_number = e.car_number;
				this.para.list[this.editIndex].car_seat_num = e.seat_num;
				this.isShowCarModal = false;
			},
			showDriverModal: function(e) {
				this.editIndex = e;
				this.page = 1;
				this.cars = [];
				this.isShowDriverModal = true;
				this.getDriverListData();
			},
			hideDriverModal: function(e){
				this.isShowDriverModal = false;
			},
			getDriver: function(e) {
				this.para.list[this.editIndex].driver_id = e.id;
				this.para.list[this.editIndex].driver_name = e.user_cn_name;
				this.para.list[this.editIndex].driver_phone = e.tel_no;
				this.isShowDriverModal = false;
			},
			ChangePeopleNum: function(e){
				this.para.list[Number(e.target.id)].people_num = e.target.value;
			},
			Submit: function(e){
				var totalCount = 0;
				//验证数据
				for (var i = 0; i < this.para.list.length; i++) {
					var dispatch = this.para.list[i];
					if(dispatch.people_num <= 0){
						uni.showToast({
							icon: 'none',
							title: '派车单' + (i+1) + '：乘车人数必须大于0'
						});
						return;
					}
					if(dispatch.car_id <= 0){
						uni.showToast({
							icon: 'none',
							title: '派车单' + (i+1) + '：请选择车辆'
						});
						return;
					}
					if(dispatch.driver_id.length <= 0){
						uni.showToast({
							icon: 'none',
							title: '派车单' + (i+1) + '：请选择司机'
						});
						return;
					}
					totalCount+=Number(dispatch.people_num);
				}
				
				if(totalCount != this.info.people_num){
					uni.showToast({
						icon: 'none',
						title: '乘车总人数不等于用车人数'
					});
					return;
				}
				//提交数据
				uni.showLoading({
					title: '提交中',
					mask: false
				});
				global.$http.post('/car/dispatch/save', {
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
</style>
