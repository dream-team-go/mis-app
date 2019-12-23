<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">车辆</block>
			<block slot="right" @tap="toAdd">新增</block>
		</cu-custom>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			toAdd: function(e){
				uni.navigateTo({
					url:'../work/saveCar'
				});
			}
		}
	}
</script>

<style>

</style>
