<template>
	<view>
		<view class="main-page">
			<view class="swiper-box">
				<swiper class="swiper" indicator-dots indicator-color="rgba(255, 255, 255, .3)" indicator-active-color="#fff" circular autoplay :interval="3000" :duration="500" @change="change">
					<swiper-item v-for="(item, index) in imgs" :key="index">
						<view class="swiper-item">
							<image class="swiper-img" mode="aspectFill" :src="item"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="blank">
				
			</view>
			<view class="nav-bar">
				<view class="nav-item" v-for="(item, index) in navList" :key="index" @click="goPage(item)">
					<image class="nav-img" :src="item.img" mode="aspectFill"></image>
					<view class="name">
						{{ item.name }}
					</view>
				</view>
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
				'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
				'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
				'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
				'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
				'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
				'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
				'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
			],
			navList: [
				{
					img: '/static/tabbar/car_cur.png',
					name: '用车',
					to: '../car/index',
				},
				{
					img: '/static/tabbar/meeting_cur.png',
					name: '会务',
					to: '../meeingt/index',
				},
				{
					img: '/static/tabbar/food_cur.png',
					name: '订餐',
					to: '../food/index',
				}
			]
		}
	},
	methods: {
		change(e) {
			this.current = e.detail.current;
		},
		goPage (item) {
			console.log(item)
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
		
		.blank {
			height: 500rpx;
		}
		
		.test {
			height: 100rpx;
			width: 100rpx;
			background-color: #f00;
			border-radius: 50%;
			overflow: hidden;
		}
		
		.swiper-box {
			position: absolute;
			top: 0;
			left: -30vw;
			width: 160vw;
			overflow: hidden;
			border-radius: 0 0 50% 50%;
		}
		
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
				bottom: 140rpx;
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
			top: 380rpx;
			height: 160rpx;
			width: 90vw;
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
					font-size: 12px;
					text-align: center;
				}
			}
		}
	}
</style>
