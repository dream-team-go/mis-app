<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">包房</block>
			<block slot="right" @tap="toAdd">新增</block>
		</cu-custom>
		
		<!-- <scroll-view scroll-x class="bg-white nav text-center">
			<view class="cu-item" :class="index==TabCur?'text-white cur':''" v-for="(item,index) in Array.from(StatusEnumMap.keys()).length"
			 :key="index" @tap="typeTab(index)">
				{{Array.from(StatusEnumMap.values())[index]}}
			</view>
		</scroll-view> -->
		<view class="outer-box">
			<!-- 循环这个box就好 -->
			<view class="room-box" v-for="room in rooms" :key="room.id" @click="roomDetail(room)">
				<view class="img"></view>
				<view class="car-num">{{room.number}}</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rooms: []
			}
		},
		onLoad() {
		},
		onShow() {
			//获取会议室所属办公楼房信息
			
			this.loadData();
		},
		methods: {
			loadData(){
				global.$http.post('/dining/info/diningList', {
					params: {
						page: 1,
						pageSize: 1000
					},
				}).then(res => {
					if (res.status === "0") {
						this.rooms = res.data.list;
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
			roomDetail: function(room){
				uni.navigateTo({
					url: "../work/foodDetail?id=" + room.id
				});
			},
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
			background-size: 90upx 90upx;
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

