<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="content">会议预定服务评价</block>
		</cu-custom>

		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 环境：
				<text v-for="(item,key) in environmentStars" :key="key"
					:class="item.value ? 'cuIcon-favorfill text-yellow' : 'cuIcon-favor text-gray'"
					@tap="tapEnvironmentStar(key)"></text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 服务：
				<text v-for="(item,key) in serviceStars" :key="key"
					:class="item.value ? 'cuIcon-favorfill text-yellow' : 'cuIcon-favor text-gray'"
					@tap="tapServiceStar(key)"></text>
			</view>
		</view>

		<view class="cu-form-group align-start cu-bar" style="padding-left: 0upx;">
			<view class="title action">
				<text class="cuIcon-title text-orange"></text>评价：
			</view>
			<textarea maxlength="-1" @input="textareaInput" placeholder="请输入"></textarea>
		</view>

		<view class="padding flex flex-direction">
			<button class="cu-btn bg-linear-blue margin-tb-sm lg" @click="Submit">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				environmentStars: [{value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}],
				serviceStars: [{value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}],
				para: {
					id: 0,
					fw_score: 0,
					hj_score: 0,
					message: ""
				}
			}
		},
		onLoad(option) {
			if(option){
				var info = JSON.parse(decodeURIComponent(option.para));
				this.para.id = info.id;
			}
		},
		methods: {
			setEnvironmentStar(){
				this.environmentStars.forEach((c, index) => {
					if (index < this.para.hj_score)
						c.value = 1;
					else
						c.value = 0;
				});
			},
			setServiceStar(){
				this.serviceStars.forEach((c, index) => {
					if (index < this.para.fw_score)
						c.value = 1;
					else
						c.value = 0;
				});
			},
			tapEnvironmentStar: function(e) {
				this.para.hj_score = e + 1;
				this.setEnvironmentStar();
			},
			tapServiceStar: function(e) {
				this.para.fw_score = e + 1;
				this.setServiceStar();
			},
			textareaInput: function(e) {
				this.para.message = e.detail.value;
			},
			Submit: function(){
				if(this.para.hj_score < 1){
					uni.showToast({
						title: "请对环境评分",
						icon: 'none'
					});
					return;
				}
				if(this.para.fw_score < 1){
					uni.showToast({
						title: "请对服务评分",
						icon: 'none'
					});
					return;
				}
				uni.showLoading({
					title: '提交中',
					mask: false
				});
				global.$http.post('/meeting/record/appraised', {
					params: this.para,
				}).then(res => {
					uni.hideLoading();
					if (res.status === "0") {
						uni.showToast({
							title: "提交成功",
							icon: 'none'
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
