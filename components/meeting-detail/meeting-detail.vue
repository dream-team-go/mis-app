<template>
	<view>
		
		<view class="cu-bar bg-white">
			<view class="text-blue" style="margin-left: 70upx;" @tap="toFileList()">
				<text class="cuIcon-file text-bold"></text>
				<text class="text-lg">会议材料</text>
			</view>
			<view class="text-blue" @tap="toOrgList()">
				<text class="cuIcon-home text-bold"></text>
				<text class="text-lg">参会单位</text>
			</view>
			
			<view class="text-blue" style="margin-right: 70upx;" @tap="toSignList()">
				<text class="cuIcon-text text-bold"></text>
				<text class="text-lg">签到记录</text>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom margin-top-xs" v-if="record.meeting_pwd">
			<view class="action">
				会议密码：
				<text class="text-black text-bold">{{record.meeting_pwd}}</text>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom margin-top-xs">
			<view class="action">
				<image src="../../static/common/newIcon/meeting_record.png"></image>
				<text class="text-lg text-black">预定进度</text>
			</view>
			<view class="action right text-food">{{statusDesc}}</view>
		</view>
		<view class="bg-white padding" v-if="record.status == -1">
			<text>驳回原因：</text>
			<text class="text-food">{{record.fail_reason}}</text>
		</view>
		<view class="bg-white padding" v-if="record.sqxg_status != 0">
			<text>申请修改原因：</text>
			<text class="text-food">{{record.sqxg_reason}}</text>
		</view>
		
		<view class="bg-white padding" style="margin-top: -40upx;" v-if="record.sqxg_status != 0">
			<text>申请修改状态：</text>
			<text class="text-orange">{{sqxgStatusDesc}}</text>
		</view>
		<!-- <view class="bg-white padding">
			<view class="cu-steps">
				<view class="cu-item" :class="item.color" v-for="(item,index) in steps" :key="index">
					<text :class="'cuIcon-' + item.cuIcon"></text> {{item.name}}
				</view>
			</view>
		</view> -->
		<view class="cu-bar bg-white solid-bottom margin-top-xs">
			<view class="action">
				会议名称：
				<text class="text-black">{{record.desc}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				主办单位：
				<text class="text-black">{{record.host_unit}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				楼房：
				<text class="text-black">{{record.building_name}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				会议室：
				<text class="text-black">{{record.room_number}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				会议日期：
				<text class="text-black">{{record.ydrq}}({{GetWeekDay(record.ydrq)}})</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				上/下午：
				<text class="text-black">{{record.ydsjd == 1 ? "上午" : "下午"}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				会议时间：
				<text class="text-black">{{record.start_time ? record.start_time.substring(11,16) : ''}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				参会人数：
				<text class="text-black">{{record.people_num}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				联系人：
				<text class="text-black">{{record.user_name}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				联系电话：
				<text class="text-black">{{record.user_tel}}</text>
			</view>
		</view>

		<view class="cu-bar bg-white solid-bottom margin-top-xs">
			<view class="action">
				是否需要布标：
				<text class="text-black">{{record.bb == 1 ? "是" : "否"}}</text>
			</view>
		</view>

		<view class="cu-bar bg-white solid-bottom" v-show="record.bb == 1">
			<view class="action">
				布标名称：
				<text class="text-black">{{record.bb_name}}</text>
			</view>
		</view>

		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				是否需要电子屏：
				<text class="text-black">{{record.led == 1 ? "是" : "否"}}</text>
			</view>
		</view>

		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				是否需要视频会议：
				<text class="text-black">{{record.net_meeting == 1 ? "是" : "否"}}</text>
			</view>
		</view>

		<view class="cu-bar bg-white solid-bottom margin-top-xs">
			<view class="action">
				主席台桌子数：
				<text class="text-black">{{record.plat_table_num}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				桌子形式：
				<text class="text-black">{{record.table_type_name}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				主席台人数：
				<text class="text-black">{{record.plat_person_num}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				席位名单：
				<text class="text-black">{{record.name_list}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top-xs">
			<view class="action">
				会议服务内容：
				<text class="text-black">{{serviceName}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				瓶装水550ml(件)：
				<text class="text-black">{{record.large_water_num}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				瓶装水350ml(件)：
				<text class="text-black">{{record.small_water_num}}</text>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				会务员：
				<text class="text-black">{{peopleName}}</text>
			</view>
		</view>

		<view class="cu-bar bg-white solid-bottom" v-if="record.attend_leader != null">
			<view class="action">
				备注：
				<text class="text-black">{{record.attend_leader}}</text>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom margin-top-xs">
			<view class="action">
				预定人：
				<text class="text-black">{{record.create_user}}</text>
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
		name: "meeting-detail",
		props: {
			record: {}
		},
		computed: {
			serviceName: function(){
				var nameList = [];
				if(this.record.services){
					for (var i = 0; i < this.record.services.length; i++) {
						nameList.push(this.record.services[i].dic_name);
					}
				}
				return nameList.join("、");
			},
			peopleName: function(){
				var nameList = [];
				if(this.record.peoples){
					for (var i = 0; i < this.record.peoples.length; i++) {
						nameList.push(this.record.peoples[i].xm);
					}
				}
				return nameList.join("、");
			},
			statusDesc: function(){
				return misEnum.MeetingRecordEnumMap.get(this.record.status);
			},
			sqxgStatusDesc: function(){
				return misEnum.MeetingApplyEditEnumMap.get(this.record.sqxg_status);
			}
		},
		data() {
			return {
			}
		},
		methods: {
			GetWeekDay: function(e){
				return this.util.getWeekDay(new Date(e));
			},
			toFileList: function(){
				uni.navigateTo({
					url: '../meeting/meetingFile?meeting_record_id=' + this.record.id + '&is_can_edit=' + (this.record.is_can_edit == true && (this.record.status == 0 || this.record.status == 1))
				});
			},
			toOrgList: function(){
				uni.navigateTo({
					url: '../meeting/meetingOrg?meeting_record_id=' + this.record.id + '&is_can_edit=' + (this.record.is_can_edit == true && (this.record.status == 0 || this.record.status == 1))
				});
			},
			toSignList: function(){
				uni.navigateTo({
					url: '../meeting/signRecord?meeting_record_id=' + this.record.id
				});
			}
		}
	}
</script>

<style>

</style>
