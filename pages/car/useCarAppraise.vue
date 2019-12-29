<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">用车评价</block>
		</cu-custom>
		<form>
			<view class='cu-form-group feedback-title feedback-star-view'>
			    <text>评价分数</text>
			     <text v-for="(value,key) in stars" :key="key" :class="key < para.appraise_grade ? 'cuIcon-favorfill text-yellow' : 'cuIcon-favor text-gray'" @tap="chooseStar(value)"></text>
			</view>
			<view class="cu-form-group">
				<view class="title">评价内容</view>
				<input name="input" v-model="para.zs_fee"></input>
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
				info: {},
				stop_num: 0,
				stop_price: 0,
				stars: [1, 2, 3, 4, 5],
				para: {
					dispatch_id: this.info.id,
					appraise_grade: 0,
					appraise_contnet: ""
				}
			}
		},
		onLoad(option) {
			var info = JSON.parse(decodeURIComponent(option.para));
			this.info = info;
		},
		methods: {
			chooseStar: function(e) { //点击评星
			    this.para.appraise_grade = e;
			},
			Submit: function(e){
				this.para.total_fee = this.total_fee;
				//提交数据
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
