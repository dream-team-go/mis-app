<template name="contacts">
	<view>
		<cu-custom bgColor="bg-linear-blue">
			<block slot="content">通讯录</block>
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
		<view style="padding-top: 100upx">
			<view class="cu-list menu text-left">
				<view class="cu-item arrow" v-for="item in contactsData" @click="getDetail(item)">
					<view class="content">
						<image src="/static/main/org.png" class="png" mode="aspectFit"></image>
						<text class="text-black">{{item.org_name}}</text>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		name: "contacts",
		props: ['contactsData'],
		data() {
			return {
				name: ''
			};
		},
		onLoad() {
			
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
				global.$http.post('/core/organization/orgListAll', {
					params: {
						name: this.name
					},
				}).then(res => {
					if (res.status === "0") {
						let list = [{}];
						for (let i = 0; i < res.data.length; i++) {
							list[i] = res.data[i];
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
					url: "../index/contactsDetail?orgId=" + e.org_id + "&orgName=" + e.org_name,
				});
			}
		}
	}
</script>

<style>
	
</style>
