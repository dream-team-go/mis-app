<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{data}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:{}
			}
		},
		onLoad() {
			global.$http.post('/core/func/getUserAndMenu')
				.then(res => {
					uni.hideLoading();
					if (res.status === "0") {
						this.data = res;
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
				}).catch(err=>{
					uni.hideLoading();
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
