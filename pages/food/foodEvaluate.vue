<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="content">桌餐预定服务评价</block>
		</cu-custom>

		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 菜品：
				<text v-for="(item,key) in menuStars" :key="key"
					:class="item.value ? 'cuIcon-favorfill text-yellow' : 'cuIcon-favor text-gray'"
					@tap="tapMenuStar(key)"></text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 卫生：
				<text v-for="(item,key) in healthStars" :key="key"
					:class="item.value ? 'cuIcon-favorfill text-yellow' : 'cuIcon-favor text-gray'"
					@tap="tapHealthStar(key)"></text>
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

		<view class="cu-form-group cu-bar margin-top-xs">
			<textarea maxlength="-1" @input="textareaInput" placeholder="评价内容"></textarea>
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
				menuStars: [{value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}],
				healthStars: [{value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}],
				serviceStars: [{value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}],
				para: {
					id: 0,
					fw_score: 0,
					cp_score: 0,
					ws_score: 0,
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
			setMenuStar(){
				this.menuStars.forEach((c, index) => {
					if (index < this.para.cp_score)
						c.value = 1;
					else
						c.value = 0;
				});
			},
			setHealthStar(){
				this.healthStars.forEach((c, index) => {
					if (index < this.para.ws_score)
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
			tapMenuStar: function(e) {
				this.para.cp_score = e + 1;
				this.setMenuStar();
			},
			tapHealthStar: function(e) {
				this.para.ws_score = e + 1;
				this.setHealthStar();
			},
			tapServiceStar: function(e) {
				this.para.fw_score = e + 1;
				this.setServiceStar();
			},
			textareaInput: function(e) {
				this.para.message = e.detail.value;
			},
			Submit: function(){
				if(this.para.cp_score < 1){
					uni.showToast({
						title: "请对菜品评分",
						icon: 'none'
					});
					return;
				}
				if(this.para.ws_score < 1){
					uni.showToast({
						title: "请对卫生评分",
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
				global.$http.post('/dining/record/appraised', {
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
