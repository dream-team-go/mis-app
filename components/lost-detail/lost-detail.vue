<template>
	<view>
		
		<view class="cu-bar bg-white solid-bottom margin-top-xs">
			<view class="action">
				<image src="../../static/common/newIcon/meeting_record.png"></image>
				<text class="text-lg text-black">状态</text>
			</view>
			<view class="action right text-food">{{statusDesc}}</view>
		</view>
		
		<scroll-view scroll-x="true" v-if="record.imgs && record.imgs.length > 0">
			<view class="cu-bar bg-white solid-bottom margin-top-xs">
				<view class="action" v-for="img in record.imgs" :key="img.id">
					<image :src="img.img_url" style="width: 400upx;height: 400upx;"></image>
				</view>
			</view>
		</scroll-view>
		
		<!-- <view class="cu-bar bg-white solid-bottom" v-for="(item,index) in imgs" :key="item.id">
			<view class="action">
				 <view class="cu-item arrow border solid-top">
					<image :src="item" style="width: 600upx;height: 600upx;"></image>
				</view>
			</view>
		</view> -->
		
		<view class="cu-bar bg-white solid-bottom margin-top-xs">
			<view class="action">
				物品信息：
				<text class="text-black">{{record.thing_info_name}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				拾获地点：
				<text class="text-black">{{record.get_place}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action" @tap="makePhoneCall(record.tel)">
				联系电话：
				<text class="text-black">{{record.tel}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				领取地点：
				<text class="text-black">{{record.receive_place}}</text>
			</view>
		</view>

		<view class="cu-bar bg-white solid-bottom margin-top-xs">
			<view class="action">
				发布人：
				<text class="text-black">{{record.create_user_name}}</text>
			</view>
		</view>

		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				发布时间：
				<text class="text-black">{{record.create_time}}</text>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom margin-top-xs" v-if="record.status != 0">
			<view class="action">
				领取操作人：
				<text class="text-black">{{record.update_user_name}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom" v-if="record.status != 0">
			<view class="action">
				领取操作时间：
				<text class="text-black">{{record.update_time}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import misEnum from '../../common/mis-enum.js';
	export default {
		name: "lost-detail",
		props: {
			record: {}
		},
		computed: {
			statusDesc: function(){
				return misEnum.LostStatusEnumMap.get(this.record.status);
			}
		},
		data() {
			return {
			}
		},
		methods: {
			makePhoneCall: function(phone) {
				uni.makePhoneCall({
					phoneNumber: phone,
					success: () => {
						console.log("成功拨打电话")
					}
				})
			}
		}
	}
</script>

<style>

</style>
