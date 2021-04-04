<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			
			<block slot="content">{{isAdd ? '新增包房' : '编辑包房'}}</block>
		</cu-custom>

		<form>
			<view class="cu-form-group">
				<view class="title title-required">食堂楼房</view>
				<view class="modal-group" @tap="showBuldingModal" data-target="Modal">
					<view class="picker">
						{{ building_name.length > 0 ? building_name : '请选择' }}
					</view>
				</view>
			</view>

			<view class="cu-form-group" v-show="building_id > 0">
				<view class="title title-required">包房房间</view>
				<view class="modal-group" @tap="showRoomModal" data-target="Modal">
					<view class="picker">
						{{ room_name.length > 0 ? room_name : '请选择' }}
					</view>
				</view>
			</view>
			
			<view class="cu-form-group">
				<view class="title title-required">包房类型</view>
				<picker @change="ChangeFoodType" :value="foodTypeIndex" :range="foodTypes">
					<view class="picker">
						{{foodTypeIndex>-1?foodTypes[foodTypeIndex] : "请选择"}}
					</view>
				</picker>
			</view>
			
			<view class="cu-form-group">
				<view class="title title-required">{{para.dining_type == 2?'人均保底消费':'保底消费'}}</view>
				<input name="input" type="number" v-model="para.bdxf"></input>
			</view>
			<view class="cu-form-group">
				<view class="title title-required">容纳人数</view>
				<input name="input" type="number" v-model="para.capacity"></input>
			</view>

			<view class="cu-bar bg-white margin-top-xs">
				<view class="action">
					<view class="title title-required">包房照片上传</view>
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
								<view>{{building.name}}</view>
								<view class="text-somber text-df">
									<view class="text-cut">
										{{building.address}}
									</view>
								</view>
							</view>
							<view class="action">
								<view class="cu-tag round bg-orange">{{BuildingStatusEnumMap.get(building.status)}}</view>
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
								<view class="cu-tag round bg-orange">{{BuildingStatusEnumMap.get(room.status)}}</view>
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
			if(option.para){
				var info = JSON.parse(decodeURIComponent(option.para));
				this.isAdd = false;
				this.building_id = info.building_id;
				this.building_name = info.name;
				this.room_name = info.number;
				this.para.office_room_id = info.office_room_id;
				this.para.capacity = info.capacity;
				this.para.vr = info.vr;
				this.para.id = info.id;
				this.para.bdxf = info.bdxf;
				this.para.dining_type = info.dining_type;
				//设置辅助参数
				this.foodTypeIndex = info.dining_type;
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
				
				foodTypeIndex: 0,
				
				para: {
					id: "",
					vr: "",
					capacity: 1,
					office_room_id: 0,
					bdxf:"",
					dining_type: 0
				},
				building_id: 0,
				building_name: "",
				room_name: "",
				imgList: []
			}
		},
		computed: {
			foodTypes: function() {
				var types = ["请选择"];
				misEnum.FoodTypeEnumMap.forEach(c => {
					types.push(c);
				});
				return types;
			},
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
			ChangeFoodType: function(e) {
				this.foodTypeIndex = e.detail.value;
				this.para.dining_type = e.detail.value;
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
				if(this.building_id <= 0){
					uni.showToast({
						icon: 'none',
						title: '请选择食堂楼房'
					});
					return;
				}
				if (this.para.office_room_id <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择包房房间'
					});
					return;
				}
				if(this.para.dining_type <= 0){
					uni.showToast({
						icon: 'none',
						title: '请选择包房类型'
					});
					return;
				}
				if (!this.para.bdxf || this.para.bdxf <= 0) {
					uni.showToast({
						icon: 'none',
						title: '保底消费必须大于0'
					});
					return;
				}
				if (!this.para.capacity || this.para.capacity <= 0) {
					uni.showToast({
						icon: 'none',
						title: '容纳人数必须大于0'
					});
					return;
				}
				if (!this.para.vr || this.para.vr.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请上传包房照片'
					});
					return;
				}

				//提交数据
				uni.showLoading({
					title: '提交中',
					mask: false
				});
				global.$http.post('/dining/info/save', {
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
</style>
