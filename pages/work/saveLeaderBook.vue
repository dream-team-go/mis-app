<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">领导订餐</block>
		</cu-custom>

		<form>
			<view class="cu-form-group">
				<view class="title">用餐领导</view>
				<input name="input" v-model="para.lead"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">用餐人数</view>
				<picker @change="ChangePeoples" :value="peopleIndex" :range="peoples">
					<view class="picker">
						{{peopleIndex>-1?peoples[peopleIndex] + "人" : "请选择"}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">午餐/晚餐</view>
				<picker @change="ChangeType" :value="typeIndex" :range="types">
					<view class="picker">
						{{typeIndex>-1?types[typeIndex] : "请选择"}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">用餐日期</view>
				<input name="input" v-model="para.dining_date" disabled></input>
			</view>
			<view class="cu-form-group">
				<view class="title">用餐要求</view>
				<input name="input" v-model="para.desc"></input>
			</view>
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-linear-blue margin-tb-sm lg" @click="Submit">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
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
			if (option.para) {
				var info = JSON.parse(decodeURIComponent(option.para));
				this.isAdd = false;
				this.para.type = info.type;
				this.typeIndex = info.type;
				this.para.lead = info.lead;
				this.para.num = info.num;
				this.peopleIndex = info.num - 1;
				this.para.dining_date = info.dining_date.substring(0,10);
				this.para.desc = info.desc;
				this.para.id = info.id;
			}
		},
		data() {
			return {
				isAdd: true,
				peopleIndex: 0,
				peoples: [1, 2, 3, 4, 5],
				typeIndex: 0,
				types: ["请选择", "午餐", "晚餐"],
				para: {
					id: "",
					lead: "",
					num: 1,
					type: 0,
					dining_date: getDate(1),
					desc: ""
				}
			}
		},
		methods: {
			ChangePeoples: function(e) {
				this.peopleIndex = e.detail.value;
				this.para.num = this.peoples[e.detail.value];
			},
			ChangeType: function(e) {
				this.typeIndex = e.detail.value;
				this.para.type = e.detail.value;
			},
			Submit: function(e) {
				//验证数据
				if(this.para.lead.length <= 0){
					uni.showToast({
						icon: 'none',
						title: '用餐领导不能为空'
					});
					return;
				}
				if (this.para.type <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择用餐类型'
					});
					return;
				}
				//提交数据
				uni.showLoading({
					title: '提交中',
					mask: false
				});
				global.$http.post('/dining/lead/' + (this.isAdd ? 'save' : 'update'), {
					params: this.para,
				}).then(res => {
					uni.hideLoading();
					if (res.status === "0") {
						uni.showToast({
							icon: 'none',
							title: '提交成功'
						});
						if(this.isAdd){
							uni.navigateBack();
						}
						else{
							uni.navigateBack({
							    delta: 2
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
