<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">

			<block slot="content">注册</block>
		</cu-custom>
		<!-- <view class="tag">
			<text class="text">基本信息</text>	
		</view> -->
		<form>
			<view class="cu-form-group" v-show="false">
				<view class="title">机关事务局</view>
				<picker @change="SysOrganizationChange" :value="sysIndex" :range="sysOrganizations"
					range-key="org_name">
					<view class="picker">
						{{sysIndex>-1?sysOrganizations[sysIndex].org_name:'请选择'}}
					</view>
				</picker>
			</view>

			<view class="cu-form-group">
				<view class="title">所属单位</view>
				<!-- <view class="modal-group" @tap="showOrgModal()" data-target="Modal">
					<view class="picker">
						{{ para.org_id ? orgName : '请选择' }}
					</view>
				</view> -->
				<view class="modal-group" @tap="selectOrg()">
					<view class="picker">
						{{ para.org_id ? orgName : '请选择' }}
					</view>
				</view>
				
			</view>

			<view class="cu-form-group" v-show="para.org_id">
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

			<view class="cu-form-group">
				<view class="title">姓名</view>
				<input name="input" v-model="para.user_cn_name"></input>
			</view>

			<view class="cu-form-group" v-show="para.org_id">
				<view class="title">职位</view>
				<!-- <view class="modal-group" @tap="showJobModal()" data-target="Modal">
					<view class="picker">
						{{ para.job_id.length > 0 ? jobName : '请选择' }}
					</view>
				</view> -->
				
				<view class="modal-group" @tap="selectJob()">
					<view class="picker">
						{{ para.job_id.length > 0 ? jobName : '请选择' }}
					</view>
				</view>
			</view>

			<view class="cu-form-group" v-show="isDriver">
				<view class="title">驾照类型</view>
				<picker @change="ChangeDriverType" :value="dtIndex" :range="driverTypes">
					<view class="picker">
						{{dtIndex>-1?driverTypes[dtIndex] : "请选择"}}
					</view>
				</picker>
			</view>

			<view class="cu-form-group" v-show="isDriver">
				<view class="title">驾龄</view>
				<picker @change="ChangeDriveAge" :value="para.drive_age" :range="driveAges">
					<view class="picker">
						{{para.drive_age>-1?driveAges[para.drive_age] + "年" : "请选择"}}
					</view>
				</picker>
			</view>

			<view class="cu-form-group" v-show="isDriver">
				<view class="title">性别</view>
				<switch @change="ChangeDriverSex" class='switch-sex' :class="driverSex?'checked':''"
					:checked="driverSex?true:false"></switch>
			</view>

			<view class="cu-form-group" v-show="isDriver">
				<view class="title">身份证号</view>
				<input name="input" v-model="para.id_card"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">手机号</view>
				<input name="input" v-model="para.username"></input>
			</view>

			<view class="cu-form-group password-inut">
				<view class="title">密码</view>
				<input type="password" name="input" v-model="para.password"></input>
			</view>

			<view class="cu-form-group password-inut">
				<view class="title">重复密码</view>
				<input type="password" name="input" v-model="para.rPassword"></input>
			</view>

			<view class="cu-form-group">
				<view class="title">验证码</view>
				<input name="input" v-model="para.code"></input>
				<button class='cu-btn bg-linear-blue shadow' @click="SendCode"
					:disabled="disabled">验证码{{authCode}}</button>
			</view>

			<view class="padding flex flex-direction">
				<button class="cu-btn bg-linear-blue margin-tb-sm lg" @click="Submit">提交</button>
			</view>

			<view class="list-modal cu-modal bottom-modal" :class="isShowOrgModal?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-linear-blue"
						:style="[{'padding-top':StatusBar + 'px'},{height:CustomBar + 'px'}]">
						<view class="action text-white" @tap="hideOrgModal">取消</view>
						<view class="action text-white text-lg" style="text-align: center;margin-right: 15px;">选择所属单位
						</view>
						<view class="action"></view>
					</view>

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

					<view id="list-view" style="padding-top: 100upx;"
						:style="[{height:(ScreenHeight-CustomBar) + 'px'}]">
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
			</view>

			<view class="list-modal cu-modal bottom-modal" :class="isShowJobModal?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-linear-blue"
						:style="[{'padding-top':StatusBar + 'px'},{height:CustomBar + 'px'}]">
						<view class="action text-white" @tap="hideJobModal">取消</view>
						<view class="action text-white text-lg" style="text-align: center;margin-right: 15px;">选择职务
						</view>
						<view class="action" style="margin-right: 15upx;">
							<view @tap="sureJob">确认</view>
						</view>
					</view>
					<scroll-view scroll-y="true">
						<view>
							<checkbox-group @change="checkboxChange">
								<view class="cu-form-group" v-for="job in modalJobs" :key="job.id">
									<view class="title" style="color: #333333;font-size: 34upx;">{{job.job_name}}</view>
									<checkbox :class="job.checked?'checked':''" :checked="job.checked?true:false"
										:value="job.id">
									</checkbox>
								</view>
							</checkbox-group>
						</view>
					</scroll-view>
				</view>
			</view>

		</form>
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
				sysIndex: 0,
				sysOrganizations: [{
					org_name: "请选择",
					org_id: ""
				}],
				oIndex: 0,
				organizations: [{
					org_name: "请选择",
					org_id: ""
				}],
				dIndex: 0,
				departments: [{
					name: "请选择",
					id: 0
				}],
				sIndex: 0,
				sections: [{
					name: "请选择",
					id: 0
				}],
				//选择单位模态框参数
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				ScreenHeight: this.ScreenHeight,
				isShowOrgModal: false,
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
				},
				//选择职务模态框参数
				isShowJobModal: false,
				jobs: [],
				modalJobs: [],
				jobName: "",
				//提交参数
				para: {
					system_org_id: "",
					org_id: "",
					department_id: 0,
					section_id: 0,
					user_cn_name: "",
					job_id: "",
					username: "",
					password: "",
					rPassword: "",
					code: "",
					is_driver: 0,
					sex: 2,
					drive_age: 0,
					id_card: "",
					license_type: 0
				},
				authCode: "",
				disabled: false,
				isDriver: false,
				driverSex: false,
				ageIndex: 0,
				driveAges: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
					26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50
				],
				dtIndex: 0,
				driverTypes: ["请选择"]
			}
		},
		onLoad() {
			//获取开通系统单位
			global.$http.post('/core/orgRole/getOrgList', {
				params: {},
			}).then(res => {
				if (res.status === "0") {
					this.sysOrganizations = res.data;
					if (this.sysOrganizations.length > 0) {
						this.para.system_org_id = this.sysOrganizations[0].org_id;
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
			//获取驾照类型数据
			global.$http.post('/car/driver/getLicenseType', {
				params: {},
			}).then(res => {
				if (res.status === "0") {
					for (var i = 0; i < res.data.length; i++) {
						this.driverTypes.push(res.data[i].name);
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
			selectOrg: function(){
				uni.navigateTo({
					url: "../account/selectOrg"
				})
			},
			selectJob: function(){
				uni.navigateTo({
					url: "../account/selectJob"
				})
			},
			SysOrganizationChange: function(e) {
				this.para.system_org_id = this.sysOrganizations[e.detail.value].org_id;
			},
			DepartmentChange: function(e) {
				this.para.department_id = this.departments[e.detail.value].id;
				if (this.dIndex != e.detail.value) {
					this.dIndex = e.detail.value;
					this.para.section_id = 0;
					this.sections = [{
						name: "请选择",
						id: 0
					}];
					this.sIndex = 0;
					if (e.detail.value > 0) {
						//获取部门数据
						global.$http.post('/core/department/departmentPage', {
							params: {
								page: 1,
								pageSize: 10000,
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
			SectionChange: function(e) {
				this.para.section_id = this.sections[e.detail.value].id;
				this.sIndex = e.detail.value;
			},
			SendCode: function(e) {
				this.disabled = true;
				if (this.para.username.length <= 0) {
					uni.showModal({
						content: '请填写手机号',
						showCancel: false
					});
					this.disabled = false;
					return;
				}
				global.$http.post('/core/login/sendRegSms', {
					params: {
						tel: this.para.username
					},
				}).then(res => {
					if (res.status === "0") {
						this.authCode = 60;
						//定时器
						var inteval = setInterval(this.SetAuthCode, 1000);
						setTimeout(function() {
							clearInterval(inteval);
						}, 60000);
					} else {
						this.disabled = false;
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
				}).catch(err => {
					this.disabled = false;
					uni.hideLoading();
					uni.showToast({
						title: err.message,
						icon: 'none'
					});
				});
			},
			SetAuthCode: function() {
				this.authCode -= 1;
				if (this.authCode == 0) {
					this.authCode = "";
					this.disabled = false;
				}
			},
			ChangeDriveAge: function(e) {
				this.para.drive_age = e.detail.value;
			},
			ChangeDriverSex: function(e) {
				this.driverSex = e.detail.value;
				this.para.sex = e.detail.value ? 1 : 2;
			},
			ChangeDriverType: function(e) {
				this.dtIndex = e.detail.value;
				this.para.license_type = this.driverTypes[e.detail.value];
			},
			showOrgModal: function() {
				this.page = 1;
				this.orgs = [];
				this.isShowOrgModal = true;
				this.getOrgListData();
			},
			hideOrgModal: function(e) {
				this.isShowOrgModal = false;
			},
			getOrg: function(e) {
				if (this.para.org_id != e.org_id) {
					this.para.org_id = e.org_id;
					this.orgName = e.org_name;
					this.para.department_id = 0;
					this.para.section_id = 0;
					this.departments = [{
						name: "请选择",
						id: 0
					}];
					this.dIndex = 0;
					//获取部门数据
					global.$http.post('/core/department/departmentPage', {
						params: {
							page: 1,
							pageSize: 10000,
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
					//获取职务数据
					this.para.job_id = "";
					this.jobs = [];
					global.$http.post('/core/orgJob/getList', {
						params: {
							org_id: this.para.org_id
						},
					}).then(res => {
						if (res.status === "0") {
							for (var i = 0; i < res.data.length; i++) {
								var job = res.data[i];
								job.checked = false;
								this.jobs.push(job);
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
				this.isShowOrgModal = false;
			},
			showJobModal: function(e) {
				this.modalJobs = JSON.parse(JSON.stringify(this.jobs));
				this.isShowJobModal = true;
			},
			hideJobModal: function(e) {
				this.isShowJobModal = false;
			},
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
				this.jobs = JSON.parse(JSON.stringify(this.modalJobs));
				this.jobs = this.modalJobs;
				var names = [];
				var ids = [];
				this.jobs.forEach(c => {
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
					this.jobName = names.join('、');
					this.para.job_id = ids.join(',');
					this.isShowJobModal = false;
					//判断是否是司机
					this.isDriver = this.orgName == "开远市机关事务局" && names.findIndex(c => c == "司机") >= 0;
					this.para.is_driver = this.isDriver ? 1 : 0;
				}
			},
			Submit: function(e) {
				//验证数据
				if (this.para.system_org_id.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择机关事务局'
					});
					return;
				}
				if (this.para.org_id.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择所属单位'
					});
					return;
				}
				if (this.para.department_id <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择所属部门'
					});
					return;
				}
				if (this.para.section_id <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择所属科室'
					});
					return;
				}
				if (this.para.user_cn_name.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写姓名'
					});
					return;
				}
				if (this.para.job_id.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择职务'
					});
					return;
				}
				//验证司机数据
				if (this.isDriver) {
					if (this.dtIndex <= 0) {
						uni.showToast({
							icon: 'none',
							title: '请选择驾照类型'
						});
						return;
					}
					if (this.para.drive_age <= 0) {
						uni.showToast({
							icon: 'none',
							title: '请选择驾龄'
						});
						return;
					}
					if (this.para.id_card.length <= 0) {
						uni.showToast({
							icon: 'none',
							title: '请填写身份证号'
						});
						return;
					}
				}

				if (this.para.username.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写手机号'
					});
					return;
				}
				if (this.para.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}
				if (this.para.password !== this.para.rPassword) {
					uni.showToast({
						icon: 'none',
						title: '重复密码不一致'
					});
					return;
				}
				if (this.para.code.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写验证码'
					});
					return;
				}
				//提交数据
				uni.showLoading({
					title: '提交中',
					mask: false
				});
				global.$http.post('/core/login/registe', {
					params: this.para,
				}).then(res => {
					uni.hideLoading();
					if (res.status === "0") {
						uni.showToast({
							icon: 'none',
							title: '提交成功'
						});
						uni.navigateBack();
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
	}
</script>

<style lang='scss' scoped>
	/* 重写无用 */
	/* .picker .uni-picker-container .uni-picker-action.uni-picker-action-confirm {
		color: #0e0f3e !important;
	} */
	.tag {
		background: #FFFFFF;

		.text {
			display: inline-block;
			background-image: linear-gradient(45deg, #36bdbd, #44d7b6);
			color: #fff;
			height: 50upx;
			line-height: 50upx;
			width: 160upx;
			padding-left: 30upx;
			border-radius: 0 50upx 50upx 0;
		}

	}
</style>
