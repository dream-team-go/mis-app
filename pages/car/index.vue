<template>
	<view>
		<scroll-view scroll-y class="page">
			<cu-custom bgColor="bg-linear-blue" :isBack="true">
				
				<block slot="content">用车</block>
			</cu-custom>

			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action index-title">
					<image src="../../static/common/newIcon/car_record.png" class="title-ico"></image>
					<text class="text-lg text-black">用车概况</text>
				</view>
			</view>

			<view class="cu-list grid no-border col-3">
				<view class="cu-item">
					<navigator hover-class="navigator-hover" url="../car/myCarRecordList" open-type="navigate">
						<text class="text-color">{{ carData.totalCount }}</text>
						<text>全部</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator hover-class="navigator-hover" url="../car/myCarRecordList?status=0" open-type="navigate">
						<text class="text-color">{{ carData.waitCheckCount }}</text>
						<text>待审批</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator hover-class="navigator-hover" url="../car/myCarRecordList?status=-3" open-type="navigate">
						<text class="text-color">{{ carData.cancleCount }}</text>
						<text>申请人取消</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator hover-class="navigator-hover" url="../car/myCarRecordList?status=1" open-type="navigate">
						<text class="text-color">{{ carData.approveCount }}</text>
						<text>审批通过</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator hover-class="navigator-hover" url="../car/myCarRecordList?status=-1" open-type="navigate">
						<text class="text-color">{{ carData.failCount }}</text>
						<text>审批未通过</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator hover-class="navigator-hover" url="../car/myCarRecordList?status=2" open-type="navigate">
						<text class="text-color">{{ carData.finishDispatchCount }}</text>
						<text>完成车辆调度</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator hover-class="navigator-hover" url="../car/myCarRecordList?status=-2" open-type="navigate">
						<text class="text-color">{{ carData.centerCancleCount }}</text>
						<text>调度中心取消</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator hover-class="navigator-hover" url="../car/myCarRecordList?status=3" open-type="navigate">
						<text class="text-color">{{ carData.underwayCount }}</text>
						<text>订单进行中</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator hover-class="navigator-hover" url="../car/myCarRecordList?status=4" open-type="navigate">
						<text class="text-color">{{ carData.successCount }}</text>
						<text>订单完成</text>
					</navigator>
				</view>
			</view>

			<view class="cu-bar bg-white solid-bottom margin-top index-title">
				<view class="action">
					<image src="../../static/common/newIcon/car_clock.png" class="title-ico"></image>
					<text class="text-lg text-black">最近预约</text>
				</view>
			</view>
			<view class="card">
				<view class="item">
					<text class="title">乘车人数</text>
					<text class="content">{{ carData.status.length > 0 ? carData.people_num : '无' }}</text>
				</view>
				<view class="item">
					<text class="title">乘车时间</text>
					<text class="content">{{ carData.status.length > 0 ? carData.predict_start_time : '无' }}</text>
				</view>
				<view class="item">
					<text class="title">返程时间</text>
					<text class="content">{{ carData.status.length > 0 ? carData.predict_end_time : '无' }}</text>
				</view>
				<view class="item">
					<text class="title">乘车地点</text>
					<text class="content">{{ carData.status.length > 0 ? carData.start_place : '无' }}</text>
				</view>
				<view class="item">
					<text class="title">目的地</text>
					<text class="content">{{ carData.status.length > 0 ? carData.end_place : '无' }}</text>
				</view>
				<view class="item">
					<text class="title">状态</text>
					<text class="content">{{ carData.status.length > 0 ? carData.status : '无' }}</text>
				</view>
				<view class="reason-box">
					<view class="title">用车事由</view>
					<view class="reason">{{ carData.status.length > 0 ? carData.reason : '无' }}</view>
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
			carData: {
				totalCount: '',
				approveCount: '',
				cancleCount: '',
				failCount: '',
				waitCheckCount: '',
				finishDispatchCount: '',
				centerCancleCount: '',
				underwayCount: '',
				successCount: '',
				reason: '',
				people_num: '',
				predict_start_time: '',
				predict_end_time: '',
				start_place: '',
				end_place: '',
				status: ''
			}
		};
	},
	onLoad() {
		uni.showLoading({
			title: '加载中',
			mask: false
		});
		//获取车辆概览
		global.$http
			.post('/car/apply/myCountByStatus', {
				params: {}
			})
			.then(res => {
				if (res.status === '0') {
					console.log(this.$store);
					this.carData.totalCount = 0;
					this.carData.waitCheckCount = 0;
					this.carData.cancleCount = 0;
					this.carData.approveCount = 0;
					this.carData.failCount = 0;
					this.carData.finishDispatchCount = 0;
					this.carData.centerCancleCount = 0;
					this.carData.underwayCount = 0;
					this.carData.successCount = 0;
					var totalCount = 0;
					for (var i = 0; i < res.data.length; i++) {
						if (res.data[i].status === 0) {
							this.carData.waitCheckCount = res.data[i].total;
						} else if (res.data[i].status === -3) {
							this.carData.cancleCount = res.data[i].total;
						} else if (res.data[i].status === 1) {
							this.carData.approveCount = res.data[i].total;
						} else if (res.data[i].status === -1) {
							this.carData.failCount = res.data[i].total;
						} else if (res.data[i].status === 2) {
							this.carData.finishDispatchCount = res.data[i].total;
						} else if (res.data[i].status === -2) {
							this.carData.centerCancleCount = res.data[i].total;
						} else if (res.data[i].status === 3) {
							this.carData.underwayCount = res.data[i].total;
						} else if (res.data[i].status === 4) {
							this.carData.successCount = res.data[i].total;
						}
						totalCount += res.data[i].total;
					}
					this.carData.totalCount = totalCount;
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
			.post('/car/apply/myLatelyRecord', {
				params: {}
			})
			.then(res => {
				if (res.status === '0') {
					if (res.data) {
						this.carData.reason = res.data.reason;
						this.carData.people_num = res.data.people_num;
						this.carData.predict_start_time = res.data.predict_start_time;
						this.carData.status = misEnum.UseCarRecordEnumMap.get(res.data.status);
						this.carData.start_place = res.data.start_place;
						this.carData.end_place = res.data.end_place;
						this.carData.predict_end_time = res.data.predict_end_time;
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
		toBookcar: function() {
			uni.navigateTo({
				url: '../car/bookCar'
			});
		}
	}
};
</script>

<style scoped lang="scss">
@import 'style/mystyle.scss';

.cu-list.grid>.cu-item .text-color {
		color: #17B986;
		font-size: 34upx;
		font-weight: bold;
	}
</style>
