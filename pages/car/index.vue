<template>
	<view>
		<scroll-view scroll-y class="page">
			<cu-custom bgColor="bg-gradual-pink">
				<block slot="content">用车</block>
			</cu-custom>

			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange"></text> 用车概况
				</view>
				<view class="action">
					<button class="cu-btn bg-green shadow" @tap="toBookcar">预约</button>
				</view>
			</view>
			
			<view class="cu-list grid no-border col-3">
				<view class="cu-item">
					<navigator hover-class="navigator-hover" url="../car/myCarRecordList" open-type="navigate">
						<text class="text-orange text-lg">{{carData.totalCount}}</text>
						<text>共预约</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator hover-class="navigator-hover" url="../car/myCarRecordList?status=0" open-type="navigate">
						<text class="text-orange text-lg">{{carData.waitCheckCount}}</text>
						<text>待审批</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator hover-class="navigator-hover" url="../car/myCarRecordList?status=-3" open-type="navigate">
						<text class="text-orange text-lg">{{carData.cancleCount}}</text>
						<text>申请人取消订单</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator hover-class="navigator-hover" url="../car/myCarRecordList?status=1" open-type="navigate">
						<text class="text-orange text-lg">{{carData.approveCount}}</text>
						<text>审批通过</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator hover-class="navigator-hover" url="../car/myCarRecordList?status=-1" open-type="navigate">
						<text class="text-orange text-lg">{{carData.failCount}}</text>
						<text>审批未通过</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator hover-class="navigator-hover" url="../car/myCarRecordList?status=2" open-type="navigate">
						<text class="text-orange text-lg">{{carData.finishDispatchCount}}</text>
						<text>完成车辆调度</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator hover-class="navigator-hover" url="../car/myCarRecordList?status=-2" open-type="navigate">
						<text class="text-orange text-lg">{{carData.centerCancleCount}}</text>
						<text>调度中心取消订单</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator hover-class="navigator-hover" url="../car/myCarRecordList?status=3" open-type="navigate">
						<text class="text-orange text-lg">{{carData.underwayCount}}</text>
						<text>订单进行中</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator hover-class="navigator-hover" url="../car/myCarRecordList?status=4" open-type="navigate">
						<text class="text-orange text-lg">{{carData.successCount}}</text>
						<text>订单完成</text>
					</navigator>
				</view>
			</view>
			
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange"></text> 最近预约
				</view>
			</view>
			<view class="cu-list menu">
				<view class="cu-item">
					<view class="content">
						<text class="cuIcon-tagfill text-red  margin-right-xs"></text>
						<text class="text-grey">用车事由</text>
					</view>
					<view class="action">
						<view class="cu-tag round bg-orange light">
							{{carData.status.length > 0 ? carData.reason : '无'}}
						</view>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="cuIcon-tagfill text-red  margin-right-xs"></text>
						<text class="text-grey">乘车人数</text>
					</view>
					<view class="action">
						<view class="cu-tag round bg-orange light">
							{{carData.status.length > 0 ? carData.people_num : '无'}}
						</view>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="cuIcon-tagfill text-red  margin-right-xs"></text>
						<text class="text-grey">乘车时间</text>
					</view>
					<view class="action">
						<view class="cu-tag round bg-orange light">
							{{carData.status.length > 0 ? carData.predict_start_time : '无'}}
						</view>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="cuIcon-tagfill text-red  margin-right-xs"></text>
						<text class="text-grey">返程时间</text>
					</view>
					<view class="action">
						<view class="cu-tag round bg-orange light">
							{{carData.status.length > 0 ? carData.predict_end_time : '无'}}
						</view>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="cuIcon-tagfill text-red  margin-right-xs"></text>
						<text class="text-grey">乘车地点</text>
					</view>
					<view class="action">
						<view class="cu-tag round bg-orange light">
							{{carData.status.length > 0 ? carData.start_place : '无'}}
						</view>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="cuIcon-tagfill text-red  margin-right-xs"></text>
						<text class="text-grey">目的地</text>
					</view>
					<view class="action">
						<view class="cu-tag round bg-orange light">
							{{carData.status.length > 0 ? carData.end_place : '无'}}
						</view>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="cuIcon-tagfill text-red  margin-right-xs"></text>
						<text class="text-grey">状态</text>
					</view>
					<view class="action">
						<view class="cu-tag round bg-orange light">
							{{carData.status.length > 0 ? carData.status : '无'}}
						</view>
					</view>
				</view>
			</view>
			<view class="cu-tabbar-height"></view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props:['carData'],
		data() {
			return {
				
			}
		},
		methods: {
			toBookcar: function(){
				uni.navigateTo({
					url: "../car/bookCar",
				});
			}
		}
	}
</script>

<style>
	.cu-list.grid>.cu-item .text-orange{
		color: #f37b1d;
	}
	.cu-list.grid>.cu-item .text-lg{
		font-size: 32upx;
	}
</style>
