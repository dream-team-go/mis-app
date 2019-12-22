<template name="work">
	<view>
		<scroll-view scroll-y class="page">
			<cu-custom bgColor="bg-gradual-blue">
				<block slot="content">工作台</block>
			</cu-custom>
			
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 用车管理
				</view>
			</view>
			<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
				<view class="cu-item" v-for="(item,index) in carCuIconList" :key="index">
					<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
						<view class="cu-tag badge" v-if="item.badge!=0">
							<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
						</view>
					</view>
					<text>{{item.name}}</text>
				</view>
			</view>
			
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 会务管理
				</view>
			</view>
			<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
				<view hover-class="navigator-hover" class="cu-item" v-for="(item,index) in meetingCuIconList" :key="index" @tap="navigateTo(item.url)">
					<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
						<view class="cu-tag badge" v-if="item.badge!=0">
							<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
						</view>
					</view>
					<text>{{item.name}}</text>
				</view>
			</view>
			
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 订餐管理
				</view>
			</view>
			<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
				<view hover-class="navigator-hover" class="cu-item" v-for="(item,index) in foodCuIconList" :key="index" @tap="navigateTo(item.url)">
					<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
						<view class="cu-tag badge" v-if="item.badge!=0">
							<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
						</view>
					</view>
					<text>{{item.name}}</text>
				</view>
			</view>
			
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
					name: '车辆信息'
				}, {
					cuIcon: 'picfill',
					color: 'yellow',
					badge: 0,
					name: '司机信息'
				}, {
					cuIcon: 'noticefill',
					color: 'olive',
					badge: 22,
					name: '用车审批'
				}, {
					cuIcon: 'upstagefill',
					color: 'cyan',
					badge: 0,
					name: '用车调度'
				}, {
					cuIcon: 'clothesfill',
					color: 'blue',
					badge: 0,
					name: '维修申请'
				}, {
					cuIcon: 'discoverfill',
					color: 'purple',
					badge: 0,
					name: '组长审批'
				}, {
					cuIcon: 'questionfill',
					color: 'mauve',
					badge: 0,
					name: '维修单'
				}, {
					cuIcon: 'questionfill',
					color: 'mauve',
					badge: 0,
					name: '主任审批'
				}, {
					cuIcon: 'questionfill',
					color: 'mauve',
					badge: 0,
					name: '局长审批'
				}],
				meetingCuIconList: [{
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 120,
					name: '会议室信息',
					url: ""
				}, {
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 120,
					name: '会议记录',
					url: "../work/meetingRecordList"
				}, {
					cuIcon: 'picfill',
					color: 'yellow',
					badge: 0,
					name: '会议统计'
				}],
				foodCuIconList: [{
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 120,
					name: '包房信息'
				}, {
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 120,
					name: '订餐记录',
					url: "../work/foodRecordList"
				}, {
					cuIcon: 'picfill',
					color: 'yellow',
					badge: 0,
					name: '订餐统计'
				}, {
					cuIcon: 'picfill',
					color: 'yellow',
					badge: 0,
					name: '领导订餐记录'
				}, {
					cuIcon: 'picfill',
					color: 'yellow',
					badge: 0,
					name: '领导订餐统计'
				}]
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

<style>
	.page {
		height: 100vh;
	}
</style>
