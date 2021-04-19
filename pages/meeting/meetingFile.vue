<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="content">会议材料</block>
			<block slot="right"><view v-if="is_can_edit" @tap="setMeetingFile()">设置</view></block>
		</cu-custom>

		<!-- <view class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="材料名称" @input="onKeyInput" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-linear-blue shadow-blur round" @tap="search()">搜索</button>
			</view>
		</view> -->
		<view class="bg-white">
			<view class="text-bold text-black text-lg padding">
				<text>温馨提示</text>
			</view>
			<view class="padding-left-xxxl padding-bottom" style="font-size: 40upx;color: blueviolet;">
				<text>红色文件为内部资料，请勿转载</text>
			</view>
		</view>
		<view>
			<view class="cu-list menu text-left padding-top-xs">
				<view class="cu-item" v-for="item in searchData" :key="item.org_id" @click="downLoadfile(item.file_url)">
					<view class="content">
						<text :class="item.is_private ? 'text-red' : 'text-blue'">{{item.file_name}}</text>
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
			//获取文件数据
			global.$http.post('/meeting/file/getList', {
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
			setMeetingFile: function(){
				uni.navigateTo({
					url: '../meeting/setMeetingFile?meeting_record_id=' + this.meeting_record_id
				});
			},
			downLoadfile: function(url) {
				uni.showLoading({
					title: '下载中',
					mask: false
				});
				uni.downloadFile({
					url: url,
					success: (res) => {
						if (res.tempFilePath) {
							uni.hideLoading();
							var filePath = res.tempFilePath;
							uni.openDocument({
							    filePath: filePath,  
							    success: function(res) {  
							        console.log('打开文档成功,download');  
							    }  
							}); 
						}
					}
				});
			}
		}
	}
</script>

<style>

</style>
