<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">车辆详情</block>
			<block slot="right"><view v-if="HasOperateKey" @tap="toEdit">修改</view></block>
		</cu-custom>
		
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 车牌号：
				<text class="text-bold">{{info.car_number}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 车牌颜色：
				<text class="text-bold">{{info.plate_color}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 车辆类型：
				<text class="text-bold">{{info.car_type}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 车辆使用性质：
				<text class="text-bold">{{info.nature}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 品牌：
				<text class="text-bold">{{info.brand}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 座位数：
				<text class="text-bold">{{info.seat_num}}座</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 车身颜色：
				<text class="text-bold">{{info.color}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 燃料类型：
				<text class="text-bold">{{info.fuel_type}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 排量：
				<text class="text-bold">{{info.volume}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 功率：
				<text class="text-bold">{{info.power}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 车架号：
				<text class="text-bold">{{info.vin_no}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 发动机号：
				<text class="text-bold">{{info.motor_no}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 变速箱类型：
				<text class="text-bold">{{info.at_type}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 长宽高：
				<text class="text-bold">{{info.car_length}} x {{info.car_width}} x {{info.car_height}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 是否城乡车辆：
				<text class="text-bold">{{info.is_town == 1 ? '是' : '否'}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 是否运营车辆：
				<text class="text-bold">{{info.is_operate == 1 ? '是' : '否'}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 是否监管：
				<text class="text-bold">{{info.is_supervise == 1 ? '是' : '否'}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 有无倒车雷达：
				<text class="text-bold">{{info.is_pdc == 1 ? '有' : '无'}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 有无真皮座椅：
				<text class="text-bold">{{info.is_leather_seat == 1 ? '有' : '无'}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 有无CD：
				<text class="text-bold">{{info.is_cd == 1 ? '有' : '无'}}</text>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 购置价格（万元）：
				<text class="text-bold">{{info.price}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 车辆GPS：
				<text class="text-bold">{{info.car_gps}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 车辆照片：
				<image :src="info.img"></image>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 重量：
				<text class="text-bold">{{info.quality}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 出厂日期：
				<text class="text-bold">{{info.produce_time}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 上牌日期：
				<text class="text-bold">{{info.license_time}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 型号：
				<text class="text-bold">{{info.model}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 轴距：
				<text class="text-bold">{{info.wheel_base}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 备注：
				<text class="text-bold">{{info.remark}}</text>
			</view>
		</view>
		
		<view class="bottom-btns-seat"></view>
		<view class="bottom-cancel-btn" @click="repairProcess">
			车辆历程
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				id: "",
				info: {}
			}
		},
		computed: {
			...mapState(['userInfo']),
			HasOperateKey: function(){
				return this.userInfo.key.includes('car:manage');
			}
		},
		onLoad(option) {
			this.id = option.id;
		},
		onShow() {
			global.$http.post('/car/info/getInfo', {
				params: {
					car_id: this.id
				},
			}).then(res => {
				if (res.status === "0") {
					this.info = res.data;
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
			toEdit: function(e){
				uni.navigateTo({
					url: '../work/saveCar?para=' + encodeURIComponent(JSON.stringify(this.info))
				});
			},
			repairProcess: function(e){
				uni.navigateTo({
					url: '../work/repairProcess?car_id=' + this.info.id + '&car_number=' + this.info.car_number
				});
			}
		}
	}
</script>

<style scoped lang="scss">
@import "style/mystyle.scss";

</style>
