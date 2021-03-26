<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="content">接待审批详情</block>
		</cu-custom>

		<reception-detail :record="record"></reception-detail>

		<view class="bottom-btns-seat" v-if="record.status == 0"></view>
		<view class="bottom-btns" v-if="record.status == 0">
			<view class="cancel" @click="verifyFail">驳回</view>
			<view class="pass" @click="verifySuccess">进行审批</view>
		</view>
		
		<view class="cu-modal" style="z-index: auto;" :class="showModal?'show':''">
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
				showModal: false,
				failReason: "",
				record: {},
				id: ""
			}
		},
		onLoad(option) {
			this.id = option.id;
		},
		onShow() {
			global.$http.post('/reception/getInfo', {
				params: {
					id: this.id
				},
			}).then(res => {
				if (res.status === "0") {
					this.record = res.data;
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
				global.$http.post('/reception/spBtg', {
					params: {
						id: this.record.id,
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
						this.record.fail_reason = failReason;
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
				uni.navigateTo({
					url: '../reception/approverReception?para=' + encodeURIComponent(JSON.stringify(this.record))
				});
				// uni.showModal({
				// 	title: '提示',
				// 	content: '确定确认预定？',
				// 	showCancel: true,
				// 	cancelText: '取消',
				// 	confirmText: '确定',
				// 	success: res => {
				// 		if (res.cancel) return;
				// 		this.verify(1, "");
				// 	},
				// 	fail: () => {},
				// 	complete: () => {}
				// });
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
						title: "请填写驳回原因",
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
