<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="content">查看菜单</block>
		</cu-custom>
		<image :src="cd_img" style="width: 100%;height: 1000upx;"></image>
		<form>
			<view class="cu-form-group">
				<textarea maxlength="-1" @input="textareaInput" placeholder="菜单修改意见"></textarea>
			</view>
			
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-linear-blue margin-tb-sm lg" @click="Submit">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	import uniLoadMore from '@/colorui/components/uni-load-more.vue';
	import misEnum from '../../common/mis-enum.js';
	export default {
		components: {
			uniLoadMore
		},
		onLoad(option) {
			if(option.para){
				var info = JSON.parse(decodeURIComponent(option.para));
				this.para.record_id = info.id;
				this.cd_img = info.cd_img;
			}
		},
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				ScreenHeight: this.ScreenHeight,
				cd_img: "",
				para: {
					record_id: "",
					cd_message: ""
				}
			}
		},
		methods: {
			textareaInput: function(e) {
				this.para.cd_message = e.detail.value;
			},
			Submit: function(e) {
				//提交数据
				uni.showLoading({
					title: '提交中',
					mask: false
				});
				global.$http.post('/dining/record/sureCd', {
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
