<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="content">参会单位</block>
			<block slot="right"><view v-if="is_can_edit" @tap="setMeetingOrg()">设置</view></block>
		</cu-custom>

		<view class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="单位名称" @input="onKeyInput" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-linear-blue shadow-blur round" @tap="search()">搜索</button>
			</view>
		</view>
		<view style="padding-top: 100upx;">
			<view class="cu-list menu text-left">
				<view class="cu-item" v-for="item in searchData" :key="item.org_id">
					<view class="content">
						<!-- <image src="/static/tabbar/contacts_cur.png" class="png" mode="aspectFit"></image> -->
						<text class="text-black">{{item.org_name}}</text>
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
				name: '',
				contactsData: [],
				searchData: [],
				meeting_record_id: '',
				is_can_edit: false
			};
		},
		onShow() {
			uni.showLoading({
				title: '加载中',
				mask: false
			});
			//获取行政单位数据
			global.$http.post('/meeting/org/getList', {
				params: {
					meeting_record_id: this.meeting_record_id
				},
			}).then(res => {
				if (res.status === "0") {
					let list = [];
					for (let i = 0; i < res.data.length; i++) {
						list[i] = res.data[i];
					}
					this.contactsData = list;
					this.searchData = this.contactsData;
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
		onLoad(option) {
			this.meeting_record_id = option.meeting_record_id;
			this.is_can_edit = option.is_can_edit == "true";
		},
		methods: {
			onKeyInput(e) {
				this.name = e.target.value;
			},
			search() {
				if (this.name) {
					this.searchData = this.contactsData.filter((value) => { //过滤数组元素
						return value.org_name.includes(this.name); //如果包含字符返回true
					});
				} else
					this.searchData = this.contactsData;
			},
			setMeetingOrg: function(){
				uni.navigateTo({
					url: '../meeting/setMeetingOrg?meeting_record_id=' + this.meeting_record_id
				});
			}
		}
	}
</script>

<style>

</style>
