<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			
			<block slot="content">选择包房</block>
		</cu-custom>
		
		<scroll-view scroll-x class="bg-white nav text-center">
			<view class="cu-item" :class="index==TabCur?'text-white cur':''" v-for="(item,index) in buildings.length"
			 :key="index" @tap="buildingTab(index)">
				{{buildings[index].name}}
			</view>
		</scroll-view>
		
		<view class="cu-card case no-card margin-top" v-for="room in rooms" :key="room.id" @click="roomDetail(room)">
			<view class="cu-item shadow">
				<view class="image">
					<image :src="room.vr" mode="widthFix"></image>
					<view class="cu-tag bg-linear-blue">容纳{{room.capacity}}人</view>
					<!-- <view class="cu-bar bg-shadeBottom"> <text class="text-cut">我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。</text></view> -->
				</view>
				<view class="cu-list">
					<view class="cu-item">
						<view class="content flex-sub" style="padding: 15px;">
							<view style="font-size: 15px;font-weight: 900;color: #333;">{{room.name}} {{room.number}}</view>
							<view style="font-size: 15px;" class="text-gray text-sm flex justify-between">
								{{room.address}}
								<!-- <view class="text-gray text-sm">
									<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
									<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
									<text class="cuIcon-messagefill margin-lr-xs"></text> 30
								</view> -->
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
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
				rooms: [],
				para: {
					dining_id: 0,
					room_number: "",
					building_name: ""
				}
			}
		},
		onLoad(option) {
			
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
							is_locked: 0,
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
				this.para.dining_id = room.id;
				this.para.room_number = room.number;
				this.para.building_name = room.name;
				uni.navigateTo({
					url: '../food/selectDate?para=' + encodeURIComponent(JSON.stringify(this.para))
				});
			}
		}
	}
</script>

<style>

</style>

