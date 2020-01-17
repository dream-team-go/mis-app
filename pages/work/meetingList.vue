<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">会议室</block>
			<block slot="right" @tap="toAdd">新增</block>
		</cu-custom>
		<view class="outer-box">
			<!-- 循环这个box就好 -->
			<view class="room-box">
				<view class="img"></view>
				<view class="car-num">08室</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			toAdd: function(e){
				uni.navigateTo({
					url:'../work/saveFood'
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
	.room-box {
		width: 33%;
		height: 140upx;
		float: left;
		margin: 0 auto;
		.img {
			text-align: center;
			width: 100%;
			height: 100upx;
			background: url(../../static/common/meeting-room.png) no-repeat;
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

