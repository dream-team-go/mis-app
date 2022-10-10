<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">

			<block slot="content">{{isAdd ? '发布寻物启事' : '编辑寻物启事'}}</block>
		</cu-custom>

		<form>
		
			<view class="cu-bar bg-white margin-top-xs">
				<view class="action">
					<view class="title">照片上传</view>
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
			
			<view class="cu-form-group">
				<view class="title title-required">物品信息</view>
				<input name="input" v-model="para.thing_info" ></input>
			</view>

			<view class="cu-form-group">
				<view class="title title-required">联系电话</view>
				<input name="input" v-model="para.tel" ></input>
			</view>
			
			<view class="cu-form-group">
				<view class="title">遗失地点</view>
				<input name="input" v-model="para.lost_place" ></input>
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
	import uniLoadMore from '@/colorui/components/uni-load-more.vue';
	import misEnum from '../../common/mis-enum.js';
	export default {
		components: {
			uniLoadMore
		},
		onLoad(option) {
			if (option.para) {
				var info = JSON.parse(decodeURIComponent(option.para));
				this.isAdd = false;
				this.para.id = info.id;
				this.para.tel = info.tel;
				this.para.lost_place = info.lost_place;
				this.para.thing_info = info.thing_info;
				//设置照片
				for (let s of info.imgs) {
					this.para.imgs.push(s.img_url);
				}
			}
			else{
				this.para.tel = this.userInfo.user.username;
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		data() {
			return {
				isAdd: true,
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				ScreenHeight: this.ScreenHeight,
				
				page: 1,
				pageSize: 100,
				status: 'more',
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				para: {
					thing_info: "",
					lost_place: "",
					tel: "",
					imgs: []
				}
			}
		},
		methods: {
			
			ChangeThings: function(e) {
				this.thingIndex = e.detail.value;
				this.para.thing_info = this.thingCodes[e.detail.value];
			},
			ChooseImage: function() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res) => {
						//上传图片
						uni.showLoading({
							title: '上传图片中',
							mask: false
						});
						//压缩图片
						uni.compressImage({
						  src: res.tempFilePaths[0],
						  quality: 50,
						  success: res => {
							  //上传图片
							  global.$http.upload('/oos/upload', {
							  	name: 'file',
							  	filePath: res.tempFilePath
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
				// if (this.para.imgs.length <= 0) {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '请上传照片'
				// 	});
				// 	return;
				// }
				if (!this.para.thing_info) {
					uni.showToast({
						icon: 'none',
						title: '请填写物品信息'
					});
					return;
				}
				if (this.para.tel <= 0) {
					uni.showToast({
						icon: 'none',
						title: '联系电话必填'
					});
					return;
				}

				//提交数据
				uni.showLoading({
					title: '提交中',
					mask: false
				});
				global.$http.post('/thing/find/save', {
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
