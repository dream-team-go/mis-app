<template name="work">
	<view>
		<scroll-view scroll-y class="page">
			<cu-custom bgColor="bg-linear-blue">
				<block slot="content">工作台</block>
			</cu-custom>
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action index-title">
					<image class="title-ico" src="../../static/car/car-title.png"></image> 用车管理
				</view>
			</view>
			<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
				<view hover-class="navigator-hover" class="cu-item" v-for="(item,index) in carCuIconList" :key="index" @tap="navigateTo(item.url)">
					<view>
						<image :src="item.icoSrc" class="item-ico">
						<view class="cu-tag badge" v-if="item.badge!=0">
							<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
						</view>
						</image>
					</view>
					<text>{{item.name}}</text>
				</view>
			</view>
			
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action index-title">
					<image class="title-ico" src="../../static/common/fix-car.png"></image> 车辆维修
				</view>
			</view>
			<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
				<view hover-class="navigator-hover" class="cu-item" v-for="(item,index) in maintainCuIconList" :key="index" @tap="navigateTo(item.url)">
					<view>
						<image :src="item.icoSrc" class="item-ico">
						<view class="cu-tag badge" v-if="item.badge!=0">
							<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
						</view>
						</image>
					</view>
					<text>{{item.name}}</text>
				</view>
			</view>
			
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action index-title">
					<image class="title-ico" src="../../static/common/house.png"></image> 会务管理
				</view>
			</view>
			<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
				<view hover-class="navigator-hover" class="cu-item" v-for="(item,index) in meetingCuIconList" :key="index" @tap="navigateTo(item.url)">
					<view >
						<image :src="item.icoSrc" class="item-ico">
						<view class="cu-tag badge" v-if="item.badge!=0">
							<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
						</view>
						</image>
					</view>
					
					<text>{{item.name}}</text>
				</view>
			</view>
			
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action index-title">
					<image class="title-ico" src="../../static/common/food.png"></image> 订餐管理
				</view>
			</view>
			<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
				<view hover-class="navigator-hover" class="cu-item" v-for="(item,index) in foodCuIconList" :key="index" @tap="navigateTo(item.url)">
					<view>
						<image :src="item.icoSrc" class="item-ico">
						<view class="cu-tag badge" v-if="item.badge!=0">
							<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
						</view>
						</image>
					</view>
					<text>{{item.name}}</text>
				</view>
			</view>
			<!-- <image src="../../static/common/car-info.png"></image> -->
			<view class="cu-tabbar-height"></view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		name: "work",
		data() {
			return {
				menuBorder: false,
				menuArrow: true,
				menuCard: true,
				gridCol: 3,
				gridBorder: false,
				carCuIconList: [{
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 120,
					name: '车辆信息',
					url: "../work/carList",
					icoSrc: "../../static/common/car-info.png"
				}, {
					cuIcon: 'picfill',
					color: 'yellow',
					badge: 0,
					name: '司机信息',
					url: "../work/driverList",
					icoSrc: "../../static/common/driver-info.png"
				}, {
					cuIcon: 'noticefill',
					color: 'olive',
					badge: 22,
					name: '用车记录',
					url: "../work/useCarRecordList",
					icoSrc: "../../static/common/record-info.png"
				}, {
					cuIcon: 'noticefill',
					color: 'olive',
					badge: 22,
					name: '用车审批',
					url:"../work/checkUseCarRecordList",
					icoSrc: "../../static/common/shen-car.png"
				}, {
					cuIcon: 'upstagefill',
					color: 'cyan',
					badge: 0,
					name: '用车调度',
					url:"../work/dispatchUseCarRecordList",
					icoSrc: "../../static/common/dispatch.png"
				},{
					cuIcon: 'upstagefill',
					color: 'cyan',
					badge: 0,
					name: '我的派车单',
					url:"../work/dispatchCarOrderList",
					icoSrc: "../../static/common/car-record.png"
				}],
				maintainCuIconList:[{
					cuIcon: 'clothesfill',
					color: 'blue',
					badge: 0,
					name: '维修记录',
					url:"../work/repairRecordList",
					icoSrc: "../../static/common/fix-record.png"
				},{
					cuIcon: 'clothesfill',
					color: 'blue',
					badge: 0,
					name: '维修申请',
					url:"../work/myRepairRecordList",
					icoSrc: "../../static/common/fix-apply.png"
				}, {
					cuIcon: 'discoverfill',
					color: 'purple',
					badge: 0,
					name: '组长审批',
					url:"../work/foremanRepairRecordList",
					icoSrc: "../../static/common/shenpi.png"
				}, {
					cuIcon: 'questionfill',
					color: 'mauve',
					badge: 0,
					name: '维修单',
					url:"../work/wxcRepairRecordList",
					icoSrc: "../../static/common/fix-order.png"
				}, {
					cuIcon: 'questionfill',
					color: 'mauve',
					badge: 0,
					name: '主任审批',
					url:"../work/directorRepairRecordList",
					icoSrc: "../../static/common/shenpi.png"
				}, {
					cuIcon: 'questionfill',
					color: 'mauve',
					badge: 0,
					name: '局长审批',
					url:"../work/secretaryRepairRecordList",
					icoSrc: "../../static/common/shenpi.png"
				}],
				meetingCuIconList: [{
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 120,
					name: '会议室信息',
					url: "../work/meetingList",
					icoSrc: "../../static/common/house.png"
				}, {
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 120,
					name: '会议记录',
					url: "../work/meetingRecordList",
					icoSrc: "../../static/common/meeting-record.png"
				}, 
				// {
				// 	cuIcon: 'picfill',
				// 	color: 'yellow',
				// 	badge: 0,
				// 	name: '会议统计',
				// 	icoSrc: "../../static/common/tongji.png"
				// }
				],
				foodCuIconList: [{
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 120,
					name: '包房信息',
					url: "../work/foodList",
					icoSrc: "../../static/common/house.png"
				}, {
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 120,
					name: '订餐记录',
					url: "../work/foodRecordList",
					icoSrc: "../../static/common/fix-record.png"
				}, {
					cuIcon: 'picfill',
					color: 'yellow',
					badge: 0,
					name: '领导订餐记录',
					url: "../work/leaderBookFoodList",
					icoSrc: "../../static/common/record-info.png"
				},
				{
				 	cuIcon: 'picfill',
				 	color: 'yellow',
				 	badge: 0,
				 	name: '我的领导订餐',
					url: "../work/myLeaderBookFoodList",
				 	icoSrc: "../../static/common/record-info.png"
				}
				// {
				// 	cuIcon: 'picfill',
				// 	color: 'yellow',
				// 	badge: 0,
				// 	name: '领导订餐统计',
				// 	icoSrc: "../../static/common/tongji.png"
				// }
				]
			};
		},
		computed: mapState(['userInfo']),
		methods: {
			toChild(e) {
				uni.navigateTo({
					url: e.currentTarget.dataset.url
				})
			},
			navigateTo(url){
				uni.navigateTo({
					url: url
				});
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import "style/mystyle.scss";
	.page {
		height: 100vh;
	}
	.item-ico {
		width: 48upx;
		height: 48upx;
	}
</style>
