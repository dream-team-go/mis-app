<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			
			<block slot="content">车辆维修申请详情</block>
			<block slot="right"><view v-show="info.status >= 3" @tap="toRepairOrder">维修单</view></block>
			<block slot="right"><view v-show="info.status == 1" @tap="toEdit">修改</view></block>
		</cu-custom>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<image src="../../static/common/newIcon/car_repair.png"></image>
				<text class="text-lg text-black">维修申请进度</text>
			</view>
		</view>
		<view class="bg-white padding">
			<view class="cu-steps">
				<view class="cu-item" :class="item.color" v-for="(item,index) in steps" :key="index">
					<text class="cuIcon-roundcheckfill"></text> {{item.name}}
				</view>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom" v-if="info.status < 0">
			<view class="action">
				 不通过原因：
				<text class="text-red">{{info.fail_reason}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 编号：
				<text class="text-black">{{info.order_code}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 维修原由：
				<text class="text-black">{{info.desc}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 车辆：
				<text class="text-black">{{info.brand}} {{info.car_number}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 申请人：
				<text class="text-black">{{info.user_name}}({{info.user_phone}})</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 类型：
				<text class="text-black">{{info.type == 1 ? "维修" : "保养"}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 申请时间：
				<text class="text-black">{{info.create_time}}</text>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 维修厂：
				<text class="text-black">{{info.repair_shop}}</text>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 备注：
				<text class="text-black">{{info.desc}}</text>
			</view>
		</view>

		<view class="cu-bar bg-white solid-bottom" v-if="info.zz_name">
			<view class="action">
				 组长审批：
				<text class="text-black">{{info.zz_name}} {{info.zzsp_time}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom" v-if="info.zr_name">
			<view class="action">
				 主任审批：
				<text class="text-black">{{info.zr_name}} {{info.end_area}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom" v-if="info.business">
			<view class="action">
				 维修出单：
				<text class="text-black">{{info.business}} {{info.cwxd_time}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom" v-if="info.jz_name">
			<view class="action">
				 局长审批：
				<text class="text-black">{{info.jz_name}} {{info.jzsp_time}}</text>
			</view>
		</view>

		<view class="bottom-btns-seat" v-if="info.status == 1"></view>
		<view class="bottom-cancel-btn" v-if="info.status == 1"  @click="cancleBook">
			取消申请
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
				info: {}
			}
		},
		onLoad(option) {
			global.$http.post('/car/repair/getInfo', {
				params: {
					apply_id: option.id
				},
			}).then(res => {
				if (res.status === "0") {
					this.info = res.data;
					this.StatusEnumMap = misEnum.RepairRecordEnumMap;
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
							name: this.StatusEnumMap.get(1),
							color: 'text-green'
						});
						this.steps.push({
							name: this.StatusEnumMap.get(0),
							color: 'text-red'
						});
						break;
					case 1:
						this.steps.push({
							name: this.StatusEnumMap.get(1),
							color: 'text-green'
						});
						this.steps.push({
							name: "组长审批",
							color: ''
						});
						this.steps.push({
							name: "维修出单",
							color: ''
						});
						this.steps.push({
							name: "主任审批",
							color: ''
						});
						this.steps.push({
							name: "局长审批",
							color: ''
						});
						break;
					case -1:
						this.steps.push({
							name: this.StatusEnumMap.get(1),
							color: 'text-green'
						});
						this.steps.push({
							name: this.StatusEnumMap.get(-1),
							color: 'text-red'
						});
						this.steps.push({
							name: "维修出单",
							color: ''
						});
						this.steps.push({
							name: "主任审批",
							color: ''
						});
						this.steps.push({
							name: "局长审批",
							color: ''
						});
						break;
					case 2:
						this.steps.push({
							name: this.StatusEnumMap.get(1),
							color: 'text-green'
						});
						this.steps.push({
							name: this.StatusEnumMap.get(2),
							color: 'text-green'
						});
						this.steps.push({
							name: "维修出单",
							color: ''
						});
						this.steps.push({
							name: "主任审批",
							color: ''
						});
						this.steps.push({
							name: "局长审批",
							color: ''
						});
						break;
					case -2:
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
							name: this.StatusEnumMap.get(-2),
							color: 'text-red'
						});
						this.steps.push({
							name: "局长审批",
							color: ''
						});
						break;
					case 3:
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
							name: "主任审批",
							color: ''
						});
						this.steps.push({
							name: "局长审批",
							color: ''
						});
						break;
					case -3:
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
						this.steps.push({
							name: this.StatusEnumMap.get(-3),
							color: 'text-red'
						});
						break;
					case 4:
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
						this.steps.push({
							name: "局长审批",
							color: ''
						});
						break;
					case 5:
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
						this.steps.push({
							name: this.StatusEnumMap.get(5),
							color: 'text-green'
						});
						break;
				}
			},
			cancleBook: function() {
				uni.showModal({
					title: '提示',
					content: '确定取消申请？',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.cancel) return;
						uni.showLoading({
							title: '提交中',
							mask: false
						});
						global.$http.post('/car/repair/cancel', {
							params: {
								apply_id: this.info.id
							},
						}).then(res => {
							uni.hideLoading();
							if (res.status === "0") {
								this.info.status = 0;
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
					fail: () => {},
					complete: () => {}
				});
			},
			toEdit: function(e) {
				uni.navigateTo({
					url: '../work/saveApplyRepair?para=' + encodeURIComponent(JSON.stringify(this.info))
				});
			},
			toRepairOrder: function(e) {
				uni.navigateTo({
					url: '../work/repairOrderDetail?para=' + encodeURIComponent(JSON.stringify(this.info))
				});
			}
		}
	}
</script>

<style scoped lang="scss">
@import "style/mystyle.scss";

</style>
