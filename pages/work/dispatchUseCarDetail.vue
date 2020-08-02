<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			
			<block slot="content">派车单</block>
		</cu-custom>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 用车人数：
				<text class="text-black">{{info.people_num}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 派车数量：
				<text class="text-black">{{list.length}}辆</text>
			</view>
		</view>

		<view class="cu-item arrow margin-top" v-for="(dispatchOrder,index) in list" :key="dispatchOrder.id">
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					 派车单{{index+1}} <text class="text-orange text-black margin-left">{{getStatusStr(dispatchOrder.status)}}</text>
				</view>
				<view class="action" v-if="dispatchOrder.status == 3">
					<button class="cu-btn bg-linear-blue shadow" @tap="sureSettle(dispatchOrder)">确认结算</button>
				</view>
			</view>

			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					 乘车人数：
					<text class="text-black">{{dispatchOrder.people_num}}</text>
				</view>
			</view>
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					 车辆：
					<text class="text-black">{{dispatchOrder.brand + " " + dispatchOrder.color + " " + dispatchOrder.seat_num + "座" + " " + dispatchOrder.car_number}}</text>
				</view>
			</view>
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					 司机：
					<text class="text-black">{{dispatchOrder.driver_name + "("+ dispatchOrder.driver_phone +")"}}</text>
				</view>
			</view>
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					 里程数：
					<text class="text-black">{{dispatchOrder.stop_num}}公里</text>
				</view>
				<view class="action" v-if="dispatchOrder.status == 3">
					<button class="cu-btn bg-linear-blue shadow" @tap="editMileage(index)">修改里程</button>
				</view>
			</view>
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					 用车天数：
					<text class="text-black">{{dispatchOrder.days}}</text>
				</view>
				<view class="action" v-if="dispatchOrder.status == 3">
					<button class="cu-btn bg-linear-blue shadow" @tap="editDays(index)">修改天数</button>
				</view>
			</view>
			<view class="cu-bar bg-white solid-bottom" v-if="dispatchOrder.bak.length > 0">
				<view class="action">
					 备注：
					<text class="text-black">{{dispatchOrder.bak}}</text>
				</view>
			</view>
			<view class="cu-bar bg-white solid-bottom" v-if="dispatchOrder.is_appraise == 1">
				<view class="action">
					 评分：
					<text v-for="(value,key) in stars" :key="key" :class="key < dispatchOrder.appraise_grade ? 'cuIcon-favorfill text-yellow' : 'cuIcon-favor text-gray'"></text>
				</view>
			</view>
			<view class="cu-bar bg-white solid-bottom" v-if="dispatchOrder.is_appraise == 1 && dispatchOrder.appraise_contnet.length > 0">
				<view class="action">
					 评价内容：
					<text class="text-black">{{dispatchOrder.bak}}</text>
				</view>
			</view>
			<uni-collapse v-if="dispatchOrder.status > 2">
				<uni-collapse-item :title="getTitle(dispatchOrder.total_fee)">
					<view class="cu-bar bg-white solid-bottom">
						<view class="action">
							 里程费(元)：
							<text class="text-black">{{dispatchOrder.stop_price}}/公里 x {{dispatchOrder.stop_num}}公里 = {{dispatchOrder.stop_price * dispatchOrder.stop_num}}</text>
						</view>
					</view>
					<view class="cu-bar bg-white solid-bottom" v-if="dispatchOrder.zs_fee > 0">
						<view class="action">
							 住宿费(元)：
							<text class="text-black">{{dispatchOrder.zs_fee}}</text>
						</view>
					</view>
					<view class="cu-bar bg-white solid-bottom" v-if="dispatchOrder.tc_fee > 0">
						<view class="action">
							 停车费(元)：
							<text class="text-black">{{dispatchOrder.tc_fee}}</text>
						</view>
					</view>
					<view class="cu-bar bg-white solid-bottom" v-if="dispatchOrder.hs_fee > 0">
						<view class="action">
							 伙食费(元)：
							<text class="text-black">{{dispatchOrder.hs_fee}}</text>
						</view>
					</view>
					<view class="cu-bar bg-white solid-bottom" v-if="dispatchOrder.jy_fee > 0">
						<view class="action">
							 加油费(元)：
							<text class="text-black">{{dispatchOrder.jy_fee}}</text>
						</view>
					</view>
					<view class="cu-bar bg-white solid-bottom" v-if="dispatchOrder.gl_fee > 0">
						<view class="action">
							<text class="cuIcon-title text-orange"></text> 过路费(元)：
							<text class="text-black">{{dispatchOrder.gl_fee}}</text>
						</view>
					</view>
					<view class="cu-bar bg-white solid-bottom" v-if="dispatchOrder.xc_fee > 0">
						<view class="action">
							 洗车费(元)：
							<text class="text-black">{{dispatchOrder.xc_fee}}</text>
						</view>
					</view>
					<view class="cu-bar bg-white solid-bottom" v-if="dispatchOrder.clzy_fee > 0">
						<view class="action">
							 车辆占用费(元)：
							<text class="text-black">{{dispatchOrder.clzy_fee}}</text>
						</view>
					</view>
					<view class="cu-bar bg-white solid-bottom" v-if="dispatchOrder.other_fee > 0">
						<view class="action">
							 其它费用(元)：
							<text class="text-black">{{dispatchOrder.other_fee}}</text>
						</view>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
		
		<view class="cu-modal" :class="showMileageModal?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">修改里程数</view>
					<view class="action" @tap="hideMileageModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view>
					<view class="cu-form-group" style="text-align: left;">
						<textarea type="number" min="0" :value="fillMileage" @input="fillMileageInput"></textarea>
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-bluelight text-green" @tap="hideMileageModal">取消</button>
						<button class="cu-btn bg-linear-blue margin-left" @tap="sureMileageModal">确定</button>
		
					</view>
				</view>
			</view>
		</view>
		
		<view class="cu-modal" :class="showDaysModal?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">修改用车天数</view>
					<view class="action" @tap="hideDaysModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view>
					<view class="cu-form-group" style="text-align: left;">
						<textarea type="number" min="0" :value="fillDays" @input="fillDaysInput"></textarea>
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-bluelight text-green" @tap="hideDaysModal">取消</button>
						<button class="cu-btn bg-linear-blue margin-left" @tap="sureDaysModal">确定</button>
		
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import uniCollapse from '@/colorui/components/uni-collapse.vue'
	import uniCollapseItem from '@/colorui/components/uni-collapse-item.vue'
	import misEnum from '../../common/mis-enum.js';
	export default {
		components: {
			uniCollapse,
			uniCollapseItem
		},
		data() {
			return {
				stars: [1, 2, 3, 4, 5],
				info: {},
				list: [],
				fillMileage: 0,
				showMileageModal: false,
				orderIndex: 0,
				fillDays: 0,
				showDaysModal: false
			}
		},
		onLoad(option) {
			var info = JSON.parse(decodeURIComponent(option.para));
			this.info = info;
			//获取派车单
			if (this.info.status >= 2) {
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
			getTitle: function(totalFee) {
				return "总费用(元)：" + totalFee;
			},
			getStatusStr: function(status) {
				return misEnum.DispatchRecordEnumMap.get(status);
			},
			sureSettle: function(order){
				uni.showModal({
					title: '提示',
					content: '确认结算该派车单？',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if(res.cancel) return;
						uni.showLoading({
							title: '提交中',
							mask: false
						});
						global.$http.post('/car/dispatch/sureAccount', {
							params: {
								dispatch_id: order.id
							},
						}).then(res => {
							uni.hideLoading();
							if (res.status === "0") {
								uni.showToast({
									title: "提交成功",
									icon: 'none'
								});
								//设置状态
								this.list.forEach(c=>{
									if(c.id == order.id){
										c.status = 4;
										return;
									}
								});
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
					fail: () => {},
					complete: () => {}
				});
			},
			hideDaysModal: function(){
				this.showDaysModal = false;
			},
			fillDaysInput: function(e){
				this.fillDays = e.detail.value;
			},
			sureDaysModal:function(){
				if(this.fillDays < 0){
					uni.showToast({
						title: "用车天数不能小于0",
						icon: 'none'
					});
					return;
				}
				this.showDaysModal = false;
				uni.showLoading({
					title: '提交中',
					mask: false
				});
				var order = this.list[this.orderIndex];
				global.$http.post('/car/dispatch/update', {
					params: {
						id: order.id,
						days: this.fillDays,
						stop_num: order.stop_num
					},
				}).then(res => {
					uni.hideLoading();
					if (res.status === "0") {
						order.days = this.fillDays;
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
			hideMileageModal: function(){
				this.showMileageModal = false;
			},
			fillMileageInput: function(e){
				this.fillMileage = e.detail.value;
			},
			sureMileageModal:function(){
				if(this.fillMileage < 0){
					uni.showToast({
						title: "里程数不能小于0",
						icon: 'none'
					});
					return;
				}
				this.showMileageModal = false;
				uni.showLoading({
					title: '提交中',
					mask: false
				});
				var order = this.list[this.orderIndex];
				global.$http.post('/car/dispatch/update', {
					params: {
						id: order.id,
						days: order.days,
						stop_num: this.fillMileage
					},
				}).then(res => {
					uni.hideLoading();
					if (res.status === "0") {
						order.stop_num = this.fillMileage;
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
			editMileage: function(index){
				this.orderIndex = index;
				this.fillMileage = this.list[index].stop_num;
				this.showMileageModal = true;
			},
			editDays: function(index){
				this.orderIndex = index;
				this.fillDays = this.list[index].days;
				this.showDaysModal = true;
			}
		}
	}
</script>

<style>
</style>
