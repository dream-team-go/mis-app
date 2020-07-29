<template name="work">
	<view>
		<scroll-view scroll-y class="page">
			<cu-custom bgColor="bg-linear-blue">
				<block slot="content">工作台</block>
			</cu-custom>
			<view class="cu-bar bg-white solid-bottom margin-top" v-if="carCuIconListPermission.length > 0">
				<view class="action index-title">
					<image class="title-ico" src="../../static/car/car-title.png"></image> 用车管理
				</view>
			</view>
			<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']" v-if="carCuIconListPermission.length > 0">
				<view hover-class="navigator-hover" class="cu-item" v-for="(item,index) in carCuIconListPermission" :key="index" @tap="navigateTo(item.url)">
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
			
			<view class="cu-bar bg-white solid-bottom margin-top" v-if="maintainCuIconListPermission.length > 0">
				<view class="action index-title">
					<image class="title-ico" src="../../static/common/fix-car.png"></image> 车辆维修
				</view>
			</view>
			<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']" v-if="maintainCuIconListPermission.length > 0">
				<view hover-class="navigator-hover" class="cu-item" v-for="(item,index) in maintainCuIconListPermission" :key="index" @tap="navigateTo(item.url)">
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
			
			<view class="cu-bar bg-white solid-bottom margin-top" v-if="meetingCuIconListPermission.length > 0">
				<view class="action index-title">
					<image class="title-ico" src="../../static/common/house.png"></image> 会务管理
				</view>
			</view>
			<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']" v-if="meetingCuIconListPermission.length > 0">
				<view hover-class="navigator-hover" class="cu-item" v-for="(item,index) in meetingCuIconListPermission" :key="index" @tap="navigateTo(item.url)">
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
			
			<view class="cu-bar bg-white solid-bottom margin-top" v-if="foodCuIconListPermission.length > 0">
				<view class="action index-title">
					<image class="title-ico" src="../../static/common/food.png"></image> 订餐管理
				</view>
			</view>
			<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']" v-if="foodCuIconListPermission.length > 0">
				<view hover-class="navigator-hover" class="cu-item" v-for="(item,index) in foodCuIconListPermission" :key="index" @tap="navigateTo(item.url)">
					<view>
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
					badge: 0,
					name: '车辆信息',
					url: "../work/carList",
					icoSrc: "../../static/common/car-info.png",
					permissionKey: "car:manage"
				}, {
					cuIcon: 'picfill',
					color: 'yellow',
					badge: 0,
					name: '司机信息',
					url: "../work/driverList",
					icoSrc: "../../static/common/driver-info.png",
					permissionKey: "driver:manage"
				}, {
					cuIcon: 'noticefill',
					color: 'olive',
					badge: 0,
					name: '用车记录',
					url: "../work/useCarRecordList",
					icoSrc: "../../static/common/record-info.png",
					permissionKey: "use_car:list"
				}, {
					cuIcon: 'noticefill',
					color: 'olive',
					badge: 0,
					name: '用车审批',
					url:"../work/checkUseCarRecordList",
					icoSrc: "../../static/common/shen-car.png",
					permissionKey: "use_car:sp"
				}, {
					cuIcon: 'upstagefill',
					color: 'cyan',
					badge: 0,
					name: '用车调度',
					url:"../work/dispatchUseCarRecordList",
					icoSrc: "../../static/common/dispatch.png",
					permissionKey: "use_car:dispatch"
				},{
					cuIcon: 'upstagefill',
					color: 'cyan',
					badge: 0,
					name: '我的派车单',
					url:"../work/dispatchCarOrderList",
					icoSrc: "../../static/common/car-record.png",
					permissionKey: "use_car:driver"
				}],
				maintainCuIconList:[{
					cuIcon: 'clothesfill',
					color: 'blue',
					badge: 0,
					name: '维修记录',
					url:"../work/repairRecordList",
					icoSrc: "../../static/common/fix-record.png",
					permissionKey: "fix_car:list"
				},{
					cuIcon: 'clothesfill',
					color: 'blue',
					badge: 0,
					name: '维修申请',
					url:"../work/myRepairRecordList",
					icoSrc: "../../static/common/fix-apply.png",
					permissionKey: "fix_car:apply"
				}, {
					cuIcon: 'discoverfill',
					color: 'purple',
					badge: 0,
					name: '组长审批',
					url:"../work/foremanRepairRecordList",
					icoSrc: "../../static/common/shenpi.png",
					permissionKey: "fix_car:zzsp"
				}, {
					cuIcon: 'questionfill',
					color: 'mauve',
					badge: 0,
					name: '维修单',
					url:"../work/wxcRepairRecordList",
					icoSrc: "../../static/common/fix-order.png",
					permissionKey: "fix_car:shop"
				}, {
					cuIcon: 'questionfill',
					color: 'mauve',
					badge: 0,
					name: '主任审批',
					url:"../work/directorRepairRecordList",
					icoSrc: "../../static/common/shenpi.png",
					permissionKey: "fix_car:zrsp"
				}, {
					cuIcon: 'questionfill',
					color: 'mauve',
					badge: 0,
					name: '局长审批',
					url:"../work/secretaryRepairRecordList",
					icoSrc: "../../static/common/shenpi.png",
					permissionKey: "fix_car:jzsp"
				}],
				meetingCuIconList: [{
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 0,
					name: '会议室信息',
					url: "../work/meetingList",
					icoSrc: "../../static/common/house.png",
					permissionKey: "meeting:manage"
				}, {
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 0,
					name: '会议记录',
					url: "../work/meetingRecordList",
					icoSrc: "../../static/common/fix-record.png",
					permissionKey: "meeting:list"
				}, 
				// {
				// 	cuIcon: 'picfill',
				// 	color: 'yellow',
				// 	badge: 0,
				// 	name: '会议统计',
				// 	icoSrc: "../../static/common/tongji.png",
				//	permissionKey: ""
				// }
				],
				foodCuIconList: [{
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 0,
					name: '包房信息',
					url: "../work/foodList",
					icoSrc: "../../static/common/house.png",
					permissionKey: "dining:manage"
				}, {
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 0,
					name: '订餐记录',
					url: "../work/foodRecordList",
					icoSrc: "../../static/common/fix-record.png",
					permissionKey: "dining:list"
				}, {
					cuIcon: 'picfill',
					color: 'yellow',
					badge: 0,
					name: '工作餐记录',
					url: "../work/leaderBookFoodList",
					icoSrc: "../../static/common/record-info.png",
					permissionKey: "dining_lead:manage"
				},
				{
				 	cuIcon: 'picfill',
				 	color: 'yellow',
				 	badge: 0,
				 	name: '我的工作餐',
					url: "../work/myLeaderBookFoodList",
				 	icoSrc: "../../static/common/record-info.png",
					permissionKey: "dining_lead:order"
				}
				// {
				// 	cuIcon: 'picfill',
				// 	color: 'yellow',
				// 	badge: 0,
				// 	name: '工作餐统计',
				// 	icoSrc: "../../static/common/tongji.png",
				//	permissionKey: ""
				// }
				]
			};
		},
		computed: {
			...mapState(['userInfo']),
			carCuIconListPermission: function(){
				var list = [];
				for (var i = 0; i < this.carCuIconList.length; i++) {
					if(this.userInfo.key.includes(this.carCuIconList[i].permissionKey)){
						list.push(this.carCuIconList[i]);
					}
				}
				return list;
			},
			maintainCuIconListPermission: function(){
				var list = [];
				for (var i = 0; i < this.maintainCuIconList.length; i++) {
					if(this.userInfo.key.includes(this.maintainCuIconList[i].permissionKey)){
						list.push(this.maintainCuIconList[i]);
					}
				}
				return list;
			},
			meetingCuIconListPermission: function(){
				var list = [];
				for (var i = 0; i < this.meetingCuIconList.length; i++) {
					if(this.userInfo.key.includes(this.meetingCuIconList[i].permissionKey)){
						list.push(this.meetingCuIconList[i]);
					}
				}
				return list;
			},
			foodCuIconListPermission: function(){
				var list = [];
				for (var i = 0; i < this.foodCuIconList.length; i++) {
					if(this.userInfo.key.includes(this.foodCuIconList[i].permissionKey)){
						list.push(this.foodCuIconList[i]);
					}
				}
				return list;
			}
		},
		onLoad() {
			
		},
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
