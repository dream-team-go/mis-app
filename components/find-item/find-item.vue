<template>
	<view>
		<view class="cu-card case no-card margin-top-sm">
			<view class="cu-item shadow">
				<view class="image">
					<image :src="record.img_url" mode="widthFix" style="height: 300upx;"></image>
					<view class="cu-tag bg-linear-blue">{{getRecordStatus(record.status)}}</view>
				</view>
				<view class="cu-list">
					<view class="cu-item">
						<view class="content flex-sub" style="padding: 15px;">
							<view style="font-size: 15px;font-weight: 900;color: #333;">物品信息：{{record.thing_info_name}}</view>
							<view style="font-size: 15px;font-weight: 900;color: #333;">拾获地点：{{record.get_place}}</view>
							<view style="font-size: 15px;" class="text-gray text-sm flex justify-between">
								联系电话：{{record.tel}}
							</view>
							<view style="font-size: 15px;" class="text-gray text-sm flex justify-between">
								领取地点：{{record.receive_place}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import misEnum from '../../common/mis-enum.js';
	export default {
		name:"find-item",
		props:{
			record: {}
		},
		data() {
			return {
				StatusEnumMap: misEnum.FindStatusEnumMap
			};
		},
		methods: {
			getRecordStatus: function(status) {
				return this.StatusEnumMap.get(status);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "style/mystyle.scss";
</style>