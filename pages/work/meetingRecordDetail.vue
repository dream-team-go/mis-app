<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="content">会议预定详情</block>
		</cu-custom>

		<meeting-detail :record="record"></meeting-detail>

		<view class="bottom-btns-seat"></view>
		<view class="bottom-btns" v-if="record.status == 0">
			<view class="cancel" @click="verifyFail">审批不通过</view>
			<view class="pass" @click="verifySuccess">审批通过</view>
		</view>
		<!-- <view class="padding" v-if="record.status == 0" style="display: inline-flex;">
			<button class="cu-btn bg-red lg" @click="verifyFail">审核不通过</button>
		</view>

		<view class="padding" v-if="record.status == 0" style="display: inline-flex;float: right;">
			<button class="cu-btn bg-green lg" @click="verifySuccess">审批通过</button>
		</view> -->

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
				failReason: ""
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
					this.record.statusDesc = this.util.getEnumStatusDesc(misEnum.MeetingRecordEnumMap, this.record.status);
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
			verify(status, failReason) {
				uni.showLoading({
					title: '提交中',
					mask: false
				});
				global.$http.post('/meeting/record/spRecord', {
					params: {
						record_id: this.record.id,
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
						this.record.status = status;
						this.record.statusDesc = this.util.getEnumStatusDesc(misEnum.MeetingRecordEnumMap, this.record.status);
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
				this.verify(-1, this.failReason)
				this.showModal = false;
			}

		}
	}
</script>

<style scoped lang="scss">
	@import "style/mystyle.scss";
</style>
