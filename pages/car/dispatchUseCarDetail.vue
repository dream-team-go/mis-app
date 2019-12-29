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
			}
		}
	}
</script>

<style>
</style>
