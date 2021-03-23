<template>
	<view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<image src="../../static/common/newIcon/food_record.png"></image>
				<text class="text-lg text-black">预定进度</text>
			</view>
			<view class="action right text-food">{{statusDesc}}</view>
		</view>
		<view class="cu-bar bg-white solid-bottom" v-if="info.cd_status != 0">
			<view class="action">
				菜单状态：
				<text class="text-orange">{{cdStatusDesc}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom" v-if="info.cd_status != 0 && info.cd_message">
			<view class="action">
				菜单建议：
				<text class="text-orange">{{info.cd_message}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom" v-if="info.status == -1">
			<view class="action">
				驳回原因：
				<text class="text-red">{{info.fail_reason}}</text>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom margin-top-xs">
			<view class="action">
				订餐原由：
				<text class="text-black text-bold">{{info.desc}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				楼房：
				<text class="text-black">{{info.building_name}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				包房：
				<text class="text-black">{{info.room_number}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				订餐单位：
				<text class="text-black">{{info.order_org}}</text>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				联系人：
				<text class="text-black">{{info.user_name}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				联系电话：
				<text class="text-black">{{info.user_tel}}</text>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom margin-top-xs">
			<view class="action">
				用餐日期：
				<text class="text-black">{{ydrqShort}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				午/晚餐：
				<text class="text-black">{{info.ydsjd == 1 ? "午餐" : "晚餐"}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				上菜时间：
				<text class="text-black">{{mealTime}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				用餐人数：
				<text class="text-black">{{info.people_num}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				清真人数：
				<text class="text-black">{{info.has_hz}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top-xs" v-if="info.meal_spec != null">
			<view class="action">
				用餐标准：
				<text class="text-black">{{info.meal_spec}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				接待对象：
				<text class="text-black">{{info.receive_people}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom" v-if="info.lender != null">
			<view class="action">
				陪同领导：
				<text class="text-black">{{info.lender}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom" v-if="info.meal_request != null">
			<view class="action">
				特殊要求：
				<text class="text-black">{{info.meal_request}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				预定人：
				<text class="text-black">{{info.create_user}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				预定时间：
				<text class="text-black">{{info.create_time}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import misEnum from '../../common/mis-enum.js';
	export default {
		name:"food-detail",
		props: {
			info: {}
		},
		data() {
			return {
				
			};
		},
		computed: {
			statusDesc: function(){
				return misEnum.FoodRecordEnumMap.get(this.info.status);
			},
			cdStatusDesc: function(){
				return misEnum.FoodMenuEnumMap.get(this.info.cd_status);
			},
			mealTime: function(){
				return this.info.meal_time.substring(11, 16);
			},
			ydrqShort: function(){
				return this.info.ydrq.substring(0, 10);
			}
		}
	}
</script>

<style>

</style>
