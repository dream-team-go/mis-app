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
							<view style="font-size: 15px;font-weight: 900;color: #333;">问题描述：{{record.desc}}</view>
							<view style="font-size: 15px;" class="text-gray text-sm flex justify-between">
								联系人：{{record.contact_people}}
							</view>
							<view style="font-size: 15px;" class="text-gray text-sm flex justify-between">
								联系电话：{{record.tel}}
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
		name:"fix-item",
		props:{
			record: {}
		},
		data() {
			return {
				StatusEnumMap: misEnum.FixStatusEnumMap
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