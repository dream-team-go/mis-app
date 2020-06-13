<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">车辆</block>
			<block slot="right"><view @tap="toAdd">新增</view></block>
		</cu-custom>
		
		<scroll-view scroll-x class="bg-white nav text-center">
			<view class="cu-item" :class="index==TabCur?'text-white cur':''" v-for="(item,index) in Array.from(StatusEnumMap.keys()).length"
			 :key="index" @tap="typeTab(index)">
				{{Array.from(StatusEnumMap.values())[index]}}
			</view>
		</scroll-view>
		
		<view class="outer-box">
			<!-- 循环这个box就好 -->
			<view class="car-box" v-for="car in cars" :key="car.id" @click="carDetail(car)">
				<view class="jiao-img" v-show="type === 0"></view>
				<view class="shang-img" v-show="type === 2"></view>
				<view class="yue-img" v-show="type === 1"></view>
				<view class="daba-img" v-show="type === 4"></view>
				<view class="xiaoba-img" v-show="type === 3"></view>
				<view class="xiaoba-img" v-show="type === 5"></view>
				<view class="car-num">{{car.car_number}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import misEnum from '../../common/mis-enum.js';
	export default {
		data() {
			return {
				type: 0,
				cars: [],
				TabCur: 0,
				StatusEnumMap: misEnum.CarTypeEnumMap
			}
		},
		onLoad(option) {
			if (option.type) {
				var index = 0;
				misEnum.CarTypeEnumMap.forEach((value, key, map) => {
					if (key == option.type) {
						this.TabCur = index;
						return;
					}
					index++;
				});
				this.type = option.type;
			} else {
				this.type = Array.from(this.StatusEnumMap.keys())[0];
			}
		},
		onShow() {
			this.typeTab(this.TabCur);
		},
		methods: {
			loadData(){
				global.$http.post('/car/info/carList', {
					params: {
						page: 1,
						pageSize: 1000,
						car_type: this.type
					},
				}).then(res => {
					if (res.status === "0") {
						this.cars = res.data.list;
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
			typeTab: function(index) {
				this.TabCur = index;
				this.type = Array.from(this.StatusEnumMap.keys())[index];
				this.cars = [];
				this.loadData();
			},
			toAdd: function(e){
				uni.navigateTo({
					url:'../work/saveCar'
				});
			},
			carDetail: function(car){
				uni.navigateTo({
					url: "../work/carDetail?id=" + car.id
				});
			}
		}
	}
</script>

<style scoped lang="scss">
.outer-box {
	width: 100%;
	min-height: calc(100vh - 90upx);
	background: #FFFFFF;
	.car-box {
		width: 33%;
		height: 140upx;
		float: left;
		margin: 0 auto;
		.jiao-img {
			text-align: center;
			width: 100%;
			height: 100upx;
			background: url(../../static/car/jiaoche.png) no-repeat;
			background-size: 150upx 150upx;
			background-position: 50% 20%;
		}
		.yue-img {
			text-align: center;
			width: 100%;
			height: 100upx;
			background: url(../../static/car/yueyeche.png) no-repeat;
			background-size: 150upx 150upx;
			background-position: 50% 20%;
		}
		.shang-img {
			text-align: center;
			width: 100%;
			height: 100upx;
			background: url(../../static/car/shangwuche.png) no-repeat;
			background-size: 150upx 150upx;
			background-position: 50% 20%;
		}
		.xiaoba-img {
			text-align: center;
			width: 100%;
			height: 100upx;
			background: url(../../static/car/jiaoche.png) no-repeat;
			background-size: 150upx 150upx;
			background-position: 50% 20%;
		}
		.daba-img {
			text-align: center;
			width: 100%;
			height: 100upx;
			background: url(../../static/car/daba.png) no-repeat;
			background-size: 150upx 150upx;
			background-position: 50% 20%;
		}
		.car-num {
			font-size: 28upx;
			text-align: center;
			color: #36BDBD;
		}
	}
}
</style>
