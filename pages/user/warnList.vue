<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			
			<block slot="content">消息记录</block>
		</cu-custom>

		<scroll-view scroll-x class="bg-white nav text-center fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="cu-item text-sm text-black" style="margin: 0upx;" :class="index==TabCur?'text-white cur':''" v-for="(item,index) in Array.from(StatusEnumMap.keys()).length"
			 :key="index" @tap="recordStatusTab(index)">
				{{Array.from(StatusEnumMap.values())[index]}}
			</view>
		</scroll-view>
		
		<view style="margin-top: 100upx;">
			<view class="small-card-detial" v-for="record in records" :key="record.id" @click="recordDetail(record)">
				<view class="title-box solid-bottom">
					<text class="id">{{record.type}}</text>
					<text class="status text-food">{{record.is_read == 0 ? "未读" : "已读"}}</text>
				</view>
				<view class="info-box">
					<text class="label">通知时间</text>
					<text class="info">{{record.create_time}}</text>
				</view>
				<view class="info-box" v-if="record.is_read == 1">
					<text class="label">阅读时间</text>
					<text class="info">{{record.read_time}}</text>
				</view>
				<view class="reason-box">
					<view class="label">通知内容</view>
					<view class="info">{{record.content}}</view>
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
			if (option.status) {
				var index = 0;
				misEnum.WarnStatusEnumMap.forEach((value, key, map) => {
					if (key == option.status) {
						this.TabCur = index;
						return;
					}
					index++;
				});
				this.recordStatus = option.status;
			} else {
				this.recordStatus = Array.from(misEnum.WarnStatusEnumMap.keys())[0];
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
				StatusEnumMap: misEnum.WarnStatusEnumMap,
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
				global.$http.post('/core/warn/getList', {
					params: {
						is_read: this.recordStatus,
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
				return misEnum.WarnStatusEnumMap.get(status);
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
					url: "../user/warnDetail?para=" + encodeURIComponent(JSON.stringify(record))
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "style/mystyle.scss";
</style>
