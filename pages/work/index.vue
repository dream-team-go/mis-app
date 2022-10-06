<template name="work">
	<view>
		<scroll-view scroll-y class="page">
			<cu-custom bgColor="bg-linear-blue">
				<block slot="content">工作台</block>
			</cu-custom>
			<!-- <view class="cu-bar bg-white" v-if="carCuIconListPermission.length > 0">
				<view class="action index-title">
					<image class="title-ico" src="../../static/common/newIcon/car_record.png"></image>
					<text class="text-lg text-black text-bold">用车管理</text>
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
					<text class="cu-tag-text">{{item.name}}</text>
				</view>
			</view>
			
			<view class="cu-bar bg-white margin-top-xs" v-if="maintainCuIconListPermission.length > 0">
				<view class="action index-title">
					<image class="title-ico" src="../../static/common/newIcon/car_repair.png"></image>
					<text class="text-lg text-black text-bold">车辆维修</text>
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
					<text class="cu-tag-text">{{item.name}}</text>
				</view>
			</view> -->
			
			<view class="cu-bar bg-white margin-top-xs" v-if="meetingCuIconListPermission.length > 0">
				<view class="action index-title">
					<image class="title-ico" src="../../static/common/newIcon/meeting_record.png"></image>
					<text class="text-lg text-black text-bold">会务管理</text>
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
					
					<text class="cu-tag-text">{{item.name}}</text>
				</view>
			</view>
			
			<view class="cu-bar bg-white margin-top-xs" v-if="foodCuIconListPermission.length > 0">
				<view class="action index-title">
					<image class="title-ico" src="../../static/common/newIcon/food_record.png"></image> 
					<text class="text-lg text-black text-bold">订餐管理</text>
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
					<text class="cu-tag-text">{{item.name}}</text>
					</view>
				</view>
			</view>
			
			<view class="cu-bar bg-white margin-top-xs" v-if="receptionCuIconListPermission.length > 0">
				<view class="action index-title">
					<image class="title-ico" src="../../static/common/newIcon/reception.png"></image>
					<text class="text-lg text-black text-bold">接待管理</text>
				</view>
			</view>
			<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']" v-if="receptionCuIconListPermission.length > 0">
				<view hover-class="navigator-hover" class="cu-item" v-for="(item,index) in receptionCuIconListPermission" :key="index" @tap="navigateTo(item.url)">
					<view >
						<image :src="item.icoSrc" class="item-ico">
						<view class="cu-tag badge" v-if="item.badge!=0">
							<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
						</view>
						</image>
					</view>
					
					<text class="cu-tag-text">{{item.name}}</text>
				</view>
			</view>
			
			<view class="cu-bar bg-white margin-top-xs" v-if="lostFindCuIconListPermission.length > 0">
				<view class="action index-title">
					<image class="title-ico" src="../../static/common/newIcon/reception.png"></image>
					<text class="text-lg text-black text-bold">丢丢管理</text>
				</view>
			</view>
			<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']" v-if="lostFindCuIconListPermission.length > 0">
				<view hover-class="navigator-hover" class="cu-item" v-for="(item,index) in lostFindCuIconListPermission" :key="index" @tap="navigateTo(item.url)">
					<view >
						<image :src="item.icoSrc" class="item-ico">
						<view class="cu-tag badge" v-if="item.badge!=0">
							<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
						</view>
						</image>
					</view>
					
					<text class="cu-tag-text">{{item.name}}</text>
				</view>
			</view>
			
			
			<view class="cu-bar bg-white margin-top-xs" v-if="fixCuIconListPermission.length > 0">
				<view class="action index-title">
					<image class="title-ico" src="../../static/common/newIcon/reception.png"></image>
					<text class="text-lg text-black text-bold">精后勤管理</text>
				</view>
			</view>
			<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']" v-if="fixCuIconListPermission.length > 0">
				<view hover-class="navigator-hover" class="cu-item" v-for="(item,index) in fixCuIconListPermission" :key="index" @tap="navigateTo(item.url)">
					<view >
						<image :src="item.icoSrc" class="item-ico">
						<view class="cu-tag badge" v-if="item.badge!=0">
							<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
						</view>
						</image>
					</view>
					
					<text class="cu-tag-text">{{item.name}}</text>
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
					icoSrc: "../../static/common/newIcon/carInfo.png",
					permissionKey: "car:manage"
				}, {
					cuIcon: 'picfill',
					color: 'yellow',
					badge: 0,
					name: '司机信息',
					url: "../work/driverList",
					icoSrc: "../../static/common/newIcon/driverInfo.png",
					permissionKey: "driver:manage"
				}, {
					cuIcon: 'noticefill',
					color: 'olive',
					badge: 0,
					name: '用车记录',
					url: "../work/useCarRecordList",
					icoSrc: "../../static/common/newIcon/carRecordInfo.png",
					permissionKey: "use_car:list"
				}, {
					cuIcon: 'noticefill',
					color: 'olive',
					badge: 0,
					name: '用车审批',
					url:"../work/checkUseCarRecordList",
					icoSrc: "../../static/common/newIcon/carApproveInfo.png",
					permissionKey: "use_car:sp"
				}, {
					cuIcon: 'upstagefill',
					color: 'cyan',
					badge: 0,
					name: '用车调度',
					url:"../work/dispatchUseCarRecordList",
					icoSrc: "../../static/common/newIcon/carDispatchInfo.png",
					permissionKey: "use_car:dispatch"
				},{
					cuIcon: 'upstagefill',
					color: 'cyan',
					badge: 0,
					name: '我的派车单',
					url:"../work/dispatchCarOrderList",
					icoSrc: "../../static/common/newIcon/dispatchInfo.png",
					permissionKey: "use_car:driver"
				}],
				maintainCuIconList:[{
					cuIcon: 'clothesfill',
					color: 'blue',
					badge: 0,
					name: '维修记录',
					url:"../work/repairRecordList",
					icoSrc: "../../static/common/newIcon/repairRecordInfo.png",
					permissionKey: "fix_car:list"
				},{
					cuIcon: 'clothesfill',
					color: 'blue',
					badge: 0,
					name: '维修申请',
					url:"../work/myRepairRecordList",
					icoSrc: "../../static/common/newIcon/repairApplyInfo.png",
					permissionKey: "fix_car:apply"
				}, {
					cuIcon: 'questionfill',
					color: 'mauve',
					badge: 0,
					name: '维修单',
					url:"../work/wxcRepairRecordList",
					icoSrc: "../../static/common/newIcon/repairOrderInfo.png",
					permissionKey: "fix_car:shop"
				}, {
					cuIcon: 'discoverfill',
					color: 'purple',
					badge: 0,
					name: '组长审批',
					url:"../work/foremanRepairRecordList",
					icoSrc: "../../static/common/newIcon/zuzhangApproveInfo.png",
					permissionKey: "fix_car:zzsp"
				}, {
					cuIcon: 'questionfill',
					color: 'mauve',
					badge: 0,
					name: '主任审批',
					url:"../work/directorRepairRecordList",
					icoSrc: "../../static/common/newIcon/zhurenApproveInfo.png",
					permissionKey: "fix_car:zrsp"
				}, {
					cuIcon: 'questionfill',
					color: 'mauve',
					badge: 0,
					name: '局长审批',
					url:"../work/secretaryRepairRecordList",
					icoSrc: "../../static/common/newIcon/juzhangApproveInfo.png",
					permissionKey: "fix_car:jzsp"
				}],
				meetingCuIconList: [{
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 0,
					name: '会议室',
					url: "../work/meetingList",
					icoSrc: "../../static/common/newIcon/meetingInfo.png",
					permissionKey: "meeting:manage"
				}, {
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 0,
					name: '会议记录',
					url: "../work/meetingRecordList",
					icoSrc: "../../static/common/newIcon/meetingRecordInfo.png",
					permissionKey: "meeting:list"
				}, 
				{
					cuIcon: 'cardboardfill',
					color: 'yellow',
					badge: 0,
					name: '会议汇总展示',
					url: "../meeting/summaryDisplay",
					icoSrc: "../../static/common/newIcon/carDispatchInfo.png",
					permissionKey: "meeting:list"
				}],
				foodCuIconList: [{
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 0,
					name: '包房',
					url: "../work/foodList",
					icoSrc: "../../static/common/newIcon/foodInfo.png",
					permissionKey: "dining:manage"
				}, {
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 0,
					name: '订餐记录',
					url: "../work/foodRecordList",
					icoSrc: "../../static/common/newIcon/foodRecordInfo.png",
					permissionKey: "dining:list"
				}, {
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 0,
					name: '订餐汇总展示',
					url: "../food/summaryDisplay",
					icoSrc: "../../static/common/newIcon/carDispatchInfo.png",
					permissionKey: "dining:list"
				},{
					cuIcon: 'picfill',
					color: 'yellow',
					badge: 0,
					name: '工作餐记录',
					url: "../work/leaderBookFoodList",
					icoSrc: "../../static/common/newIcon/workFoodRecordInfo.png",
					permissionKey: "dining_lead:manage"
				}
				// ,
				// {
				//  	cuIcon: 'picfill',
				//  	color: 'yellow',
				//  	badge: 0,
				//  	name: '我的工作餐',
				// 	url: "../food/myLeaderBookFoodList",
				// 	icoSrc: "../../static/common/newIcon/workFoodInfo.png",
				// 	permissionKey: "dining_lead:order"
				// }
				// {
				// 	cuIcon: 'picfill',
				// 	color: 'yellow',
				// 	badge: 0,
				// 	name: '工作餐统计',
				// 	icoSrc: "../../static/common/tongji.png",
				//	permissionKey: ""
				// }
				],
				receptionCuIconList: [{
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 0,
					name: '主要领导审批',
					url: "../reception/receptionList",
					icoSrc: "../../static/common/newIcon/receptionInfo.png",
					permissionKey: "reception:sp"
				}, {
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 0,
					name: '分管领导审批',
					url: "../reception/subReceptionList",
					icoSrc: "../../static/common/newIcon/receptionInfo.png",
					permissionKey: "reception:fgsp"
				}, {
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 0,
					name: '接待任务',
					url: "../reception/receptionTaskList",
					icoSrc: "../../static/common/newIcon/receptionTaskInfo.png",
					permissionKey: "reception:task"
				}, {
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 0,
					name: '接待汇总展示',
					url: "../reception/summaryDisplay",
					icoSrc: "../../static/common/newIcon/carDispatchInfo.png",
					permissionKey: "reception:sp"
				}],
				lostFindCuIconList: [{
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 0,
					name: '失物招领',
					url: "../work/lostList",
					icoSrc: "../../static/common/newIcon/meetingInfo.png",
					permissionKey: "lost:manage"
				}, {
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 0,
					name: '寻物启事',
					url: "../work/findList",
					icoSrc: "../../static/common/newIcon/meetingRecordInfo.png",
					permissionKey: "find:manage"
				}],
				fixCuIconList: [{
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 0,
					name: '精后勤',
					url: "../work/fixList",
					icoSrc: "../../static/common/newIcon/meetingInfo.png",
					permissionKey: "lost:manage"
				}]
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
			},
			receptionCuIconListPermission: function(){
				var list = [];
				for (var i = 0; i < this.receptionCuIconList.length; i++) {
					if(this.userInfo.key.includes(this.receptionCuIconList[i].permissionKey)){
						list.push(this.receptionCuIconList[i]);
					}
				}
				return list;
			},
			lostFindCuIconListPermission: function(){
				var list = [];
				for (var i = 0; i < this.lostFindCuIconList.length; i++) {
					// if(this.userInfo.key.includes(this.lostFindCuIconList[i].permissionKey)){
					// 	list.push(this.lostFindCuIconList[i]);
					// }
					list.push(this.lostFindCuIconList[i]);
				}
				return list;
			},
			fixCuIconListPermission: function(){
				var list = [];
				for (var i = 0; i < this.fixCuIconList.length; i++) {
					// if(this.userInfo.key.includes(this.fixCuIconList[i].permissionKey)){
					// 	list.push(this.fixCuIconList[i]);
					// }
					list.push(this.fixCuIconList[i]);
				}
				return list;
			},
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
</style>
