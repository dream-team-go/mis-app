<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="content">会议预定详情</block>
		</cu-custom>

		<meeting-detail :record="record"></meeting-detail>

		<view class="bottom-btns-seat" v-if="record.status == 0 && (record.sqxg_status == 0 || record.sqxg_status == 3)"></view>
		<view class="bottom-btns" v-if="record.status == 0 && (record.sqxg_status == 0 || record.sqxg_status == 3)">
			<view class="cancel" @click="verifyFail">审批不通过</view>
			<view class="pass" @click="verifySuccess">审批通过</view>
		</view>
		
		<view class="bottom-btns-seat" v-if="record.status == 1 && record.sqxg_status == 1"></view>
		<view class="bottom-btns" v-if="record.status == 1 && record.sqxg_status == 1">
			<view class="cancel" @click="notAllowEdit">拒绝修改</view>
			<view class="pass" @click="allowEdit">允许修改</view>
		</view>
		
		<view class="bottom-btns-seat" v-if="record.status == 1 && (record.sqxg_status == 0 || record.sqxg_status == 3 || record.sqxg_status == 3)"></view>
		<view class="bottom-btns" v-if="record.status == 1 && (record.sqxg_status == 0 || record.sqxg_status == 3 || record.sqxg_status == -1)">
			<view class="bottom-cancel-btn" @click="finish">会议完成</view>
		</view>
		
		<view class="bottom-btns-seat" v-if="record.status == 2 && record.fw_score"></view>
		<view class="bottom-cancel-btn" v-if="record.status == 2 && record.fw_score" @click="evaluateDetail">
			评价内容
		</view>
		
		<view class="cu-modal" :class="showModal?'show':''" style="z-index: auto;">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">审核不通过</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view>
					<view class="cu-form-group" style="text-align: left;">
						<textarea maxlength="100" @input="fillFailReason" placeholder="不通过原因"></textarea>
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

		<view class="cu-modal" :class="showEditModal?'show':''" style="z-index: auto;">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">拒绝修改</view>
					<view class="action" @tap="hideEditModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view>
					<view class="cu-form-group" style="text-align: left;">
						<textarea maxlength="100" @input="notAllowReason" placeholder="拒绝原因"></textarea>
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-bluelight text-green" @tap="hideEditModal">取消</button>
						<button class="cu-btn bg-linear-blue margin-left" @tap="sureEditModal">确定</button>
		
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
				StatusEnumMap: misEnum.MeetingRecordEnumMap,
				record: {},
				showModal: false,
				showEditModal: false,
				failReason: "",
				editReson: ""
			}
		},
		onLoad(option) {
			global.$http.post('/meeting/record/recordInfo', {
				params: {
					record_id: option.id
				},
			}).then(res => {
				if (res.status === "0") {
					this.record = res.data;
					this.record.ydrq = this.record.ydrq ? this.record.ydrq.substr(0, 10) : this.record.ydrq;
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
			verify(status) {
				uni.showLoading({
					title: '提交中',
					mask: false
				});
				global.$http.post('/meeting/record/spRecord', {
					params: {
						record_id: this.record.id,
						status: status,
						fail_reason: this.failReason
					},
				}).then(res => {
					uni.hideLoading();
					if (res.status === "0") {
						uni.showToast({
							title: "提交成功",
							icon: 'none'
						});
						this.record.status = status;
						this.record.fail_reason = this.failReason;
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
					content: '确定审批通过？',
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
				this.verify(-1);
				this.showModal = false;
			},
			
			verifyEdit(status) {
				uni.showLoading({
					title: '提交中',
					mask: false
				});
				global.$http.post('/meeting/record/changSqxgStatus', {
					params: {
						id: this.record.id,
						sqxg_status: status
					},
				}).then(res => {
					uni.hideLoading();
					if (res.status === "0") {
						uni.showToast({
							title: "提交成功",
							icon: 'none'
						});
						if(status == 2){
							this.record.status = 0;
						}
						this.record.sqxg_status = status;
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
			allowEdit: function() {
				uni.showModal({
					title: '提示',
					content: '确定允许修改？',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.cancel) return;
						this.verifyEdit(2);
					},
					fail: () => {},
					complete: () => {}
				});
			},
			notAllowEdit: function() {
				uni.showModal({
					title: '提示',
					content: '确定拒绝修改？',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.cancel) return;
						this.verifyEdit(-1);
					},
					fail: () => {},
					complete: () => {}
				});
				//this.showEditModal = true;
			},
			hideEditModal: function() {
				this.showEditModal = false;
			},
			notAllowReason: function(e) {
				this.editReson = e.detail.value;
			},
			sureEditModal: function() {
				if (this.editReson.length <= 0) {
					uni.showToast({
						title: "请填写拒绝修改原因",
						icon: 'none'
					});
					return;
				}
				this.verifyEdit(-1, this.editReson)
				this.showEditModal = false;
			},
			evaluateDetail: function(e){
				uni.navigateTo({
					url: '../meeting/meetingEvaluateDetail?para=' + encodeURIComponent(JSON.stringify(this.record))
				});
			},
			finish: function(e){
				uni.showModal({
					title: '提示',
					content: '确定会议完成？',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.cancel) return;
						global.$http.post('/meeting/record/finishRecord', {
							params: {
								record_id: this.record.id
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
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "style/mystyle.scss";
</style>
