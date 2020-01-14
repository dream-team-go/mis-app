<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">领导订餐记录</block>
		</cu-custom>
		
		<view class="bg-white p10">
			<view class="small-card-detial"  v-for="record in records" :key="record.id" @click="recordDetail(record)" >
				<view class="title-box bg-linear-blue">
					<text class="id">{{record.dining_date.substring(0,10)}}</text>
					<text class="cu-tag round bg-orange sm status">{{getStatusStr(record.type)}}</text>
					<image src="../../static/common/next.png" class="arrow"></image>
				</view>
				<view class="info-box">
					<text class="label">用餐领导：</text>
					<text class="info">{{record.lead}})</text>
				</view>
				<view class="info-box">
					<text class="label">用餐人数：</text>
					<text class="info">{{record.num}}人</text>
				</view>
				<view class="info-box">
					<view class="label">订餐时间：</view>
					<view class="info">{{record.create_time}}</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="status" :content-text="contentText" />
	</view>
</template>

<script>
	import uniLoadMore from '@/colorui/components/uni-load-more.vue';
	import misEnum from '../../common/mis-enum.js';
	export default {
		components: {
			uniLoadMore
		},
		onLoad(option) {
			this.page = 1;
			this.records = [];
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
				records: []
			}
		},
		onReachBottom() {
			if (this.status !== "noMore") {
				this.status = 'more';
				this.loadData();
			}
		},
		methods: {
			loadData() {
				this.status = 'loading';
				global.$http.post('/dining/lead/list', {
					params: {
						status: this.recordStatus,
						page: this.page,
						pageSize: this.pageSize
					},
				}).then(res => {
					if (res.status === "0") {
						if (res.data.totlePage <= this.page) {
							this.status = 'noMore';
						} else {
							this.status = "more";
						}
						if (this.page === 1) {
							this.records = res.data.list;
						} else {
							res.data.list.forEach(c => {
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
			getStatusStr(status) {
				return misEnum.LeaderBookFoodEnumMap.get(status);
			},
			recordDetail: function(record) {
				uni.navigateTo({
					url: "../food/foodRecordDetail?id=" + record.id,
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "style/mystyle.scss";
</style>
