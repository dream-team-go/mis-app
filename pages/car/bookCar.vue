<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">

			<block slot="content">{{isAdd ? '预定用车' : '编辑预定用车'}}</block>
		</cu-custom>
		<form>
			<view class="cu-form-group">
				<view class="title">用车事由</view>
				<input name="input" v-model="para.reason"></input>
			</view>

			<view class="cu-form-group">
				<view class="title">用车人</view>
				<input name="input" v-model="para.car_user"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">手机号</view>
				<input name="input" v-model="para.phone"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">乘车人数</view>
				<picker @change="ChangePeoples" :value="peopleIndex" :range="peoples">
					<view class="picker">
						{{peopleIndex>-1?peoples[peopleIndex] + "人" : "请选择"}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">上车地点</view>
				<input name="input" v-model="para.start_place"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">用车区域</view>
				<picker @change="ChangeAreas" :value="areaIndex" :range="areas">
					<view class="picker">
						{{areas[areaIndex]}}
					</view>
				</picker>
			</view>

			<!-- #ifndef MP-ALIPAY -->
			<view class="cu-form-group">
				<view class="title">目的地（市/县）</view>
				<picker mode="multiSelector" @change="MultiChange" @columnchange="MultiColumnChange" :value="multiIndex" :range="multiArray">
					<view class="picker">
						{{multiArray[0][multiIndex[0]]}} {{multiArray[1][multiIndex[1]]}}
					</view>
				</picker>
			</view>
			<!-- #endif -->
			<view class="cu-form-group">
				<view class="title">目的地（详细地址）</view>
				<input name="input" v-model="para.end_place"></input>
			</view>

			<view class="cu-form-group">
				<view class="title">出发日期</view>
				<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="DateChange">
					<view class="picker">
						{{date}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">出发时间</view>
				<picker mode="time" :value="time" @change="TimeChange">
					<view class="picker">
						{{time}}
					</view>
				</picker>
			</view>

			<view class="cu-form-group">
				<view class="title">回程日期</view>
				<picker mode="date" :value="backDate" :start="startDate" :end="endDate" @change="BackDateChange">
					<view class="picker">
						{{backDate}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">回程时间</view>
				<picker mode="time" :value="backTime" @change="BackTimeChange">
					<view class="picker">
						{{backTime}}
					</view>
				</picker>
			</view>

			<view class="cu-form-group">
				<view class="title">用车类型（公务用车）</view>
				<picker @change="ChangeTypes" :value="typeIndex" :range="types">
					<view class="picker">
						{{types[typeIndex]}}
					</view>
				</picker>
			</view>

			<view class="cu-form-group">
				<view class="title">小轿车</view>
				<picker @change="ChangeXJC" :value="XJCIndex" :range="carQuantiy">
					<view class="picker">
						{{XJCIndex>-1?carQuantiy[XJCIndex] + "辆" : "请选择"}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">越野车</view>
				<picker @change="ChangeYYC" :value="YYCIndex" :range="carQuantiy">
					<view class="picker">
						{{YYCIndex>-1?carQuantiy[YYCIndex] + "辆" : "请选择"}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">商务车</view>
				<picker @change="ChangeSWC" :value="SWCIndex" :range="carQuantiy">
					<view class="picker">
						{{SWCIndex>-1?carQuantiy[SWCIndex] + "辆" : "请选择"}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">中型客车</view>
				<picker @change="ChangeZXKC" :value="ZXKCIndex" :range="carQuantiy">
					<view class="picker">
						{{ZXKCIndex>-1?carQuantiy[ZXKCIndex] + "辆" : "请选择"}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">大型客车</view>
				<picker @change="ChangeDXKC" :value="DXKCIndex" :range="carQuantiy">
					<view class="picker">
						{{DXKCIndex>-1?carQuantiy[DXKCIndex] + "辆" : "请选择"}}
					</view>
				</picker>
			</view>

			<view class="padding flex flex-direction">
				<button class="cu-btn bg-linear-blue margin-tb-sm lg" @click="Submit">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';

	function getDate(addDay) {
		const date = new Date();
		if (addDay > 0) {
			date.setDate(date.getDate() + addDay);
		}
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		month = month > 9 ? month : '0' + month;
		day = day > 9 ? day : '0' + day;

		return `${year}-${month}-${day}`;
	}

	function getTime(addMinute) {
		const date = new Date();
		var tmpMinute = date.getMinutes();
		if (tmpMinute < 30) {
			date.setMinutes(30);
		} else if (tmpMinute > 30 && tmpMinute <= 59) {
			date.setMinutes(60);
		}

		if (addMinute > 0) {
			date.setMinutes(date.getMinutes() + addMinute);
		}

		let hour = date.getHours();
		let minute = date.getMinutes();

		hour = hour > 9 ? hour : '0' + hour;;
		minute = minute > 9 ? minute : '0' + minute;

		return `${hour}:${minute}`;
	}

	function getEndTime(startTime, addHour) {
		//特殊处理IOS日期，用‘/’代替‘-’
		startTime = startTime.replace(/-/g, '/');
		var date = new Date(startTime);
		date.setHours(date.getHours() + addHour);
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		let hour = date.getHours();
		let minute = date.getMinutes();

		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;
		hour = hour > 9 ? hour : '0' + hour;;
		minute = minute > 9 ? minute : '0' + minute;

		return `${year}-${month}-${day} ${hour}:${minute}`;
	}

	export default {
		data() {
			return {
				isAdd: true,
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				ScreenHeight: this.ScreenHeight,
				date: getDate(),
				startDate: getDate(),
				endDate: getDate(7),
				time: getTime(),
				backDate: getDate(),
				backTime: getTime(),
				peopleIndex: 0,
				peoples: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],

				XJCIndex: 0,
				YYCIndex: 0,
				SWCIndex: 0,
				ZXKCIndex: 0,
				DXKCIndex: 0,
				carQuantiy: [0, 1, 2, 3, 4, 5],

				areaIndex: 0,
				areas: ["请选择", "交通补贴区域内", "交通补贴区域外"],
				typeIndex: 0,
				types: ["请选择", "公务用车"],
				multiArray: [
					[],
					[]
				],
				multiIndex: [0, 0],
				regions: [],
				para: {
					car_user: "",
					phone: "",
					people_num: 1,
					reason: "",
					area: "",
					start_place: "",
					end_place: "",
					predict_start_time: "",
					predict_end_time: "",
					end_city: "",
					end_area: "",
					type: 0,
					nums: [{
						car_type: "小轿车",
						num: 0
					}, {
						car_type: "越野车",
						num: 0
					}, {
						car_type: "商务车",
						num: 0
					}, {
						car_type: "中型客车",
						num: 0
					}, {
						car_type: "大型客车",
						num: 0
					}]
				}
			}
		},
		computed: {
			...mapState(['userInfo']),
			start_time: function() {
				return this.date + " " + this.time;
			},
			end_time: function() {
				return this.backDate + " " + this.backTime;
			}
		},
		onLoad(option) {
			if (option.para) {
				this.isAdd = false;
				var info = JSON.parse(decodeURIComponent(option.para));
				this.para.id = info.id;
				this.para.car_user = info.car_user;
				this.para.phone = info.phone;
				this.para.people_num = info.people_num;
				this.peopleIndex = info.people_num - 1;
				this.para.reason = info.reason;
				this.areaIndex = info.area == "交通补贴区域内" ? 1 : 2;
				this.para.area = info.area;
				this.para.start_place = info.start_place;
				this.para.end_place = info.end_place;
				this.date = info.predict_start_time.substring(0, 10);
				this.time = info.predict_start_time.substring(11, 16);
				this.backDate = info.predict_end_time.substring(0, 10);
				this.backTime = info.predict_end_time.substring(11, 16);
				this.para.end_city = info.end_city;
				this.para.end_area = info.end_area;
				this.typeIndex = info.type;
				this.para.type = info.type;
				//设置车辆
				info.nums.forEach(c => {
					if (c.car_type == "小轿车") {
						this.XJCIndex = c.num;
						this.para.nums[0].car_type = c.car_type;
						this.para.nums[0].num = c.num;
					}
					if (c.car_type == "越野车") {
						this.YYCIndex = c.num;
						this.para.nums[1].car_type = c.car_type;
						this.para.nums[1].num = c.num;
					}
					if (c.car_type == "商务车") {
						this.SWCIndex = c.num;
						this.para.nums[2].car_type = c.car_type;
						this.para.nums[2].num = c.num;
					}
					if (c.car_type == "中型客车") {
						this.ZXKCIndex = c.num;
						this.para.nums[3].car_type = c.car_type;
						this.para.nums[3].num = c.num;
					}
					if (c.car_type == "大型客车") {
						this.DXKCIndex = c.num;
						this.para.nums[4].car_type = c.car_type;
						this.para.nums[4].num = c.num;
					}
				});

			} else {
				this.para.car_user = this.userInfo.user.userCnName;
				this.para.phone = this.userInfo.user.username;
			}
			//获取市/县数据
			global.$http.post('/core/organization/getAreaListYn', {
				params: {},
			}).then(res => {
				if (res.status === "0") {
					this.regions = res.data;
					this.regions.forEach(c => {
						this.multiArray[0].push(c.name);
					})
					if (option.para) {
						//选中市区
						for (var i = 0; i < this.multiArray[0].length; i++) {
							if (this.para.end_city == this.multiArray[0][i]) {
								this.multiIndex[0] = i;
							}
						}
						//选中县份
						this.regions[this.multiIndex[0]].subs.forEach(c => {
							this.multiArray[1].push(c.name);
						});
						for (var i = 0; i < this.multiArray[1].length; i++) {
							if (this.para.end_area == this.multiArray[1][i]) {
								this.multiIndex[1] = i;
							}
						}
					} else {
						this.regions[0].subs.forEach(c => {
							this.multiArray[1].push(c.name);
						});
						this.para.end_city = this.multiArray[0][this.multiIndex[0]];
						this.para.end_area = this.multiArray[1][this.multiIndex[1]];
					}
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
		},
		methods: {
			DateChange: function(e) {
				this.date = e.detail.value;
			},
			TimeChange: function(e) {
				this.time = e.detail.value;
			},
			BackDateChange: function(e) {
				this.backDate = e.detail.value;
			},
			BackTimeChange: function(e) {
				this.backTime = e.detail.value;
			},
			ChangePeoples: function(e) {
				this.peopleIndex = e.detail.value;
				this.para.people_num = this.peoples[e.detail.value];
			},

			ChangeXJC: function(e) {
				this.XJCIndex = e.detail.value;
				this.para.nums[0].num = this.carQuantiy[e.detail.value];
			},
			ChangeYYC: function(e) {
				this.YYCIndex = e.detail.value;
				this.para.nums[1].num = this.carQuantiy[e.detail.value];
			},
			ChangeSWC: function(e) {
				this.SWCIndex = e.detail.value;
				this.para.nums[2].num = this.carQuantiy[e.detail.value];
			},
			ChangeZXKC: function(e) {
				this.ZXKCIndex = e.detail.value;
				this.para.nums[3].num = this.carQuantiy[e.detail.value];
			},
			ChangeDXKC: function(e) {
				this.DXKCIndex = e.detail.value;
				this.para.nums[4].num = this.carQuantiy[e.detail.value];
			},
			ChangeAreas: function(e) {
				this.areaIndex = e.detail.value;
				this.para.area = this.areas[e.detail.value];
			},
			ChangeTypes: function(e) {
				this.typeIndex = e.detail.value;
				this.para.type = e.detail.value;
			},

			MultiChange: function(e) {
				this.multiIndex = e.detail.value;
				this.para.end_city = this.multiArray[0][this.multiIndex[0]];
				this.para.end_area = this.multiArray[1][this.multiIndex[1]];
			},
			MultiColumnChange: function(e) {
				this.multiIndex[e.detail.column] = e.detail.value;
				switch (e.detail.column) {
					case 0:
						this.multiArray[1].length = 0;
						this.regions[this.multiIndex[0]].subs.forEach(c => {
							this.multiArray[1].push(c.name);
						});
						this.multiIndex[1] = 0;
						break;
				}
			},
			Submit: function(e) {
				this.para.predict_start_time = this.start_time + ":00";
				this.para.predict_end_time = this.end_time + ":00";
				//验证数据
				if (this.para.reason.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写用车事由'
					});
					return;
				}
				if (this.para.reason.length > 20) {
					uni.showToast({
						icon: 'none',
						title: '用车事由不超过20字'
					});
					return;
				}
				if (this.para.car_user.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写用车人'
					});
					return;
				}
				if (this.para.phone.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写手机号'
					});
					return;
				}
				if (this.para.start_place.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写上车地点'
					});
					return;
				}
				if (this.para.end_place.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写目的地（详细地址）'
					});
					return;
				}
				if (this.para.type <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择用车类型'
					});
					return;
				}

				//提交数据
				uni.showLoading({
					title: '提交中',
					mask: false
				});
				global.$http.post('/car/apply/' + (this.isAdd ? 'create' : 'update'), {
					//params: this.para,
					header: {
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
						uni.redirectTo({
							url: '/pages/car/index',
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
		}
	}
</script>

<style>

</style>
