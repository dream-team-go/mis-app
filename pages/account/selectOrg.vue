<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="content">选择所属单位</block>
		</cu-custom>

		<view class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input style="text-align:left;" type="text" placeholder="行政单位" @input="onKeyInput"
					confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-linear-blue shadow-blur round" @tap="search()">搜索</button>
			</view>
		</view>

		<view id="list-view" style="padding-top: 100upx;" :style="[{height:(ScreenHeight-CustomBar) + 'px'}]">
			<view class="cu-list menu text-left">
				<view class="cu-item arrow" v-for="org in orgs" :key="org.id" @click="getOrg(org)"
					style="padding-top: 10rpx;padding-bottom: 10rpx;">
					<view class="content">
						<view>{{org.org_name}}</view>
					</view>
				</view>
			</view>
			<uni-load-more :status="status" :content-text="contentText" />
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '@/colorui/components/uni-load-more.vue';
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				orgs: [],
				page: 1,
				pageSize: 1000,
				orgNameLike: "",
				orgName: "",
				status: 'more',
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				}
			}
		},
		onLoad() {
			this.getOrgListData();
		},
		methods: {
			getOrgListData() {
				//获取组织数据
				global.$http.post('/core/organization/orgListAll', {
					params: {
						name: this.orgNameLike,
						page: this.page,
						pageSize: this.pageSize
					},
				}).then(res => {
					if (res.totlePage <= this.page) {
						this.status = 'noMore';
					} else {
						this.status = "more";
					}
					res.list.forEach(c => {
						this.orgs.push(c);
					});
				}).catch(err => {
					uni.hideLoading();
					uni.showToast({
						title: err.message,
						icon: 'none'
					});
				});
			},
			onKeyInput(e) {
				this.orgNameLike = e.target.value;
			},
			search: function() {
				this.orgs = [];
				this.getOrgListData();
			},
			getOrg: function(e) {
				let pages = getCurrentPages(); //获取所有页面栈实例列表
				let nowPage = pages[pages.length - 1]; //当前页页面实例
				let prevPage = pages[pages.length - 2]; //上一页页面实例
				if (prevPage.$vm.para.org_id != e.org_id) {
					prevPage.$vm.para.org_id = e.org_id;
					prevPage.$vm.orgName = e.org_name;
					prevPage.$vm.para.department_id = 0;
					prevPage.$vm.para.section_id = 0;
					prevPage.$vm.departments = [{
						name: "请选择",
						id: 0
					}];
					prevPage.$vm.dIndex = 0;
					//获取部门数据
					global.$http.post('/core/department/departmentPage', {
						params: {
							page: 1,
							pageSize: 10000,
							pid: 0,
							orgId: prevPage.$vm.para.org_id
						},
					}).then(res => {
						if (res.status === "0") {
							for (var i = 0; i < res.data.list.length; i++) {
								prevPage.$vm.departments.push(res.data.list[i]);
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
					//获取职务数据
					prevPage.$vm.para.job_id = "";
					prevPage.$vm.jobs = [];
					global.$http.post('/core/orgJob/getList', {
						params: {
							org_id: prevPage.$vm.para.org_id
						},
					}).then(res => {
						if (res.status === "0") {
							for (var i = 0; i < res.data.length; i++) {
								var job = res.data[i];
								job.checked = false;
								prevPage.$vm.jobs.push(job);
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
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style>

</style>
