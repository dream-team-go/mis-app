<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">司机详情</block>
		</cu-custom>
		
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 姓名：
				<text class="text-bold">{{info.user_cn_name}}</text>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 电话：
				<text class="text-bold">{{info.tel_no}}</text>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 性别：
				<text class="text-bold">{{info.sex == 1 ? '男' : '女'}}</text>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 身份证：
				<text class="text-bold">{{info.id_card}}</text>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 驾照类型：
				<text class="text-bold">{{info.license_type}}</text>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 驾龄：
				<text class="text-bold">{{info.drive_age}}年</text>
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
				info: {}
			}
		},
		onLoad(option) {
			global.$http.post('/car/driver/getInfo', {
				params: {
					customer_id: option.id
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
		}
	}
</script>

<style>

</style>
