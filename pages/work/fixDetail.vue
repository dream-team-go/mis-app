<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="content">精后勤详情</block>
		</cu-custom>

		<fix-detail :record="record"></fix-detail>

		<view class="bottom-btns-seat" v-if="record.status == 0"></view>
		<view class="bottom-btns" v-if="record.status == 0">
			<view class="cancel" @click="notDeal">暂缓处理</view>
			<view class="pass" @click="deal">已处理</view>
		</view>
		
		
		<view class="cu-modal" :class="showModal?'show':''" style="z-index: auto;">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">暂缓处理</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view>
					<view class="cu-form-group" style="text-align: left;">
						<textarea maxlength="100" @input="fillReason" placeholder="暂缓处理原因"></textarea>
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
				StatusEnumMap: misEnum.FixStatusEnumMap,
				showModal: false,
				record: {},
				not_deal_reason: "",
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
			notDeal: function() {
				this.showModal = true;
			},
			fillReason: function(e) {
				this.not_deal_reason = e.detail.value;
			},
			sureModal: function() {
				if (this.not_deal_reason.length <= 0) {
					uni.showToast({
						title: "请填写暂缓处理原因",
						icon: 'none'
					});
					return;
				}
				this.excuteNotDel();
				this.showModal = false;
			},
			hideModal: function() {
				this.showModal = false;
			},
			deal: function() {
				uni.navigateTo({
					url: "../work/fixDeal?id=" + this.record.id
				});
			},
			excuteNotDel: function() {
				uni.showLoading({
					title: '提交中',
					mask: false
				});
				global.$http.post('/thing/service/notDeal', {
					params: {
						id: this.record.id,
						not_deal_reason: this.not_deal_reason
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
		}
	}
</script>

<style scoped lang="scss">
	@import "style/mystyle.scss";
</style>
