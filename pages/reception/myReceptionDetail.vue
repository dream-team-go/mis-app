<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="content">接待审批详情</block>
			<block slot="right">
				<view v-show="record.status == 0" @tap="toSaveReception">修改</view>
			</block>
		</cu-custom>

		<reception-detail :record="record"></reception-detail>

		<view class="bottom-btns-seat" v-if="record.status == 0"></view>
		<view class="bottom-cancel-btn" v-if="record.status == 0" @click="cancleBook">
			取消预定
		</view>
	</view>
</template>

<script>
	import misEnum from '../../common/mis-enum.js';
	export default {
		data() {
			return {
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
						global.$http.post('/reception/cancel', {
							params: {
								id: this.record.id
							},
						}).then(res => {
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
			toSaveReception: function(e) {
				uni.navigateTo({
					url: '../reception/saveReception?para=' + encodeURIComponent(JSON.stringify(this.record))
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "style/mystyle.scss";
</style>
