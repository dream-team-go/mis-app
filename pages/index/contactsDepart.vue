<template name="contacts">
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="content">{{title}}</block>
		</cu-custom>

		<view class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="部门" @input="onKeyInput" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-linear-blue shadow-blur round" @tap="search()">搜索</button>
			</view>
		</view>
		<view style="padding-top: 100upx">
			<view class="cu-list menu text-left">
				<view class="cu-item arrow" v-for="item in contactsData" @click="getDetail(item)">
					<view class="content">
						<image src="/static/tabbar/contacts_cur.png" class="png" mode="aspectFit"></image>
						<text class="text-black">{{item.name}}</text>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				orgId: '',
				contactsData: [],
				name: ''
			};
		},
		onLoad(option) {
			this.orgId = option.orgId;
			this.title = option.orgName;
			this.search();
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
				//获取部门数据
				global.$http.post('/core/department/departmentPage', {
					params: {
						page: 1,
						size: 10000,
						pid: 0,
						orgId: this.orgId,
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
					url: "../index/contactsDetail?departId=" + e.id + "&departName=" + e.name,
				});
			}
		}
	}
</script>

<style>
	
</style>
