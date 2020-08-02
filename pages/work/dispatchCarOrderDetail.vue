<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			
			<block slot="content">派车单详情</block>
			<block slot="right"><view v-show="info.status == 2 || info.status == 3" @tap="sureBack">{{info.status == 2 ? "确认归队" : "修改费用"}}</view></block>
		</cu-custom>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 <image src="../../static/common/newIcon/car_record.png"></image>
				<text class="text-lg text-black">派车进度</text>
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
				 乘车人：
				<text class="text-black">{{applyInfo.car_user}}（{{applyInfo.phone}}）</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 乘车人数：
				<text class="text-black">{{info.people_num}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 乘车地：
				<text class="text-black">{{applyInfo.start_place}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 目的地：
				<text class="text-black">{{applyInfo.end_place}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 乘车时间：
				<text class="text-black">{{applyInfo.predict_start_time}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 返程时间：
				<text class="text-black">{{applyInfo.predict_end_time}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 车辆：
				<text class="text-black">{{info.brand + " " + info.color + " " + info.seat_num + "座" + " " + info.car_number}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 司机：
				<text class="text-black">{{info.driver_name + "("+ info.driver_phone +")"}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom" v-if="info.bak">
			<view class="action">
				 备注：
				<text class="text-black">{{info.bak}}</text>
			</view>
		</view>
		<uni-collapse v-if="info.status > 2">
			<uni-collapse-item :title="getTitle(info.total_fee)">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						 里程费(元)：
						<text class="text-black">{{info.stop_price}}/公里 x {{info.stop_num}}公里 = {{info.stop_price * info.stop_num}}</text>
					</view>
				</view>
				<view class="cu-bar bg-white solid-bottom" v-if="info.zs_fee > 0">
					<view class="action">
						 住宿费(元)：
						<text class="text-black">{{info.zs_fee}}</text>
					</view>
				</view>
				<view class="cu-bar bg-white solid-bottom" v-if="info.tc_fee > 0">
					<view class="action">
						 停车费(元)：
						<text class="text-black">{{info.tc_fee}}</text>
					</view>
				</view>
				<view class="cu-bar bg-white solid-bottom" v-if="info.hs_fee > 0">
					<view class="action">
						 伙食费(元)：
						<text class="text-black">{{info.hs_fee}}</text>
					</view>
				</view>
				<view class="cu-bar bg-white solid-bottom" v-if="info.jy_fee > 0">
					<view class="action">
						 加油费(元)：
						<text class="text-black">{{info.jy_fee}}</text>
					</view>
				</view>
				<view class="cu-bar bg-white solid-bottom" v-if="info.gl_fee > 0">
					<view class="action">
						<text class="cuIcon-title text-orange"></text> 过路费(元)：
						<text class="text-black">{{info.gl_fee}}</text>
					</view>
				</view>
				<view class="cu-bar bg-white solid-bottom" v-if="info.xc_fee > 0">
					<view class="action">
						 洗车费(元)：
						<text class="text-black">{{info.xc_fee}}</text>
					</view>
				</view>
				<view class="cu-bar bg-white solid-bottom" v-if="info.clzy_fee > 0">
					<view class="action">
						 车辆占用费(元)：
						<text class="text-black">{{info.clzy_fee}}</text>
					</view>
				</view>
				<view class="cu-bar bg-white solid-bottom" v-if="info.other_fee > 0">
					<view class="action">
						 其它费用(元)：
						<text class="text-black">{{info.other_fee}}</text>
					</view>
				</view>
			</uni-collapse-item>
		</uni-collapse>
	</view>
</template>

<script>
	import uniCollapse from '@/colorui/components/uni-collapse.vue'
	import uniCollapseItem from '@/colorui/components/uni-collapse-item.vue'
	import misEnum from '../../common/mis-enum.js';
	export default {
		components: {
			uniCollapse,
			uniCollapseItem
		},
		data() {
			return {
				StatusEnumMap: [],
				steps: [],
				color: '',
				info: {},
				id: "",
				order_code: "",
				applyInfo: {}
			}
		},
		onLoad(option) {
			this.id = option.id;
			this.order_code = option.order_code;
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
			//获取申请单信息
			global.$http.post('/car/apply/getInfoByOrderCode', {
				params: {
					order_code: this.order_code
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
			getTitle: function(totalFee) {
				return "总费用(元)：" + totalFee;
			},
			sureBack: function(e) {
				uni.navigateTo({
					url: '../work/settleDispatchCar?para=' + encodeURIComponent(JSON.stringify(this.info))
				});
			}
		}
	}
</script>
<style scoped lang="scss">
@import "style/mystyle.scss";

</style>
