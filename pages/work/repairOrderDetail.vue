<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">维修单详情</block>
		</cu-custom>
		
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 维修厂：
				<text class="text-bold">{{info.repair_shop}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 总费用：
				<text class="text-orange text-bold">{{itemsPrice + partsPrice}}元</text>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 维修项目 <text class="text-blue text-bold margin-left">{{items.length}}项</text>
			</view>
			<view class="action">
				<text class="text-orange text-bold margin-left">{{itemsPrice}}元</text>
			</view>
		</view>

		<view class="cu-item arrow border solid-top" v-for="(repairItem,index) in items" :key="repairItem.id">
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					{{index+1}}. 维修项目：
					<text class="text-bold">{{repairItem.item_name}}</text>
				</view>
			</view>
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					工时费(元)：
					<text class="text-bold">{{repairItem.item_fee}}</text>
				</view>
			</view>
			<view class="cu-bar bg-white solid-bottom" v-if="repairItem.remark.length > 0">
				<view class="action">
					备注：
					<text class="text-bold">{{repairItem.remark}}</text>
				</view>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 维修配件 <text class="text-blue text-bold margin-left">{{parts.length}}种</text>
			</view>
			<view class="action">
				<text class="text-orange text-bold margin-left">{{partsPrice}}元</text>
			</view>
		</view>
		<view class="cu-item arrow border solid-top" v-for="(partItem,index) in parts" :key="partItem.id">
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					{{index+1}}. 配件：
					<text class="text-bold">{{partItem.parts_name}}</text>
				</view>
			</view>
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					单价(元)：
					<text class="text-bold">{{partItem.price}}</text>
				</view>
			</view>
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					数量：
					<text class="text-bold">{{partItem.num}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {},
				items: [],
				parts: []
			}
		},
		onLoad(option) {
			var info = JSON.parse(decodeURIComponent(option.para));
			this.info = info;
			global.$http.post('/car/repair/repairInfo', {
				params: {
					order_code: this.info.order_code
				},
			}).then(res => {
				if (res.status === "0") {
					res.data.items.forEach(c => {
						this.items.push({
							item_name: c.item_name,
							item_fee: c.item_fee,
							remark: c.remark
						});
					});
					res.data.parts.forEach(c => {
						this.parts.push({
							parts_name: c.parts_name,
							num: c.num,
							price: c.price
						});
					});
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
		computed:{
			itemsPrice: function() {
				var price = 0;
				this.items.forEach(c=>{
					price += c.item_fee;
				});
				return price;
			},
			partsPrice: function() {
				var price = 0;
				this.parts.forEach(c=>{
					price += c.price * c.num;
				});
				return price;
			}
		},
		methods: {
			
		}
	}
</script>

<style>
</style>
