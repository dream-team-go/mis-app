<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="content">我的精后勤</block>
			<block slot="right"><view v-show="record.status == 0" @tap="toEdit">修改</view></block>
		</cu-custom>

		<fix-detail :record="record"></fix-detail>

		<view class="bottom-btns-seat" v-if="record.status == 0"></view>
		<view class="bottom-cancel-btn" v-if="record.status == 0">
			<view class="cancel" @click="del">删除</view>
		</view>

	</view>
</template>

<script>
	import misEnum from '../../common/mis-enum.js';
	export default {
		data() {
			return {
				StatusEnumMap: misEnum.LostStatusEnumMap,
				record: {},
				id: ""
			}
		},
		onLoad(option) {
			this.id = option.id;
		},
		onShow() {
			this.loadData();
		},
		methods: {
			loadData: function(){
				global.$http.post('/thing/service/getInfo', {
					params: {
						id: this.id
					},
				}).then(res => {
					if (res.status === "0") {
						// for(var item in res.data.imgs){
						// 	res.data.imgs[item].img_url = "https://hx.dcloud.net.cn/static/snapshots/tutorial/ios_simulator.png";
						// }
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
			del: function() {
				uni.showModal({
					title: '提示',
					content: '确定删除？',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.cancel) return;
						this.excuteDelete();
					},
					fail: () => {},
					complete: () => {}
				});
			},
			excuteDelete() {
				uni.showLoading({
					title: '提交中',
					mask: false
				});
				global.$http.post('/thing/service/delete', {
					params: {
						id: this.record.id
					},
				}).then(res => {
					uni.hideLoading();
					if (res.status === "0") {
						uni.showToast({
							title: "提交成功",
							icon: 'none'
						});
						uni.navigateBack();
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
			toEdit: function(e){
				uni.navigateTo({
					url: '../fix/saveFix?para=' + encodeURIComponent(JSON.stringify(this.record))
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "style/mystyle.scss";
</style>
