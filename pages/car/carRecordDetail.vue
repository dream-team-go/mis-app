<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">车辆预约详情</block>
		</cu-custom>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 预约进度
			</view>
		</view>
		<view class="bg-white padding">
			<view class="cu-steps">
				<view class="cu-item" :class="item.color" v-for="(item,index) in steps" :key="index">
					<text :class="'cuIcon-' + item.cuIcon"></text> {{item.name}}
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
				<text class="text-bold">{{info.apply_user_name}}({{info.apply_user_phone}})</text>
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
				StatusEnumMap: misEnum.FoodRecordEnumMap,
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
					//设置进度步骤
					if (this.info.status === 0) {
						this.color = 'text-cyan';
					} else if (this.info.status === -2) {
						this.color = 'text-orange';
					} else if (this.info.status === -1) {
						this.color = 'text-red';
					} else if (this.info.status === 1) {
						this.color = 'text-green';
					}
					var isFind = false;
					misEnum.FoodRecordEnumMap.forEach((value, key, map) => {
						var cuIcon = '';
						var color = '';
						if(!isFind || key == this.info.status){
							color = this.color;
						}
						if(key == this.info.status){
							isFind = true;
						}
						if (key === 0) {
							cuIcon = 'usefullfill';
						} else if (key === -2) {
							cuIcon = 'radioboxfill';
						} else if (key === -1) {
							cuIcon = 'roundclosefill';
						} else if (key === 1) {
							cuIcon = 'roundcheckfill';
						}
						this.steps.push({
							cuIcon: cuIcon,
							name: value,
							key: key,
							color: color
						})
					});
					
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
			cancleBook: function(){
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
						uni.showToast({
							title: "取消成功",
							icon: 'none'
						});
						this.info.status = -2;
						this.steps[0].color = 'text-orange';
						this.steps[1].color = 'text-orange';
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
			}
		}
	}
</script>

<style>

</style>
