<template>
	<view>
		<car v-if="PageCur=='car'"></car>
		<meeting v-if="PageCur=='meeting'"></meeting>
		<food v-if="PageCur=='food'"></food>
		<user v-if="PageCur=='user'"></user>
		<work v-if="PageCur=='work'"></work>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="car">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/car' + [PageCur=='car'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='car'?'text-green':'text-gray'">用车</view>
			</view>
			<view class="action" @click="NavChange" data-cur="meeting">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/meeting' + [PageCur == 'meeting'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='meeting'?'text-green':'text-gray'">会务</view>
			</view>
			<view class="action" @click="NavChange" data-cur="food">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/food' + [PageCur == 'food'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='food'?'text-green':'text-gray'">订餐</view>
			</view>
			<view class="action" @click="NavChange" data-cur="work">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/work' + [PageCur == 'work'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='work'?'text-green':'text-gray'">工作台</view>
			</view>
			<view class="action" @click="NavChange" data-cur="user">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/user' + [PageCur == 'user'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='user'?'text-green':'text-gray'">我的</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
		return {
				PageCur: 'car'
			}
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			}
		}
	}
</script>

<style>

</style>
