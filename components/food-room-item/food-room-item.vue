<template>
	<view>
		<view class="cu-card case no-card margin-top-sm">
			<view class="cu-item shadow">
				<view class="image">
					<image :src="room.vr" mode="widthFix"></image>
					<view class="cu-tag bg-linear-blue">容纳{{room.capacity}}人</view>
				</view>
				<view class="cu-list">
					<view class="cu-item">
						<view class="content flex-sub" style="padding: 15px;">
							<view>
								<text style="font-size: 15px;font-weight: 900;color: #333;">{{room.name}} {{room.number}}</text>
								<text class="text-orange text-df" style="float: right;">人均保底消费￥{{room.bdxf}}</text>
							</view>
							<view style="font-size: 15px;" class="text-gray text-sm flex justify-between">
								{{room.address}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "food-room-item",
		props:{
			room: {}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	@import "style/mystyle.scss";
</style>
