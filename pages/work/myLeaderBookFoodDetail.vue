<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">领导订餐详情</block>
			<block v-show="info.dining_date > nowDate" slot="right" @tap="toSaveLeaderBook">修改</block>
		</cu-custom>
		
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 用餐领导：
				<text class="text-bold">{{info.lead}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 用餐类型：
				<text class="text-bold">{{getStatusStr(info.type)}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 用餐日期：
				<text class="text-bold">{{info.dining_date.substring(0,10)}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 用餐人数：
				<text class="text-bold">{{info.num}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 订餐时间：
				<text class="text-bold">{{info.create_time}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 用餐要求：
				<text class="text-bold">{{info.desc}}</text>
			</view>
		</view>
		<view class="padding flex flex-direction" v-if="info.dining_date > nowDate">
			<button class="cu-btn bg-gradual-orange margin-tb-sm lg" @click="cancleBook">取消预定</button>
		</view>
	</view>
</template>

<script>
	import misEnum from '../../common/mis-enum.js';
	
	function getDate(addDay) {
		const date = new Date();
		if (addDay > 0) {
			date.setDate(date.getDate() + addDay);
		}
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		month = month > 9 ? month : '0' + month;
		day = day > 9 ? day : '0' + day;
	
		return `${year}-${month}-${day}`;
	}
	
	export default {
		data() {
			return {
				nowDate: getDate(),
				info: {}
			}
		},
		onLoad(option) {
			this.info = JSON.parse(decodeURIComponent(option.para));
		},
		methods: {
			cancleBook: function(){
				uni.showModal({
					title: '提示',
					content: '确定取消预定？',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if(res.cancel) return;
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
								uni.navigateBack();
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
			getStatusStr(status) {
				return misEnum.LeaderBookFoodEnumMap.get(status);
			},
			toSaveLeaderBook: function(e){
				uni.navigateTo({
					url: '../work/saveLeaderBook?para=' + encodeURIComponent(JSON.stringify(this.info))
				});
			}
		}
	}
</script>

<style>

</style>
