<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="content">签到记录</block>
		</cu-custom>

		<view class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="单位/姓名" @input="onKeyInput" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-linear-blue shadow-blur round" @tap="search()">搜索</button>
			</view>
		</view>
		<!-- <view class="bg-white">
			<view class="text-bold text-black text-lg padding">
				<text>温馨提示</text>
			</view>
			<view class="padding-left-xxxl padding-bottom">
				<text>红色文件为内部资料，请勿转载</text>
			</view>
		</view> -->
		<view style="padding-top: 100upx;">
			<view class="cu-list menu text-left">
				<view class="cu-item" v-for="(item, index) in searchData" :key="index" style="min-height: 110upx;padding: 0 10upx 0 20upx;">
					<view class="content" style="display: inline-flex;font-size: 29upx;">
						<view style="width: 280upx;"><text>{{item.org_name}}</text></view>
						<view style="width: 200upx;margin-left: 20upx;"><text>{{item.user_cn_name}}{{item.tel_no}}</text></view>
						<view style="width: 200upx;margin-left: 20upx;display: flex;align-items: center;" @tap="showJobToast(item.job_name)"><text>{{item.short_job_name}}</text></view>
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
				meeting_record_id: ''
			};
		},
		onShow() {
			uni.showLoading({
				title: '加载中',
				mask: false
			});
			//获取签到记录
			global.$http.post('/meeting/sign/getList', {
				params: {
					meeting_record_id: this.meeting_record_id
				},
			}).then(res => {
				if (res.status === "0") {
					res.data.forEach(c=>{
						if(c.job_name && c.job_name.length > 10)
							c.short_job_name = c.job_name.substr(0, 10) + "...";
						else
							c.short_job_name = c.job_name;
							this.contactsData.push(c);
					});
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
		},
		methods: {
			onKeyInput(e) {
				this.name = e.target.value;
			},
			search() {
				if (this.name) {
					this.searchData = this.contactsData.filter((value) => { //过滤数组元素
						return value.org_name.includes(this.name) || (value.user_cn_name != null && value.user_cn_name.includes(this.name)); //如果包含字符返回true
					});
				} else
					this.searchData = this.contactsData;
			},
			showJobToast: function(e){
				uni.showToast({
					title: e,
					icon: 'none'
				});
			}
		}
	}
</script>

<style>

</style>
