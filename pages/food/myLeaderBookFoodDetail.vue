<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="content">工作餐详情</block>
			<block slot="right">
				<view v-show="record.status == 0 || record.status == 1" @tap="toSaveLeaderBook">修改</view>
			</block>
		</cu-custom>

		<leader-food-detail :record="record"></leader-food-detail>

		<view class="bottom-btns-seat" v-if="record.status == 0 || record.status == 1"></view>
		<view class="bottom-cancel-btn" v-if="record.status == 0 || record.status == 1" @click="cancleBook">
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
			global.$http.post('/dining/lead/recordInfo', {
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
		computed: {
			isCanCancel: function() {
				var isCanCancel = false;
				if (this.record.dining_date) {
					if (this.record.dining_date.substring(0, 10) > this.util.getDate()) {
						isCanCancel = true;
					} else if (this.record.dining_date.substring(0, 10) == this.util.getDate()) {
						if (this.record.type == "1")
							isCanCancel = this.util.getCurrentTime() <= '13:00';
						else if (this.record.type == "2")
							isCanCancel = this.util.getCurrentTime() <= '19:00';
					}
				}
				return isCanCancel;
			}
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
						global.$http.post('/dining/lead/cancel', {
							params: {
								id: this.record.id
							},
						}).then(res => {
							if (res.status === "0") {
								uni.showToast({
									title: "取消成功",
									icon: 'none'
								});
								this.record.status = -1;
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
			toSaveLeaderBook: function(e) {
				uni.navigateTo({
					url: '../food/saveLeaderBook?para=' + encodeURIComponent(JSON.stringify(this.record))
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "style/mystyle.scss";
</style>
