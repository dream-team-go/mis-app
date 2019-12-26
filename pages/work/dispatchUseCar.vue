<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">车辆调度</block>
		</cu-custom>
		<form>
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-orange"></text> 用车人数：
					<text class="text-bold">{{info.people_num}}</text>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">派车数量</view>
				<picker @change="ChangeNumber" :value="numberIndex" :range="numbers">
					<view class="picker">
						{{numbers[numberIndex]}}
					</view>
				</picker>
			</view>
			<view class="cu-item arrow margin-top" v-for="(dispatchOrder,index) in para.list" :key="dispatchOrder.id">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-title text-orange"></text> 派车单{{index+1}}
					</view>
				</view>
				<view class="cu-form-group">
					<view class="title">乘车人数</view>
					<picker @change="ChangePeopleNum" :value="peopleNumIndex" :range="peopleNums" @tap="tapPeopleNumPicker">
						<view class="picker">
							{{dispatchOrder.people_num}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">车辆</view>
					<view class="modal-group" @tap="showCarModal" data-target="Modal">
						<view class="picker">
							{{ dispatchOrder.car_id > 0 ? dispatchOrder.car_number + "("+dispatchOrder.car_seat_num+"座)": '请选择' }}
						</view>
					</view>
				</view>
				<view class="cu-form-group">
					<view class="title">司机</view>
					<view class="modal-group" @tap="showDriverModal" data-target="Modal">
						<view class="picker">
							{{ dispatchOrder.driver_id > 0 ? dispatchOrder.driver_name + "("+ dispatchOrder.driver_phone +")" : '请选择' }}
						</view>
					</view>
				</view>
			</view>
		</form>
		
		<view class="list-modal cu-modal bottom-modal" :class="isShowCarModal?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-gradual-blue" :style="[{'padding-top':StatusBar + 'px'},{height:CustomBar + 'px'}]">
					<view class="action text-white" @tap="hideCarModal">取消</view>
					<view class="action text-white text-lg" style="text-align: center;margin-right: 15px;">选择车辆</view>
					<view class="action"></view>
				</view>
		
				<view id="list-view" :style="[{height:(ScreenHeight-CustomBar) + 'px'}]">
					<view class="cu-list menu text-left">
						<view class="cu-item arrow" v-for="car in cars" :key="car.id" @click="getCar(car)" style="padding-top: 10rpx;padding-bottom: 10rpx;">
							<view class="content">
								<view class="text-grey">{{car.car_number}}</view>
								<view class="text-gray text-sm flex">
									<view class="text-cut">
										{{car.brand}} {{car.color}}
									</view>
								</view>
							</view>
							<view class="action">
								<view class="text-grey text-xs">{{car.seat_num}}座</view>
								<view class="cu-tag round bg-orange sm">{{car.is_clash > 0 ? "已被调度" : "可调度"}}</view>
							</view>
						</view>
					</view>
					<uni-load-more :status="status" :content-text="contentText" />
				</view>
			</view>
		</view>
		<view class="list-modal cu-modal bottom-modal" :class="isShowDriverModal?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-gradual-blue" :style="[{'padding-top':StatusBar + 'px'},{height:CustomBar + 'px'}]">
					<view class="action text-white" @tap="hideDriverModal">取消</view>
					<view class="action text-white text-lg" style="text-align: center;margin-right: 15px;">选择司机</view>
					<view class="action"></view>
				</view>
		
				<view id="list-view" :style="[{height:(ScreenHeight-CustomBar) + 'px'}]">
					<view class="cu-list menu text-left">
						<view class="cu-item arrow" v-for="driver in drivers" :key="driver.id" @click="getDriver(driver)" style="padding-top: 10rpx;padding-bottom: 10rpx;">
							<view class="content">
								<view>{{driver.user_cn_name}}({{driver.sex == 1 ? '男' : '女'}})</view>
								<view class="text-gray text-sm flex">
									<view class="text-cut">
										{{driver.tel_no}}
									</view>
								</view>
							</view>
							<view class="action">
								<view class="text-grey text-xs">{{driver.drive_age}}年</view>
								<view class="cu-tag round bg-orange sm">{{driver.is_clash > 0 ? "已被调度" : "可调度"}}</view>
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
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				ScreenHeight: this.ScreenHeight,
				numberIndex: 0,
				numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				info:{},
				isShowCarModal: false,
				isShowDriverModal: false,
				cars: [],
				drivers: [],
				page: 1,
				pageSize: 100,
				status: 'more',
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				para: {
					order_code: "",
					list: [{
						car_id: 0,
						car_number: "",
						car_seat_num: "",
						people_num: "",
						driver_id: 0,
						driver_name: "",
						driver_phone: ""
					}]
				}
			}
		},
		onLoad(option){
			var info = JSON.parse(decodeURIComponent(option.para));
			this.info = info;
			this.para.order_code = info.order_code;
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
						this.cars = res.data.list;
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
						this.cars = res.data.list;
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
							driver_id: 0,
							driver_name: "",
							driver_phone: ""
						});
					}
				}
			},
			showCarModal: function(e) {
				this.page = 1;
				this.cars = [];
				this.isShowCarModal = true;
				this.getCarListData();
			},
			hideCarModal: function(e){
				this.isShowCarModal = false;
			},
			getCar: function(e) {
				if (this.car_id != e.id) {
					this.car_id = e.id;
					this.car_name = e.name;
					//清除房间选择
					this.para.office_driver_id = 0;
					this.driver_name = "";
				}
				this.isShowCarModal = false;
			},
			showDriverModal: function(e) {
				this.page = 1;
				this.cars = [];
				this.isShowDriverModal = true;
				this.getDriverListData();
			},
			hideDriverModal: function(e){
				this.isShowDriverModal = false;
			},
			getDriver: function(e) {
				if (this.car_id != e.id) {
					this.car_id = e.id;
					this.car_name = e.name;
					//清除房间选择
					this.para.office_driver_id = 0;
					this.driver_name = "";
				}
				this.isShowDriverModal = false;
			},
			tapPeopleNumPicker: function(e){
				var tmp = e.detail;
			}
		}
	}
</script>

<style>
	.list-modal {
		z-index: 10000;
	}

	.list-modal .cu-dialog {
		height: 100vh;
	}

	.list-modal.cu-modal.show #list-view {
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
