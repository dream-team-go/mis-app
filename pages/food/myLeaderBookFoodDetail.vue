<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="content">工作餐详情</block>
			<block slot="right">
				<view v-show="info.status == 0 || isCanCancel" @tap="toSaveLeaderBook">修改</view>
			</block>
		</cu-custom>

		<leader-food-detail :info="info"></leader-food-detail>

		<view class="bottom-btns-seat" v-if="info.status == 0 || isCanCancel"></view>
		<view class="bottom-cancel-btn" v-if="info.status == 0 || isCanCancel" @click="cancleBook">
			取消预定
		</view>
	</view>
</template>

<script>
	import misEnum from '../../common/mis-enum.js';
	export default {
		data() {
			return {
				info: {},
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
		computed: {
			isCanCancel: function() {
				var isCanCancel = false;
				if (this.info.dining_date) {
					if (this.info.dining_date.substring(0, 10) > this.util.getDate()) {
						isCanCancel = true;
					} else if (this.info.dining_date.substring(0, 10) == this.util.getDate()) {
						if (this.info.type == "1")
							isCanCancel = this.util.getCurrentTime() <= '13:00';
						else if (this.info.type == "2")
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
								id: this.info.id
							},
						}).then(res => {
							if (res.status === "0") {
								uni.showToast({
									title: "取消成功",
									icon: 'none'
								});
								this.info.status = -1;
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
					url: '../food/saveLeaderBook?para=' + encodeURIComponent(JSON.stringify(this.info))
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "style/mystyle.scss";
</style>
