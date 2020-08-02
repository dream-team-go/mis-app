<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			
			<block slot="content">会议预定详情</block>
		</cu-custom>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<image src="../../static/common/newIcon/meeting_record.png"></image>
				<text class="text-lg text-black">预约进度</text>
			</view>
		</view>
		<view class="bg-white padding">
			<view class="cu-steps">
				<view class="cu-item" :class="item.color" v-for="(item,index) in steps" :key="index">
					<text :class="'cuIcon-' + item.cuIcon"></text> {{item.name}}
				</view>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom" v-if="info.status == -1">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 失败原因：
				<text class="text-red">{{info.fail_reason}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 会议主题：
				<text class="text-black">{{info.desc}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 会议室：
				<text class="text-black">{{info.room_number}}({{info.building_name}})</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 会议时间：
				<text class="text-black">{{info.start_time}} — {{info.end_time}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 参会人数：
				<text class="text-black">{{info.people_num}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom" v-if="info.attend_leader != null">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 备注：
				<text class="text-black">{{info.attend_leader}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 预定人：
				<text class="text-black">{{info.user_name}}({{info.user_tel}})</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 预定时间：
				<text class="text-black">{{info.create_time}}</text>
			</view>
		</view>
<view class="bottom-btns-seat"></view>
		<view class="bottom-btns" v-if="info.status == 0">
			<view class="cancel" @click="verifyFail">审批不通过</view>
			<view class="pass" @click="verifySuccess">审批通过</view>
		</view>
		<!-- <view class="padding" v-if="info.status == 0" style="display: inline-flex;">
			<button class="cu-btn bg-red lg" @click="verifyFail">审核不通过</button>
		</view>

		<view class="padding" v-if="info.status == 0" style="display: inline-flex;float: right;">
			<button class="cu-btn bg-green lg" @click="verifySuccess">审批通过</button>
		</view> -->

		<view class="cu-modal" :class="showModal?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">审核不通过</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view>
					<view class="cu-form-group" style="text-align: left;">
						<textarea maxlength="100" @input="fillFailReason" placeholder="不通过原因"></textarea>
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-bluelight text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-linear-blue margin-left" @tap="sureModal">确定</button>
		
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import misEnum from '../../common/mis-enum.js';
	export default {
		data() {
			return {
				StatusEnumMap: misEnum.MeetingRecordEnumMap,
				steps: [],
				color: '',
				info: {},
				showModal: false,
				failReason: ""
			}
		},
		onLoad(option) {
			global.$http.post('/meeting/record/recordInfo', {
				params: {
					record_id: option.id
				},
			}).then(res => {
				if (res.status === "0") {
					this.info = res.data;
					//设置进度步骤
					if (this.info.status === 0) {
						this.color = 'text-cyan';
					} else if (this.info.status === -2) {
						this.color = 'text-orange';
					} else if (this.info.status === -1) {
						this.color = 'text-red';
					} else if (this.info.status === 1) {
						this.color = 'text-green';
					}
					var isFind = false;
					misEnum.MeetingRecordEnumMap.forEach((value, key, map) => {
						var cuIcon = '';
						var color = '';
						if (!isFind || key == this.info.status) {
							color = this.color;
						}
						if (key == this.info.status) {
							isFind = true;
						}
						if (key === 0) {
							cuIcon = 'usefullfill';
						} else if (key === -2) {
							cuIcon = 'radioboxfill';
						} else if (key === -1) {
							cuIcon = 'roundclosefill';
						} else if (key === 1) {
							cuIcon = 'roundcheckfill';
						}
						this.steps.push({
							cuIcon: cuIcon,
							name: value,
							key: key,
							color: color
						})
					});

				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
				}
			}).catch(err => {
				uni.showToast({
					title: err.message,
					icon: 'none'
				});
			});
		},
		methods: {
			verify(status,  failReason) {
				uni.showLoading({
					title: '提交中',
					mask: false
				});
				global.$http.post('/meeting/record/spRecord', {
					params: {
						record_id: this.info.id,
						status: status,
						fail_reason: failReason
					},
				}).then(res => {
					uni.hideLoading();
					if (res.status === "0") {
						uni.showToast({
							title: "提交成功",
							icon: 'none'
						});
						this.info.status = status;
						if(status == 1){
							this.steps[0].color = 'text-green';
							this.steps[1].color = 'text-green';
							this.steps[2].color = 'text-green';
							this.steps[3].color = 'text-green';
						}else{
							this.steps[0].color = 'text-red';
							this.steps[1].color = 'text-red';
							this.steps[2].color = 'text-red';
						}
						
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
				}).catch(err => {
					uni.hideLoading();
					uni.showToast({
						title: err.message,
						icon: 'none'
					});
				});
			},
			verifySuccess: function(){
				uni.showModal({
					title: '提示',
					content: '确定审批通过？',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if(res.cancel) return;
						this.verify(1, "");
					},
					fail: () => {},
					complete: () => {}
				});
			},
			verifyFail:function(){
				this.showModal = true;
			},
			hideModal: function(){
				this.showModal = false;
			},
			fillFailReason: function(e){
				this.failReason = e.detail.value;
			},
			sureModal:function(){
				if(this.failReason.length <= 0){
					uni.showToast({
						title: "请填写不通过原因",
						icon: 'none'
					});
					return;
				}
				this.verify(-1, this.failReason)
				this.showModal = false;
			}
			
		}
	}
</script>

<style scoped lang="scss">
@import "style/mystyle.scss";

</style>
