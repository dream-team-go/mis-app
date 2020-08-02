<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			
			<block slot="content">司机</block>
		</cu-custom>
		<view class="bg-white p10">
			<view class="small-card-detial" v-for="driver in drivers" :key="driver.id" @click="driverDetail(driver)" >
				<view class="title-box bg-linear-blue">
					<text class="id" >{{driver.user_cn_name}}</text>
					<text class="cu-tag round status" :class="driver.sex == 1 ? 'bg-blue' : 'bg-pink'">{{driver.sex == 1 ? '男' : '女'}}</text>
					<!-- <image src="../../static/common/next.png" class="arrow"></image> -->
				</view>
				<view class="info-box">
					<text class="label">电话：</text>
					<text class="info">{{driver.tel_no}}</text>
				</view>
				<view class="info-box">
					<text class="label">身份证：</text>
					<text class="info">{{driver.id_card}}</text>
				</view>
				<view class="info-box">
					<text class="label">证件类型：</text>
					<text class="info">{{driver.license_type}}</text>
				</view>
				<view class="info-box">
					<text class="label">驾龄：</text>
					<text class="info">{{driver.drive_age}}</text>
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

<style scoped lang="scss">
	@import "style/mystyle.scss";

</style>
