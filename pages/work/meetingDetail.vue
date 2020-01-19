<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">会议室详情</block>
			<block slot="right" @tap="toEdit">修改</block>
		</cu-custom>
		
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 办公楼房：
				<text class="text-bold">{{info.name}}</text>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 办公房间：
				<text class="text-bold">{{info.number}}</text>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 容纳人数：
				<text class="text-bold">{{info.capacity}}</text>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 地址：
				<text class="text-bold">{{info.address}}</text>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 创建时间：
				<text class="text-bold">{{info.create_time}}</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:"",
				info: {}
			}
		},
		onLoad(option) {
			this.id	= option.id;
		},
		onShow() {
			global.$http.post('/meeting/info/getInfo', {
				params: {
					meeting_id: this.id
				},
			}).then(res => {
				if (res.status === "0") {
					this.info = res.data;
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
			toEdit: function(e){
				uni.navigateTo({
					url: '../work/saveMeeting?para=' + encodeURIComponent(JSON.stringify(this.info))
				});
			}
		}
	}
</script>

<style>

</style>
