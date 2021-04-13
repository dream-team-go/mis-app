<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="content">会议预定详情</block>
			<block slot="right">
				<view v-if="record.status == 0" @tap="toEdit">修改</view>
			</block>
		</cu-custom>
		<meeting-detail :record="record"></meeting-detail>
		
		<view class="bottom-btns-seat" v-if="record.status == 0"></view>
		<view class="bottom-cancel-btn" v-if="record.status == 0" @click="cancleBook">
			取消预定
		</view>
		
		<view class="bottom-btns-seat" v-if="record.status == 1 && record.sqxg_status == 0"></view>
		<view class="bottom-cancel-btn" v-if="record.status == 1 && record.sqxg_status == 0" @click="applyEdit">
			申请更改
		</view>
		
		<view class="bottom-btns-seat" v-if="record.status == 2 && !record.fw_score"></view>
		<view class="bottom-cancel-btn" v-if="record.status == 2 && !record.fw_score" @click="evaluate">
			评价
		</view>
		
		<view class="bottom-btns-seat" v-if="record.status == 2 && record.fw_score"></view>
		<view class="bottom-cancel-btn" v-if="record.status == 2 && record.fw_score" @click="evaluateDetail">
			评价内容
		</view>
		
		<view class="cu-modal" :class="showModal?'show':''" style="z-index: auto;">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">申请更改</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view>
					<view class="cu-form-group" style="text-align: left;">
						<textarea maxlength="100" @input="fillFailReason" placeholder="申请原因"></textarea>
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
				record: {},
				id: "",
				showModal: false,
				failReason: ""
			}
		},
		onLoad(option) {
			this.id = option.id;
		},
		onShow() {
			global.$http.post('/meeting/record/recordInfo', {
				params: {
					record_id: this.id
				},
			}).then(res => {
				if (res.status === "0") {
					this.record = res.data;
					this.record.ydrq = this.record.ydrq ? this.record.ydrq.substr(0, 10) : this.record.ydrq;
					//判断是否能编辑
					this.record.is_can_edit = true;
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
		methods: {
			toEdit: function(e) {
				uni.navigateTo({
					url: '../meeting/selectRoom?para=' + encodeURIComponent(JSON.stringify(this.record))
				});
			},
			evaluate: function(e){
				uni.navigateTo({
					url: '../meeting/meetingEvaluate?para=' + encodeURIComponent(JSON.stringify(this.record))
				});
			},
			evaluateDetail: function(e){
				uni.navigateTo({
					url: '../meeting/meetingEvaluateDetail?para=' + encodeURIComponent(JSON.stringify(this.record))
				});
			},
			applyEdit: function(e){
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
						title: "请填写申请修改原因",
						icon: 'none'
					});
					return;
				}
				uni.showLoading({
					title: '提交中',
					mask: false
				});
				global.$http.post('/meeting/record/changSqxgStatus', {
					params: {
						id: this.record.id,
						sqxg_status: 1,
						sqxg_reason: this.failReason
					},
				}).then(res => {
					uni.hideLoading();
					if (res.status === "0") {
						uni.showToast({
							title: "提交成功",
							icon: 'none'
						});
						this.record.sqxg_status = 1;
						this.record.sqxg_reason = this.failReason;
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
				this.showModal = false;
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
						global.$http.post('/meeting/record/cancelMyRecord', {
							params: {
								record_id: this.record.id
							},
						}).then(res => {
							uni.hideLoading();
							if (res.status === "0") {
								uni.showToast({
									title: "取消成功",
									icon: 'none'
								});
								this.record.status = -2;
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
</style>
