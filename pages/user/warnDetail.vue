<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">消息详情</block>
		</cu-custom>
		<view class="message-box">
			<view class="item">
				<text class="label text-bold">消息类型：</text>
				<text class="val">{{info.type}}</text>
			</view>
		</view>
		<view class="message-box">
			<view class="item">
				<text class="label text-bold">接收时间：</text>
				<text class="val">{{info.create_time}}</text>
			</view>
		</view>
		<view class="message-box">
			<view class="item">
				<text class="label text-bold">阅读时间：</text>
				<text class="val">{{info.read_time}}</text>
			</view>
		</view>
		<view class="content-box">
			<view class="label text-bold">消息内容：</view>
			<view class="val">{{info.content}}</view>
		</view>
		<!-- <view class="cu-bar bg-white solid-bottom">
			<view class="action">
				消息类型：
				<text class="text-bold">{{info.type}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				接收时间：
				<text class="text-bold">{{info.create_time}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				阅读时间：
				<text class="text-bold">{{info.read_time}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				消息内容：
				<text class="text-bold">{{info.content}}</text>
			</view>
		</view>
		-->
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
			if(option.para){
				var info = JSON.parse(decodeURIComponent(option.para));
				this.info = info;
				if(this.info.is_read == 0){
					global.$http.post('/core/warn/setRead', {
						params: {
							id: this.info.id
						},
					}).then(res => {
						if (res.status === "0") {
							const date = new Date();
							let year = date.getFullYear();
							let month = date.getMonth() + 1;
							let day = date.getDate();
							let hour = date.getHours();
							let minute = date.getMinutes();
							let second = date.getSeconds();
							
							month = month > 9 ? month : '0' + month;
							day = day > 9 ? day : '0' + day;
							hour = hour > 9 ? hour : '0' + hour;;
							minute = minute > 9 ? minute : '0' + minute;
							second = second > 9 ? second : '0' + second;
							
							this.info.read_time = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
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
				}
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
.message-box {
	background: #FFFFFF;
	height: 100upx;
	line-height: 100upx;
	padding: 0 20upx;
	margin-bottom: 2upx;
	.label {
		width: 160upx;
	}
}
.content-box {
	background: #FFFFFF;
	.label {
		height: 100upx;
		line-height: 100upx;
		padding: 0 20upx;
	}
	.val {
		padding: 0 20upx 40upx;
		text-indent: 2em;
	}
}
</style>
