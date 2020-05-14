<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">会议室</block>
			<block slot="right" @tap="toAdd">新增</block>
		</cu-custom>
		<!-- <view class="outer-box">
			<view class="room-box" v-for="room in rooms" :key="room.id" @click="roomDetail(room)">
				<view class="img"></view>
				<view class="car-num">{{room.number}}</view>
			</view>
		</view> -->
		
		<view class="cu-card case no-card margin-top" v-for="room in rooms" :key="room.id" @click="roomDetail(room)">
			<view class="cu-item shadow">
				<view class="image">
					<image :src="room.vr" mode="widthFix"></image>
					<view class="cu-tag bg-linear-blue">容纳{{room.capacity}}人</view>
					<!-- <view class="cu-bar bg-shadeBottom"> <text class="text-cut">我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。</text></view> -->
				</view>
				<view class="cu-list">
					<view class="cu-item">
						<view class="content flex-sub" style="padding: 15px;">
							<view style="font-size: 15px;font-weight: 900;color: #333;">{{room.name}} {{room.number}}</view>
							<view style="font-size: 15px;" class="text-gray text-sm flex justify-between">
								{{room.address}}
								<!-- <view class="text-gray text-sm">
									<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
									<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
									<text class="cuIcon-messagefill margin-lr-xs"></text> 30
								</view> -->
							</view>
						</view>
					</view>
				</view>
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
				global.$http.post('/meeting/info/meetingList', {
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
					url: "../work/meetingDetail?id=" + room.id
				});
			},
			toAdd: function(e){
				uni.navigateTo({
					url:'../work/saveMeeting'
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

