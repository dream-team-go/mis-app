<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">维修单</block>
		</cu-custom>
		<form>
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-orange"></text> 维修项目
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">维修项目数量</view>
				<picker @change="ChangeNumber" :value="numberIndex" :range="numbers">
					<view class="picker">
						{{numbers[numberIndex]}}
					</view>
				</picker>
			</view>
			<view class="cu-item arrow border" v-for="(repairItem,index) in para.item" :key="repairItem.id">
				<view class="cu-form-group">
					<view class="title">维修项目{{index+1}}</view>
					<input name="input" v-model="para.item[index].item_name"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">工时费</view>
					<input name="input" v-model="para.item[index].item_fee"></input>
				</view>
				<!-- <view class="cu-form-group">
					<view class="title">备注</view>
					<input name="input" v-model="para.item[index].remark"></input>
				</view> -->
			</view>
			
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-orange"></text> 维修配件
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">配件种类数量</view>
				<picker @change="ChangePartNumber" :value="partIndex" :range="partNumbers">
					<view class="picker">
						{{partNumbers[partIndex]}}
					</view>
				</picker>
			</view>
			<view class="cu-item arrow border" v-for="(partItem,index) in para.parts" :key="partItem.id">
				<view class="cu-form-group">
					<view class="title">配件{{index+1}}</view>
					<input name="input" v-model="para.parts[index].parts_name"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">数量</view>
					<input name="input" type="number" v-model="para.parts[index].num"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">单价</view>
					<input name="input" type="number" v-model="para.parts[index].price"></input>
				</view>
			</view>
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-orange margin-tb-sm lg" @click="Submit">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				numberIndex: 0,
				numbers: [1, 2, 3, 4, 5],
				partIndex: 0,
				partNumbers: [1, 2, 3, 4, 5],
				info:{},
				para: {
					apply_id: "",
					item: [{
						item_name: "",
						item_fee: "",
						remark: ""
					}],
					parts:[{
						parts_name: "",
						num: "",
						price: ""
					}]
				}
			}
		},
		onLoad(option){
			var info = JSON.parse(decodeURIComponent(option.para));
			this.info = info;
			this.para.apply_id = info.id;
			//获取维修单信息
			// if(this.info.status >= 3){
			// 	global.$http.post('/car/dispatch/getListByDispatch', {
			// 		params: {
			// 			order_code: this.info.order_code
			// 		},
			// 	}).then(res => {
			// 		if (res.status === "0") {
			// 			this.para.item.length = 0;
			// 			res.data.forEach(c=>{
			// 				this.para.item.push({
			// 					car_id: c.car_id,
			// 					car_number: c.car_number,
			// 					brand: c.brand,
			// 					color: c.color,
			// 					seat_num: c.seat_num,
			// 					people_num: c.people_num,
			// 					driver_id: c.driver_id,
			// 					driver_name: c.driver_name,
			// 					driver_phone: c.driver_phone,
			// 					bak: c.bak
			// 				});
			// 			});
			// 			this.numberIndex = res.data.length - 1;
			// 		} else {
			// 			uni.showToast({
			// 				title: res.msg,
			// 				icon: 'none'
			// 			});
			// 		}
			// 	}).catch(err => {
			// 		uni.showToast({
			// 			title: err.message,
			// 			icon: 'none'
			// 		});
			// 	});
			// }
		},
		methods: {
			ChangeNumber: function(e) {
				this.numberIndex = Number(e.detail.value);
				var orderCount = this.para.item.length;
				if (orderCount > this.numberIndex + 1) {
					this.para.item.length = this.numberIndex + 1;
				} else if (orderCount < this.numberIndex + 1) {
					for (var i = 0; i < this.numberIndex + 1 - orderCount; i++) {
						this.para.item.push({
							item_name: "",
							item_fee: "",
							remark: ""
						});
					}
				}
			},
			ChangePartNumber: function(e){
				this.partIndex = Number(e.detail.value);
				var orderCount = this.para.parts.length;
				if (orderCount > this.partIndex + 1) {
					this.para.parts.length = this.partIndex + 1;
				} else if (orderCount < this.partIndex + 1) {
					for (var i = 0; i < this.partIndex + 1 - orderCount; i++) {
						this.para.parts.push({
							parts_name: "",
							num: "",
							price: ""
						});
					}
				}
			},
			Submit: function(e){
				var totalCount = 0;
				//验证数据
				for (var i = 0; i < this.para.item.length; i++) {
					var dispatch = this.para.item[i];
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
</style>
