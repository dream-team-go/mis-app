<template name="contacts">
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="content">电话簿</block>
		</cu-custom>

		<view class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="行政单位" @input="onKeyInput" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-linear-blue shadow-blur round" @tap="search()">搜索</button>
			</view>
		</view>
		<view style="padding-top: 100upx;">
			<view class="cu-list menu text-left">
				<view class="cu-item arrow" v-for="item in contactsData" :key="item.org_id" @click="getDetail(item)">
					<view class="content">
						<image src="/static/tabbar/contacts_cur.png" class="png" mode="aspectFit"></image>
						<text class="text-black">{{item.org_name}}</text>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		//name: "contacts",
		//props: ['contactsData'],
		data() {
			return {
				name: '',
				contactsData: []
			};
		},
		onLoad() {
			uni.showLoading({
				title: '加载中',
				mask: false
			});
			//获取行政单位数据
			global.$http.post('/core/organization/organizationPage', {
				params: {
					page: 1,
					pageSize: 10000,
					name: ''
				},
			}).then(res => {
				if (res.status === "0") {
					let list = [];
					for (let i = 0; i < res.data.list.length; i++) {
						list[i] = res.data.list[i];
					}
					this.contactsData = list;
					uni.hideLoading();
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
		methods: {
			onKeyInput(e) {
				this.name = e.target.value;
			},
			search() {
				uni.showLoading({
					title: '加载中',
					mask: false
				});
				//获取行政单位数据
				global.$http.post('/core/organization/organizationPage', {
					params: {
						page: 1,
						pageSize: 10000,
						name: this.name
					},
				}).then(res => {
					if (res.status === "0") {
						let list = [];
						for (let i = 0; i < res.data.list.length; i++) {
							list[i] = res.data.list[i];
						}
						this.contactsData = list;
						uni.hideLoading();
					} else {
						uni.hideLoading();
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
			getDetail(e){
				uni.navigateTo({
					url: "../index/contactsDepart?orgId=" + e.org_id + "&orgName=" + e.org_name,
				});
			}
		}
	}
</script>

<style>
	
</style>
