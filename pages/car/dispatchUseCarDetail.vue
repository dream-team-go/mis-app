<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">派车单</block>
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
					<text class="cuIcon-title text-orange"></text> 派车单{{index+1}} <text class="text-orange text-bold margin-left">{{getStatusStr(dispatchOrder.status)}}</text>
				</view>
				<view class="action" v-if="dispatchOrder.status == 4 && dispatchOrder.is_appraise == 0">
					<button class="cu-btn bg-orange shadow" @tap="appraise(dispatchOrder)">评价</button>
				</view>
			</view>

			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-orange"></text> 乘车人数：
					<text class="text-bold">{{dispatchOrder.people_num}}</text>
				</view>
			</view>
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-orange"></text> 车辆：
					<text class="text-bold">{{dispatchOrder.brand + " " + dispatchOrder.color + " " + dispatchOrder.seat_num + "座" + " " + dispatchOrder.car_number}}</text>
				</view>
			</view>
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-orange"></text> 司机：
					<text class="text-bold">{{dispatchOrder.driver_name + "("+ dispatchOrder.driver_phone +")"}}</text>
				</view>
			</view>
			<view class="cu-bar bg-white solid-bottom" v-if="dispatchOrder.bak">
				<view class="action">
					<text class="cuIcon-title text-orange"></text> 备注：
					<text class="text-bold">{{dispatchOrder.bak}}</text>
				</view>
			</view>
			<view class="cu-bar bg-white solid-bottom" v-if="dispatchOrder.is_appraise == 1">
				<view class="action">
					<text class="cuIcon-title text-orange"></text> 评分：
					<text v-for="(value,key) in stars" :key="key" :class="key < dispatchOrder.appraise_grade ? 'cuIcon-favorfill text-yellow' : 'cuIcon-favor text-gray'"></text>
				</view>
			</view>
			<view class="cu-bar bg-white solid-bottom" v-if="dispatchOrder.is_appraise == 1 && dispatchOrder.appraise_contnet">
				<view class="action">
					<text class="cuIcon-title text-orange"></text> 评价内容：
					<text class="text-bold">{{dispatchOrder.bak}}</text>
				</view>
			</view>
			<uni-collapse v-if="dispatchOrder.status > 2">
				<uni-collapse-item :title="getTitle(dispatchOrder.total_fee)">
					<view class="cu-bar bg-white solid-bottom">
						<view class="action">
							<text class="cuIcon-title text-orange"></text> 里程费(元)：
							<text class="text-bold">{{dispatchOrder.stop_price}}/公里 x {{dispatchOrder.stop_num}}公里 = {{dispatchOrder.stop_price * dispatchOrder.stop_num}}</text>
						</view>
					</view>
					<view class="cu-bar bg-white solid-bottom" v-if="dispatchOrder.zs_fee > 0">
						<view class="action">
							<text class="cuIcon-title text-orange"></text> 住宿费(元)：
							<text class="text-bold">{{dispatchOrder.zs_fee}}</text>
						</view>
					</view>
					<view class="cu-bar bg-white solid-bottom" v-if="dispatchOrder.tc_fee > 0">
						<view class="action">
							<text class="cuIcon-title text-orange"></text> 停车费(元)：
							<text class="text-bold">{{dispatchOrder.tc_fee}}</text>
						</view>
					</view>
					<view class="cu-bar bg-white solid-bottom" v-if="dispatchOrder.hs_fee > 0">
						<view class="action">
							<text class="cuIcon-title text-orange"></text> 伙食费(元)：
							<text class="text-bold">{{dispatchOrder.hs_fee}}</text>
						</view>
					</view>
					<view class="cu-bar bg-white solid-bottom" v-if="dispatchOrder.jy_fee > 0">
						<view class="action">
							<text class="cuIcon-title text-orange"></text> 加油费(元)：
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
							<text class="cuIcon-title text-orange"></text> 洗车费(元)：
							<text class="text-bold">{{dispatchOrder.xc_fee}}</text>
						</view>
					</view>
					<view class="cu-bar bg-white solid-bottom" v-if="dispatchOrder.clzy_fee > 0">
						<view class="action">
							<text class="cuIcon-title text-orange"></text> 车辆占用费(元)：
							<text class="text-bold">{{dispatchOrder.clzy_fee}}</text>
						</view>
					</view>
					<view class="cu-bar bg-white solid-bottom" v-if="dispatchOrder.other_fee > 0">
						<view class="action">
							<text class="cuIcon-title text-orange"></text> 其它费用(元)：
							<text class="text-bold">{{dispatchOrder.other_fee}}</text>
						</view>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
		
		<view class="cu-modal" :class="showModal?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">评价</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view>
					<view class="cu-form-group" style="text-align: left;">
						<text v-for="(value,key) in stars" :key="key" :class="key < para.appraise_grade ? 'cuIcon-favorfill text-yellow' : 'cuIcon-favor text-gray'" @tap="chooseStar(value)"></text>
					</view>
				</view>
				<view>
					<view class="cu-form-group" style="text-align: left;">
						<textarea maxlength="100" @input="fillAppraise" placeholder="评价内容"></textarea>
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="sureModal">确定</button>
		
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
				info: {},
				list: [],
				showModal: false,
				stars: [1, 2, 3, 4, 5],
				para:{
					dispatch_id: 0,
					appraise_grade: 0,
					appraise_contnet: ""
				}
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
			appraise: function(order){
				this.para.dispatch_id = order.id;
				this.para.appraise_grade = 0;
				this.para.appraise_contnet = "";
				this.showModal = true;
			},
			hideModal: function(){
				this.showModal = false;
			},
			fillAppraise: function(e){
				this.para.appraise_contnet = e.detail.value;
			},
			chooseStar: function(e) { //点击评星
			    this.para.appraise_grade = e;
			},
			sureModal:function(){
				if(this.para.appraise_grade <= 0){
					uni.showToast({
						title: "请评分",
						icon: 'none'
					});
					return;
				}
				this.showModal = false;
				//提交评分内容
				uni.showLoading({
					title: '提交中',
					mask: false
				});
				global.$http.post('/car/dispatch/saveAppraise', {
					params: this.para,
				}).then(res => {
					uni.hideLoading();
					if (res.status === "0") {
						uni.showToast({
							icon: 'none',
							title: '提交成功'
						});
						//设置评价状态
						this.list.forEach(c=>{
							if(c.id == this.para.dispatch_id){
								c.is_appraise = 1;
								c.appraise_grade = this.para.appraise_grade;
								c.appraise_contnet = this.para.appraise_contnet;
							}
						})
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
