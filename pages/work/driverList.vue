<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">司机</block>
		</cu-custom>
		<view class="p10">
			<view class="people-card"  v-for="driver in drivers" :key="driver.id" @click="driverDetail(driver)" >
				<view :class="driver.sex == 1 ? 'title-box blue' : 'title-box pink'">
					<text class="name" >{{driver.user_cn_name}}</text>
					<image src="../../static/common/next.png" class="arrow"></image>
				</view>
				<view class="info-box">
					<text class="label">电话：</text>
					<text class="info">{{driver.tel_no}}</text>
				</view>
				<view class="info-box">
					<text class="label">身份证：</text>
					<text class="info">{{driver.id_card}}</text>
				</view>
				<view class="info-box">
					<text class="label">证件类型：</text>
					<text class="info">{{driver.license_type}}</text>
				</view>
				<view class="info-box">
					<text class="label">驾龄：</text>
					<text class="info">{{driver.drive_age}}</text>
				</view>
			</view>
		</view>
		<uni-load-more :status="status" :content-text="contentText" />
	</view>
</template>

<script>
	import uniLoadMore from '@/colorui/components/uni-load-more.vue';
	export default {
		components: {
			uniLoadMore
		},
		onShow() {
			this.page = 1;
			this.drivers = [];
			this.loadData();
		},
		data() {
			return {
				page: 1,
				pageSize: 10,
				status: 'more',
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				drivers: []
			}
		},
		onReachBottom() {
			if(this.status !== "noMore"){
				this.status = 'more';
				this.loadData();
			}
		},
		methods: {
			loadData(){
				this.status = 'loading';
				global.$http.post('/car/driver/driverList', {
					params: {
						page: this.page,
						pageSize: this.pageSize
					},
				}).then(res => {
					if (res.status === "0") {
						if(res.data.totlePage <= this.page){
							this.status = 'noMore';
						}else{
							this.status = "more";
						}
						if(this.page === 1){
							this.drivers = res.data.list;
						}else{
							res.data.list.forEach(c=>{
								this.drivers.push(c);
							});
						}
						this.page++;
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
			driverDetail: function(driver){
				uni.navigateTo({
					url: "../work/driverDetail?id=" + driver.id,
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "style/mystyle.scss";
.people-card{
	width: 96%;
	min-height: 260upx;
	margin: 20upx auto 0;
	box-shadow: 1px 1px 6px rgba(0, 0, 0, .2);
	background: #FFFFFF;
	border-radius: 20upx;
	.pink {
		background: #ffc0cb;
	}
	.blue {
		background: #44d7b6;
	}
	.title-box {
		width: 100%;
		height: 56upx;
		border-top-left-radius:20upx;
		border-top-right-radius:20upx;
		padding: 0 20upx;
		line-height: 56upx;
		color: #FFFFFF;
		.arrow {
			float: right;
			width: 28upx;
			height: 28upx;
			margin: 12upx 10upx 0 0;
		}
	}
	.info-box {
		width: 100%;
		height: 48upx;
		line-height: 48upx;
		padding: 0 20upx;
		.label{
			float: left;
			margin-right: 4upx;
			font-size: 26upx;
			width: 132upx;
		}
		.info {
			float: left;
			color: #777676;
		}
	}
}
</style>
