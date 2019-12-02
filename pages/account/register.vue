<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">注册</block>
		</cu-custom>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">机关事务局</view>
				<picker @change="OrganizationChange" :value="sysIndex" :range="sysOrganizations" range-key="org_name">
					<view class="picker">
						{{sysIndex>-1?sysOrganizations[sysIndex].org_name:'请选择'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">所属单位</view>
				<picker @change="OrganizationChange" :value="oIndex" :range="organizations" range-key="org_name">
					<view class="picker">
						{{oIndex>-1?organizations[oIndex].org_name:'请选择'}}
					</view>
				</picker>
			</view>
			
			<view class="cu-form-group" v-show="para.org_id.length > 0">
				<view class="title">所属部门</view>
				<picker @change="DepartmentChange" :value="dIndex" :range="departments" range-key="name">
					<view class="picker">
						{{dIndex>-1?departments[dIndex].name:'请选择'}}
					</view>
				</picker>
			</view>

			<view class="cu-form-group" v-show="para.department_id > 0">
				<view class="title">所属科室</view>
				<picker @change="SectionChange" :value="sIndex" :range="sections" range-key="name">
					<view class="picker">
						{{sIndex>-1?sections[sIndex].name:'请选择'}}
					</view>
				</picker>
			</view>

		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sysIndex: 0,
				sysOrganizations: [],
				oIndex: 0,
				organizations: [{org_name: "请选择", org_id: ""}],
				dIndex: 0,
				departments:[{name: "请选择", id: 0}],
				sIndex: 0,
				sections: [{name: "请选择", id: 0}],
				para:{
					org_id: "",
					department_id: 0,
					section_id: 0
				}
			}
		},
		onLoad() {
			//获取开通系统单位
			global.$http.post('/core/orgRole/getOrgList', {
				params: {
				},
			}).then(res => {
				if (res.status === "0") {
					this.sysOrganizations = res.data;
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
			//获取组织数据
			global.$http.post('/core/organization/organizationPage', {
				params: {
					page: 1,
					size: 10000
				},
			}).then(res => {
				if (res.status === "0") {
					for (var i = 0; i < res.data.list.length; i++) {
						this.organizations.push(res.data.list[i]);
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
		},
		methods: {
			OrganizationChange: function(e){
				this.para.org_id = this.organizations[e.detail.value].org_id;
				if(this.oIndex != e.detail.value)
				{
					this.para.department_id = 0;
					this.para.section_id = 0;
					this.oIndex = e.detail.value;
					this.departments = [{name: "请选择", id: 0}];
					this.dIndex = 0;
					if(e.detail.value > 0){
						//获取部门数据
						global.$http.post('/core/department/departmentPage', {
							params: {
								page: 1,
								size: 10000,
								pid: 0,
								orgId: this.para.org_id
							},
						}).then(res => {
							if (res.status === "0") {
								for (var i = 0; i < res.data.list.length; i++) {
									this.departments.push(res.data.list[i]);
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
					else{
						
					}
				}
			},
			DepartmentChange: function(e){
				this.para.department_id = this.departments[e.detail.value].id;
				if(this.dIndex != e.detail.value){
					this.dIndex = e.detail.value;
					this.para.section_id = 0;
					this.sections = [{name: "请选择", id: 0}];
					this.sIndex = 0;
					if(e.detail.value > 0){
						//获取部门数据
						global.$http.post('/core/department/departmentPage', {
							params: {
								page: 1,
								size: 10000,
								pid: this.para.department_id
							},
						}).then(res => {
							if (res.status === "0") {
								for (var i = 0; i < res.data.list.length; i++) {
									this.sections.push(res.data.list[i]);
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
			},
			SectionChange: function(e){
				this.para.section_id = this.sections[e.detail.value].id;
				this.sIndex = e.detail.value;
			}
		}
	}
</script>

<style>

</style>
