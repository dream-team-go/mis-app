<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="content">{{isAdd ? '桌餐预定' : '编辑桌餐预定'}}</block>
		</cu-custom>
		
		<view class="cu-bar bg-white flex padding-top padding-bottom">
			<view class="action">
				<text class="cuIcon-roundcheckfill text-red" style="font-size: 50upx;"></text>
				<view class="flex-sub ">
					<view><text>包房：</text> <text class="text-bold">{{para.building_name}} {{para.room_number}}</text>
					</view>
					<view class="margin-top-xs"><text>时间：</text> <text class="text-bold">{{para.ydrq}} {{para.ydsjd == "1" ? "上午":"下午"}}</text></view>
				</view>
			</view>
		</view>
		
		<form>
			<view class="cu-form-group margin-top-xs">
				<view class="title title-required">订餐原由</view>
				<input name="input" v-model="para.desc"></input>
			</view>
			
			<view class="cu-form-group">
				<view class="title title-required">上菜时间</view>
				<picker mode="time" :value="mealTime" @change="MealTimeChange">
					<view class="picker">
						{{mealTime}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title title-required">用餐人数</view>
				<input name="input" placeholder="请输入" v-model="para.people_num" type="number"></input>
			</view>
			
			<view class="cu-form-group">
				<view class="title title-required">联系人</view>
				<input name="input" v-model="para.user_name"></input>
			</view>
			<view class="cu-form-group">
				<view class="title title-required">联系方式</view>
				<input name="input" v-model="para.user_tel"></input>
			</view>
			
			<view class="cu-form-group margin-top-xs">
				<view class="title">订餐单位</view>
				<input name="input" v-model="para.order_org"></input>
			</view>
			<view class="cu-form-group ">
				<view class="title">清真人数</view>
				<input name="input" placeholder="请输入" v-model="para.has_hz" type="number"></input>
			</view>

			<view class="cu-form-group">
				<view class="title">餐标（总费）</view>
				<input name="input" v-model="para.meal_spec" type="number"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">是否需要菜单</view>
				<switch @change="SwitchIsLed" :class="para.cd_status?'checked':''" :checked="para.cd_status?true:false">
				</switch>
			</view>
			
			<view class="cu-form-group margin-top-xs">
				<view class="title">接待对象</view>
				<input name="input" v-model="para.receive_people"></input>
			</view>

			<view class="cu-form-group">
				<view class="title">陪同领导</view>
				<input name="input" v-model="para.lender"></input>
			</view>

			<view class="cu-form-group">
				<view class="title">特殊要求</view>
				<input name="input" v-model="para.meal_request"></input>
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
	import uniLoadMore from '@/colorui/components/uni-load-more.vue';
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				isAdd: true,
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				ScreenHeight: this.ScreenHeight,
				mealTime: "",
				capacity: 0,
				status: 'more',
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				page: 1,
				pageSize: 100,
				para: {
					desc: "",
					user_name: "",
					user_tel: "",
					people_num: 0,
					receive_people: "",
					order_org: "",
					lender: "",
					dining_id: "",
					building_name: "",
					meal_spec: "",
					room_number: "",
					has_hz: 0,
					cd_status: 0,
					meal_request: ""
				}
			}
		},
		computed: {
			...mapState(['userInfo']),
			meal_time: function() {
				return this.para.ydrq + " " + this.mealTime + ":00";
			}
		},
		onLoad(option) {
			var info = JSON.parse(decodeURIComponent(option.para));
			this.para.dining_id = info.dining_id;
			this.para.building_name = info.building_name;
			this.para.room_number = info.room_number;
			this.para.ydrq = info.ydrq;
			this.para.ydsjd = info.ydsjd;
			this.capacity = info.capacity;
			if (info.id > 0) {
				this.isAdd = false;
				this.para.id = info.id;
				this.para.desc = info.desc;
				this.para.user_name = info.user_name;
				this.para.user_tel = info.user_tel;
				this.para.people_num = info.people_num;
				this.para.receive_people = info.receive_people;
				this.para.lender = info.lender;
				this.para.meal_spec = info.meal_spec;
				this.para.has_hz = info.has_hz;
				this.mealTime = info.meal_time.substring(11, 16);
				this.hzIndex = info.has_hz;
				this.para.order_org = info.order_org;
				this.para.meal_request = info.meal_request;
				this.para.cd_status = info.cd_status;
			} else {
				if(this.para.ydsjd == "1")
					this.mealTime = "12:00";
				if(this.para.ydsjd == "2")
					this.mealTime = "18:00";
				this.para.user_name = this.userInfo.user.userCnName;
				this.para.user_tel = this.userInfo.user.username;
			}
		},
		methods: {
			MealTimeChange: function(e) {
				this.mealTime = e.detail.value;
			},
			SwitchIsLed: function(e) {
				this.para.cd_status = e.detail.value ? 1 : 0;
			},
			Submit: function(e) {
				this.para.meal_time = this.meal_time;
				//验证数据
				if (this.para.desc.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写订餐原由'
					});
					return;
				}
				if (this.para.desc.length > 20) {
					uni.showToast({
						icon: 'none',
						title: '订餐原由不超过20字'
					});
					return;
				}
				if (this.para.user_name.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写联系人'
					});
					return;
				}
				if (this.para.user_tel.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写联系电话'
					});
					return;
				}
				if (this.para.people_num <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写用餐人数'
					});
					return;
				}
				if (this.para.people_num > this.capacity) {
					uni.showToast({
						icon: 'none',
						title: '该包房用餐人数不能超过' + this.capacity + '人'
					});
					return;
				}
				if (this.para.dining_id <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择会议室'
					});
					return;
				}

				//提交数据
				uni.showLoading({
					title: '提交中',
					mask: false
				});
				global.$http.post('/dining/record/saveRecord', {
					params: this.para,
				}).then(res => {
					uni.hideLoading();
					if (res.status === "0") {
						uni.showToast({
							icon: 'none',
							title: '提交成功'
						});
						if(this.para.id){
							uni.navigateBack({
								delta: 3
							});
						}else{
							uni.reLaunch({
								url: '/pages/food/index'
							});
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
			}
		}
	}
</script>

<style>
</style>
