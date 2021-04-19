<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="content">选择职位</block>
			<block slot="right"><view @tap="sureJob">确认</view></block>
		</cu-custom>
	
		<checkbox-group @change="checkboxChange">
			<view class="cu-form-group" v-for="job in modalJobs" :key="job.id">
				<view class="title" style="color: #333333;font-size: 34upx;">{{job.job_name}}</view>
				<checkbox :class="job.checked?'checked':''" :checked="job.checked?true:false"
					:value="job.id">
				</checkbox>
			</view>
		</checkbox-group>
	</view>
</template>

<script>
	let pages = getCurrentPages(); //获取所有页面栈实例列表
	let nowPage = pages[pages.length - 1]; //当前页页面实例
	let prevPage = pages[pages.length - 2]; //上一页页面实例
	import uniLoadMore from '@/colorui/components/uni-load-more.vue';
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				modalJobs: [],
				jobName: "",
			}
		},
		onLoad() {
			this.modalJobs = JSON.parse(JSON.stringify(prevPage.$vm.jobs));
		},
		methods: {
			checkboxChange: function(e) {
				this.modalJobs.forEach(c => {
					c.checked = false;
					e.detail.value.forEach(x => {
						if (c.id == x)
							c.checked = true;
					})
				});
			},
			sureJob: function(e) {
				var names = [];
				var ids = [];
				this.modalJobs.forEach(c => {
					if (c.checked == true) {
						names.push(c.job_name);
						ids.push(c.id);
					}
				});
				if (ids.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择职务'
					});
				} else {
					prevPage.$vm.jobs = JSON.parse(JSON.stringify(this.modalJobs));;
					prevPage.$vm.jobName = names.join('、');
					prevPage.$vm.para.job_id = ids.join(',');
					//判断是否是司机
					prevPage.$vm.isDriver = this.orgName == "开远市机关事务局" && names.findIndex(c => c == "司机") >= 0;
					prevPage.$vm.para.is_driver = this.isDriver ? 1 : 0;
					uni.navigateBack({
						delta: 1
					});
				}
			}
		}
	}
</script>

<style>

</style>
