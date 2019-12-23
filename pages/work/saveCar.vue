<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{isAdd ? '新增车辆' : '编辑车辆'}}</block>
		</cu-custom>

		<form>
			<view class="cu-form-group">
				<view class="title">容纳人数</view>
				<picker @change="ChangePeoples" :value="peopleIndex" :range="peoples">
					<view class="picker">
						{{peopleIndex>-1?peoples[peopleIndex] + "人" : "请选择"}}
					</view>
				</picker>
			</view>

			<view class="cu-form-group">
				<view class="title">VR展示连接</view>
				<input name="input" v-model="para.vr"></input>
			</view>
			
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					车辆照片上传
				</view>
				<view class="action">
					{{imgList.length}}/4
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
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
				<button class="cu-btn bg-orange margin-tb-sm lg" @click="Submit">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	import misEnum from '../../common/mis-enum.js';
	export default {
		onLoad(option) {
			if(option.para){
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
			}
		},
		data() {
			return {
				isAdd: true,
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				ScreenHeight: this.ScreenHeight,
				imgList: [],
				
				
				BuildingStatusEnumMap: misEnum.BuildingStatusEnumMap,
				peopleIndex: 0,
				peoples: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
					30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50
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
					id: 0,
					vr: "",
					capacity: 1,
					office_room_id: 0
				},
				building_id: 0,
				building_name: "",
				room_name: ""
			}
		},
		methods: {
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
			Submit: function(e) {
				//验证数据
				if(this.building_id <= 0){
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
	
</style>
