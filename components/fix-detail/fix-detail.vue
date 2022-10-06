<template>
	<view>
		
		<view class="cu-bar bg-white solid-bottom margin-top-xs">
			<view class="action">
				<image src="../../static/common/newIcon/meeting_record.png"></image>
				<text class="text-lg text-black">状态</text>
			</view>
			<view class="action right text-food">{{statusDesc}}</view>
		</view>
		
		<scroll-view scroll-x="true" v-if="record.orderImgs && record.orderImgs.length > 0">
			<view class="cu-bar bg-white solid-bottom margin-top-xs">
				<view class="action" v-for="img in record.orderImgs" :key="img.id">
					<image :src="img.img_url" style="width: 400upx;height: 400upx;"></image>
				</view>
			</view>
		</scroll-view>
		
		<view class="cu-bar bg-white solid-bottom margin-top-xs">
			<view class="action">
				问题描述：
				<text class="text-black">{{record.desc}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				处理建议：
				<text class="text-black">{{record.advise}}</text>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				联系人：
				<text class="text-black">{{record.contact_people}}</text>
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
				处理人：
				<text class="text-black">{{record.update_user_name}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom" v-if="record.status != 0">
			<view class="action">
				处理时间：
				<text class="text-black">{{record.update_time}}</text>
			</view>
		</view>
		
		
		<view class="cu-bar bg-white solid-bottom" v-if="record.status == 2">
			<view class="action">
				暂缓处理原因：
				<text class="text-black">{{record.not_deal_reason}}</text>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom" v-if="record.status == 1">
			<view class="action">
				<text class="text-lg text-black">处理结果：</text>
			</view>
		</view>
		<scroll-view scroll-x="true" v-if="record.status == 1">
			<view class="cu-bar bg-white solid-bottom">
				<view class="action" v-for="img in record.dealImgs" :key="img.id">
					<image :src="img.img_url" style="width: 400upx;height: 400upx;"></image>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import misEnum from '../../common/mis-enum.js';
	export default {
		name: "fix-detail",
		props: {
			record: {}
		},
		computed: {
			statusDesc: function(){
				return misEnum.FixStatusEnumMap.get(this.record.status);
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
