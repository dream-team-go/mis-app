<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
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
			<view class="cu-item arrow border solid-top" v-for="(repairItem,index) in para.items" :key="repairItem.id">
				<view class="cu-form-group">
					<view class="title">{{index+1}}. 维修项目</view>
					<input name="input" v-model="para.items[index].item_name"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">工时费(元)</view>
					<input name="input" type="number" v-model="para.items[index].item_fee"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">备注</view>
					<input name="input" v-model="para.items[index].remark"></input>
				</view>
			</view>

			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange"></text> 维修配件
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">配件种类</view>
				<picker @change="ChangePartNumber" :value="partIndex" :range="partNumbers">
					<view class="picker">
						{{partNumbers[partIndex]}}
					</view>
				</picker>
			</view>
			<view class="cu-item arrow border solid-top" v-for="(partItem,index) in para.parts" :key="partItem.id">
				<view class="cu-form-group">
					<view class="title">{{index+1}}. 配件</view>
					<input name="input" v-model="para.parts[index].parts_name"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">单价(元)</view>
					<input name="input" type="number" v-model="para.parts[index].price"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">数量</view>
					<input name="input" type="number" v-model="para.parts[index].num"></input>
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
				numbers: [0, 1, 2, 3, 4, 5],
				partIndex: 0,
				partNumbers: [0, 1, 2, 3, 4, 5],
				info: {},
				para: {
					order_code: "",
					items: [],
					parts: []
				}
			}
		},
		onLoad(option) {
			var info = JSON.parse(decodeURIComponent(option.para));
			this.info = info;
			this.para.order_code = info.order_code;
			//获取维修单信息
			if (this.info.status == 3) {
				global.$http.post('/car/repair/repairInfo', {
					params: {
						order_code: this.info.order_code
					},
				}).then(res => {
					if (res.status === "0") {
						this.para.items.length = 0;
						res.data.items.forEach(c => {
							this.para.items.push({
								item_name: c.item_name,
								item_fee: c.item_fee,
								remark: c.remark
							});
						});
						this.numberIndex = res.data.items.length;

						this.para.parts.length = 0;
						res.data.parts.forEach(c => {
							this.para.parts.push({
								parts_name: c.parts_name,
								num: c.num,
								price: c.price
							});
						});
						this.partIndex = res.data.parts.length;
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
			ChangeNumber: function(e) {
				this.numberIndex = Number(e.detail.value);
				var orderCount = this.para.items.length;
				if (orderCount > this.numberIndex) {
					this.para.items.length = this.numberIndex;
				} else if (orderCount < this.numberIndex) {
					for (var i = 0; i < this.numberIndex - orderCount; i++) {
						this.para.items.push({
							item_name: "",
							item_fee: "",
							remark: ""
						});
					}
				}
			},
			ChangePartNumber: function(e) {
				this.partIndex = Number(e.detail.value);
				var orderCount = this.para.parts.length;
				if (orderCount > this.partIndex) {
					this.para.parts.length = this.partIndex;
				} else if (orderCount < this.partIndex) {
					for (var i = 0; i < this.partIndex - orderCount; i++) {
						this.para.parts.push({
							parts_name: "",
							num: "",
							price: ""
						});
					}
				}
			},
			Submit: function(e) {
				//验证数据
				for (var i = 0; i < this.para.items.length; i++) {
					var item = this.para.items[i];
					if (item.item_name.length <= 0) {
						uni.showToast({
							icon: 'none',
							title: '维修项目' + (i + 1) + '：不能为空'
						});
						return;
					}
					if (item.item_fee.length <= 0) {
						uni.showToast({
							icon: 'none',
							title: '维修项目' + (i + 1) + '：工时费不能为空'
						});
						return;
					}
				}
				for (var i = 0; i < this.para.parts.length; i++) {
					var part = this.para.parts[i];
					if (part.parts_name.length <= 0) {
						uni.showToast({
							icon: 'none',
							title: '配件' + (i + 1) + '：不能为空'
						});
						return;
					}
					if (part.price.length <= 0) {
						uni.showToast({
							icon: 'none',
							title: '配件' + (i + 1) + '：单价不能为空'
						});
						return;
					}
					if (part.num.length <= 0) {
						uni.showToast({
							icon: 'none',
							title: '配件' + (i + 1) + '：数量不能为空'
						});
						return;
					}
				}
				if(this.para.items.length == 0 && this.para.parts.length == 0){
					uni.showToast({
						icon: 'none',
						title: '维修项目和配件不能都为空'
					});
					return;
				}
				//提交数据
				uni.showLoading({
					title: '提交中',
					mask: false
				});
				global.$http.post('/car/repair/createRepairOrder', {
					header: {
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
