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
				<input name="input" v-model="para.volume"></input>
			</view>

			<view class="cu-form-group">
				<view class="title">功率</view>
				<input name="input" v-model="para.power"></input>
			</view>

			<view class="cu-form-group">
				<view class="title">重量</view>
				<input name="input" v-model="para.quality"></input>
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
				<input name="input" v-model="para.car_length"></input>
			</view>
			
			<view class="cu-form-group">
				<view class="title">车宽</view>
				<input name="input" v-model="para.car_width"></input>
			</view>
			
			<view class="cu-form-group">
				<view class="title">车高</view>
				<input name="input" v-model="para.car_height"></input>
			</view>
			
			<view class="cu-form-group">
				<view class="title">轴距</view>
				<input name="input" v-model="para.wheel_base"></input>
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

			<view class="cu-bar bg-white margin-top">
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

			<view class="padding flex flex-direction">
				<button class="cu-btn bg-orange margin-tb-sm lg" @click="Submit">提交</button>
			</view>
		</form>
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
			//获取车辆相关枚举
			global.$http.post('/car/info/enumsInfo', {

			}).then(res => {
				if (res.status === "0") {
					res.data.car_type.forEach(c => this.carTypes.push(c));
					res.data.plate_color.forEach(c => this.colors.push(c));
					res.data.fuel_type.forEach(c => this.fuelTypes.push(c));
					res.data.nature.forEach(c => this.natures.push(c));
					res.data.at_type.forEach(c => this.atTypes.push(c));
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
				para: {
					id: 0,
					car_number: "",
					car_type: "",
					plate_color: "",
					seat_num: 0,
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
					is_cd: 0
				}
			}
		},
		methods: {
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
			},
			ChangeCarType: function(e) {
				this.carTypeIndex = e.detail.value;
				this.para.car_type = this.carTypes[e.detail.value];
			},
			ChangeColor: function(e) {
				this.colorIndex = e.detail.value;
				this.para.plate_color = colors[e.detail.value];
			},
			ChangeSeatNum: function(e) {
				this.para.seat_num = Number(e.detail.value);
			},
			ChangeFuelType: function(e) {
				this.fuelTypeIndex = e.detail.value;
				this.para.fuel_type = fuelTypes[e.detail.value];
			},
			ProduceTimeChange: function(e) {
				this.para.produce_time = e.detail.value;
			},
			LicenseTimeChange: function(e) {
				this.para.license_time = e.detail.value;
			},
			ChangeNature: function(e) {
				this.natureIndex = e.detail.value;
				this.para.nature = natures[e.detail.value];
			},
			ChangeAtType: function(e){
				this.atTypeIndex = e.detail.value;
				this.para.at_type = atTypes[e.detail.value];
			},
			ChangeIsTown: function(e){
				this.isTown =  e.detail.value;
				this.para.is_town = e.detail.value ? 1 : 0;
			},
			ChangeIsOperate: function(e){
				this.isOperate =  e.detail.value;
				this.para.is_operate = e.detail.value ? 1 : 0;
			},
			ChangeIsSupervise: function(e){
				this.isSupervise =  e.detail.value;
				this.para.is_supervise = e.detail.value ? 1 : 0;
			},
			ChangeIsPdc: function(e){
				this.isPdc =  e.detail.value;
				this.para.is_pdc = e.detail.value ? 1 : 0;
			},
			ChangeIsLeatherSeat: function(e){
				this.isLeatherSeat =  e.detail.value;
				this.para.is_leather_seat = e.detail.value ? 1 : 0;
			},
			ChangeIsCd: function(e){
				this.isCd =  e.detail.value;
				this.para.is_cd = e.detail.value ? 1 : 0;
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
