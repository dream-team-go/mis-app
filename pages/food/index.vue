<template>
	<view>
		<scroll-view scroll-y class="page">
			<cu-custom bgColor="bg-linear-blue" :isBack="true">
				
				<block slot="content">订餐</block>
			</cu-custom>

			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action index-title">
					<image src="../../static/common/newIcon/food_record.png" class="title-ico"></image>
					<text class="text-lg text-black">订餐概况</text>
				</view>
				<!-- <view class="action"><button class="cu-btn bg-linear-blue shadow" @tap="toBookfood">预定</button></view> -->
			</view>

			<view class="cu-list grid no-border col-3">
				<view class="cu-item">
					<navigator hover-class="navigator-hover" url="../food/myFoodRecordList" open-type="navigate">
						<text class="text-color">{{ foodData.totalCount }}</text>
						<text>共预定</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator hover-class="navigator-hover" url="../food/myFoodRecordList?status=1" open-type="navigate">
						<text class="text-color">{{ foodData.successCount }}</text>
						<text>已确认</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator hover-class="navigator-hover" url="../food/myFoodRecordList?status=-1" open-type="navigate">
						<text class="text-color">{{ foodData.failCount }}</text>
						<text>驳回</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator hover-class="navigator-hover" url="../food/myFoodRecordList?status=-2" open-type="navigate">
						<text class="text-color">{{ foodData.cancleCount }}</text>
						<text>取消预定</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator hover-class="navigator-hover" url="../food/myFoodRecordList?status=0" open-type="navigate">
						<text class="text-color">{{ foodData.waitCheckCount }}</text>
						<text>待确认</text>
					</navigator>
				</view>
			</view>

			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action index-title">
					<image src="../../static/common/newIcon/food_clock.png" class="title-ico"></image>
					<text class="text-lg text-black">最近预定</text>
				</view>
			</view>
			<view class="card">
				<view class="item">
					<text class="title">包房</text>
					<text class="content">{{ foodData.status.length > 0 ? foodData.building_name + '(' + foodData.room_number + ')' : '无' }}</text>
				</view>
				<view class="item">
					<text class="title">开始时间</text>
					<text class="content">{{ foodData.status.length > 0 ? foodData.start_time : '无' }}</text>
				</view>
				<view class="item">
					<text class="title">结束时间</text>
					<text class="content">{{ foodData.status.length > 0 ? foodData.end_time : '无' }}</text>
				</view>
				<view class="item">
					<text class="title">预定时间</text>
					<text class="content">{{ foodData.status.length > 0 ? foodData.create_time : '无' }}</text>
				</view>
				<view class="item">
					<text class="title">状态</text>
					<text class="content">{{ foodData.status.length > 0 ? foodData.status : '无' }}</text>
				</view>
				<view class="reason-box">
					<view class="title">订餐原由</view>
					<view class="reason">{{ foodData.status.length > 0 ? foodData.desc : '无' }}</view>
				</view>
			</view>
			<view class="cu-tabbar-height"></view>
		</scroll-view>
	</view>
</template>

<script>
	import misEnum from '../../common/mis-enum.js';
export default {
	data() {
		return {
			foodData: {
				totalCount: '',
				successCount: '',
				cancleCount: '',
				failCount: '',
				waitCheckCount: '',
				desc: '',
				building_name: '',
				room_number: '',
				status: '',
				start_time: '',
				end_time: '',
				create_time: ''
			}
		};
	},
	onLoad() {
		uni.showLoading({
			title: '加载中',
			mask: false
		});
		//获取会务概览
		global.$http
			.post('/dining/record/myCountByStatus', {
				params: {}
			})
			.then(res => {
				if (res.status === '0') {
					this.foodData.totalCount = 0;
					this.foodData.successCount = 0;
					this.foodData.cancleCount = 0;
					this.foodData.failCount = 0;
					this.foodData.waitCheckCount = 0;
					var totalCount = 0;
					for (var i = 0; i < res.data.length; i++) {
						if (res.data[i].status === -2) {
							this.foodData.cancleCount = res.data[i].total;
						} else if (res.data[i].status === -1) {
							this.foodData.failCount = res.data[i].total;
						} else if (res.data[i].status === 0) {
							this.foodData.waitCheckCount = res.data[i].total;
						} else if (res.data[i].status === 1) {
							this.foodData.successCount = res.data[i].total;
						}
						totalCount += res.data[i].total;
					}
					this.foodData.totalCount = totalCount;
					uni.hideLoading();
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
				}
			})
			.catch(err => {
				uni.hideLoading();
				uni.showToast({
					title: err.message,
					icon: 'none'
				});
			});
		//获取最近预定
		global.$http
			.post('/dining/record/myLatelyRecord', {
				params: {}
			})
			.then(res => {
				if (res.status === '0') {
					if (res.data) {
						this.foodData.desc = res.data.desc;
						this.foodData.building_name = res.data.building_name;
						this.foodData.room_number = res.data.room_number;
						this.foodData.status = misEnum.FoodRecordEnumMap.get(res.data.status);
						this.foodData.start_time = res.data.start_time;
						this.foodData.end_time = res.data.end_time;
						this.foodData.create_time = res.data.create_time;
					}
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
				}
			})
			.catch(err => {
				uni.hideLoading();
				uni.showToast({
					title: err.message,
					icon: 'none'
				});
			});
	},
	methods: {
		toBookfood: function() {
			uni.navigateTo({
				url: '../food/selectTime'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
@import 'style/mystyle.scss';
.cu-list.grid>.cu-item .text-color {
		color: #FF4868;
		font-size: 34upx;
		font-weight: bold;
	}
</style>
