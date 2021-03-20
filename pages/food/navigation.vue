<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="content">订餐</block>
		</cu-custom>

		<view class="cu-card">
			<view class="cu-item bg-img shadow-blur" :style="[{backgroundImage:'url('+item.img+')'}]"
				@tap="goPage(item)" v-for="(item,index) in permissionList" :key="index">
				<view class="cardTitle">
					{{item.title}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				list: [{
						title: '桌餐',
						img: 'https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg',
						url: '/pages/food/selectRoom',
						permissionKey: ""
					},
					{
						title: '工作餐',
						img: 'https://image.weilanwl.com/color2.0/plugin/wdh2236.jpg',
						url: '../plugin/animation',
						permissionKey: "dining_lead:order"
					},
					{
						title: '自助餐',
						img: 'https://image.weilanwl.com/color2.0/plugin/qpct2148.jpg',
						url: '../plugin/drawer',
						permissionKey: ""
					},
					{
						title: '外卖',
						img: 'https://image.weilanwl.com/color2.0/plugin/qpczdh2307.jpg',
						url: '../plugin/verticalnav',
						permissionKey: ""
					}
				]
			}
		},
		computed: {
			...mapState(['userInfo']),
			permissionList: function(){
				var showList = [];
				for (var i = 0; i < this.list.length; i++) {
					if(!this.list[i].permissionKey || this.userInfo.key.includes(this.list[i].permissionKey)){
						showList.push(this.list[i]);
					}
				}
				return showList;
			}
		},
		onLoad() {

		},
		methods: {
			goPage(item) {
				if (!item.url) {
					uni.showToast({
						title: '敬请期待',
						icon: 'none'
					})
					return
				}
				uni.navigateTo({
					url: item.url
				})
			}
		}
	}
</script>

<style>
	.cardTitle {
		color: #fff;
		padding: 90upx 60upx;
		font-size: 40upx;
		font-weight: 300;
		transform: skew(-10deg, 0deg);
		position: relative;
		text-shadow: 0px 0px 6upx rgba(0, 0, 0, 0.3);
		height: 140upx;
	}

	.cardTitle::before {
		content: "";
		position: absolute;
		width: 60upx;
		height: 6upx;
		border-radius: 20upx;
		background-color: #fff;
		display: block;
		top: 60upx;
		left: 50upx;
		transform: skew(10deg, 0deg);
	}

	/* .cardTitle::after {
		content: "";
		position: absolute;
		width: 140upx;
		border-radius: 6upx;
		height: 24upx;
		background-color: #fff;
		display: block;
		bottom: 76upx;
		left: 90upx;
		transform: skew(10deg, 0deg);
		opacity: 0.1;
	} */
</style>
