<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">派车单详情</block>
			<block v-show="info.status == 2 || info.status == 3" slot="right" @tap="sureBack">{{info.status == 2 ? "确认归队" : "修改费用"}}</block>
		</cu-custom>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 派车进度
			</view>
		</view>
		<view class="bg-white padding">
			<view class="cu-steps">
				<view class="cu-item" :class="item.color" v-for="(item,index) in steps" :key="index">
					<text class="cuIcon-roundcheckfill"></text> {{item.name}}
				</view>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 乘车人：
				<text class="text-bold">{{applyInfo.car_user}}（{{applyInfo.phone}}）</text>
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
				<text class="cuIcon-title text-orange"></text> 乘车地：
				<text class="text-bold">{{applyInfo.start_place}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 目的地：
				<text class="text-bold">{{applyInfo.end_place}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 乘车时间：
				<text class="text-bold">{{applyInfo.predict_start_time}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 返程时间：
				<text class="text-bold">{{applyInfo.predict_end_time}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 车辆：
				<text class="text-bold">{{info.brand + " " + info.color + " " + info.seat_num + "座" + " " + info.car_number}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 司机：
				<text class="text-bold">{{info.driver_name + "("+ info.driver_phone +")"}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom" v-if="info.bak.length > 0">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 备注：
				<text class="text-bold">{{info.bak}}</text>
			</view>
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
				info: {},
				id: "",
				applyInfo: {}
			}
		},
		onLoad(option) {
			this.id = option.id;
		},
		onShow(){
			//获取派车单信息
			global.$http.post('/car/dispatch/dispatchInfo', {
				params: {
					dispatch_id: this.id
				},
			}).then(res => {
				if (res.status === "0") {
					this.info = res.data;
					this.StatusEnumMap = misEnum.DispatchRecordEnumMap;
					this.showSteps();
					
					//获取申请单信息
					global.$http.post('/car/apply/getInfo', {
						params: {
							apply_id: 14
						},
					}).then(res => {
						if (res.status === "0") {
							this.applyInfo = res.data;
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
				misEnum.DispatchRecordEnumMap.forEach((value, key, map) => {
					if (key <= this.info.status) {
						this.steps.push({
							name: this.StatusEnumMap.get(key),
							color: 'text-green'
						});
					} else {
						this.steps.push({
							name: this.StatusEnumMap.get(key),
							color: ''
						});
					}
				});
			},
			sureBack: function(e) {
				uni.navigateTo({
					url: '../work/settleDispatchCar?para=' + encodeURIComponent(JSON.stringify(this.info))
				});
			}
		}
	}
</script>

<style>

</style>
