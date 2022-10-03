<template>
	<view>
		<view class="main-page">
			<swiper class="swiper" indicator-dots indicator-color="rgba(255, 255, 255, .3)" indicator-active-color="#fff" circular autoplay :interval="3000" :duration="500" @change="change">
				<swiper-item v-for="(item, index) in mainData.imgs" :key="index">
					<view class="swiper-item">
						<image class="swiper-img" mode="aspectFill" :src="item"></image>
					</view>
					<!-- <view class="word-box">
						<image src="/static/home/words.png" class="word-img" mode="aspectFit"></image>
					</view> -->
				</swiper-item>
			</swiper>
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
						<image height="160upx" width="160upx" :src="item.img" mode="aspectFill"></image>
					</view>
					<view class="grid-name">
						{{ item.name }}
					</view>
				</view>
			</view>
			<view class="ads-box">
				{{mainData.inform}}
			</view>
			<view class="notice-box">
				<view class="notice-title text-bold">
					<!-- <image class="notice-title-img" src="/static/common/newIcon/track.png" mode=""></image> -->
					我的足迹
				</view>
				<view class="notice-main">
					<view class="notice-item" v-for="(item, index) in noticeList" :key="index" @click="goPage(item)">
						<image class="notice-item-img" :src="item.img" mode="aspectFill"></image>
						<view class="notice-item-content">
							<view class="notice-item-title">
								{{ item.title }}
							</view>
							<view class="notice-item-desc">
								{{item.desc}}
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
	props: ['mainData'],
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
				// {
				// 	img: '/static/common/newIcon/car.png',
				// 	name: '用车',
				// 	to: '/pages/car/bookCar',
				// },
				{
					img: '/static/common/newIcon/meeting.png',
					name: '会务',
					to: '/pages/meeting/navigation',
				},
				{
					img: '/static/common/newIcon/food.png',
					name: '订餐',
					to: '/pages/food/navigation',
				}
			],
			grids: [
				{
					img: '/static/common/newIcon/contactsInfo.png',
					name: '电话簿',
					to: '/pages/index/contacts'
				},
				{
					img: '/static/common/newIcon/receptionInfo.png',
					name: '接待申请',
					to: '/pages/reception/saveReception'
				},
				{
					img: '/static/common/newIcon/planInfo.png',
					name: '精后勤',
					to: '/pages/index/plan'
				},
				{
					img: '/static/common/newIcon/contactsInfo.png',
					name: '失物招领',
					to: '/pages/lost/allLostList'
				},
				{
					img: '/static/common/newIcon/receptionInfo.png',
					name: '寻物启事',
					to: '/pages/reception/saveReception'
				},
				{
					img: '/static/common/newIcon/planInfo.png',
					name: '规划',
					to: '/pages/index/plan'
				}
			],
			noticeList: [
				// {
				// 	img: '/static/common/newIcon/car_record.png',
				// 	title: '我的用车',
				// 	desc: '统计用车信息',
				// 	to: '/pages/car/index'
				// },
				{
					img: '/static/common/newIcon/meeting_record.png',
					title: '我的会务',
					desc: '统计会务信息',
					to: '/pages/meeting/index'
				},
				{
					img: '/static/common/newIcon/food_record.png',
					title: '我的订餐',
					desc: '统计订餐信息',
					to: '/pages/food/index'
				},
				{
					img: '/static/common/newIcon/reception.png',
					title: '我的接待',
					desc: '统计接待信息',
					to: '/pages/reception/myReceptionList'
				},
				{
					img: '/static/common/newIcon/reception.png',
					title: '我的失物招领',
					desc: '失物招领信息',
					to: '/pages/lost/myLostList'
				},
				{
					img: '/static/common/newIcon/message_record.png',
					title: '我的消息',
					desc: '接收消息记录',
					to: '/pages/user/warnList'
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
			height: 500upx;
			
			
			.swiper-item {
				.swiper-img {
					height: 500upx;
				}
			}
			
			/deep/ .uni-swiper-dots {
				left: 8vw;
				bottom: 100upx;
				transform: translate(0);
			}
			
			/deep/ .uni-swiper-dot {
				border-radius: 8px;
				transition: all .3s;
			}
			
			/deep/ .uni-swiper-dot-active {
				padding: 0 10upx;
			}
		}
		
		.word-box {
			position: absolute;
			top: 0;
			left: 0;
			
			.word-img {
				width: 90vw;
				height: 440upx;
				margin-left: 5vw;
			}
		}
		
		.nav-bar {
			position: absolute;
			top: 420upx;
			height: 160upx;
			/* width: calc(100vw - 80upx); */
			width: calc(100vw - 140upx);
			left: 50%;
			transform: translateX(-50%);
			display: flex;
			justify-content: space-between;
			/* padding: 15upx 85upx; */
			padding: 15upx 130upx;
			background-color: #fff;
			border-radius: 8upx;
			box-shadow: 0px 8upx 16upx rgba(0,0,0,.15);
			
			.nav-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-between;
				
				.nav-img {
					width: 90upx;
					height: 90upx;
					object-fit: contain;
				}
				
				.name {
					font-size: 29upx;
					text-align: center;
				}
			}
		}
		
		.grid-box {
			padding-top: 100upx;
			display: flex;
			justify-content: space-around;
			flex-wrap: wrap;
			background-color: #ffffff;
			
			.grid-item {
				width: 160upx;
				height: 130upx;
				margin: 20upx 10upx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;

				.grid-icon {
					display: flex;
					justify-content: center;
					align-items: center;
					
					uni-image {
						width: 80upx;
						height: 80upx;
					}
				}
				
				.grid-name {
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 29upx;
					margin: 13upx 0;
				}
			}
		}
		
		.ads-box {
			margin: 20upx;
			border-radius: 16upx;
			padding: 20upx;
			background-color: #fff;
			color: #36bdbd;
		}
		
		.notice-box {
			width: 100vw;
			background-color: #fff;
			
			.notice-title {
				padding: 20upx 40upx;
				font-size: 34upx;
				color: #000000;
				display: flex;
				align-items: center;
				/* border-bottom: 1upx solid #ddd; */
				
				.notice-title-img {
					height: 50upx;
					width: 50upx;
					margin-right: 16upx;
				}
			}
			
			.notice-main {
				display: flex;
				flex-wrap: wrap;
				position: relative;
				
				.notice-item {
					width: 50%;
					height: 120upx;
					display: flex;
					align-items: center;
					padding: 20upx 40upx;
					
					.notice-item-img {
						height: 70upx;
						width: 70upx;
						margin-right: 24upx;
					}
					
					.notice-item-content {
						/* display: flex;
						flex-direction: column;
						justify-content: space-around; */
						flex: 1;
						
						.notice-item-title {
							font-size: 32upx;
							margin-bottom: 10upx;
						}
						
						.notice-item-desc {
							font-size: 28upx;
							color: #aaaaaa;
						}
					}
				}
			}
		}
		
		.blank {
			height: 120upx;
		}
	}
</style>
