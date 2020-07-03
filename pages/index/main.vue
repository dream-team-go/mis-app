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
			<view class="word-box">
				<image src="/static/home/words.png" class="word-img" mode="aspectFit"></image>
			</view>
			<view class="nav-bar">
				<view class="nav-item" v-for="(item, index) in navList" :key="index" @click="goPage(item)">
					<image class="nav-img" :src="item.img" mode="aspectFill"></image>
					<view class="name">
						{{ item.name }}
					</view>
				</view>
			</view>
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
			<view class="ads-box">
				通知：智慧机关上线啦！！！
			</view>
			<view class="notice-box">
				<view class="notice-title">
					<image class="notice-title-img" height="32rpx" width="32rpx" src="/static/main/zuji.png" mode=""></image>我的足迹
				</view>
				<view class="notice-main">
					<view class="notice-item" v-for="(item, index) in noticeList" :key="index" @click="goPage(item)">
						<image class="notice-item-img" :src="item.img" mode="aspectFill"></image>
						<view class="notice-item-content">
							<view class="notice-item-title">
								{{ item.title }}
							</view>
							<view class="notice-item-desc">
								{{ item.desc }}
							</view>
						</view>
					</view>
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
			],
			noticeList: [
				{
					img: '/static/tabbar/car_cur.png',
					title: '我的用车',
					desc: '统计用车信息',
					to: '/pages/car/index'
				},
				{
					img: '/static/tabbar/meeting_cur.png',
					title: '我的会务',
					desc: '统计会务信息',
					to: '/pages/meeting/index'
				},
				{
					img: '/static/tabbar/food_cur.png',
					title: '我的订餐',
					desc: '统计订餐信息',
					to: '/pages/food/index'
				},
				{
					img: '/static/main/message.png',
					title: '我的消息',
					desc: '消息记录',
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
		
		.word-box {
			position: absolute;
			top: 0;
			left: 0;
			
			.word-img {
				width: 90vw;
				height: 440rpx;
				margin-left: 5vw;
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
				margin: 20rpx 10rpx;
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
			margin: 20rpx;
			border-radius: 16rpx;
			padding: 20rpx;
			background-color: #fff;
			color: #44d7b6;
		}
		
		.notice-box {
			width: 100vw;
			background-color: #fff;
			
			.notice-title {
				padding: 20rpx;
				font-size: 28rpx;
				display: flex;
				align-items: center;
				border-bottom: 1rpx solid #ddd;
				
				.notice-title-img {
					height: 32rpx;
					width: 32rpx;
					margin-right: 16rpx;
				}
			}
			
			.notice-main {
				display: flex;
				flex-wrap: wrap;
				position: relative;
				
				&::before {
					content: '';
					height: 1rpx;
					width: 100%;
					background-color: #ddd;
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
				}
				
				&::after {
					content: '';
					width: 1rpx;
					height: 100%;
					background-color: #ddd;
					position: absolute;
					left: 50%;
					transform: translateX(-50%);
				}
				
				.notice-item {
					width: 50%;
					height: 160rpx;
					display: flex;
					align-items: center;
					padding: 32rpx 40rpx;
					
					.notice-item-img {
						height: 80rpx;
						width: 80rpx;
						margin-right: 24rpx;
					}
					
					.notice-item-content {
						/* display: flex;
						flex-direction: column;
						justify-content: space-around; */
						flex: 1;
						
						.notice-item-title {
							font-size: 28rpx;
							font-weight: bold;
							margin-bottom: 12rpx;
						}
						
						.notice-item-desc {
							font-size: 24rpx;
							color: #999;
						}
					}
				}
			}
		}
		
		.blank {
			height: 120rpx;
		}
	}
</style>
