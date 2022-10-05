<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			
			<block slot="content">失物招领</block>
			<!-- <block slot="right"><view v-if="HasOperateKey" @tap="toAdd">新增</view></block> -->
		</cu-custom>
		
		<scroll-view scroll-x class="bg-white nav text-center fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="cu-item text-sm text-black" style="margin: 0upx;" :class="index==TabCur?'text-white cur':''" v-for="(item,index) in Array.from(StatusEnumMap.keys()).length"
			 :key="index" @tap="recordStatusTab(index)">
				{{Array.from(StatusEnumMap.values())[index]}}
			</view>
		</scroll-view>
		<view style="margin-top: 100upx;">
			<view v-for="record in records" :key="record.id" @click="recordDetail(record)">
				<lost-item :record="record"></lost-item>
			</view>
		</view>
		
		<uni-load-more :status="status" :content-text="contentText" />
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import uniLoadMore from '@/colorui/components/uni-load-more.vue';
	import misEnum from '../../common/mis-enum.js';
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				page: 1,
				pageSize: 10,
				StatusEnumMap: misEnum.LostStatusEnumMap,
				recordStatus: "",
				status: 'more',
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				TabCur: 0,
				records: []
			}
		},
		computed: {
			
		},
		onReady(){
			
		},
		onShow() {
			this.recordStatusTab(this.TabCur);
		},
		onReachBottom() {
			if (this.status !== "noMore") {
				this.status = 'more';
				this.loadData();
			}
		},
		methods: {
			loadData(){
				this.status = 'loading';
				global.$http.post('/thing/lost/getAllList', {
					params: {
						page: this.page,
						pageSize: this.pageSize,
						status: this.recordStatus
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
			recordStatusTab: function(index) {
				this.TabCur = index;
				this.recordStatus = Array.from(this.StatusEnumMap.keys())[index];
				this.page = 1;
				this.records = [];
				this.loadData();
			},
			recordDetail: function(record){
				uni.navigateTo({
					url: "../work/lostDetail?id=" + record.id
				});
			}
		}
	}
</script>

<style>

</style>
