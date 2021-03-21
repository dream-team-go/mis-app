<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="content">桌餐预定详情</block>
			<block slot="right"><view v-if="info.status == 1 && info.cd_status == 1" @tap="uploadMenu">上传菜单</view></block>
			<block slot="right"><view v-if="info.status == 1 && info.cd_status > 1" @tap="uploadMenuDetail">菜单详情</view></block>
		</cu-custom>
		
		<food-detail :info="info"></food-detail>
		
		<view class="bottom-btns-seat" v-if="info.status == 0"></view>
		<view class="bottom-btns" v-if="info.status == 0">
			<view class="cancel" @click="verifyFail">驳回</view>
			<view class="pass" @click="verifySuccess">确认预定</view>
		</view>
		
		<view class="bottom-btns-seat" v-if="info.status == 1"></view>
		<view class="bottom-btns" v-if="info.status == 1">
			<view class="cancel" @click="cancleBook">取消预定</view>
			<view class="pass" @click="finish">订餐完成</view>
		</view>
		
		<view class="bottom-btns-seat" v-if="info.status == 2 && info.fw_score"></view>
		<view class="bottom-cancel-btn" v-if="info.status == 2 && info.fw_score" @click="evaluateDetail">
			评价内容
		</view>
		
		<!-- <view class="bottom-btns-seat" v-if="info.status == 1 && info.cd_status == 1"></view>
		<view class="bottom-cancel-btn" v-if="info.status == 1 && info.cd_status == 1" @click="uploadMenu">
			上传菜单
		</view>
		
		<view class="bottom-btns-seat" v-if="info.status == 1 && info.cd_status > 1"></view>
		<view class="bottom-cancel-btn" v-if="info.status == 1 && info.cd_status > 1" @click="uploadMenuDetail">
			菜单详情
		</view>
 -->
		<view class="cu-modal" :class="showModal?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">驳回</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view>
					<view class="cu-form-group" style="text-align: left;">
						<textarea maxlength="100" @input="fillFailReason" placeholder="驳回原因"></textarea>
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-bluelight text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-linear-blue margin-left" @tap="sureModal">确定</button>

					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import misEnum from '../../common/mis-enum.js';
	export default {
		data() {
			return {
				StatusEnumMap: misEnum.FoodRecordEnumMap,
				steps: [],
				color: '',
				info: {
					meal_time: "",
					ydrq: ""
				},
				showModal: false,
				failReason: "",
				id: ""
			}
		},
		onShow(){
			global.$http.post('/dining/record/recordInfo', {
				params: {
					record_id: this.id
				},
			}).then(res => {
				if (res.status === "0") {
					this.info = res.data;
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
				}
			}).catch(err => {
				uni.showToast({
					title: err.message,
					icon: 'none'
				});
			});
		},
		onLoad(option) {
			this.id = option.id;
		},
		methods: {
			verify(status, failReason) {
				uni.showLoading({
					title: '提交中',
					mask: false
				});
				global.$http.post('/dining/record/sureRecord', {
					params: {
						record_id: this.info.id,
						status: status,
						fail_reason: failReason
					},
				}).then(res => {
					uni.hideLoading();
					if (res.status === "0") {
						uni.showToast({
							title: "提交成功",
							icon: 'none'
						});
						this.info.status = status;
						this.info.fail_reason = failReason;
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
			verifySuccess: function() {
				uni.showModal({
					title: '提示',
					content: '确定确认预定？',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.cancel) return;
						this.verify(1, "");
					},
					fail: () => {},
					complete: () => {}
				});
			},
			verifyFail: function() {
				this.showModal = true;
			},
			hideModal: function() {
				this.showModal = false;
			},
			fillFailReason: function(e) {
				this.failReason = e.detail.value;
			},
			sureModal: function() {
				if (this.failReason.length <= 0) {
					uni.showToast({
						title: "请填写不通过原因",
						icon: 'none'
					});
					return;
				}
				this.verify(-1, this.failReason)
				this.showModal = false;
			},
			uploadMenu: function(){
				uni.navigateTo({
					url: '../work/uploadFoodMenu?para=' + encodeURIComponent(JSON.stringify(this.info))
				});
			},
			uploadMenuDetail: function(){
				uni.navigateTo({
					url: '../work/uploadFoodMenuDetail?para=' + encodeURIComponent(JSON.stringify(this.info))
				});
			},
			cancleBook: function() {
				uni.showModal({
					title: '提示',
					content: '确定取消预定？',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.cancel) return;
						uni.showLoading({
							title: '提交中',
							mask: false
						});
						global.$http.post('/dining/record/cancelMyRecord', {
							params: {
								record_id: this.info.id
							},
						}).then(res => {
							uni.hideLoading();
							if (res.status === "0") {
								uni.showToast({
									title: "取消成功",
									icon: 'none'
								});
								this.info.status = -2;
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
			},
			finish: function(e){
				uni.showModal({
					title: '提示',
					content: '确定订餐完成？',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.cancel) return;
						global.$http.post('/dining/record/finishRecord', {
							params: {
								record_id: this.info.id
							},
						}).then(res => {
							uni.hideLoading();
							if (res.status === "0") {
								uni.showToast({
									title: "提交成功",
									icon: 'none'
								});
								this.record.status = 2;
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
			},
			evaluateDetail: function(e){
				uni.navigateTo({
					url: '../food/foodEvaluateDetail?para=' + encodeURIComponent(JSON.stringify(this.info))
				});
			},
		}
	}
</script>

<style scoped lang="scss">
@import "style/mystyle.scss";

</style>
