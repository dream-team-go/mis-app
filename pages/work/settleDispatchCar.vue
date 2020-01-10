<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{isAdd ? '费用结算' : '修改费用'}}</block>
		</cu-custom>
		<form>
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-orange"></text> 里程费(元)：
					<text class="text-bold">{{stop_price}}/公里 x {{stop_num}}公里 = {{stop_price * stop_num}}</text>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">住宿费(元)</view>
				<input name="input" v-model="para.zs_fee"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">停车费(元)</view>
				<input name="input" v-model="para.tc_fee"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">伙食费(元)</view>
				<input name="input" v-model="para.hs_fee"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">加油费(元)</view>
				<input name="input" v-model="para.jy_fee"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">过路费(元)</view>
				<input name="input" v-model="para.gl_fee"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">洗车费(元)</view>
				<input name="input" v-model="para.xc_fee"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">车辆占用费(元)</view>
				<input name="input" v-model="para.clzy_fee"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">其它费用(元)</view>
				<input name="input" v-model="para.other_fee"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">总费用(元)</view>
				<input name="input" v-model="total_fee"></input>
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
				isAdd: true,
				info: {},
				stop_num: 0,
				stop_price: 0,
				para: {
					id: 0,
					zs_fee: 0,
					tc_fee: 0,
					hs_fee: 0,
					jy_fee: 0,
					gl_fee: 0,
					xc_fee: 0,
					clzy_fee: 0,
					other_fee: 0,
					total_fee: 0
				}
			}
		},
		onLoad(option) {
			var info = JSON.parse(decodeURIComponent(option.para));
			this.info = info;
			this.para.id = info.id;
			if (info.status > 2) {
				this.isAdd = false;
				this.para.zs_fee = info.zs_fee;
				this.para.tc_fee = info.tc_fee;
				this.para.hs_fee = info.hs_fee;
				this.para.jy_fee = info.jy_fee;
				this.para.gl_fee = info.gl_fee;
				this.para.xc_fee = info.xc_fee;
				this.para.clzy_fee = info.clzy_fee;
				this.para.other_fee = info.other_fee;
			} else {
				this.isAdd = true;
			}
			//确认归队
			global.$http.post('/car/dispatch/sureBack', {
				params: {
					dispatch_id: this.info.id
				},
			}).then(res => {
				if (res.status === "0") {
					//获取里程费用
					global.$http.post('/car/dispatch/getStop', {
						params: {
							dispatch_id: this.info.id
						},
					}).then(res => {
						if (res.status === "0") {
							this.stop_num = res.data.stop_num;
							this.stop_price = res.data.stop_price;
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
		computed: {
			total_fee: function() {
				return this.stop_price * this.stop_num + Number(this.para.zs_fee) + Number(this.para.tc_fee) + Number(this.para.hs_fee) + Number(this.para.jy_fee) +
					Number(this.para.xc_fee) + Number(this.para.clzy_fee) + Number(this.para.other_fee) + Number(this.para.gl_fee);
			}
		},
		methods: {
			Submit: function(e) {
				if(this.stop_price <= 0 || this.stop_num <= 0){
					uni.showToast({
						icon: 'none',
						title: '里程费不能小于0'
					});
					return;
				}
				this.para.total_fee = this.total_fee;
				//提交数据
				uni.showLoading({
					title: '提交中',
					mask: false
				});
				global.$http.post('/car/dispatch/feeTable', {
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
