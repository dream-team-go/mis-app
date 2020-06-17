<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{car_number}}</block>
		</cu-custom>
		
		<view class="cu-timeline" v-for="(item,index) in items" :key="item.id">
			<view class="cu-time">{{item.jzsp_time.substring(0, 10)}}</view>
			<view class="cu-item text-blue">
				<view class="bg-linear-blue content">
					<text v-if="item.items.length > 0">【维修项目】</text> 
					<view v-if="item.items.length > 0" v-for="(c, i) in item.items" :key="c.id">
						{{c.item_name}} — ￥{{c.item_fee}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				car_number: "",
				items: []
			};
		},
		onLoad(option) {
			this.car_number = option.car_number;
			//获取通讯录数据
			global.$http.post('/car/repair/getRepairList', {
				params: {
					car_id: option.car_id,
					page: 1,
					pageSize: 10000
				},
			}).then(res => {
				if (res.status === "0") {
					for (let i = 0; i < res.data.length; i++) {
						items[i] = res.data.list[i];
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
</script>

<style>

</style>
