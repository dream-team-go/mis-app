<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			
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
				<view class="modal-group" @tap="showCarModal()" data-target="Modal">
					<view class="picker">
						{{ para.car_id > 0 ? para.brand + " " + para.car_type + " " + para.car_number: '请选择' }}
					</view>
				</view>
			</view>
			
			<view class="cu-form-group">
				<view class="title">维修厂</view>
				<picker @change="OrganizationChange" :value="oIndex" :range="organizations" range-key="org_name">
					<view class="picker">
						{{oIndex>-1?organizations[oIndex].org_name:'请选择'}}
					</view>
				</picker>
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
								<view>{{car.car_number}}</view>
								<view class="text-somber text-df">
									<view class="text-cut">
										{{car.brand}} {{car.color}}
									</view>
								</view>
							</view>
							<view class="action">
								<view class="text-somber text-df">{{car.seat_num}}座</view>
								<view class="cu-tag round bg-orange">{{car.is_clash > 0 ? "已被调度" : "可调度"}}</view>
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
				oIndex: 0,
				organizations: [{
					org_name: "请选择",
					org_id: ""
				}],
				para: {
					id: "",
					car_id: "",
					car_number: "",
					car_type: "",
					brand: "",
					type: 0,
					desc: "",
					repair_shop_id: "",
					repair_shop: ""
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
				this.para.car_type = info.car_type;
				this.para.brand = info.brand;
				this.para.desc = info.desc;
				this.para.repair_shop_id = info.repair_shop_id;
				this.para.repair_shop = info.repair_shop;
			}
			//获取维修厂数据
			global.$http.post('/core/organization/getRepairShopByOrg', {
				params: {},
			}).then(res => {
				if (res.status === "0") {
					for (var i = 0; i < res.data.length; i++) {
						this.organizations.push(res.data[i]);
						if(option.para){
							if(res.data[i].org_id == info.repair_shop_id)
							{
								this.oIndex = i + 1;
							}
						}
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
				this.para.car_type = e.car_type;
				this.isShowCarModal = false;
			},
			OrganizationChange: function(e) {
				this.para.repair_shop_id = this.organizations[e.detail.value].org_id;
				this.para.repair_shop = this.organizations[e.detail.value].org_name;
				if (this.oIndex != e.detail.value) {
					this.oIndex = e.detail.value;
				}
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
				if(this.para.repair_shop_id.length <= 0){
					uni.showToast({
						icon: 'none',
						title: '请选择维修厂'
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
</style>
