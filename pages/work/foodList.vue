<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			
			<block slot="content">包房</block>
			<block slot="right"><view v-if="HasOperateKey" @tap="toAdd">新增</view></block>
		</cu-custom>
		
		<scroll-view scroll-x class="bg-white nav text-center fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="cu-item text-black" :class="index==TabCur?'text-white cur':''" v-for="(item,index) in buildings.length"
			 :key="index" @tap="buildingTab(index)">
				{{buildings[index].name}}
			</view>
		</scroll-view>
		<view style="margin-top: 100upx;">
			<view v-for="room in rooms" :key="room.id" @click="roomDetail(room)">
				<food-room-item :room="room"></food-room-item>
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
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				page: 1,
				pageSize: 10,
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				TabCur: 0,
				buildings: [],
				status: 'more',
				rooms: []
			}
		},
		computed: {
			...mapState(['userInfo']),
			HasOperateKey: function(){
				return this.userInfo.key.includes('dining:manage');
			}
		},
		onReady() {
			//获取会议室所属办公楼房信息
			global.$http.post('/dining/info/buildingList', {
				params: {
					page: 1,
					pageSize: 1000
				},
			}).then(res => {
				if (res.status === "0") {
					this.buildings = res.data;
					this.loadData();
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
		onShow() {
			this.buildingTab(this.TabCur);
		},
		onReachBottom() {
			if (this.status !== "noMore") {
				this.status = 'more';
				this.loadData();
			}
		},
		methods: {
			loadData(){
				if(this.buildings.length > 0){
					this.status = 'loading';
					global.$http.post('/dining/info/diningList', {
						params: {
							page: this.page,
							pageSize: this.pageSize,
							building_id: this.buildings[this.TabCur].id
						},
					}).then(res => {
						if (res.status === "0") {
							if (res.data.totlePage <= this.page) {
								this.status = 'noMore';
							} else {
								this.status = "more";
							}
							if (this.page === 1) {
								this.rooms = res.data.list;
							} else {
								res.data.list.forEach(c => {
									this.rooms.push(c);
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
				}
			},
			buildingTab: function(index) {
				this.TabCur = index;
				this.page = 1;
				this.rooms = [];
				this.loadData();
			},
			roomDetail: function(room){
				uni.navigateTo({
					url: "../work/foodDetail?id=" + room.id
				});
			},
			toAdd: function(e){
				uni.navigateTo({
					url:'../work/saveFood'
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	
</style>

