<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="content">食堂推荐</block>
		</cu-custom>
		<scroll-view scroll-y class="page bg-gray">
			<view class="nav-list">
				<navigator hover-class="none" class="nav-li" :style="[{backgroundImage:'url('+item.cp_img+')'}]" :class="'bg-'+item.color"
				 v-for="(item,index) in cpList" :key="item.id" @tap="tapCheckbox(item.id)">
					<text :class="item.isCheck ? 'cuIcon-squarecheckfill':'cuIcon-square'" class="lg text-linear-blue" ></text>
				</navigator>
			</view>
			<form>
				<view class="cu-form-group">
					<textarea maxlength="-1" v-model="para.cp_advise" @input="textareaInput" placeholder="菜品建议"></textarea>
				</view>
				
				<view class="padding flex flex-direction">
					<button class="cu-btn bg-linear-blue margin-tb-sm lg" @click="Submit">提交</button>
				</view>
			</form>
			<view class="cu-tabbar-height"></view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "basics",
		data() {
			return {
				para:{
					cp_advise: ""
				},
				cpList:[
					
				],
				selectedCpList:[]
			};
		},
		onShow() {
			
		},
		onLoad(option) {
			if(option.para){
				var info = JSON.parse(decodeURIComponent(option.para));
				this.para = info;
				if(this.para.id)
					this.selectedCpList = info.tjcps;
			}
			//获取推荐菜品
			uni.showLoading({
				title: '加载中',
				mask: false
			});
			global.$http.post('/dining/tjcp/getList', {
				params: {
					locked: 0,
					page: 1,
					pageSize: 1000
				},
			}).then(res => {
				uni.hideLoading();
				if (res.status === "0") {
					res.data.list.forEach(c=>{
						c.isCheck = false;
						this.selectedCpList.forEach(x=>{
							if(x.id == c.id)
							{
								c.isCheck = true;
								return;
							}
						});
					});
					this.cpList = res.data.list;
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
		methods:{
			tapCheckbox:function(e){
				this.cpList.forEach(c=>{
					if(c.id == e){
						c.isCheck = !c.isCheck;
					}
				});
			},
			textareaInput: function(e){
				this.para.cp_advise = e.detail.value;
			},
			Submit: function(e) {
				this.para.tjcps = [];
				this.cpList.forEach(c=>{
					if(c.isCheck)
						this.para.tjcps.push(c.id);
				});
				//提交数据
				uni.showLoading({
					title: '提交中',
					mask: false
				});
				global.$http.post('/dining/lead/' + (this.para.id ? 'update' : 'save'), {
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
						if(this.para.id){
							uni.navigateBack({
								delta: 3
							});
						}else{
							uni.reLaunch({
								url: '/pages/food/myLeaderBookFoodList'
							});
						}
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
	.nav-li{
		margin-bottom: 20upx;
		height: 300upx;
		padding: 5upx;
	}
	
	.nav-li::after{
		position: unset;
	}
	
	.nav-list{
		padding: 20upx 20upx 0px;
	}
	
	.nav-li uni-text{
		right: 10upx;
		bottom: 10upx;
		top: unset;
	}
</style>
