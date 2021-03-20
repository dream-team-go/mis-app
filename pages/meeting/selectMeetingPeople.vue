<template>
	<view class="container">
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="content">选择会务员</block>
		</cu-custom>

		<checkbox-group @change="checkboxChange">
			<view class="cu-form-group padding-sm" v-for="people in meetingPeples" :key="people.id">
				<view class="cu-avatar round xl" :style="{backgroundImage:'url('+people.zp+')'}">
				</view>
				<view class="title" style="color: #333333;font-size: 34upx;position: absolute; left: 180upx;">
					{{people.xm}}</view>
				<checkbox :class="people.checked?'checked':''" :checked="people.checked?true:false" :value="people.id">
				</checkbox>

			</view>
		</checkbox-group>

		<view class="padding flex flex-direction">
			<button class="cu-btn bg-linear-blue margin-tb-sm lg" @click="Submit">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				meetingPeples: [],
				max_meeting_people: 0,
				para: {
					
				}
			}
		},
		onLoad(option) {
			var info = JSON.parse(decodeURIComponent(option.para));
			this.para = info;
			
			if(this.para.peoples){
				var peopleList = [];
				this.para.peoples.forEach(c=>{
					peopleList.push(c.id);
				});
				this.para.peoples = peopleList;
			}else{
				this.para.peoples = [];
			}
			this.max_meeting_people = info.max_meeting_people;
			//获取会务员
			uni.showLoading({
				title: '加载中',
				mask: false
			});
			global.$http.post('/meeting/people/getList', {
				params: {
					page: 1,
					pageSize: 1000
				},
			}).then(res => {
				uni.hideLoading();
				if (res.status === "0") {
					res.data.list.forEach(c => {
						c.checked = false;
						if(this.para.id){
							this.para.peoples.forEach(x=>{
								if(c.id == x)
									c.checked = true;
							});
						}
						this.meetingPeples.push(c);
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
		},
		methods: {
			checkboxChange: function(e) {
				this.meetingPeples.forEach(c => {
					c.checked = false;
					e.detail.value.forEach(x => {
						if (c.id == x)
							c.checked = true;
					})
				});
				this.para.peoples = e.detail.value;
			},
			Submit: function(e) {
				if (this.para.peoples.length > this.max_meeting_people) {
					uni.showToast({
						icon: 'none',
						title: '该会议室会务人员不能超过' + this.max_meeting_people + "人"
					});
					return;
				}
				//提交数据
				uni.showLoading({
					title: '提交中',
					mask: false
				});
				global.$http.post('/meeting/record/saveRecord', {
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
						
						if(this.para.id){
							uni.navigateBack({
								delta: 4
							});
						}else{
							uni.reLaunch({
								url: '/pages/meeting/index'
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
