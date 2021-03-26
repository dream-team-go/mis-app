<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			
			<block slot="content">工作餐详情</block>
		</cu-custom>
		
		<leader-food-detail :record="record"></leader-food-detail>
		
		<view class="bottom-btns-seat" v-if="record.status == 0"></view>
		<view class="bottom-cancel-btn" v-if="record.status == 0" @click="sureBook">
			确认预定
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
		methods:{
			sureBook: function(){
				uni.showModal({
					title: '提示',
					content: '确定确认预定？',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if(res.cancel) return;
						uni.showLoading({
							title: '提交中',
							mask: false
						});
						global.$http.post('/dining/lead/sureRecord', {
							params: {
								id: this.record.id
							},
						}).then(res => {
							if (res.status === "0") {
								uni.showToast({
									title: "提交成功",
									icon: 'none'
								});
								this.record.status = 1;
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
			}
		}
	}
</script>

<style scoped lang="scss">
@import "style/mystyle.scss";

</style>
