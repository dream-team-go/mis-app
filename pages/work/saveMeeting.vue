<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">

			<block slot="content">{{isAdd ? '新增会议室' : '编辑会议室'}}</block>
		</cu-custom>

		<form>
			<view class="cu-form-group">
				<view class="title title-required">办公楼房</view>
				<view class="modal-group" @tap="showBuldingModal" data-target="Modal">
					<view class="picker">
						{{ building_name.length > 0 ? building_name : '请选择' }}
					</view>
				</view>
			</view>

			<view class="cu-form-group" v-show="building_id > 0">
				<view class="title title-required">办公房间</view>
				<view class="modal-group" @tap="showRoomModal" data-target="Modal">
					<view class="picker">
						{{ room_name.length > 0 ? room_name : '请选择' }}
					</view>
				</view>
			</view>

			<!-- <view class="cu-form-group">
				<view class="title">容纳人数</view>
				<picker @change="ChangePeoples" :value="peopleIndex" :range="peoples">
					<view class="picker">
						{{peopleIndex>-1?peoples[peopleIndex] + "人" : "请选择"}}
					</view>
				</picker>
			</view> -->

			<view class="cu-form-group">
				<view class="title title-required">容纳人数</view>
				<input name="input" v-model="para.capacity" type="number"></input>
			</view>
			<view class="cu-form-group">
				<view class="title title-required">最大会务员数</view>
				<input name="input" v-model="para.max_meeting_people" type="number"></input>
			</view>
			<view class="cu-form-group">
				<view class="title title-required">桌子形式</view>
				<view class="modal-group" @tap="showJobModal()" data-target="Modal">
					<view class="picker">
						{{ para.tables.length > 0 ? jobName : '请选择' }}
					</view>
				</view>
			</view>
			
			<view class="cu-form-group margin-top-xs">
				<view class="title">有无电子屏</view>
				<switch @change="SwitchIsLed" :class="para.is_led ?'checked':''" :checked="para.is_led?true:false">
				</switch>
			</view>
			<view class="cu-form-group">
				<view class="title">是否视频会议</view>
				<switch @change="SwitchIsNetMeeting" :class="para.is_net_meeting ? 'checked':''"
					:checked="para.is_net_meeting?true:false"></switch>
			</view>
			<view class="cu-bar bg-white margin-top-xs">
				<view class="action">
					<view class="title title-required">会议室照片上传</view>
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
			
			<view class="building-list-modal cu-modal bottom-modal" :class="isShowBuldingModal?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-linear-blue"
						:style="[{'padding-top':StatusBar + 'px'},{height:CustomBar + 'px'}]">
						<view class="action text-white" @tap="hideBuildingModal">取消</view>
						<view class="action text-white text-lg" style="text-align: center;margin-right: 15px;">选择办公楼房</view>
						<view class="action"></view>
					</view>
			
					<view id="list-view" :style="[{height:(ScreenHeight-CustomBar) + 'px'}]">
						<view class="cu-list menu text-left">
							<view class="cu-item arrow" v-for="building in buildings" :key="building.id"
								@click="getBuilding(building)" style="padding-top: 10rpx;padding-bottom: 10rpx;">
								<view class="content">
									<view>{{building.name}}</view>
									<view class="text-somber text-df">
										<view class="text-cut">
											{{building.address}}
										</view>
									</view>
								</view>
								<view class="action">
									<!-- <view class="text-somber text-df">建于{{building.build_time}}</view> -->
									<view class="cu-tag round bg-orange">{{BuildingStatusEnumMap.get(building.status)}}
									</view>
								</view>
							</view>
						</view>
						<uni-load-more :status="status" :content-text="contentText" />
					</view>
				</view>
			</view>
			<view class="building-list-modal cu-modal bottom-modal" :class="isShowRoomModal?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-linear-blue"
						:style="[{'padding-top':StatusBar + 'px'},{height:CustomBar + 'px'}]">
						<view class="action text-white" @tap="hideRoomModal">取消</view>
						<view class="action text-white text-lg" style="text-align: center;margin-right: 15px;">选择办公房间</view>
						<view class="action"></view>
					</view>
			
					<view id="list-view" :style="[{height:(ScreenHeight-CustomBar) + 'px'}]">
						<view class="cu-list menu text-left">
							<view class="cu-item arrow" v-for="room in rooms" :key="room.id" @click="getRoom(room)"
								style="padding-top: 10rpx;padding-bottom: 10rpx;">
								<view class="content">
									<view class="text-grey">{{room.number}}</view>
								</view>
								<view class="action">
									<view class="cu-tag round bg-orange">{{BuildingStatusEnumMap.get(room.status)}}
									</view>
								</view>
							</view>
						</view>
						<uni-load-more :status="status" :content-text="contentText" />
					</view>
				</view>
			</view>
			
			<view class="list-modal cu-modal bottom-modal" :class="isShowJobModal?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-linear-blue"
						:style="[{'padding-top':StatusBar + 'px'},{height:CustomBar + 'px'}]">
						<view class="action text-white" @tap="hideJobModal">取消</view>
						<view class="action text-white text-lg" style="text-align: center;margin-right: 15px;">选择桌子形式
						</view>
						<view class="action" style="margin-right: 15upx;">
							<view @tap="sureJob">确认</view>
						</view>
					</view>
					<scroll-view scroll-y="true">
						<view>
							<checkbox-group @change="checkboxChange">
								<view class="cu-form-group" v-for="job in modalJobs" :key="job.dic_code">
									<view class="title" style="color: #333333;font-size: 34upx;">{{job.dic_name}}</view>
									<checkbox :class="job.checked?'checked':''" :checked="job.checked?true:false"
										:value="job.dic_code">
									</checkbox>
								</view>
							</checkbox-group>
						</view>
					</scroll-view>
				</view>
			</view>
		</form>
		
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
				this.para.is_led = info.is_led;
				this.para.is_net_meeting = info.is_net_meeting;
				this.para.max_meeting_people = info.max_meeting_people;
				//设置辅助参数
				this.imgList.push(this.para.vr);
				var tableNames = [];
				info.tables.forEach(c=>{
					tableNames.push(c.dic_name);
					this.para.tables.push(c.dic_code);
				});
				this.jobName = tableNames.join("、");
			}
			this.GetDic("DIC_ZZXS");
		},
		data() {
			return {
				isAdd: true,
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				ScreenHeight: this.ScreenHeight,
				BuildingStatusEnumMap: misEnum.BuildingStatusEnumMap,
				peopleIndex: 0,
				peoples: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
					27, 28, 29,
					30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54,
					55, 56, 57,
					58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82,
					83, 84, 85,
					86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100
				],
				isShowBuldingModal: false,
				buildings: [],
				isShowRoomModal: false,
				rooms: [],
				
				isShowJobModal: false,
				jobs: [],
				modalJobs: [],
				jobName: "",
				
				page: 1,
				pageSize: 100,
				status: 'more',
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				para: {
					vr: "",
					capacity: 1,
					office_room_id: 0,
					is_led: 0,
					is_net_meeting: 0,
					max_meeting_people: 1,
					tables:[]
				},
				building_id: 0,
				building_name: "",
				room_name: "",
				imgList: []
			}
		},
		methods: {
			GetDic(type) {
				global.$http.post('/core/dic/get', {
					params: {
						type: type
					},
				}).then(res => {
					if (res.status === "0") {
						for (var i = 0; i < res.data.length; i++) {
							var job = res.data[i];
							job.checked = false;
							this.para.tables.forEach(c=>{
								if(c == job.dic_code){
									job.checked = true;
									return;
								}
							})
							this.jobs.push(job);
						}
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
			showJobModal: function(e) {
				this.modalJobs = JSON.parse(JSON.stringify(this.jobs));
				this.isShowJobModal = true;
			},
			hideJobModal: function(e) {
				this.isShowJobModal = false;
			},
			checkboxChange: function(e) {
				this.modalJobs.forEach(c => {
					c.checked = false;
					e.detail.value.forEach(x => {
						if (c.dic_code == x)
							c.checked = true;
					})
				});
			},
			sureJob: function(e) {
				this.jobs = JSON.parse(JSON.stringify(this.modalJobs));
				this.jobs = this.modalJobs;
				var names = [];
				var ids = [];
				this.jobs.forEach(c => {
					if (c.checked == true) {
						names.push(c.dic_name);
						ids.push(c.dic_code);
					}
				});
				if (ids.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择桌子形式'
					});
				} else {
					this.jobName = names.join('、');
					this.para.tables = ids;
					this.isShowJobModal = false;
				}
			},
			ChooseImage: function() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
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
			SwitchIsNetMeeting: function(e) {
				this.para.is_net_meeting = e.detail.value ? 1 : 0;
			},
			SwitchIsLed: function(e) {
				this.para.is_led = e.detail.value ? 1 : 0;
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
				if (!this.para.capacity || this.para.capacity <= 0) {
					uni.showToast({
						icon: 'none',
						title: '容纳人数必须大于0'
					});
					return;
				}
				if (!this.para.max_meeting_people || this.para.max_meeting_people <= 0) {
					uni.showToast({
						icon: 'none',
						title: '最大会务员数必须大于0'
					});
					return;
				}
				
				if(this.para.tables.length <= 0){
					uni.showToast({
						icon: 'none',
						title: '请选择桌子形式'
					});
					return;
				}

				if (this.para.vr.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请上传会议室照片'
					});
					return;
				}

				//提交数据
				uni.showLoading({
					title: '提交中',
					mask: false
				});
				global.$http.post('/meeting/info/save', {
					header:{
						ContentType: 'text/plain'
					},
					data: JSON.stringify(this.para)
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
