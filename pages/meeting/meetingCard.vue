<template>
	<view style="overflow: hidden;">
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="content">会议详情</block>
			<block slot="right">
				<view @tap="toSignList()">签到记录</view>
			</block>
		</cu-custom>
		
		<view class="met-card" :style="[{height:'calc(100vh - ' + CustomBar + 'px - 50px)'}]">
			<view class="met-card-title text-white text-bold">{{record.desc}}</view>
			<view class="met-card-content text-white">
				<view class="met-card-content-item">
					<view class="met-card-content-item-title">会议地址：</view>
					{{record.building_name}}{{record.room_number}}
				</view>
				<view class="met-card-content-item">
					<view class="met-card-content-item-title">会议日期：</view>
					{{record.ydrq.substring(0, 10)}}
				</view>
				<view class="met-card-content-item">
					<view class="met-card-content-item-title">上&nbsp;/&nbsp;下&nbsp;午：</view>
					{{record.ydsjd == 1 ? "上午" : "下午"}}
				</view>
				<view class="met-card-content-item">
					<view class="met-card-content-item-title">开始时间：</view>
					{{record.start_time.substring(11,16)}}
				</view>
				<view class="met-card-content-item">
					<view class="met-card-content-item-title">参会人数：</view>
					{{record.people_num}}
				</view>
				<view class="met-card-content-item">
					<view class="met-card-content-item-title">联&ensp;系&ensp;人：</view>
					{{record.user_name}}
				</view>
				<view class="met-card-content-item">
					<view class="met-card-content-item-title">联系电话：</view>
					{{record.user_tel}}
				</view>
			</view>
			
			<view class="met-card-bottom">
				<view class="met-card-bottom-item">
					<view class="cu-bar">
						<view @tap="toFileList()">
							<text class="cuIcon-file text-bold"></text>
							<text class="text-lg">会议材料</text>
						</view>
						<view @tap="toOrgList()">
							<text class="cuIcon-home text-bold"></text>
							<text class="text-lg">参会单位</text>
						</view>
					</view>
				</view>
			</view>
			
			
		</view>
		
		<view class="bottom-btns-seat"></view>
		<view class="bottom-cancel-btn" v-if="!notSign && !isSign" @click="sign">
			签到
		</view>
		<view class="bottom-cancel-btn" v-if="notSign">
			未完成签到
		</view>
		<view class="bottom-cancel-btn" v-if="isSign">
			已完成签到
		</view>
		
	</view>
</template>

<script>
	import misEnum from '../../common/mis-enum.js';
	export default {
		data() {
			return {
				CustomBar: this.CustomBar,
				record: {},
				isSign: false,
				notSign: false
			}
		},
		onLoad(option) {
			this.record = JSON.parse(decodeURIComponent(option.para));
			this.notSign = this.record.notSign == true;
		},
		onShow() {
			uni.showLoading({
				title: '加载中',
				mask: false
			});
			global.$http.post('/meeting/sign/mySign', {
				params: {
					meeting_record_id: this.record.id
				},
			}).then(res => {
				uni.hideLoading();
				if (res.status === "0") {
					this.isSign = res.data.list.length > 0;
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
		methods: {
			toSignRecord: function(){
				uni.navigateTo({
					url: '../meeting/signRecord'
				});
			},
			toFileList: function(){
				uni.navigateTo({
					url: '../meeting/meetingFile?meeting_record_id=' + this.record.id
				});
			},
			toOrgList: function(){
				uni.navigateTo({
					url: '../meeting/meetingOrg?meeting_record_id=' + this.record.id
				});
			},
			toSignList: function(){
				uni.navigateTo({
					url: '../meeting/signRecord?meeting_record_id=' + this.record.id
				});
			},
			sign: function() {
				uni.showModal({
					title: '提示',
					content: '确定取签到会议？',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.cancel) return;
						uni.showLoading({
							title: '提交中',
							mask: false
						});
						global.$http.post('/meeting/sign/save', {
							params: {
								meeting_record_id: this.record.id
							},
						}).then(res => {
							uni.hideLoading();
							if (res.status === "0") {
								uni.showToast({
									title: "签到成功",
									icon: 'none'
								});
								this.isSign = true;
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
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "style/mystyle.scss";
	
	.met-card {
		overflow: hidden;
		background-image: url(../../static/meeting/backmetcard.jpg);
		background-size: 100% 100%;
	}
	
	.met-card-title {
		text-align: center;
		margin: 120upx 90upx 0upx 90upx;
		font-size: 50upx;
		letter-spacing: 8upx;
	}
	
	.met-card-content {
		font-size: 35upx;
		margin: 60upx 180upx 50upx 180upx;
	}
	
	.met-card-content-item{
		margin-top: 20upx;
		display: flex;
	}
	
	.met-card-bottom {
		margin: 0upx 110upx 80upx 110upx;
		text-align: center;
		font-size: 50upx;
		color: #e5bd97;
	}
	
	.met-card-content-item-title{
		min-width: 180upx;
	}
</style>
