<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="content">设置会议材料</block>
		</cu-custom>

		<view class="bg-white">
			<view class="text-bold text-black text-lg padding">
				<text>温馨提示</text>
			</view>
			<view class="padding-left-xxxl padding-bottom" style="font-size: 40upx;color: blueviolet;">
				<text>红色文件为内部资料，请勿转载</text>
			</view>
		</view>

		<view>
			<view class="cu-list menu text-left padding-top-xs">
				<view class="cu-item" v-for="item in searchData" :key="item.org_id">
					<view class="content">
						<text :class="item.is_private ? 'text-red' : 'text-blue'">{{item.file_name}}</text>
						<text class="cuIcon-close text-gray"
							style="float: right;font-size: 40upx;margin-right: 0upx; width: 1.2em;"
							@tap="delFile(item)"></text>
					</view>
				</view>
			</view>
		</view>

		<view class="bottom-btns-seat"></view>
		<view class="bottom-btns">
			<view class="cancel" @click="upload()">上传资料</view>
			<view class="pass" @click="uploadPrivate()">上传内部资料</view>
		</view>
	</view>
</template>

<script>
	var AfDocument = uni.requireNativePlugin("Aq-ChooseFile");
	var iOSFileSelect = uni.requireNativePlugin('YangChuan-YCiOSFileSelect');
	export default {
		data() {
			return {
				name: '',
				searchData: [],
				para: {
					meeting_record_id: '',
					file_name: '',
					file_url: '',
					is_private: 0
				}
			};
		},
		onShow() {

		},
		onLoad(option) {
			this.para.meeting_record_id = option.meeting_record_id;
			this.getFileData();
		},
		methods: {
			getFileData() {
				uni.showLoading({
					title: '加载中',
					mask: false
				});
				//获取会议材料
				global.$http.post('/meeting/file/getList', {
					params: {
						meeting_record_id: this.para.meeting_record_id
					},
				}).then(res => {
					if (res.status === "0") {
						this.searchData = res.data;
						uni.hideLoading();
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
			uploadFile(e) {
				let platform = '';
				uni.getSystemInfo({
					success: function(res) {
						platform = res.platform;
					}
				})
				if (platform == 'ios') {
					// apple document-types 文件类型参数 https://developer.apple.com/library/archive/documentation/Miscellaneous/Reference/UTIRef/Articles/System-DeclaredUniformTypeIdentifiers.html
					// 文件类型参数
					let params = {
						"document-types": ["public.text", "public.zip", "public.data", "com.adobe.pdf",
							"com.microsoft.word.doc", "com.adobe.postscript", "com.microsoft.excel.xls",
							"com.adobe.encapsulated- postscript", "com.microsoft.powerpoint.ppt",
							"com.adobe.photoshop- image", "com.microsoft.word.rtf",
							"com.microsoft.advanced- systems-format", "com.microsoft.advanced- stream-redirector"
						],
						"isBase64": 0
					}
					iOSFileSelect.show(params, result => {
						//上传文件
						uni.showLoading({
							title: '上传文件中',
							mask: false
						});
						let status = parseInt(result.status);
						let para = this.para;
						var getFileDataList = this.getFileData;
						// 状态200选取成功
						if (status == 200) {
							let url = result.url;
							uni.downloadFile({
								url: url,
								success: function(res) {
									if (res.statusCode == 200) {
										// filePath 可用于 uni.uploadFile 上传的路径
										let filePath = res.tempFilePath;
										global.$http.upload('/oos/upload', {
											name: 'file',
											filePath: filePath
										}).then(res => {
											if (res.status === "0") {
												para.file_name = result.lastName;
												para.file_url = res.data;

												//保存会议文件
												global.$http.post('/meeting/file/save', {
													params: para,
												}).then(res => {
													uni.hideLoading();
													if (res.status === "0") {
														getFileDataList();
														uni.showToast({
															title: '上传成功',
															icon: 'none'
														});
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
							});
						}
					});
				} else {
					AfDocument.openMode({
						size: '1', //选择总数量

						isDown: true, //是否下钻（true 筛选当前目录以下的所有文件，fales 只筛选当前目录文件） 
						types: [{
							name: 'pdf',
							value: ["pdf"]
						}, {
							name: 'word',
							value: ["doc", "docx"]
						}, {
							name: 'ppt',
							value: ["wps"]
						}]
					}, (res) => {
						if (res.code != "success") {
							uni.showToast({
								icon: 'none',
								title: '未选中任何文件'
							});
							return;
						}
						var fileName = res.res[0].name;
						//var img = this.getFileImg(fileName);

						//上传资料
						uni.showLoading({
							title: '上传资料中',
							mask: false
						});
						global.$http.upload('/oos/upload', {
							name: 'file',
							filePath: 'file:///' + res.res[0].path
						}).then(res => {
							if (res.status === "0") {
								this.para.file_name = fileName;
								this.para.file_url = res.data;

								//保存会议文件
								global.$http.post('/meeting/file/save', {
									params: this.para,
								}).then(res => {
									uni.hideLoading();
									if (res.status === "0") {
										this.getFileData();
										uni.showToast({
											title: '上传成功',
											icon: 'none'
										});
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
					});
				}
			},
			search() {
				if (this.name) {
					this.searchData = this.contactsData.filter((value) => { //过滤数组元素
						return value.org_name.includes(this.name); //如果包含字符返回true
					});
				} else
					this.searchData = this.contactsData;
			},
			tapCheck: function(e) {
				e.checked = !e.checked;
			},
			delFile: function(e) {
				uni.showModal({
					title: '提示',
					content: '确定删除文件？',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.cancel) return;
						uni.showLoading({
							title: '提交中',
							mask: false
						});
						global.$http.post('/meeting/file/del', {
							params: {
								id: e.id
							},
						}).then(res => {
							uni.hideLoading();
							if (res.status === "0") {
								global.$http.post('/oos/delete', {
									params: {
										url: e.file_url
									},
								}).then(res => {
									var tmp = res;
								}).catch(err => {
									uni.showToast({
										title: err.message,
										icon: 'none'
									});
								});
								this.getFileData();
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
					fail: () => {},
					complete: () => {}
				});
			},
			upload: function(e) {
				this.para.is_private = 0;
				this.uploadFile();
			},
			uploadPrivate: function(e) {
				this.para.is_private = 1;
				this.uploadFile();
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "style/mystyle.scss";
</style>
