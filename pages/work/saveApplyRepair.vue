<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{isAdd ? '申请维修' : '编辑维修申请'}}</block>
		</cu-custom>
		<form>
			<view class="cu-form-group">
				<view class="title">维修原由</view>
				<input name="input" v-model="para.desc"></input>
			</view>
			
			<view class="cu-form-group">
				<view class="title">维修类型</view>
				<picker @change="ChangeTypes" :value="typeIndex" :range="types">
					<view class="picker">
						{{types[typeIndex]}}
					</view>
				</picker>
			</view>
			
			<view class="cu-form-group">
				<view class="title">车辆</view>
				<view class="modal-group" @tap="showCarModal(index)" data-target="Modal">
					<view class="picker">
						{{ para.car_id > 0 ? para.brand + " " + para.car_number: '请选择' }}
					</view>
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
				isAdd: true,
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				ScreenHeight: this.ScreenHeight,
				typeIndex: 0,
				types:["请选择", "维修", "保养"],
				isShowCarModal: false,
				cars: [],
				page: 1,
				pageSize: 100,
				status: 'more',
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				para: {
					id: "",
					car_id: "",
					car_number: "",
					brand: "",
					type: 0,
					desc: ""
				}
			}
		},
		onLoad(option) {
			if(option.para){
				this.isAdd = false;
				var info = JSON.parse(decodeURIComponent(option.para));
				this.para.id = info.id;
				this.typeIndex = info.type;
				this.para.type = info.type;
				this.para.car_id = info.car_id;
				this.para.car_number = info.car_number;
				this.para.brand = info.brand;
				this.para.desc = info.desc;
			}
		},
		methods: {
			getCarListData() {
				this.status = 'loading';
				global.$http.post('/car/info/getCarByDriver', {
					params: {
						page: this.page,
						pageSize: this.pageSize
					},
				}).then(res => {
					if (res.status === "0") {
						this.status = 'noMore';
						this.cars = res.data;
					}else {
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
			ChangeTypes: function(e){
				this.typeIndex = e.detail.value;
				this.para.type = e.detail.value;
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
				this.para.car_id = e.id;
				this.para.car_number = e.car_number;
				this.para.brand = e.brand;
				this.isShowCarModal = false;
			},
			Submit: function(e){
				//验证数据
				if(this.para.desc.length <= 0){
					uni.showToast({
						icon: 'none',
						title: '请填写维修原由'
					});
					return;
				}
				if(this.para.type <= 0){
					uni.showToast({
						icon: 'none',
						title: '请选择维修类型'
					});
					return;
				}
				if(this.para.car_id <= 0){
					uni.showToast({
						icon: 'none',
						title: '请选择维修车辆'
					});
					return;
				}
				//提交数据
				uni.showLoading({
					title: '提交中',
					mask: false
				});
				global.$http.post('/car/repair/' + (this.isAdd ? 'create' : 'update'), {
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
