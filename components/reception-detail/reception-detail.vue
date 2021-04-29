<template>
	<view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<image src="../../static/common/newIcon/reception.png"></image>
				<text class="text-lg text-black">申请进度</text>
			</view>
			<view class="action right text-food">{{getStatusStr(record.status)}}</view>
		</view>
		<view class="cu-bar bg-white solid-bottom" v-if="record.status != -1 && record.sp_status == 1">
			<view class="action">
				主要领导审批意见：
				<text class="text-red">{{record.spr_advise}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom" v-if="record.status != -1 && record.sp_status == 1">
			<view class="action">
				主要领导审批日期：
				<text class="text-red">{{record.sp_date.substring(0, 10)}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom" v-if="record.status != -1 && record.fg_sp_status == 1">
			<view class="action">
				分管领导审批意见：
				<text class="text-red">{{record.fg_spr_advise}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom" v-if="record.status != -1 && record.fg_sp_status == 1">
			<view class="action">
				分管领导审批日期：
				<text class="text-red">{{record.fg_sp_date.substring(0, 10)}}</text>
			</view>
		</view>
		<!-- <view class="cu-bar bg-white solid-bottom" v-if="record.status == 1">
			<image :src="record.spr_sign" style="width: 100%;height: 300upx;"></image>
		</view> -->
		<view class="cu-bar bg-white solid-bottom" v-if="record.status == -1">
			<view class="action">
				驳回原因：
				<text class="text-red">{{record.fail_reason}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top-xs">
			<view class="action">
				接待对象：
				<text class="text-black">{{record.jd_object}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				接待事由：
				<text class="text-black">{{record.jd_reason}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				接待类型：
				<text class="text-black">{{getTypeStr(record.jd_type)}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				拟接待日期：
				<text class="text-black">{{record.jd_date ? record.jd_date.substring(0,10) : ""}}</text>
			</view>
		</view>

		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				拟人数：
				<text class="text-black">{{record.jd_num}}</text>
			</view>
		</view>

		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				备注：
				<text class="text-black">{{record.bz}}</text>
			</view>
		</view>

		<view class="cu-bar bg-white solid-bottom margin-top-xs">
			<view class="action">
				接待依据：
				<text class="text-black">{{getJdyjTypeStr(record.jdyj_type)}}</text>
			</view>
		</view>

		<view class="cu-bar bg-white solid-bottom" v-if="record.jdyj_type == 1 || record.jdyj_type == 2">
			<view class="action">
				文件：
				<text class="text-blue" @tap="downLoadfile(record.jdyj_fj)">{{record.jdyj_fj_name}}</text>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				联系人：
				<text class="text-black">{{record.lxr_xm}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				联系电话：
				<text class="text-black">{{record.lxr_tel}}</text>
			</view>
		</view>

		<view class="cu-bar bg-white solid-bottom margin-top-xs">
			<view class="action">
				用餐地点建议：
				<text class="text-black">{{record.jdap_dining}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				住宿安排建议：
				<text class="text-black">{{record.jdap_hotel}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				其他：
				<text class="text-black">{{record.jdap_other}}</text>
			</view>
		</view>
		
		<view class="cu-bar bg-white margin-top-xs">
			<view class="action">
				接待员：
			</view>
		</view>
		<view class="bg-white padding-bottom">
			<view class="cu-bar bg-white" style="min-height: 50upx;" v-for="item in record.jd_users" :key="item.user_id">
				<view class="action">
					<text class="text-black" style="position: absolute;left: 156upx;">{{item.user_cn_name}}</text>
					<text style="position: absolute;left: 360upx;" @tap="makePhoneCall(item.tel_no)">
						<image src="../../static/common/phone.png" class="ico"
							style="width: 30upx;height: 30upx;vertical-align: middle;"></image>
						<text class="text-black" style="vertical-align: middle;">{{item.tel_no}}</text>
					</text>
				</view>
			</view>
		</view>

		<view class="cu-bar bg-white solid-bottom margin-top-xs">
			<view class="action">
				预定人：
				<text class="text-black">{{record.create_user_name}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				预定时间：
				<text class="text-black">{{record.create_time}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import misEnum from '../../common/mis-enum.js';
	export default {
		name: "reception-detail",
		props: {
			record: {}
		},
		data() {
			return {

			};
		},
		methods: {
			getJdUserNames(jd_users){
				var names = [];
				if(jd_users){
					jd_users.forEach(c=>{
						names.push(c.user_cn_name);
					});
				}
				return names.join("、");
			},
			getTypeStr(status) {
				return misEnum.ReceptionTypeEnumMap.get(status);
			},
			getJdyjTypeStr(status) {
				return misEnum.ReceptionGistEnumMap.get(status);
			},
			getStatusStr(status) {
				return misEnum.ReceptionStatusEnumMap.get(status);
			},
			downLoadfile: function(url) {
				uni.showLoading({
					title: '下载中',
					mask: false
				});
				uni.downloadFile({
					url: url,
					success: (res) => {
						if (res.tempFilePath) {
							uni.hideLoading();
							var filePath = res.tempFilePath;
							uni.openDocument({
							    filePath: filePath,  
							    success: function(res) {  
							        console.log('打开文档成功,download');  
							    }  
							}); 
						}
					}
				});
			}
		}
	}
</script>

<style>
	
</style>
