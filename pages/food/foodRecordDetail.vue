<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="content">桌餐预定详情</block>
			<block slot="right"><view v-if="info.status == 0" @tap="toEdit">修改</view></block>
			<block slot="right"><view v-if="info.status == 1 && info.cd_status == 2" @tap="uploadMenuDetail">确认菜单</view></block>
			<block slot="right"><view v-if="info.status == 1 && info.cd_status > 2" @tap="uploadMenuDetailWork">菜单详情</view></block>
		</cu-custom>
		<food-detail :info="info"></food-detail>
		<view class="bottom-btns-seat" v-if="info.status == 0 || isCanCancel"></view>
		<view class="bottom-cancel-btn" v-if="info.status == 0 || isCanCancel" @click="cancleBook">
			取消预定
		</view>
		<!-- 
		<view class="bottom-btns-seat" v-if="info.status == 1 && info.cd_status == 2"></view>
		<view class="bottom-cancel-btn" v-if="info.status == 1 && info.cd_status == 2" @click="uploadMenuDetail">
			确认菜单
		</view>
		
		<view class="bottom-btns-seat" v-if="info.cd_status > 2"></view>
		<view class="bottom-cancel-btn" v-if="info.cd_status > 2" @click="uploadMenuDetailWork">
			菜单详情
		</view> -->
		
		<view class="bottom-btns-seat" v-if="info.status == 2 && !info.fw_score"></view>
		<view class="bottom-cancel-btn" v-if="info.status == 2 && !info.fw_score" @click="evaluate">
			评价
		</view>
		
		<view class="bottom-btns-seat" v-if="info.status == 2 && info.fw_score"></view>
		<view class="bottom-cancel-btn" v-if="info.status == 2 && info.fw_score" @click="evaluateDetail">
			评价内容
		</view>
	</view>
</template>

<script>
	import misEnum from '../../common/mis-enum.js';
	export default {
		data() {
			return {
				StatusEnumMap: misEnum.FoodRecordEnumMap,
				isCanCancel: false,
				info: {
					meal_time: "",
					ydrq: ""
				},
				id: ""
			}
		},
		onLoad(option) {
			this.id = option.id;
		},
		onShow() {
			global.$http.post('/dining/record/recordInfo', {
				params: {
					record_id: this.id
				},
			}).then(res => {
				if (res.status === "0") {
					this.info = res.data;
					//判断是否能取消订单
					this.isCanCancelFood();
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
			isCanCancelFood(){
				if(this.info.ydsjd == "1"){
					this.isCanCancel = this.info.status == 1 && (this.info.ydrq.substring(0, 10) > this.util.getDate() || (this.info.ydrq.substring(0, 10) == this.util.getDate() && this.util.getCurrentTime() <= "11:00"));
				} else if(this.info.ydsjd == "2"){
					this.isCanCancel = this.info.status == 1 && (this.info.ydrq.substring(0, 10) > this.util.getDate() || (this.info.ydrq.substring(0, 10) == this.util.getDate() && this.util.getCurrentTime() <= "17:00"));
				}
				return this.isCanCancel;
			},
			toEdit: function(e) {
				uni.navigateTo({
					url: '../food/selectRoom?para=' + encodeURIComponent(JSON.stringify(this.info))
				});
			},
			evaluate: function(e){
				uni.navigateTo({
					url: '../food/foodEvaluate?para=' + encodeURIComponent(JSON.stringify(this.info))
				});
			},
			evaluateDetail: function(e){
				uni.navigateTo({
					url: '../food/foodEvaluateDetail?para=' + encodeURIComponent(JSON.stringify(this.info))
				});
			},
			uploadMenuDetail: function(){
				uni.navigateTo({
					url: '../food/uploadFoodMenuDetail?para=' + encodeURIComponent(JSON.stringify(this.info))
				});
			},
			uploadMenuDetailWork: function(){
				uni.navigateTo({
					url: '../work/uploadFoodMenuDetail?para=' + encodeURIComponent(JSON.stringify(this.info))
				});
			},
			cancleBook: function() {
				if(this.info.status == 1 && !this.isCanCancelFood())
				{
					uni.showToast({
						icon: 'none',
						title: this.info.ydsjd == "2" ? "17:00前才能取消订单" : "11:00前才能取消订单"
					});
					return;
				}
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
						global.$http.post('/dining/record/cancelMyRecord', {
							params: {
								record_id: this.info.id
							},
						}).then(res => {
							uni.hideLoading();
							if (res.status === "0") {
								uni.showToast({
									title: "取消成功",
									icon: 'none'
								});
								this.info.status = -2;
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
