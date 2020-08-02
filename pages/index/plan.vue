<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			
			<block slot="content">未来规划</block>
		</cu-custom>
		<view class="main-page">
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
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
						img: '/static/main/caiwu.png',
						name: '财务',
						to: ''
					}
				],
			}
		},
		methods: {
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
		
		
		
		.grid-box {
			display: flex;
			justify-content: space-around;
			flex-wrap: wrap;
			background-color: #fff;
			
			.grid-item {
				width: 160upx;
				height: 140upx;
				margin: 20upx 10upx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;

				.grid-icon {
					display: flex;
					justify-content: center;
					align-items: center;
					
					uni-image {
						width: 60upx;
						height: 60upx;
					}
				}
				
				.grid-name {
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 28upx;
					margin: 16upx 0;
					color: #333333;
				}
			}
		}
		
		.ads-box {
			margin: 20upx;
			border-radius: 16upx;
			padding: 20upx;
			background-color: #fff;
			color: #44d7b6;
		}
		
		.notice-box {
			width: 100vw;
			background-color: #fff;
			
			.notice-title {
				padding: 20upx;
				font-size: 28upx;
				display: flex;
				align-items: center;
				border-bottom: 1upx solid #ddd;
				
				.notice-title-img {
					height: 32upx;
					width: 32upx;
					margin-right: 16upx;
				}
			}
			
			.notice-main {
				display: flex;
				flex-wrap: wrap;
				position: relative;
				
				&::before {
					content: '';
					height: 1upx;
					width: 100%;
					background-color: #ddd;
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
				}
				
				&::after {
					content: '';
					width: 1upx;
					height: 100%;
					background-color: #ddd;
					position: absolute;
					left: 50%;
					transform: translateX(-50%);
				}
				
				.notice-item {
					width: 50%;
					height: 160upx;
					display: flex;
					align-items: center;
					padding: 32upx 40upx;
					
					.notice-item-img {
						height: 80upx;
						width: 80upx;
						margin-right: 24upx;
					}
					
					.notice-item-content {
						/* display: flex;
						flex-direction: column;
						justify-content: space-around; */
						flex: 1;
						
						.notice-item-title {
							font-size: 28upx;
							font-weight: bold;
							margin-bottom: 12upx;
						}
						
						.notice-item-desc {
							font-size: 24upx;
							color: #999;
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
