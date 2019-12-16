<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">会议预定记录</block>
		</cu-custom>
		<view class="cu-list menu text-left">
			<view class="cu-item arrow" v-for="record in records" :key="record.id" @click="getrecord(record)" style="padding-top: 10rpx;padding-bottom: 10rpx;">
				<view class="content">
					<!-- <view>{{record.desc}}</view> -->
					<view>会议主题</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							{{record.room_number}}({{record.building_name}})
						</view>
					</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							{{record.start_time}} - {{record.end_time}}
						</view>
					</view>
				</view>
				<view class="action">
					<view class="text-grey text-xs">{{record.people_num}}人参会</view>
					<view class="cu-tag round bg-orange sm">{{getStatusStr(record.status)}}</view>
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
		onLoad(option) {
			if(option.status){
				this.recordStatus = option.status;
			}
			this.loadData();
		},
		data() {
			return {
				page: 1,
				pageSize: 10,
				recordStatus: "",
				status: 'more',
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				records: []
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
				global.$http.post('/meeting/record/myRecordList', {
					params: {
						status: this.recordStatus,
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
							this.records = res.data.list;
						}else{
							res.data.list.forEach(c=>{
								this.records.push(c);
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
			getStatusStr(status){
				var statusStr = status;
				if (status === -2) {
					statusStr = '取消预定';
				} else if (status === -1) {
					statusStr = '预定失败';
				} else if (status === 0) {
					statusStr = '待审批';
				} else if (status === 1) {
					statusStr = '预定成功';
				}
				return statusStr;
			}
		}
	}
</script>

<style>

</style>
