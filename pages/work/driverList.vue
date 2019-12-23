<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">司机</block>
		</cu-custom>
		<view class="cu-list menu text-left">
			<view class="cu-item arrow" v-for="driver in drivers" :key="driver.id" @click="driverDetail(driver)" style="padding-top: 10rpx;padding-bottom: 10rpx;">
				<view class="content">
					<view>{{driver.user_cn_name}}({{driver.sex == 1 ? '男' : '女'}})</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							{{driver.tel_no}}
						</view>
					</view>
				</view>
				<view class="action">
					<view class="text-grey text-xs">{{driver.license_type}}证件</view>
					<view class="cu-tag round bg-orange sm">{{driver.drive_age}}年</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="status" :content-text="contentText" />
	</view>
</template>

<script>
	import uniLoadMore from '@/colorui/components/uni-load-more.vue';
	export default {
		components: {
			uniLoadMore
		},
		onShow() {
			this.page = 1;
			this.drivers = [];
			this.loadData();
		},
		data() {
			return {
				page: 1,
				pageSize: 10,
				status: 'more',
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				drivers: []
			}
		},
		onReachBottom() {
			if(this.status !== "noMore"){
				this.status = 'more';
				this.loadData();
			}
		},
		methods: {
			loadData(){
				this.status = 'loading';
				global.$http.post('/car/driver/driverList', {
					params: {
						page: this.page,
						pageSize: this.pageSize
					},
				}).then(res => {
					if (res.status === "0") {
						if(res.data.totlePage <= this.page){
							this.status = 'noMore';
						}else{
							this.status = "more";
						}
						if(this.page === 1){
							this.drivers = res.data.list;
						}else{
							res.data.list.forEach(c=>{
								this.drivers.push(c);
							});
						}
						this.page++;
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
			driverDetail: function(driver){
				uni.navigateTo({
					url: "../work/driverDetail?id=" + driver.id,
				});
			}
		}
	}
</script>

<style>

</style>
