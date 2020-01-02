<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{isAdd ? '新增车辆' : '编辑车辆'}}</block>
		</cu-custom>

		<form>
			<view class="cu-form-group">
				<view class="title">车牌号</view>
				<input name="input" v-model="para.car_number"></input>
			</view>

			<view class="cu-form-group">
				<view class="title">车牌颜色</view>
				<picker @change="ChangeColor" :value="colorIndex" :range="colors">
					<view class="picker">
						{{colors[colorIndex]}}
					</view>
				</picker>
			</view>

			<view class="cu-form-group">
				<view class="title">车辆类型</view>
				<picker @change="ChangeCarType" :value="carTypeIndex" :range="carTypes">
					<view class="picker">
						{{carTypes[carTypeIndex]}}
					</view>
				</picker>
			</view>

			<view class="cu-form-group">
				<view class="title">车辆使用性质</view>
				<picker @change="ChangeNature" :value="natureIndex" :range="natures">
					<view class="picker">
						{{natures[natureIndex]}}
					</view>
				</picker>
			</view>
			
			<view class="cu-form-group">
				<view class="title">产权单位</view>
				<picker @change="OrganizationChange" :value="oIndex" :range="organizations" range-key="org_name">
					<view class="picker">
						{{oIndex>-1?organizations[oIndex].org_name:'请选择'}}
					</view>
				</picker>
			</view>

			<view class="cu-form-group">
				<view class="title">品牌</view>
				<input name="input" v-model="para.brand"></input>
			</view>

			<view class="cu-form-group">
				<view class="title">座位数</view>
				<picker @change="ChangeSeatNum" :value="para.seat_num" :range="seatNums">
					<view class="picker">
						{{seatNums[para.seat_num]}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">车身颜色</view>
				<input name="input" v-model="para.color"></input>
			</view>

			<view class="cu-form-group">
				<view class="title">燃料类型</view>
				<picker @change="ChangeFuelType" :value="fuelTypeIndex" :range="fuelTypes">
					<view class="picker">
						{{fuelTypes[fuelTypeIndex]}}
					</view>
				</picker>
			</view>

			<view class="cu-form-group">
				<view class="title">排量</view>
				<input name="input" type="number" v-model="para.volume"></input>
			</view>

			<view class="cu-form-group">
				<view class="title">功率</view>
				<input name="input" type="number" v-model="para.power"></input>
			</view>

			<view class="cu-form-group">
				<view class="title">车架号</view>
				<input name="input" v-model="para.vin_no"></input>
			</view>

			<view class="cu-form-group">
				<view class="title">发动机号</view>
				<input name="input" v-model="para.motor_no"></input>
			</view>

			<view class="cu-form-group">
				<view class="title">变速箱类型</view>
				<picker @change="ChangeAtType" :value="atTypeIndex" :range="atTypes">
					<view class="picker">
						{{atTypes[atTypeIndex]}}
					</view>
				</picker>
			</view>

			<view class="cu-form-group">
				<view class="title">车长</view>
				<input name="input" type="number" v-model="para.car_length"></input>
			</view>

			<view class="cu-form-group">
				<view class="title">车宽</view>
				<input name="input" type="number" v-model="para.car_width"></input>
			</view>

			<view class="cu-form-group">
				<view class="title">车高</view>
				<input name="input" type="number" v-model="para.car_height"></input>
			</view>

			<view class="cu-form-group">
				<view class="title">是否城乡车辆</view>
				<switch @change="ChangeIsTown" :class="isTown?'checked':''" :checked="isTown?true:false"></switch>
			</view>

			<view class="cu-form-group">
				<view class="title">是否运营车辆</view>
				<switch @change="ChangeIsOperate" :class="isOperate?'checked':''" :checked="isOperate?true:false"></switch>
			</view>

			<view class="cu-form-group">
				<view class="title">是否监管</view>
				<switch @change="ChangeIsSupervise" :class="isSupervise?'checked':''" :checked="isSupervise?true:false"></switch>
			</view>

			<view class="cu-form-group">
				<view class="title">有无倒车雷达</view>
				<switch @change="ChangeIsPdc" :class="isPdc?'checked':''" :checked="isPdc?true:false"></switch>
			</view>

			<view class="cu-form-group">
				<view class="title">有无真皮座椅</view>
				<switch @change="ChangeIsLeatherSeat" :class="isLeatherSeat?'checked':''" :checked="isLeatherSeat?true:false"></switch>
			</view>

			<view class="cu-form-group">
				<view class="title">有无CD</view>
				<switch @change="ChangeIsCd" :class="isCd?'checked':''" :checked="isCd?true:false"></switch>
			</view>

			<view class="cu-form-group">
				<view class="title">购置价格（万元）</view>
				<input name="input" type="number" v-model="para.price"></input>
			</view>

			<view class="cu-form-group">
				<view class="title">车辆GPS</view>
				<input name="input" v-model="para.car_gps"></input>
			</view>
			
			<view class="cu-form-group">
				<view class="title">司机</view>
				<view class="modal-group" @tap="showDriverModal(index)" data-target="Modal">
					<view class="picker">
						{{ para.driver_id.length > 0 ? driver_name + "("+ driver_phone +")" : '请选择' }}
					</view>
				</view>
			</view>
			
			<view class="cu-bar bg-white">
				<view class="action">
					车辆照片上传
				</view>
				<view class="action">
					{{imgList.length}}/1
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

			<view class="cu-form-group">
				<view class="title">重量</view>
				<input name="input" type="number" v-model="para.quality"></input>
			</view>

			<view class="cu-form-group">
				<view class="title">出厂日期</view>
				<picker mode="date" :value="para.produce_time" :start="startDate" :end="endDate" @change="ProduceTimeChange">
					<view class="picker">
						{{para.produce_time}}
					</view>
				</picker>
			</view>

			<view class="cu-form-group">
				<view class="title">上牌日期</view>
				<picker mode="date" :value="para.license_time" :start="startDate" :end="endDate" @change="LicenseTimeChange">
					<view class="picker">
						{{para.license_time}}
					</view>
				</picker>
			</view>

			<view class="cu-form-group">
				<view class="title">型号</view>
				<input name="input" v-model="para.model"></input>
			</view>

			<view class="cu-form-group">
				<view class="title">轴距</view>
				<input name="input" type="number" v-model="para.wheel_base"></input>
			</view>

			<view class="cu-form-group">
				<view class="title">备注</view>
				<input name="input" v-model="para.remark"></input>
			</view>
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-orange margin-tb-sm lg" @click="Submit">提交</button>
			</view>
		</form>
		<view class="list-modal cu-modal bottom-modal" :class="isShowDriverModal?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-gradual-blue" :style="[{'padding-top':StatusBar + 'px'},{height:CustomBar + 'px'}]">
					<view class="action text-white" @tap="hideDriverModal">取消</view>
					<view class="action text-white text-lg" style="text-align: center;margin-right: 15px;">选择司机</view>
					<view class="action"></view>
				</view>
		
				<view id="list-view" :style="[{height:(ScreenHeight-CustomBar) + 'px'}]">
					<view class="cu-list menu text-left">
						<view class="cu-item arrow" v-for="driver in drivers" :key="driver.id" @click="getDriver(driver)" style="padding-top: 10rpx;padding-bottom: 10rpx;">
							<view class="content">
								<view>{{driver.user_cn_name}}({{driver.sex == 1 ? '男' : '女'}})</view>
								<view class="text-gray text-sm flex">
									<view class="text-cut">
										{{driver.tel_no}}
									</view>
								</view>
							</view>
							<view class="action">
								<view class="text-grey text-xs">驾龄{{driver.drive_age}}年</view>
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
	import misEnum from '../../common/mis-enum.js';

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
	export default {
		onLoad(option) {
			//编辑车辆
			if (option.para) {
				this.isAdd = false;
				var info = JSON.parse(decodeURIComponent(option.para));
				this.para.id = info.id;
				this.para.car_number = info.car_number;
				this.para.car_type = info.car_type;
				this.para.plate_color = info.plate_color;
				this.para.seat_num = info.seat_num;
				this.para.color = info.color;
				this.para.brand = info.brand;
				this.para.volume = info.volume;
				this.para.power = info.power;
				this.para.fuel_type = info.fuel_type;
				this.para.quality = info.quality;
				if(info.produce_time && info.produce_time.length > 0){
					this.para.produce_time = info.produce_time.substring(0,10);
				}
				if(info.license_time && info.license_time.length > 0){
					this.para.license_time = info.license_time.substring(0,10);
				}
				this.para.nature = info.nature;
				this.para.model = info.model;
				this.para.vin_no = info.vin_no;
				this.para.motor_no = info.motor_no;
				this.para.at_type = info.at_type;
				this.para.car_length = info.car_length;
				this.para.car_width = info.car_width;
				this.para.car_height = info.car_height;
				this.para.wheel_base = info.wheel_base;
				this.para.price = info.price;
				this.para.is_town = info.is_town;
				this.para.is_operate = info.is_operate;
				this.para.is_supervise = info.is_supervise;
				this.para.is_pdc = info.is_pdc;
				this.para.is_leather_seat = info.is_leather_seat;
				this.para.is_cd = info.is_cd;
				this.para.remark = info.remark;
				this.para.img = info.img;
				this.para.car_gps = info.car_gps;
				this.para.property_org = info.property_org;
				this.para.driver_id = info.driver_id;
				//设置辅助参数
				this.imgList.push(this.para.img);
				this.isTown = info.is_town == 1;
				this.isOperate = info.is_operate == 1;
				this.isSupervise = info.is_supervise == 1;
				this.isPdc = info.is_pdc == 1;
				this.isLeatherSeat = info.is_leather_seat == 1;
				this.isCd = info.is_cd == 1;
				//获取司机信息
				if(this.para.driver_id.length > 0){
					global.$http.post('/car/driver/getInfo', {
						params: {
							driver_id: this.para.driver_id
						},
					}).then(res => {
						if (res.status === "0") {
							this.driver_name = res.data.user_cn_name;
							this.driver_phone = res.data.tel_no;
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
			//获取车辆相关枚举
			global.$http.post('/car/info/enumsInfo', {}).then(res => {
				if (res.status === "0") {
					res.data.car_type.forEach(c => this.carTypes.push(c));
					res.data.plate_color.forEach(c => this.colors.push(c));
					res.data.fuel_type.forEach(c => this.fuelTypes.push(c));
					res.data.nature.forEach(c => this.natures.push(c));
					res.data.at_type.forEach(c => this.atTypes.push(c));
					//编辑时设置枚举数据
					if (option.para) {
						for (var i = 0; i < this.carTypes.length; i++) {
							if(this.para.car_type ==  this.carTypes[i]){
								this.carTypeIndex = i;
							}
						}
						for (var i = 0; i < this.colors.length; i++) {
							if(this.para.plate_color ==  this.colors[i]){
								this.colorIndex = i;
							}
						}
						for (var i = 0; i < this.fuelTypes.length; i++) {
							if(this.para.fuel_type ==  this.fuelTypes[i]){
								this.fuelTypeIndex = i;
							}
						}
						for (var i = 0; i < this.natures.length; i++) {
							if(this.para.nature ==  this.natures[i]){
								this.natureIndex = i;
							}
						}
						for (var i = 0; i < this.atTypes.length; i++) {
							if(this.para.at_type ==  this.atTypes[i]){
								this.atTypeIndex = i;
							}
						}
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
			//获取组织数据
			global.$http.post('/core/organization/organizationPage', {
				params: {
					page: 1,
					size: 10000
				},
			}).then(res => {
				if (res.status === "0") {
					for (var i = 0; i < res.data.list.length; i++) {
						if(this.para.property_org.length > 0 && this.para.property_org == res.data.list[i].property_org){
							this.oIndex = i + 1;
						}
						this.organizations.push(res.data.list[i]);
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
		data() {
			return {
				isAdd: true,
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				ScreenHeight: this.ScreenHeight,
				imgList: [],
				carTypes: ["请选择"],
				carTypeIndex: 0,
				colors: ["请选择"],
				colorIndex: 0,
				seatNums: ["请选择", "1座", "2座", "3座", "4座", "5座", "6座", "7座", "8座"],
				fuelTypeIndex: 0,
				fuelTypes: ["请选择"],
				startDate: getDate(-10000),
				endDate: getDate(),
				natureIndex: 0,
				natures: ["请选择"],
				atTypeIndex: 0,
				atTypes: ["请选择"],
				isTown: false,
				isOperate: false,
				isSupervise: false,
				isPdc: false,
				isLeatherSeat: false,
				isCd: false,
				oIndex: 0,
				organizations: [{
					org_name: "请选择",
					org_id: ""
				}],
				page: 1,
				pageSize: 100,
				isShowDriverModal: false,
				drivers: [],
				driver_name: "",
				driver_phone: "",
				status: 'more',
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				para: {
					id: "",
					car_number: "",
					car_type: "",
					plate_color: "",
					seat_num: 0,
					property_org: "",
					color: "",
					brand: "",
					volume: "",
					power: "",
					fuel_type: "",
					quality: "",
					produce_time: getDate(),
					license_time: getDate(),
					nature: "",
					model: "",
					vin_no: "",
					motor_no: "",
					at_type: "",
					car_length: "",
					car_width: "",
					car_height: "",
					wheel_base: "",
					price: "",
					is_town: 0,
					is_operate: 0,
					is_supervise: 0,
					is_pdc: 0,
					is_leather_seat: 0,
					is_cd: 0,
					remark: "",
					img: "",
					car_gps: "",
					driver_id: ""
				}
			}
		},
		methods: {
			getDriverListData() {
				this.status = 'loading';
				global.$http.post('/car/driver/driverList', {
					params: {
						page: this.page,
						pageSize: this.pageSize
					},
				}).then(res => {
					if (res.status === "0") {
						this.status = 'noMore';
						this.drivers = res.data.list;
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
								this.para.img = res.data;
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
				this.imgList.splice(e.currentTarget.dataset.index, 1);
				this.para.img = "";
			},
			ChangeCarType: function(e) {
				this.carTypeIndex = e.detail.value;
				this.para.car_type = this.carTypes[e.detail.value];
			},
			ChangeColor: function(e) {
				this.colorIndex = e.detail.value;
				this.para.plate_color = this.colors[e.detail.value];
			},
			ChangeSeatNum: function(e) {
				this.para.seat_num = Number(e.detail.value);
			},
			ChangeFuelType: function(e) {
				this.fuelTypeIndex = e.detail.value;
				this.para.fuel_type = this.fuelTypes[e.detail.value];
			},
			ProduceTimeChange: function(e) {
				this.para.produce_time = e.detail.value;
			},
			LicenseTimeChange: function(e) {
				this.para.license_time = e.detail.value;
			},
			ChangeNature: function(e) {
				this.natureIndex = e.detail.value;
				this.para.nature = this.natures[e.detail.value];
			},
			ChangeAtType: function(e) {
				this.atTypeIndex = e.detail.value;
				this.para.at_type = this.atTypes[e.detail.value];
			},
			ChangeIsTown: function(e) {
				this.isTown = e.detail.value;
				this.para.is_town = e.detail.value ? 1 : 0;
			},
			ChangeIsOperate: function(e) {
				this.isOperate = e.detail.value;
				this.para.is_operate = e.detail.value ? 1 : 0;
			},
			ChangeIsSupervise: function(e) {
				this.isSupervise = e.detail.value;
				this.para.is_supervise = e.detail.value ? 1 : 0;
			},
			ChangeIsPdc: function(e) {
				this.isPdc = e.detail.value;
				this.para.is_pdc = e.detail.value ? 1 : 0;
			},
			ChangeIsLeatherSeat: function(e) {
				this.isLeatherSeat = e.detail.value;
				this.para.is_leather_seat = e.detail.value ? 1 : 0;
			},
			ChangeIsCd: function(e) {
				this.isCd = e.detail.value;
				this.para.is_cd = e.detail.value ? 1 : 0;
			},
			OrganizationChange: function(e) {
				this.para.property_org = this.organizations[e.detail.value].org_id;
				if (this.oIndex != e.detail.value) {
					this.oIndex = e.detail.value;
				}
			},
			showDriverModal: function(e) {
				this.page = 1;
				this.cars = [];
				this.isShowDriverModal = true;
				this.getDriverListData();
			},
			hideDriverModal: function(e){
				this.isShowDriverModal = false;
			},
			getDriver: function(e) {
				this.para.driver_id = e.id;
				this.driver_name = e.user_cn_name;
				this.driver_phone = e.tel_no;
				this.isShowDriverModal = false;
			},
			Submit: function(e) {
				//验证数据
				if (this.para.car_number.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写车牌号'
					});
					return;
				}
				if (this.para.plate_color.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择车牌颜色'
					});
					return;
				}
				if (this.para.car_type.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择车辆类型'
					});
					return;
				}
				if (this.para.nature.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择车辆使用性质'
					});
					return;
				}
				if (this.para.brand.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写品牌'
					});
					return;
				}
				if (this.para.seat_num <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择座位数'
					});
					return;
				}
				if (this.para.color.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写车身颜色'
					});
					return;
				}
				if (this.para.fuel_type.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择燃料类型'
					});
					return;
				}
				if (this.para.volume.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写排量'
					});
					return;
				}
				if (this.para.power.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写功率'
					});
					return;
				}
				if (this.para.vin_no.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写车架号'
					});
					return;
				}
				if (this.para.motor_no.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写发动机号'
					});
					return;
				}
				if (this.para.at_type.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择变速箱类型'
					});
					return;
				}
				if (this.para.car_length.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写车长'
					});
					return;
				}
				if (this.para.car_width.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写车宽'
					});
					return;
				}
				if (this.para.car_height.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写车高'
					});
					return;
				}
				if (this.para.price.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写购置价格'
					});
					return;
				}
				if (this.para.car_gps.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写车辆GPS'
					});
					return;
				}
				if (this.para.img.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择图片'
					});
					return;
				}
				//提交数据
				uni.showLoading({
					title: '提交中',
					mask: false
				});
				global.$http.post('/car/info/save', {
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
.list-modal {
		z-index: 10000;
	}

	.list-modal .cu-dialog {
		height: 100vh;
	}

	.list-modal.cu-modal.show #list-view {
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
