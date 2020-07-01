<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{isAdd ? '新增会议室' : '编辑会议室'}}</block>
		</cu-custom>

		<form>
			<view class="cu-form-group">
				<view class="title">办公楼房</view>
				<view class="modal-group" @tap="showBuldingModal" data-target="Modal">
					<view class="picker">
						{{ building_name.length > 0 ? building_name : '请选择' }}
					</view>
				</view>
			</view>

			<view class="cu-form-group" v-show="building_id > 0">
				<view class="title">办公房间</view>
				<view class="modal-group" @tap="showRoomModal" data-target="Modal">
					<view class="picker">
						{{ room_name.length > 0 ? room_name : '请选择' }}
					</view>
				</view>
			</view>

			<view class="cu-form-group">
				<view class="title">容纳人数</view>
				<picker @change="ChangePeoples" :value="peopleIndex" :range="peoples">
					<view class="picker">
						{{peopleIndex>-1?peoples[peopleIndex] + "人" : "请选择"}}
					</view>
				</picker>
			</view>
			
			<view class="cu-bar bg-white">
				<view class="action">
					会议室照片上传
				</view>
				<view class="action">
					{{imgList.length}}/1
				</view>
			</view>
			
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" :data-url="imgList[index]">
						<image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="imgList.length<1">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>

			<view class="padding flex flex-direction">
				<button class="cu-btn bg-linear-blue margin-tb-sm lg" @click="Submit">提交</button>
			</view>
		</form>

		<view class="building-list-modal cu-modal bottom-modal" :class="isShowBuldingModal?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-linear-blue" :style="[{'padding-top':StatusBar + 'px'},{height:CustomBar + 'px'}]">
					<view class="action text-white" @tap="hideBuildingModal">取消</view>
					<view class="action text-white text-lg" style="text-align: center;margin-right: 15px;">选择办公楼房</view>
					<view class="action"></view>
				</view>

				<view id="list-view" :style="[{height:(ScreenHeight-CustomBar) + 'px'}]">
					<view class="cu-list menu text-left">
						<view class="cu-item arrow" v-for="building in buildings" :key="building.id" @click="getBuilding(building)" style="padding-top: 10rpx;padding-bottom: 10rpx;">
							<view class="content">
								<view class="text-grey">{{building.name}}</view>
								<view class="text-gray text-sm flex">
									<view class="text-cut">
										{{building.address}}
									</view>
								</view>
							</view>
							<view class="action">
								<view class="text-grey text-xs">建于{{building.build_time}}</view>
								<view class="cu-tag round bg-orange sm">{{BuildingStatusEnumMap.get(building.status)}}</view>
							</view>
						</view>
					</view>
					<uni-load-more :status="status" :content-text="contentText" />
				</view>
			</view>
		</view>
		<view class="building-list-modal cu-modal bottom-modal" :class="isShowRoomModal?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-linear-blue" :style="[{'padding-top':StatusBar + 'px'},{height:CustomBar + 'px'}]">
					<view class="action text-white" @tap="hideRoomModal">取消</view>
					<view class="action text-white text-lg" style="text-align: center;margin-right: 15px;">选择办公房间</view>
					<view class="action"></view>
				</view>

				<view id="list-view" :style="[{height:(ScreenHeight-CustomBar) + 'px'}]">
					<view class="cu-list menu text-left">
						<view class="cu-item arrow" v-for="room in rooms" :key="room.id" @click="getRoom(room)" style="padding-top: 10rpx;padding-bottom: 10rpx;">
							<view class="content">
								<view class="text-grey">{{room.number}}</view>
							</view>
							<view class="action">
								<view class="cu-tag round bg-orange sm">{{BuildingStatusEnumMap.get(room.status)}}</view>
							</view>
						</view>
					</view>
					<uni-load-more :status="status" :content-text="contentText" />
				</view>
			</view>
		</view>
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
			if (option.para) {
				var info = JSON.parse(decodeURIComponent(option.para));
				this.isAdd = false;
				this.building_id = info.building_id;
				this.building_name = info.name;
				this.room_name = info.number;
				this.para.office_room_id = info.office_room_id;
				this.para.capacity = info.capacity;
				this.peopleIndex = info.capacity - 1;
				this.para.vr = info.vr;
				this.para.id = info.id;
				//设置辅助参数
				this.imgList.push(this.para.vr);
			}
		},
		data() {
			return {
				isAdd: true,
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				ScreenHeight: this.ScreenHeight,
				BuildingStatusEnumMap: misEnum.BuildingStatusEnumMap,
				peopleIndex: 0,
				peoples: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
					30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57,
					58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 
					86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100
				],
				isShowBuldingModal: false,
				buildings: [],
				isShowRoomModal: false,
				rooms: [],
				page: 1,
				pageSize: 100,
				status: 'more',
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				para: {
					id: "",
					vr: "",
					capacity: 1,
					office_room_id: 0
				},
				building_id: 0,
				building_name: "",
				room_name: "",
				imgList: []
			}
		},
		methods: {
			getBuildingListData() {
				this.status = 'loading';
				global.$http.post('/office/building/buildingJson', {
					params: {
						page: this.page,
						pageSize: this.pageSize
					},
				}).then(res => {
					if (res.status === "0") {
						this.status = 'noMore';
						this.buildings = res.data.list;
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
			getRoomListData() {
				this.status = 'loading';
				global.$http.post('/office/room/roomJson', {
					params: {
						page: this.page,
						pageSize: this.pageSize,
						building_id: this.building_id
					},
				}).then(res => {
					if (res.status === "0") {
						this.status = 'noMore';
						this.rooms = res.data.list;
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
			ChangePeoples: function(e) {
				this.peopleIndex = e.detail.value;
				this.para.capacity = this.peoples[e.detail.value];
			},
			showBuldingModal: function(e) {
				this.page = 1;
				this.buildings = [];
				this.isShowBuldingModal = true;
				this.getBuildingListData();
			},
			getBuilding: function(e) {
				if (this.building_id != e.id) {
					this.building_id = e.id;
					this.building_name = e.name;
					//清除房间选择
					this.para.office_room_id = 0;
					this.room_name = "";
				}
				this.isShowBuldingModal = false;
			},
			hideBuildingModal: function(e) {
				this.isShowBuldingModal = false;
			},
			showRoomModal: function(e) {
				this.page = 1;
				this.rooms = [];
				this.isShowRoomModal = true;
				this.getRoomListData();
			},
			getRoom: function(e) {
				this.para.office_room_id = e.id;
				this.room_name = e.number;
				this.isShowRoomModal = false;
			},
			hideRoomModal: function(e) {
				this.isShowRoomModal = false;
			},
			ChooseImage: function() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res) => {
						//上传图片
						uni.showLoading({
							title: '上传图片中',
							mask: false
						});
						global.$http.upload('/oos/upload', {
							name: 'file',
							filePath: res.tempFilePaths[0]
						}).then(res => {
							uni.hideLoading();
							if (res.status === "0") {
								this.imgList.push(res.data);
								this.para.vr = res.data;
								uni.showToast({
									icon: 'none',
									title: '上传成功'
								});
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
					}
				});
			},
			DelImg: function(e) {
				global.$http.post('/oos/delete', {
					params: {
						url: this.para.vr
					},
				}).then(res => {
					var tmp = res;
				}).catch(err => {
					uni.showToast({
						title: err.message,
						icon: 'none'
					});
				});
				this.imgList.splice(e.currentTarget.dataset.index, 1);
				this.para.vr = "";
			},
			Submit: function(e) {
				//验证数据
				if (this.building_id <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择办公楼房'
					});
					return;
				}
				if (this.para.office_room_id <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择办公房间'
					});
					return;
				}
				
				if (this.para.vr <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择会议室照片'
					});
					return;
				}
				

				//提交数据
				uni.showLoading({
					title: '提交中',
					mask: false
				});
				global.$http.post('/meeting/info/save', {
					params: this.para,
				}).then(res => {
					uni.hideLoading();
					if (res.status === "0") {
						uni.showToast({
							icon: 'none',
							title: '提交成功'
						});
						uni.navigateBack();
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
			}
		}
	}
</script>


<style>
	.building-list-modal {
		z-index: 10000;
	}

	.building-list-modal .cu-dialog {
		height: 100vh;
	}

	.building-list-modal.cu-modal.show #list-view {
		overflow-x: hidden;
		overflow-y: scroll;
		pointer-events: auto;
	}

	.cu-form-group .modal-group {
		flex: 1;
		padding-right: 40upx;
		overflow: hidden;
		position: relative;
	}

	.cu-form-group .modal-group .picker {
		line-height: 100upx;
		font-size: 28upx;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		width: 100%;
		text-align: right;
	}

	.cu-form-group .modal-group::after {
		font-family: cuIcon;
		display: block;
		content: "\e6a3";
		position: absolute;
		font-size: 34upx;
		color: #8799a3;
		line-height: 100upx;
		width: 60upx;
		text-align: center;
		top: 0;
		bottom: 0;
		right: -20upx;
		margin: auto;
	}
</style>
