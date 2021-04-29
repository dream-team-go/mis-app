<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="content">订餐汇总展示</block>
		</cu-custom>

		<view class="cu-list menu-avatar">
			<view class="cu-item" style="height: 142upx;" v-for="record in records" :key="record.id" @click="recordDetail(record)">
				<view class="cu-avatar round lg bg-linear-blue" style="left: 12upx;"><text class="text-lg text-bold">{{getDateStr(record.ydrq)}}</text></view>
				<view class="content" style="left: 118upx;width: calc(100% - 118upx - 10upx - 110upx);">
					<view class="text-black">
						<text class="text-df">{{getWeekDay(record.ydrq)}} {{record.ydsjd == "1" ? '午餐' : '晚餐'}}{{record.meal_time.substring(11,16)}}</text>
						<text class="text-df" style="padding-left: 10upx;">{{record.building_name}}{{record.room_number}}</text>
					</view>
					<view class="text-grey text-df flex">
						<view class="text-cut">
							<!-- <text class="cuIcon-infofill text-red  margin-right-xs"></text> -->
							{{record.order_org}}
						</view>
					</view>
				</view>
				<view class="action" style="width: unset;">
					<view class="cu-tag round sd" :class="record.status == '1'?'bg-green':'bg-orange'">{{getStatusDesc(record)}}</view>
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
		},
		onShow() {
			this.records = [];
			this.page = 1;
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
				global.$http.post('/dining/record/diningRecordQk', {
					params: {
						start_rq: this.util.getDate(0),
						end_rq: this.util.getDate(7),
						status: "0,1"
					},
				}).then(res => {
					if (res.status === "0") {
						this.status = 'noMore';
						if (this.page === 1) {
							this.records = res.data;
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
			getDateStr: function(e){
				if(e.substring(0, 10) == this.util.getDate(0))
					return "今日";
				return e.substring(5,10);
			},
			getStatusDesc: function(e){
				return misEnum.FoodRecordEnumMap.get(e.status);
			},
			getWeekDay: function(e){
				return this.util.getWeekDay(new Date(e));
			},
			recordDetail: function(record) {
				uni.navigateTo({
					url: "../work/foodRecordDetail?id=" + record.id,
				});
			}
		}
	}
</script>

<style>

</style>
