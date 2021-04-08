<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			
			<block slot="content">会议室</block>
			<block slot="right"><view v-if="HasOperateKey" @tap="toAdd">新增</view></block>
		</cu-custom>
		
		<scroll-view scroll-x class="bg-white nav text-center fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="cu-item text-black" :class="index==TabCur?'text-white cur':''" v-for="(item,index) in buildings.length"
			 :key="index" @tap="buildingTab(index)">
				{{buildings[index].name}}
			</view>
		</scroll-view>
		<view style="margin-top: 100upx;">
			<view class="cu-card case no-card margin-top-sm" v-for="room in rooms" :key="room.id" @click="roomDetail(room)">
				<view class="cu-item shadow">
					<view class="image">
						<image :src="room.vr" mode="widthFix"></image>
						<view class="cu-tag bg-linear-blue">容纳{{room.capacity}}人</view>
					</view>
					<view class="cu-list">
						<view class="cu-item">
							<view class="content flex-sub" style="padding: 15px;">
								<view style="font-size: 15px;font-weight: 900;color: #333;">{{room.name}} {{room.number}}</view>
								<view style="font-size: 15px;" class="text-gray text-sm flex justify-between">
									{{room.address}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
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
				rooms: []
			}
		},
		computed: {
			...mapState(['userInfo']),
			HasOperateKey: function(){
				return this.userInfo.key.includes('meeting:manage');
			}
		},
		onReady(){
			//获取会议室所属办公楼房信息
			global.$http.post('/meeting/info/buildingList', {
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
					global.$http.post('/meeting/info/meetingList', {
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
					url: "../work/meetingDetail?id=" + room.id
				});
			},
			toAdd: function(e){
				uni.navigateTo({
					url:'../work/saveMeeting'
				});
			}
		}
	}
</script>

<style scoped lang="scss">

</style>

