<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">会议预定详情</block>
		</cu-custom>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 预定进度
			</view>
		</view>
		<view class="bg-white padding">
			<view class="cu-steps">
				<view class="cu-item" :class="item.color" v-for="(item,index) in steps" :key="index">
					<text :class="'cuIcon-' + item.cuIcon"></text> {{item.name}}
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
				info: {}
			}
		},
		onLoad() {
			global.$http.post('/meeting/record/recordInfo', {
				params: {
					status: this.recordStatus,
					page: this.page,
					pageSize: this.pageSize
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
						if(!isFind && key != this.info.status){
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

		}
	}
</script>

<style>

</style>
