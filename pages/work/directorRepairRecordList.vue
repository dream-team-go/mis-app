<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">维修记录</block>
		</cu-custom>

		<scroll-view scroll-x class="bg-red nav text-center">
			<view class="cu-item" :class="index==TabCur?'text-white cur':''" v-for="(item,index) in Array.from(StatusEnumMap.keys()).length"
			 :key="index" @tap="recordStatusTab(index)">
				{{Array.from(StatusEnumMap.values())[index]}}
			</view>
		</scroll-view>


		<view class="cu-list menu text-left">
			<view class="cu-item arrow" v-for="record in records" :key="record.id" @click="recordDetail(record)" style="padding-top: 10rpx;padding-bottom: 10rpx;">
				<view class="content">
					<view>{{record.order_code}}</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							{{record.brand}} {{record.car_number}}
						</view>
					</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							{{record.user_name}} {{record.user_phone}}
						</view>
					</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							{{record.create_time}}
						</view>
					</view>
				</view>
				<view class="action">
					<view class="text-grey text-xs">{{record.type == 1 ? "维修" : "保养"}}</view>
					<view class="cu-tag round bg-orange sm">{{getStatusStr(record.status)}}</view>
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
			misEnum.RepairRecordEnumMap.forEach((value, key, map) => {
				if(key == 3 || key == 4 || key == -2)
				{
					var name = value;
					if(key == 4){
						name = "审批通过";
					}else if(key < 0){
						name = "审批未通过";
					}else{
						name = "待审批";
					}
					this.StatusEnumMap.set(key, name);
				}
			});
			if (option.status) {
				var index = 0;
				misEnum.RepairRecordEnumMap.forEach((value, key, map) => {
					if (key == option.status) {
						this.TabCur = index;
						return;
					}
					index++;
				});
				this.recordStatus = option.status;
			} else {
				this.recordStatus = Array.from(this.StatusEnumMap.keys())[0];
			}
		},
		onShow() {
			this.recordStatusTab(this.TabCur);
		},
		data() {
			return {
				page: 1,
				pageSize: 10,
				recordStatus: "",
				status: 'more',
				StatusEnumMap: new Map(),
				TabCur: 0,
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
				global.$http.post('/car/repair/list', {
					params: {
						status: this.recordStatus,
						sp_type: 2,
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
			getStatusStr: function(status) {
				return misEnum.RepairRecordEnumMap.get(status);
			},
			recordStatusTab: function(index) {
				this.TabCur = index;
				this.recordStatus = Array.from(this.StatusEnumMap.keys())[index];
				this.page = 1;
				this.records = [];
				this.loadData();
			},
			recordDetail: function(record) {
				uni.navigateTo({
					url: "../work/directorRepairRecordDetail?id=" + record.id,
				});
			}
		}
	}
</script>

<style>

</style>
