<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			
			<block slot="content">派车单</block>
		</cu-custom>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				</text> 用车人数：
				<text class="text-black">{{info.people_num}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				</text> 派车数量：
				<text class="text-black">{{list.length}}辆</text>
			</view>
		</view>

		<view class="cu-item arrow margin-top" v-for="(dispatchOrder,index) in list" :key="dispatchOrder.id">
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					</text> 派车单{{index+1}} <text class="text-orange text-black margin-left">{{getStatusStr(dispatchOrder.status)}}</text>
				</view>
			</view>

			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					</text> 乘车人数：
					<text class="text-black">{{dispatchOrder.people_num}}</text>
				</view>
			</view>
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					</text> 车辆：
					<text class="text-black">{{dispatchOrder.brand + " " + dispatchOrder.color + " " + dispatchOrder.seat_num + "座" + " " + dispatchOrder.car_number}}</text>
				</view>
			</view>
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					</text> 司机：
					<text class="text-black">{{dispatchOrder.driver_name + "("+ dispatchOrder.driver_phone +")"}}</text>
				</view>
			</view>
			<view class="cu-bar bg-white solid-bottom" v-if="dispatchOrder.bak.length > 0">
				<view class="action">
					</text> 备注：
					<text class="text-black">{{dispatchOrder.bak}}</text>
				</view>
			</view>
			<view class="cu-bar bg-white solid-bottom" v-if="dispatchOrder.is_appraise == 1">
				<view class="action">
					</text> 评分：
					<text v-for="(value,key) in stars" :key="key" :class="key < dispatchOrder.appraise_grade ? 'cuIcon-favorfill text-yellow' : 'cuIcon-favor text-gray'"></text>
				</view>
			</view>
			<view class="cu-bar bg-white solid-bottom" v-if="dispatchOrder.is_appraise == 1 && dispatchOrder.appraise_contnet.length > 0">
				<view class="action">
					</text> 评价内容：
					<text class="text-black">{{dispatchOrder.bak}}</text>
				</view>
			</view>
			<uni-collapse v-if="dispatchOrder.status > 2">
				<uni-collapse-item :title="getTitle(dispatchOrder.total_fee)">
					<view class="cu-bar bg-white solid-bottom">
						<view class="action">
							</text> 里程费(元)：
							<text class="text-black">{{dispatchOrder.stop_price}}/公里 x {{dispatchOrder.stop_num}}公里 = {{dispatchOrder.stop_price * dispatchOrder.stop_num}}</text>
						</view>
					</view>
					<view class="cu-bar bg-white solid-bottom" v-if="dispatchOrder.zs_fee > 0">
						<view class="action">
							</text> 住宿费(元)：
							<text class="text-black">{{dispatchOrder.zs_fee}}</text>
						</view>
					</view>
					<view class="cu-bar bg-white solid-bottom" v-if="dispatchOrder.tc_fee > 0">
						<view class="action">
							</text> 停车费(元)：
							<text class="text-black">{{dispatchOrder.tc_fee}}</text>
						</view>
					</view>
					<view class="cu-bar bg-white solid-bottom" v-if="dispatchOrder.hs_fee > 0">
						<view class="action">
							</text> 伙食费(元)：
							<text class="text-black">{{dispatchOrder.hs_fee}}</text>
						</view>
					</view>
					<view class="cu-bar bg-white solid-bottom" v-if="dispatchOrder.jy_fee > 0">
						<view class="action">
							</text> 加油费(元)：
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
							</text> 洗车费(元)：
							<text class="text-black">{{dispatchOrder.xc_fee}}</text>
						</view>
					</view>
					<view class="cu-bar bg-white solid-bottom" v-if="dispatchOrder.clzy_fee > 0">
						<view class="action">
							</text> 车辆占用费(元)：
							<text class="text-black">{{dispatchOrder.clzy_fee}}</text>
						</view>
					</view>
					<view class="cu-bar bg-white solid-bottom" v-if="dispatchOrder.other_fee > 0">
						<view class="action">
							</text> 其它费用(元)：
							<text class="text-black">{{dispatchOrder.other_fee}}</text>
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
			}
		}
	}
</script>

<style>
</style>
