<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="content">会议预定服务评价</block>
		</cu-custom>

		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 环境：
				<text v-for="(item,key) in environmentStars" :key="key"
					:class="item.value ? 'cuIcon-favorfill text-yellow' : 'cuIcon-favor text-gray'"
					@tap="tapEnvironmentStar(key)"></text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 服务：
				<text v-for="(item,key) in serviceStars" :key="key"
					:class="item.value ? 'cuIcon-favorfill text-yellow' : 'cuIcon-favor text-gray'"
					@tap="tapServiceStar(key)"></text>
			</view>
		</view>

		<view class="cu-form-group align-start cu-bar" style="padding-left: 0upx;">
			<view class="title action">
				<text class="cuIcon-title text-orange"></text>评价：
			</view>
			<textarea maxlength="-1" @input="textareaInput" placeholder="请输入"></textarea>
		</view>

		<view class="padding flex flex-direction">
			<button class="cu-btn bg-linear-blue margin-tb-sm lg" @click="Submit">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				environmentStars: [{value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}],
				serviceStars: [{value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}],
				para: {
					id: 0,
					fw_score: 0,
					hj_score: 0,
					message: ""
				}
			}
		},
		onLoad(option) {
			if(option){
				var info = JSON.parse(decodeURIComponent(option.para));
				this.para.id = info.id;
			}
		},
		methods: {
			setEnvironmentStar(){
				this.environmentStars.forEach((c, index) => {
					if (index < this.para.hj_score)
						c.value = 1;
					else
						c.value = 0;
				});
			},
			setServiceStar(){
				this.serviceStars.forEach((c, index) => {
					if (index < this.para.fw_score)
						c.value = 1;
					else
						c.value = 0;
				});
			},
			tapEnvironmentStar: function(e) {
				this.para.hj_score = e + 1;
				this.setEnvironmentStar();
			},
			tapServiceStar: function(e) {
				this.para.fw_score = e + 1;
				this.setServiceStar();
			},
			textareaInput: function(e) {
				this.para.message = e.detail.value;
			}
		}
	}
</script>

<style>

</style>
