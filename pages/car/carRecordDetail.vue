<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">车辆预约详情</block>
			<block v-show="info.status == 0" slot="right" @tap="toEdit">修改</block>
			<block v-show="info.status != 4" slot="right" @tap="toAppraise">评价</block>
		</cu-custom>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 预约进度
			</view>
		</view>
		<view class="bg-white padding">
			<view class="cu-steps">
				<view class="cu-item" :class="item.color" v-for="(item,index) in steps" :key="index">
					<text class="cuIcon-roundcheckfill"></text> {{item.name}}
				</view>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom" v-if="info.status == -2">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 取消订单原因：
				<text class="text-red">{{info.fail_reason}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 用车事由：
				<text class="text-bold">{{info.reason}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 用车人：
				<text class="text-bold">{{info.car_user}}({{info.phone}})</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 乘车人数：
				<text class="text-bold">{{info.people_num}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 上车地点：
				<text class="text-bold">{{info.start_place}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 用车区域：
				<text class="text-bold">{{info.area}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 目的地：
				<text class="text-bold">{{info.end_city}}{{info.end_area}}{{info.end_place}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 出发时间：
				<text class="text-bold">{{info.predict_start_time}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 回程时间：
				<text class="text-bold">{{info.predict_end_time}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 预约时间：
				<text class="text-bold">{{info.apply_time}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 用车类型：
				<text class="text-bold">{{info.type == 1 ? "公务用车" : "网约车"}}</text>
			</view>
		</view>
		<view class="padding flex flex-direction" v-if="info.status == 0">
			<button class="cu-btn bg-red margin-tb-sm lg" @click="cancleBook">取消预定</button>
		</view>
	</view>
</template>

<script>
	import misEnum from '../../common/mis-enum.js';
	export default {
		data() {
			return {
				StatusEnumMap: [],
				steps: [],
				color: '',
				info: {}
			}
		},
		onLoad(option) {
			global.$http.post('/car/apply/getInfo', {
				params: {
					apply_id: option.id
				},
			}).then(res => {
				if (res.status === "0") {
					this.info = res.data;
					this.StatusEnumMap = misEnum.UseCarRecordEnumMap;
					this.showSteps();
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
			showSteps() {
				//设置进度步骤
				this.steps.length = 0;
				switch (this.info.status) {
					case 0:
						this.steps.push({
							name: this.StatusEnumMap.get(0),
							color: 'text-green'
						});
						this.steps.push({
							name: "审批",
							color: ''
						});
						this.steps.push({
							name: "调度",
							color: ''
						});
						this.steps.push({
							name: "订单进行中",
							color: ''
						});
						this.steps.push({
							name: "订单完成",
							color: ''
						});
						break;
					case 1:
						this.steps.push({
							name: this.StatusEnumMap.get(0),
							color: 'text-green'
						});
						this.steps.push({
							name: this.StatusEnumMap.get(1),
							color: 'text-green'
						});
						this.steps.push({
							name: "调度",
							color: ''
						});
						this.steps.push({
							name: "订单进行中",
							color: ''
						});
						this.steps.push({
							name: "订单完成",
							color: ''
						});
						break;
					case -1:
						this.steps.push({
							name: this.StatusEnumMap.get(0),
							color: 'text-green'
						});
						this.steps.push({
							name: this.StatusEnumMap.get(-1),
							color: 'text-red'
						});
						this.steps.push({
							name: "调度",
							color: ''
						});
						this.steps.push({
							name: "订单进行中",
							color: ''
						});
						this.steps.push({
							name: "订单完成",
							color: ''
						});
						break;
					case 2:
						this.steps.push({
							name: this.StatusEnumMap.get(0),
							color: 'text-green'
						});
						this.steps.push({
							name: this.StatusEnumMap.get(1),
							color: 'text-green'
						});
						this.steps.push({
							name: this.StatusEnumMap.get(2),
							color: 'text-green'
						});
						this.steps.push({
							name: "订单进行中",
							color: ''
						});
						this.steps.push({
							name: "订单完成",
							color: ''
						});
						break;
					case -2:
						this.steps.push({
							name: this.StatusEnumMap.get(0),
							color: 'text-green'
						});
						this.steps.push({
							name: this.StatusEnumMap.get(1),
							color: 'text-green'
						});
						this.steps.push({
							name: this.StatusEnumMap.get(-2),
							color: 'text-red'
						});
						this.steps.push({
							name: "订单进行中",
							color: ''
						});
						this.steps.push({
							name: "订单完成",
							color: ''
						});
						break;
					case 3:
						this.steps.push({
							name: this.StatusEnumMap.get(0),
							color: 'text-green'
						});
						this.steps.push({
							name: this.StatusEnumMap.get(1),
							color: 'text-green'
						});
						this.steps.push({
							name: this.StatusEnumMap.get(2),
							color: 'text-green'
						});
						this.steps.push({
							name: this.StatusEnumMap.get(3),
							color: 'text-green'
						});
						this.steps.push({
							name: "订单完成",
							color: ''
						});
						break;
					case -3:
						this.steps.push({
							name: this.StatusEnumMap.get(0),
							color: 'text-green'
						});
						this.steps.push({
							name: this.StatusEnumMap.get(-3),
							color: 'text-red'
						});
						break;
					case 4:
						this.steps.push({
							name: this.StatusEnumMap.get(0),
							color: 'text-green'
						});
						this.steps.push({
							name: this.StatusEnumMap.get(1),
							color: 'text-green'
						});
						this.steps.push({
							name: this.StatusEnumMap.get(2),
							color: 'text-green'
						});
						this.steps.push({
							name: this.StatusEnumMap.get(3),
							color: 'text-green'
						});
						this.steps.push({
							name: this.StatusEnumMap.get(4),
							color: 'text-green'
						});
						break;
				}
			},
			cancleBook: function() {
				uni.showLoading({
					title: '提交中',
					mask: false
				});
				global.$http.post('/car/apply/myCancel', {
					params: {
						apply_id: this.info.id
					},
				}).then(res => {
					uni.hideLoading();
					if (res.status === "0") {
						this.info.status = -3;
						uni.showToast({
							title: "取消成功",
							icon: 'none'
						});
						this.showSteps();
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
			toEdit: function(e) {
				uni.navigateTo({
					url: '../car/bookCar?para=' + encodeURIComponent(JSON.stringify(this.info))
				});
			},
			toAppraise: function(e) {
				uni.navigateTo({
					url: '../car/useCarAppraise?para=' + encodeURIComponent(JSON.stringify(this.info))
				});
			}
		}
	}
</script>

<style>

</style>
