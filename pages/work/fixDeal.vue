<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">

			<block slot="content">精后勤处理</block>
		</cu-custom>

		<form>
		
			<view class="cu-bar bg-white margin-top-xs">
				<view class="action">
					<view class="title title-required">照片上传</view>
				</view>
				<view class="action">
					{{para.imgs.length}}/4
				</view>
			</view>
			
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in para.imgs" :key="index" :data-url="para.imgs[index]">
						<image :src="para.imgs[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="para.imgs.length<4">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-linear-blue margin-tb-sm lg" @click="Submit">提交</button>
			</view>
		</form>

	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import misEnum from '../../common/mis-enum.js';
	export default {
		onLoad(option) {
			this.para.id = option.id;
		},
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				ScreenHeight: this.ScreenHeight,
				
				para: {
					imgs: []
				}
			}
		},
		methods: {
			ChooseImage: function() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res) => {
						//上传图片
						uni.showLoading({
							title: '上传图片中',
							mask: false
						});
						global.$http.upload('/oos/upload', {
							name: 'file',
							filePath: res.tempFilePaths[0]
						}).then(res => {
							uni.hideLoading();
							if (res.status === "0") {
								this.para.imgs.push(res.data);
								uni.showToast({
									icon: 'none',
									title: '上传成功'
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
					}
				});
			},
			DelImg: function(e) {
				// global.$http.post('/oos/delete', {
				// 	params: {
				// 		url: this.para.imgs[e]
				// 	},
				// }).then(res => {
				// 	var tmp = res;
				// }).catch(err => {
				// 	uni.showToast({
				// 		title: err.message,
				// 		icon: 'none'
				// 	});
				// });
				this.para.imgs.splice(e.currentTarget.dataset.index, 1);
			},
			Submit: function(e) {
				//验证数据
				if (this.para.imgs.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请上传照片'
					});
					return;
				}

				//提交数据
				uni.showLoading({
					title: '提交中',
					mask: false
				});
				global.$http.post('/thing/service/deal', {
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
	.building-list-modal {
		z-index: 10000;
	}

	.building-list-modal .cu-dialog {
		height: 100vh;
	}

	.building-list-modal.cu-modal.show #list-view {
		overflow-x: hidden;
		overflow-y: scroll;
		pointer-events: auto;
	}
</style>
