<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			
			<block slot="content">车辆预约详情</block>
			<block slot="right"><view v-show="info.status > 1" @tap="toDispatch">派车单</view></block>
		</cu-custom>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<image src="../../static/common/newIcon/car_record.png"></image>
				<text class="text-lg text-black">预约进度</text>
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
				<text class="text-red">{{info.fail_reason}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				</text> 用车事由：
				<text class="text-black">{{info.reason}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				</text> 用车人：
				<text class="text-black">{{info.car_user}}({{info.phone}})</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				</text> 乘车人数：
				<text class="text-black">{{info.people_num}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				</text> 上车地点：
				<text class="text-black">{{info.start_place}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				</text> 用车区域：
				<text class="text-black">{{info.area}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				</text> 目的地：
				<text class="text-black">{{info.end_city}}{{info.end_area}}{{info.end_place}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				</text> 出发时间：
				<text class="text-black">{{info.predict_start_time}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				</text> 回程时间：
				<text class="text-black">{{info.predict_end_time}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				</text> 预约时间：
				<text class="text-black">{{info.apply_time}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				</text> 用车类型：
				<text class="text-black">{{info.type == 1 ? "公务用车" : "网约车"}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				</text> 预约人：
				<text class="text-black">{{info.apply_user_name}}({{info.apply_user_phone}})</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 用车要求：
				<text class="text-black">{{carRequire}}</text>
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
				carRequire: "无"
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
					//设置用车要求
					this.info.nums.forEach(c=>{
						if(c.num > 0)
						{
							if(this.carRequire == "无")
							{
								this.carRequire = c.car_type+c.num+"辆";
							}else{
								this.carRequire += "; " + c.car_type+c.num+"辆";
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
			toDispatch: function(e){
				uni.navigateTo({
					url: '../work/useCarDispatchDetail?para=' + encodeURIComponent(JSON.stringify(this.info))
				});
			}
		}
	}
</script>

<style>

</style>
