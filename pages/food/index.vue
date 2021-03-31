<template>
	<view>
		<scroll-view scroll-y class="page">
			<cu-custom bgColor="bg-linear-blue" :isBack="true">
				
				<block slot="content">订餐</block>
			</cu-custom>
			
			<view class="cu-bar bg-white">
				<view class="action index-title">
					<image src="../../static/common/newIcon/food_record.png" class="title-ico"></image>
					<text class="text-lg text-black text-bold">订餐负责人</text>
				</view>
			</view>
			<view class="bg-white">
				<view style="color: #333333;height: 60upx;" v-for="item in chargePersons" :key="item.id">
					<text class="manager-xm">{{item.xm}}</text>
					<text class="manager-tel" @tap="makePhoneCall(item.tel)">
						<image src="../../static/common/phone.png" class="ico" style="width: 30upx;height: 30upx;vertical-align: middle;"></image>
						<text style="vertical-align: middle;">{{item.tel}}</text>
					</text>
					<text class="manager-office-tel" @tap="makePhoneCall(item.office_tel)">
						<image src="../../static/common/tel.png" class="ico" style="width: 30upx;height: 30upx;vertical-align: middle;"></image>
						<text style="vertical-align: middle;">{{item.office_tel}}</text>
					</text>
				</view>
			</view>

			<view class="cu-bar bg-white margin-top-xs">
				<view class="action index-title">
					<image src="../../static/common/newIcon/food_record.png" class="title-ico"></image>
					<text class="text-lg text-black text-bold">订餐概况</text>
				</view>
			</view>

			<view class="cu-list grid no-border col-3">
				<view class="cu-item">
					<navigator hover-class="navigator-hover" url="../food/myFoodRecordList" open-type="navigate">
						<text class="text-color">{{ foodData.totalCount }}</text>
						<text>全部</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator hover-class="navigator-hover" url="../food/myFoodRecordList?status=0" open-type="navigate">
						<text class="text-color">{{ foodData.waitCheckCount }}</text>
						<text>待确认</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator hover-class="navigator-hover" url="../food/myFoodRecordList?status=-2" open-type="navigate">
						<text class="text-color">{{ foodData.cancleCount }}</text>
						<text>取消预定</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator hover-class="navigator-hover" url="../food/myFoodRecordList?status=-1" open-type="navigate">
						<text class="text-color">{{ foodData.failCount }}</text>
						<text>驳回</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator hover-class="navigator-hover" url="../food/myFoodRecordList?status=-5" open-type="navigate">
						<text class="text-color">{{ foodData.inValidCount }}</text>
						<text>失效</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator hover-class="navigator-hover" url="../food/myFoodRecordList?status=1" open-type="navigate">
						<text class="text-color text-red">{{ foodData.successCount }}</text>
						<text>已确认</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator hover-class="navigator-hover" url="../food/myFoodRecordList?status=2" open-type="navigate">
						<text class="text-color">{{ foodData.finishCount }}</text>
						<text>订餐完成</text>
					</navigator>
				</view>
			</view>

			<view @tap="toDetail()">
				<view class="cu-bar bg-white margin-top-xs">
					<view class="action index-title">
						<image src="../../static/common/newIcon/food_clock.png" class="title-ico"></image>
						<text class="text-lg text-black text-bold">最近预定</text>
					</view>
					<view class="action index-title right" style="margin-right: 50upx;">
						<text class="text-lg text-blue" v-if="status == 2 && !fw_score">进行评价</text>
					</view>
				</view>
				<view class="card padding-left padding-right padding-bottom bg-white">
					<view class="item">
						<text class="title">订餐原由</text>
						<text class="content text-bold">{{ record.status.length > 0 ? record.desc : '无' }}</text>
					</view>
					<view class="item">
						<text class="title">楼房</text>
						<text class="content">{{ record.status.length > 0 ? record.building_name : '无' }}</text>
					</view>
					<view class="item">
						<text class="title">包房</text>
						<text class="content">{{ record.status.length > 0 ? record.room_number : '无' }}</text>
					</view>
					<view class="item">
						<text class="title">用餐日期</text>
						<text class="content">{{ record.status.length > 0 ? record.ydrq : '无' }}</text>
					</view>
					<view class="item">
						<text class="title">午/晚餐</text>
						<text class="content">{{ record.status.length > 0 ? record.ydsjd : '无' }}</text>
					</view>
					<view class="item">
						<text class="title">上菜时间</text>
						<text class="content">{{ record.status.length > 0 ? record.meal_time : '无' }}</text>
					</view>
					<view class="item">
						<text class="title">状态</text>
						<text class="content text-food">{{ record.status.length > 0 ? record.status : '无' }}</text>
					</view>
					<view class="item" v-if="record.status.length > 0 && record.cd_status != 0">
						<text class="title">菜单状态</text>
						<text class="content text-orange">{{ record.status.length > 0 ? record.cd_status : '无' }}</text>
					</view>
				</view>
			</view>
			
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
				inValidCount: '',
				finishCount: ''
			},
			record:{
				status: '',
				id: ''
			},
			fw_score: '',
			status: '',
			chargePersons: []
		};
	},
	onLoad() {
		
	},
	onShow() {
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
					this.foodData.inValidCount = 0;
					this.foodData.finishCount = 0;
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
						} else if (res.data[i].status === -5) {
							this.foodData.inValidCount = res.data[i].total;
						} else if (res.data[i].status === 2) {
							this.foodData.finishCount = res.data[i].total;
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
						this.fw_score = res.data.fw_score;
						this.status = res.data.status;
						this.record = res.data;
						this.record.status = misEnum.FoodRecordEnumMap.get(res.data.status);
						this.record.meal_time = res.data.meal_time.substring(11, 16);
						this.record.cd_status = misEnum.FoodMenuEnumMap.get(res.data.cd_status);
						this.record.ydrq = res.data.ydrq.substring(0, 10);
						this.record.ydsjd = res.data.ydsjd == "1" ? "午餐" : "晚餐";
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
		//获取订餐负责人信息
		global.$http
			.post('/chargePerson/getList', {
				params: {
					type: "dining",
					page: 1,
					pageSize: 2
				}
			})
			.then(res => {
				if (res.status === '0') {
					this.chargePersons = res.data.list;
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
				url: '../food/selectRoom'
			});
		},
		makePhoneCall: function(phone) {
			uni.makePhoneCall({
				phoneNumber: phone,
				success: () => {
					console.log("成功拨打电话")
				}
			})
		},
		toDetail: function(id){
			uni.navigateTo({
				url: '../food/foodRecordDetail?id=' + this.record.id
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
	.align-center{
		display: flex;justfy-content: center;align-items: center;
	}
	.card .item{
		line-height: 60upx;height: 60upx;
		display: flow-root;
	}
	
	.manager-xm{
		position: absolute;
		left: 65upx;
	}
	.manager-tel{
		position: absolute;
		left: 200upx;
	}
	.manager-office-tel{
		position: absolute;
		left: 480upx;
	}
</style>
