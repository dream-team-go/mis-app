<template>
	<view>
		<view class="main-page">
			<swiper class="swiper" indicator-dots indicator-color="rgba(255, 255, 255, .3)" indicator-active-color="#fff" circular autoplay :interval="3000" :duration="500" @change="change">
				<swiper-item v-for="(item, index) in imgs" :key="index">
					<view class="swiper-item">
						<image class="swiper-img" mode="aspectFill" :src="item"></image>
					</view>
				</swiper-item>
			</swiper>
			<view class="grid-box">
				<view class="grid-item" v-for="(item, index) in grids" :key="index" @click="goPage(item)">
					<view class="grid-icon">
						<image height="160rpx" width="160rpx" :src="item.img" mode="aspectFill"></image>
					</view>
					<view class="grid-name">
						{{ item.name }}
					</view>
				</view>
			</view>
			<view class="nav-bar">
				<view class="nav-item" v-for="(item, index) in navList" :key="index" @click="goPage(item)">
					<image class="nav-img" :src="item.img" mode="aspectFill"></image>
					<view class="name">
						{{ item.name }}
					</view>
				</view>
			</view>
			<view class="ads-box">
				通知：智慧机关上线啦！！！
			</view>
			<view class="notice-box">
				<view class="notice-left">
					<view class="notice-left-top">
						<image style="width: 332rpx;height: 136rpx;" src="/static/notice1.png" mode="aspectFit"></image>
					</view>
					<view class="notice-left-bottom">
						<image style="width: 332rpx;height: 136rpx;" src="/static/notice2.png" mode="aspectFit"></image>
					</view>
				</view>
				<view class="notice-right">
					<image style="width: 332rpx;height: 292rpx;" src="/static/notice3.png" mode="aspectFit"></image>
				</view>
			</view>
			<view class="blank">
				
			</view>
		</view>
	</view>
</template>

<script >
export default {
	name: 'mainPage',
	data() {
		return {
			current: 0,
			dotsStyles: {
				backgroundColor: 'rgba(255, 255, 255, .3)',
				selectedBackgroundColor: '#fff',
				border: 'none',
				selectedBorder: 'none',
				bottom: '70px'
				
			},
			imgs: [
				'/static/home/photo-1.jpg',
				'/static/home/photo-2.jpg',
				'/static/home/photo-3.jpg',
				'/static/home/photo-4.jpg',
				'/static/home/photo-5.jpg'
			],
			navList: [
				{
					img: '/static/tabbar/car_cur.png',
					name: '用车',
					to: '/pages/car/index',
				},
				{
					img: '/static/tabbar/meeting_cur.png',
					name: '会务',
					to: '/pages/meeting/index',
				},
				{
					img: '/static/tabbar/food_cur.png',
					name: '订餐',
					to: '/pages/food/index',
				}
			],
			grids: [
				{
					img: '/static/main/bangongyongfang.png',
					name: '办公用房',
					to: ''
				},
				{
					img: '/static/main/zhouzhuanfang.png',
					name: '周转房',
					to: ''
				},
				{
					img: '/static/main/gudingzichanguanli.png',
					name: '固定资产',
					to: ''
				},
				{
					img: '/static/main/jiedaishenpi.png',
					name: '接待审批',
					to: ''
				},{
					img: '/static/main/chebian.png',
					name: '车编',
					to: ''
				},
				{
					img: '/static/main/wuguan.png',
					name: '物管',
					to: ''
				},
				{
					img: '/static/main/tongxunlu.png',
					name: '通讯录',
					to: '/pages/index/contacts'
				},
				{
					img: '/static/main/caiwu.png',
					name: '财务',
					to: ''
				}
			]
		}
	},
	methods: {
		change(e) {
			this.current = e.detail.current;
		},
		goPage (item) {
			if (!item.to) {
				uni.showToast({
					title: '敬请期待',
					icon: 'none'
				})
				return
			}
			uni.navigateTo({
				url: item.to
			})
		}
	}
}
</script>

<style lang='scss'>
	.main-page {
		min-height: 100vh;
		width: 100vw;
		overflow: hidden;
		position: relative;
		
		/deep/ .uni-swiper__dots-box {
			left: 38vw;
			bottom: 70px;
			right: auto;
		}
	
		.swiper {
			margin: 0 auto;
			width: 100vw;
			height: 500rpx;
			
			
			.swiper-item {
				.swiper-img {
					height: 500rpx;
				}
			}
			
			/deep/ .uni-swiper-dots {
				left: 8vw;
				bottom: 100rpx;
				transform: translate(0);
			}
			
			/deep/ .uni-swiper-dot {
				border-radius: 8px;
				transition: all .3s;
			}
			
			/deep/ .uni-swiper-dot-active {
				padding: 0 10rpx;
			}
		}
		
		.nav-bar {
			position: absolute;
			top: 420rpx;
			height: 160rpx;
			width: calc(100vw - 64rpx);
			left: 50%;
			transform: translateX(-50%);
			display: flex;
			justify-content: space-between;
			padding: 20rpx 60rpx;
			background-color: #fff;
			border-radius: 8rpx;
			box-shadow: 0px 8rpx 16rpx rgba(0,0,0,.15);
			
			.nav-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-between;
				
				.nav-img {
					width: 80rpx;
					height: 80rpx;
					object-fit: contain;
				}
				
				.name {
					font-size: 14px;
					text-align: center;
				}
			}
		}
		
		.grid-box {
			padding-top: 100rpx;
			display: flex;
			justify-content: space-around;
			flex-wrap: wrap;
			background-color: #fff;
			
			.grid-item {
				width: 160rpx;
				height: 140rpx;
				margin: 10rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;

				.grid-icon {
					display: flex;
					justify-content: center;
					align-items: center;
					
					uni-image {
						width: 48rpx;
						height: 48rpx;
					}
				}
				
				.grid-name {
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 24rpx;
					margin: 16rpx 0;
				}
			}
		}
		
		.ads-box {
			margin: 32rpx;
			border-radius: 16rpx;
			padding: 20rpx;
			background-color: #fff;
			color: #44d7b6;
		}
		
		.notice-box {
			width: 100vw;
			padding: 0 32rpx;
			display: flex;
			justify-content: space-between;
			
			.notice-left {
				width: 332rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				
				.notice-left-top, 
				.notice-left-bottom {
					border-radius: 20rpx;
					overflow: hidden;
				}
			}
			
			.notice-right {
				border-radius: 20rpx;
				overflow: hidden;
			}
		}
		
		.blank {
			height: 120rpx;
		}
	}
</style>
