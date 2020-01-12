<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">派车单</block>
		</cu-custom>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 用车人数：
				<text class="text-bold">{{info.people_num}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 派车数量：
				<text class="text-bold">{{list.length}}辆</text>
			</view>
		</view>

		<view class="cu-item arrow margin-top" v-for="(dispatchOrder,index) in list" :key="dispatchOrder.id">
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					 派车单{{index+1}} <text class="text-orange text-bold margin-left">{{getStatusStr(dispatchOrder.status)}}</text>
				</view>
				<view class="action" v-if="dispatchOrder.status == 3">
					<button class="cu-btn bg-green shadow" @tap="sureSettle(dispatchOrder)">确认结算</button>
				</view>
			</view>

			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					 乘车人数：
					<text class="text-bold">{{dispatchOrder.people_num}}</text>
				</view>
			</view>
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					 车辆：
					<text class="text-bold">{{dispatchOrder.brand + " " + dispatchOrder.color + " " + dispatchOrder.seat_num + "座" + " " + dispatchOrder.car_number}}</text>
				</view>
			</view>
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					 司机：
					<text class="text-bold">{{dispatchOrder.driver_name + "("+ dispatchOrder.driver_phone +")"}}</text>
				</view>
			</view>
			<view class="cu-bar bg-white solid-bottom" v-if="dispatchOrder.bak.length > 0">
				<view class="action">
					 备注：
					<text class="text-bold">{{dispatchOrder.bak}}</text>
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
					<text class="text-bold">{{dispatchOrder.bak}}</text>
				</view>
			</view>
			<uni-collapse v-if="dispatchOrder.status > 2">
				<uni-collapse-item :title="getTitle(dispatchOrder.total_fee)">
					<view class="cu-bar bg-white solid-bottom">
						<view class="action">
							 里程费(元)：
							<text class="text-bold">{{dispatchOrder.stop_price}}/公里 x {{dispatchOrder.stop_num}}公里 = {{dispatchOrder.stop_price * dispatchOrder.stop_num}}</text>
						</view>
					</view>
					<view class="cu-bar bg-white solid-bottom" v-if="dispatchOrder.zs_fee > 0">
						<view class="action">
							 住宿费(元)：
							<text class="text-bold">{{dispatchOrder.zs_fee}}</text>
						</view>
					</view>
					<view class="cu-bar bg-white solid-bottom" v-if="dispatchOrder.tc_fee > 0">
						<view class="action">
							 停车费(元)：
							<text class="text-bold">{{dispatchOrder.tc_fee}}</text>
						</view>
					</view>
					<view class="cu-bar bg-white solid-bottom" v-if="dispatchOrder.hs_fee > 0">
						<view class="action">
							 伙食费(元)：
							<text class="text-bold">{{dispatchOrder.hs_fee}}</text>
						</view>
					</view>
					<view class="cu-bar bg-white solid-bottom" v-if="dispatchOrder.jy_fee > 0">
						<view class="action">
							 加油费(元)：
							<text class="text-bold">{{dispatchOrder.jy_fee}}</text>
						</view>
					</view>
					<view class="cu-bar bg-white solid-bottom" v-if="dispatchOrder.gl_fee > 0">
						<view class="action">
							<text class="cuIcon-title text-orange"></text> 过路费(元)：
							<text class="text-bold">{{dispatchOrder.gl_fee}}</text>
						</view>
					</view>
					<view class="cu-bar bg-white solid-bottom" v-if="dispatchOrder.xc_fee > 0">
						<view class="action">
							 洗车费(元)：
							<text class="text-bold">{{dispatchOrder.xc_fee}}</text>
						</view>
					</view>
					<view class="cu-bar bg-white solid-bottom" v-if="dispatchOrder.clzy_fee > 0">
						<view class="action">
							 车辆占用费(元)：
							<text class="text-bold">{{dispatchOrder.clzy_fee}}</text>
						</view>
					</view>
					<view class="cu-bar bg-white solid-bottom" v-if="dispatchOrder.other_fee > 0">
						<view class="action">
							 其它费用(元)：
							<text class="text-bold">{{dispatchOrder.other_fee}}</text>
						</view>
					</view>
				</uni-collapse-item>
			</uni-collapse>
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
				list: []
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
			}
		}
	}
</script>

<style>
</style>
