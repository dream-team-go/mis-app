<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			
			<block slot="content">包房详情</block>
			<block slot="right"><view v-if="HasOperateKey" @tap="toEdit">修改</view></block>
		</cu-custom>
		
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 食堂楼房：
				<text class="text-black">{{info.name}}</text>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 包房房间：
				<text class="text-black">{{info.number}}</text>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 容纳人数：
				<text class="text-black">{{info.capacity}}</text>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 包房类型：
				<text class="text-black">{{getTypeDesc(info.dining_type)}}</text>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 {{info.dining_type == 2?'人均':''}}保底消费：
				<text class="text-black">{{info.bdxf}}</text>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 地址：
				<text class="text-black">{{info.address}}</text>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 创建时间：
				<text class="text-black">{{info.create_time}}</text>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				 包房照片：
				<image :src="info.vr" style="width: 500upx;height: 500upx;"></image>
			</view>
		</view>
		
	</view>
</template>

<script>
	import misEnum from '../../common/mis-enum.js';
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				id: "",
				info: {}
			}
		},
		computed: {
			...mapState(['userInfo']),
			HasOperateKey: function(){
				return this.userInfo.key.includes('dining:manage');
			}
		},
		onLoad(option) {
			this.id = option.id;
		},
		onShow() {
			global.$http.post('/dining/info/getInfo', {
				params: {
					dining_id: this.id
				},
			}).then(res => {
				if (res.status === "0") {
					this.info = res.data;
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
		methods: {
			getTypeDesc: function(type){
				return misEnum.FoodTypeEnumMap.get(type);
			},
			toEdit: function(e){
				uni.navigateTo({
					url: '../work/saveFood?para=' + encodeURIComponent(JSON.stringify(this.info))
				});
			}
		}
	}
</script>

<style>

</style>
