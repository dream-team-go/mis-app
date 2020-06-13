<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">会议预定详情</block>
			<block slot="right"><view v-show="info.status == 0" @tap="toEdit">修改</view></block>
		</cu-custom>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 预定进度
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
				 失败原因：
				<text class="text-red">{{info.fail_reason}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 会议主题：
				<text class="text-bold">{{info.desc}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 会议室：
				<text class="text-bold">{{info.room_number}}({{info.building_name}})</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 会议时间：
				<text class="text-bold">{{info.start_time}} — {{info.end_time}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 参会人数：
				<text class="text-bold">{{info.people_num}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom" v-if="info.attend_leader != null">
			<view class="action">
				 备注：
				<text class="text-bold">{{info.attend_leader}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 预定人：
				<text class="text-bold">{{info.user_name}}({{info.user_tel}})</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 预定时间：
				<text class="text-bold">{{info.create_time}}</text>
			</view>
		</view>
		
		<!-- <view class="padding flex flex-direction" v-if="info.status == 0">
			<button class="cu-btn bg-gradual-orange margin-tb-sm lg" @click="cancleBook">取消预定</button>
		</view> -->
		<view class="bottom-btns-seat" v-if="info.status == 0"></view>
		<view class="bottom-cancel-btn" v-if="info.status == 0"  @click="cancleBook">
			取消预定
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
				id: ""
			}
		},
		onLoad(option) {
			this.id = option.id;
		},
		onShow(){
			this.steps.length = 0;
			global.$http.post('/meeting/record/recordInfo', {
				params: {
					record_id: this.id
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
						if(!isFind || key == this.info.status){
							color = this.color;
						}
						if(key == this.info.status){
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
			toEdit: function(e) {
				uni.navigateTo({
					url: '../meeting/selectTime?para=' + encodeURIComponent(JSON.stringify(this.info))
				});
			},
			cancleBook: function(){
				uni.showModal({
					title: '提示',
					content: '确定取消预定？',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if(res.cancel) return;
						uni.showLoading({
							title: '提交中',
							mask: false
						});
						global.$http.post('/meeting/record/cancelMyRecord', {
							params: {
								record_id: this.info.id
							},
						}).then(res => {
							uni.hideLoading();
							if (res.status === "0") {
								uni.showToast({
									title: "取消成功",
									icon: 'none'
								});
								this.info.status = -2;
								this.steps[0].color = 'text-orange';
								this.steps[1].color = 'text-orange';
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
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style scoped lang="scss">
@import "style/mystyle.scss";

</style>
