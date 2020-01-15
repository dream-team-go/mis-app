<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">车辆</block>
			<block slot="right" @tap="toAdd">新增</block>
		</cu-custom>
		<view class="outer-box">
			<!-- 循环这个box就好 -->
			<view class="car-box">
				<view class="jiao-img" v-show="type === 1 || type === 6"></view>
				<view class="shang-img" v-show="type === 2"></view>
				<view class="yue-img" v-show="type === 3"></view>
				<view class="daba-img" v-show="type === 4"></view>
				<view class="xiaoba-img" v-show="type === 5"></view>
				<view class="car-num">云A YY8888</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 1,
				
			}
		},
		methods: {
			toAdd: function(e){
				uni.navigateTo({
					url:'../work/saveCar'
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
		width: 25%;
		height: 120upx;
		float: left;
		margin: 0 auto;
		.jiao-img {
			text-align: center;
			width: 100%;
			height: 60upx;
			background: url(../../static/car/jiaoche.png) no-repeat;
			background-size: 80upx 80upx;
			background-position-x: 50%;
		}
		.yue-img {
			text-align: center;
			width: 100%;
			height: 60upx;
			background: url(../../static/car/yueyeche.png) no-repeat;
			background-size: 80upx 80upx;
			background-position-x: 50%;
		}
		.shang-img {
			text-align: center;
			width: 100%;
			height: 60upx;
			background: url(../../static/car/shangwuche.png) no-repeat;
			background-size: 80upx 80upx;
			background-position-x: 50%;
		}
		.xiaoba-img {
			text-align: center;
			width: 100%;
			height: 60upx;
			background: url(../../static/car/jiaoche.png) no-repeat;
			background-size: 80upx 80upx;
			background-position-x: 50%;
		}
		.daba-img {
			text-align: center;
			width: 100%;
			height: 60upx;
			background: url(../../static/car/daba.png) no-repeat;
			background-size: 80upx 80upx;
			background-position-x: 50%;
		}
		.car-num {
			font-size: 24upx;
			text-align: center;
			color: #36BDBD;
		}
	}
}
</style>
