<template>
	<view class="container">
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="content">设置会务员</block>
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
					id: 0,
					peoples:[]
				}
			}
		},
		onLoad(option) {
			var info = JSON.parse(decodeURIComponent(option.para));
			this.para.id = info.id;
			this.para.peoples = info.peoples;
			
			if(this.para.peoples){
				var peopleList = [];
				this.para.peoples.forEach(c=>{
					peopleList.push(c.id);
				});
				this.para.peoples = peopleList;
			}else{
				this.para.peoples = [];
			}
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
				//提交数据
				uni.showLoading({
					title: '提交中',
					mask: false
				});
				global.$http.post('/meeting/record/saveMeetingPeople', {
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
						uni.navigateBack({
							delta: 1
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
