<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="content">精后勤详情</block>
		</cu-custom>

		<fix-detail :record="record"></fix-detail>

	</view>
</template>

<script>
	import misEnum from '../../common/mis-enum.js';
	export default {
		data() {
			return {
				StatusEnumMap: misEnum.FixStatusEnumMap,
				record: {},
				id: ""
			}
		},
		onLoad(option) {
			this.id = option.id;
		},
		onShow() {
			this.loadData();
		},
		methods: {
			loadData: function(){
				global.$http.post('/thing/service/getInfo', {
					params: {
						id: this.id
					},
				}).then(res => {
					if (res.status === "0") {
						// for(var item in res.data.imgs){
						// 	res.data.imgs[item].img_url = "https://hx.dcloud.net.cn/static/snapshots/tutorial/ios_simulator.png";
						// }
						this.record = res.data;
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
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "style/mystyle.scss";
</style>
