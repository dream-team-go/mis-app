<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">车辆调度</block>
		</cu-custom>
		<form>
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					用车人数：
					<text class="text-bold">{{info.people_num}}</text>
				</view>
			</view>
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					用车要求：
					<text class="text-bold">{{require}}</text>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">派车数量</view>
				<picker @change="ChangeNumber" :value="numberIndex" :range="numbers">
					<view class="picker">
						{{numbers[numberIndex]}}辆
					</view>
				</picker>
			</view>
			<view class="cu-item arrow margin-top" v-for="(dispatchOrder,index) in para.list" :key="dispatchOrder.id">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						派车单{{index+1}}
					</view>
				</view>
				<view class="cu-form-group">
					<view class="title">乘车人数</view>
					<picker @change="ChangePeopleNum" :id="index" :value="dispatchOrder.people_num" :range="peopleNums">
						<view class="picker">
							{{dispatchOrder.people_num}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">车辆</view>
					<view class="modal-group" @tap="showCarModal(index)" data-target="Modal">
						<view class="picker">
							{{ dispatchOrder.car_id > 0 ? dispatchOrder.brand + " " + dispatchOrder.color + " " + dispatchOrder.seat_num + "座" + " " + dispatchOrder.car_number: '请选择' }}
						</view>
					</view>
				</view>
				<view class="cu-form-group">
					<view class="title">司机</view>
					<view class="modal-group" @tap="showDriverModal(index)" data-target="Modal">
						<view class="picker">
							{{ dispatchOrder.driver_id.length > 0 ? dispatchOrder.driver_name + "("+ dispatchOrder.driver_phone +")" : '请选择' }}
						</view>
					</view>
				</view>
				<view class="cu-form-group">
					<view class="title">备注</view>
					<input name="input" v-model="para.list[index].bak"></input>
				</view>
			</view>
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-linear-blue margin-tb-sm lg" @click="Submit">提交</button>
			</view>
		</form>
		
		<view class="list-modal cu-modal bottom-modal" :class="isShowCarModal?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-linear-blue" :style="[{'padding-top':StatusBar + 'px'},{height:CustomBar + 'px'}]">
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
				<view class="cu-bar bg-linear-blue" :style="[{'padding-top':StatusBar + 'px'},{height:CustomBar + 'px'}]">
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
								<view class="text-grey text-xs">驾龄{{driver.drive_age}}年</view>
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
	import uniLoadMore from '@/colorui/components/uni-load-more.vue';
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				ScreenHeight: this.ScreenHeight,
				numberIndex: 0,
				numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				peopleNums: [0, 1, 2, 3, 4, 5, 6, 7, 8],
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
				require: "无",
				editIndex: 0,
				para: {
					order_code: "",
					list: [{
						car_id: 0,
						car_number: "",
						brand: "",
						color: "",
						seat_num: "",
						people_num: 0,
						driver_id: "",
						driver_name: "",
						driver_phone: "",
						bak: ""
					}]
				}
			}
		},
		onLoad(option){
			var info = JSON.parse(decodeURIComponent(option.para));
			this.info = info;
			this.para.order_code = info.order_code;
			//设置用车要求
			info.nums.forEach(c=>{
				if(c.num > 0)
				{
					if(this.require == "无")
					{
						this.require = c.car_type+c.num+"辆";
					}else{
						this.require += "; " + c.car_type+c.num+"辆";
					}
				}
			});
			//获取派车单
			if(this.info.status >= 2){
				global.$http.post('/car/dispatch/getListByDispatch', {
					params: {
						order_code: this.info.order_code
					},
				}).then(res => {
					if (res.status === "0") {
						this.para.list.length = 0;
						res.data.forEach(c=>{
							this.para.list.push({
								car_id: c.car_id,
								car_number: c.car_number,
								brand: c.brand,
								color: c.color,
								seat_num: c.seat_num,
								people_num: c.people_num,
								driver_id: c.driver_id,
								driver_name: c.driver_name,
								driver_phone: c.driver_phone,
								bak: c.bak
							});
						});
						this.numberIndex = res.data.length - 1;
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
							brand: "",
							color: "",
							seat_num: "",
							people_num: 0,
							driver_id: "",
							driver_name: "",
							driver_phone: "",
							bak: ""
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
				this.para.list[this.editIndex].seat_num = e.seat_num;
				this.para.list[this.editIndex].brand = e.brand;
				this.para.list[this.editIndex].color = e.color;
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
					header:{
						ContentType: 'text/plain'
					},
					data: JSON.stringify(this.para)
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
