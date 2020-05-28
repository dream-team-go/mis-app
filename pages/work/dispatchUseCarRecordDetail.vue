<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">车辆预约详情</block>
			<block v-show="info.status > 0" slot="right" @tap="toDispatch">{{info.status > 2 ? "派车单" :(info.status == 2 ? "修改派车" : "派车")}}</block>
		</cu-custom>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				</text> 预约进度
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
				</text> 取消订单原因：
				<text class="text-red">{{info.cancel_reason}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				</text> 用车事由：
				<text class="text-bold">{{info.reason}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				</text> 用车人：
				<text class="text-bold">{{info.car_user}}({{info.phone}})</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				</text> 乘车人数：
				<text class="text-bold">{{info.people_num}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				</text> 上车地点：
				<text class="text-bold">{{info.start_place}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				</text> 用车区域：
				<text class="text-bold">{{info.area}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				</text> 目的地：
				<text class="text-bold">{{info.end_city}}{{info.end_area}}{{info.end_place}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				</text> 出发时间：
				<text class="text-bold">{{info.predict_start_time}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				</text> 回程时间：
				<text class="text-bold">{{info.predict_end_time}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				</text> 预约时间：
				<text class="text-bold">{{info.apply_time}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				</text> 用车类型：
				<text class="text-bold">{{info.type == 1 ? "公务用车" : "网约车"}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				</text> 预约人：
				<text class="text-bold">{{info.apply_user_name}}({{info.apply_user_phone}})</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 用车要求：
				<text class="text-bold">{{require}}</text>
			</view>
		</view>
		
		<view class="bottom-btns-seat" v-if="info.status == 1"></view>
		<view class="bottom-cancel-btn" v-if="info.status == 1"  @click="cancleBook">
			取消订单
		</view>
		
		<view class="cu-modal" :class="showModal?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">取消订单</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view>
					<view class="cu-form-group" style="text-align: left;">
						<textarea maxlength="100" @input="fillCancelReason" placeholder="取消原因"></textarea>
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="sureModal">确定</button>
		
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
				StatusEnumMap: [],
				steps: [],
				color: '',
				info: {},
				id: 0,
				showModal: false,
				cancelReason: "",
				require: "无"
			}
		},
		onLoad(option) {
			this.id = option.id;
		},
		onShow() {
			this.loadData();
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
			loadData() {
				global.$http.post('/car/apply/getInfo', {
					params: {
						apply_id: this.id
					},
				}).then(res => {
					if (res.status === "0") {
						this.info = res.data;
						this.StatusEnumMap = misEnum.UseCarRecordEnumMap;
						this.showSteps();
						//设置用车要求
						this.info.nums.forEach(c=>{
							if(c.num > 0)
							{
								if(this.require == "无")
								{
									this.require = c.car_type+c.num+"辆";
								}else{
									this.require += "; " + c.car_type+c.num+"辆";
								}
							}
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
			cancleBook: function(){
				this.showModal = true;
			},
			hideModal: function(){
				this.showModal = false;
			},
			fillCancelReason: function(e){
				this.cancelReason = e.detail.value;
			},
			sureModal: function() {
				if(this.cancelReason.length <= 0){
					uni.showToast({
						title: "请填写取消原因",
						icon: 'none'
					});
					return;
				}
				this.showModal = false;
				uni.showLoading({
					title: '提交中',
					mask: false
				});
				global.$http.post('/car/apply/cancel', {
					params: {
						apply_id: this.id,
						cancel_reason: this.cancelReason
					},
				}).then(res => {
					uni.hideLoading();
					if (res.status === "0") {
						this.info.status = -2;
						this.info.cancel_reason = this.cancelReason;
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
			toDispatch: function(e) {
				if (this.info.status == 1 || this.info.status == 2) {
					uni.navigateTo({
						url: '../work/dispatchUseCar?para=' + encodeURIComponent(JSON.stringify(this.info))
					});
				} else {
					uni.navigateTo({
						url: '../work/dispatchUseCarDetail?para=' + encodeURIComponent(JSON.stringify(this.info))
					});
				}
			}
		}
	}
</script>

<style scoped lang="scss">
@import "style/mystyle.scss";

</style>
