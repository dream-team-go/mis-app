<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="content">{{para.id ? '编辑接待申请' : '接待申请'}}</block>
		</cu-custom>

		<form>
			<view class="cu-form-group">
				<view class="title title-required">接待对象(单位)</view>
				<input name="input" v-model="para.jd_object" placeholder="请输入"></input>
			</view>
			<view class="cu-form-group">
				<view class="title title-required">接待事由</view>
				<input name="input" v-model="para.jd_reason" placeholder="请输入"></input>
			</view>

			<view class="cu-form-group">
				<view class="title title-required">接待类型</view>
				<picker @change="ChangeType" :value="typeIndex" :range="types">
					<view class="picker">
						{{typeIndex>-1?types[typeIndex] : "请选择"}}
					</view>
				</picker>
			</view>

			<view class="cu-form-group margin-top-xs">
				<view class="title title-required">拟接待日期</view>
				<picker mode="date" :value="para.jd_date" :start="startDate" :end="endDate" @change="DateChange">
					<view class="picker">
						{{para.jd_date}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title title-required">拟人数</view>
				<input name="input" placeholder="请输入" v-model="para.jd_num" type="number"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">备注</view>
				<input name="input" placeholder="请输入" v-model="para.bz"></input>
			</view>
			<view class="cu-form-group solid-bottom">
				<view class="title title-required">接待依据</view>
				<picker @change="ChangeGist" :value="gistIndex" :range="gists">
					<view class="picker">
						{{gistIndex>-1?gists[gistIndex] : "请选择"}}
					</view>
				</picker>
			</view>
			<view class="cu-bar bg-white">
				<view class="action">
					<view class="title title-required">{{ para.jdyj_type != 3 ? '文件上传' : '文件上传(情况说明)'}}</view>
				</view>
				<view class="action">
					{{imgList.length}}/1
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-1 grid-square flex-sub" style="max-width: 200upx;">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" :data-url="imgList[index]">
						<image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage()" v-if="imgList.length<1">
						<text class='cuIcon-add'></text>
					</view>
				</view>
				<view class="text-df" style="max-width: 400upx;">{{para.jdyj_fj_name}}</view>
			</view>

			<view class="cu-form-group margin-top-xs">
				<view class="title title-required">联系人</view>
				<input name="input" v-model="para.lxr_xm"></input>
			</view>
			<view class="cu-form-group">
				<view class="title title-required">联系方式</view>
				<input name="input" v-model="para.lxr_tel"></input>
			</view>

			<view class="cu-form-group margin-top-xs">
				<view class="title">用餐地点建议</view>
				<input name="input" v-model="para.jdap_dining"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">住宿安排建议</view>
				<input name="input" v-model="para.jdap_hotel"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">其他</view>
				<input name="input" v-model="para.jdap_other"></input>
			</view>

			<view class="padding flex flex-direction">
				<button class="cu-btn bg-linear-blue margin-tb-sm lg" @click="Submit">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	var AfDocument = uni.requireNativePlugin("Aq-ChooseFile");
	var iOSFileSelect = uni.requireNativePlugin('YangChuan-YCiOSFileSelect'); 
	import misEnum from '../../common/mis-enum.js';
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				startDate: this.util.getDate(0),
				endDate: this.util.getDate(4),
				typeIndex: 0,
				gistIndex: 0,
				imgList: [],
				para: {
					jd_object: "",
					jd_reason: "",
					lxr_xm: "",
					lxr_tel: "",
					jd_num: 1,
					jd_date: this.util.getDate(0),
					jdyj_type: 0,
					jdyj_fj: "",
					jdap_dining: "",
					jdap_hotel: "",
					jdap_other: "",
					jd_type: 0,
					jdyj_fj_name: "",
					bz: ""
				}
			}
		},
		computed: {
			...mapState(['userInfo']),
			types: function() {
				var types = ["请选择"];
				misEnum.ReceptionTypeEnumMap.forEach(c => {
					types.push(c);
				});
				return types;
			},
			gists: function() {
				var gists = ["请选择"];
				misEnum.ReceptionGistEnumMap.forEach(c => {
					gists.push(c);
				});
				return gists;
			}
		},
		onLoad(option) {
			if (option.para) {
				var info = JSON.parse(decodeURIComponent(option.para));
				this.para.id = info.id;
				this.para.jd_object = info.jd_object;
				this.para.jd_reason = info.jd_reason;
				this.para.lxr_xm = info.lxr_xm;
				this.para.lxr_tel = info.lxr_tel;
				this.para.jd_num = info.jd_num;
				this.para.jd_date = info.jd_date.substring(0, 10);
				this.para.jdyj_type = info.jdyj_type;
				this.para.jdyj_fj = info.jdyj_fj;
				this.para.jdap_dining = info.jdap_dining;
				this.para.jdap_hotel = info.jdap_hotel;
				this.para.jdap_other = info.jdap_other;
				this.para.jd_type = info.jd_type;
				this.para.jdyj_fj_name = info.jdyj_fj_name;
				this.para.bz = info.bz;
				//设置
				this.typeIndex = info.jd_type;
				this.gistIndex = info.jdyj_type;
				if (info.jdyj_fj && info.jdyj_fj.length > 0) {
					var img = this.getFileImg(info.jdyj_fj_name);
					if (img.length > 0)
						this.imgList.push(img);
				}
			} else {
				this.para.lxr_xm = this.userInfo.user.userCnName;
				this.para.lxr_tel = this.userInfo.user.username;
			}
		},
		methods: {
			getFileImg(fileName) {
				var img = "";
				if (fileName.endsWith(".docx") || fileName.endsWith(
						".doc"))
					img = "/static/file/word.png";
				else if (fileName.endsWith(".ppt") || fileName.endsWith(
						".pptx"))
					img = "/static/file/ppt.png";
				else if (fileName.endsWith(".pdf"))
					img = "/static/file/pdf.png";
				return img;
			},
			DateChange: function(e) {
				this.para.jd_date = e.detail.value;
			},
			ChangeType: function(e) {
				this.typeIndex = e.detail.value;
				this.para.jd_type = e.detail.value;
			},
			ChangeGist: function(e) {
				this.gistIndex = e.detail.value;
				this.para.jdyj_type = e.detail.value;
			},
			ChooseImage: function() {
				let platform = ''; 
				uni.getSystemInfo({ 
				    success:function(res){ platform = res.platform; } 
				    }) 
				if(platform == 'ios'){ 
				   
				    // apple document-types 文件类型参数 https://developer.apple.com/library/archive/documentation/Miscellaneous/Reference/UTIRef/Articles/System-DeclaredUniformTypeIdentifiers.html 
				    // 文件类型参数
				    let params = { "document-types":["public.text","public.zip","public.data","com.adobe.pdf", "com.microsoft.word.doc","com.adobe.postscript", "com.microsoft.excel.xls","com.adobe.encapsulated- postscript", "com.microsoft.powerpoint.ppt","com.adobe.photoshop- image", "com.microsoft.word.rtf","com.microsoft.advanced- systems-format", "com.microsoft.advanced- stream-redirector"], "isBase64":0 } 
				    iOSFileSelect.show(params, result => { 
				        let status = parseInt(result.status); 
				        // 状态200选取成功
				        if(status == 200){ 
				            let url = result.url; 
				            uni.downloadFile({ url:url, success:function(res){ 
				                if(res.statusCode == 200){ 
				                    // filePath 可用于 uni.uploadFile 上传的路径
				                    let filePath = res.tempFilePath; 
									//上传文件
									uni.showLoading({
										title: '上传文件中',
										mask: false
									});
									global.$http.upload('/oos/upload', {
										name: 'file',
										filePath: ret.data[0].path
									}).then(res => {
										uni.hideLoading();
										if (res.status === "0") {
											this.imgList.push(img);
											this.para.jdyj_fj_name = ret.data[0].name;
											this.para.jdyj_fj = res.data;
											uni.showToast({
												icon: 'none',
												title: '上传成功'
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
				    }}); 
				}else{
					AfDocument.openMode({
						size: '1', //选择总数量
						
						isDown: true, //是否下钻（true 筛选当前目录以下的所有文件，fales 只筛选当前目录文件） 
						types: [{
							name: 'pdf',
							value: ["pdf"]
						},{
							name: 'word',
							value: ["doc","docx"]
						},{
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
						var img = this.getFileImg(fileName);
						if (img.length <= 0) {
							uni.showToast({
								icon: 'none',
								title: '文件格式错误'
							});
							return;
						}
						//上传资料
						uni.showLoading({
							title: '上传资料中',
							mask: false
						});
						global.$http.upload('/oos/upload', {
							name: 'file',
							filePath: 'file:///' + res.res[0].path
						}).then(res => {
							uni.hideLoading();
							if (res.status === "0") {
								this.imgList.push(img);
								this.para.jdyj_fj_name = fileName;
								this.para.jdyj_fj = res.data;
								uni.showToast({
									icon: 'none',
									title: '上传成功'
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
			DelImg: function(e) {
				global.$http.post('/oos/delete', {
					params: {
						url: this.para.jdyj_fj
					},
				}).then(res => {
					var tmp = res;
				}).catch(err => {
					uni.showToast({
						title: err.message,
						icon: 'none'
					});
				});
				this.imgList.splice(e.currentTarget.dataset.index, 1);
				this.para.jdyj_fj = "";
				this.para.jdyj_fj_name = "";
			},
			Submit: function(e) {
				//验证数据
				if (this.para.jd_object.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写接待对象(单位)'
					});
					return;
				}
				if (this.para.jd_reason.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写接待事由'
					});
					return;
				}
				if (this.para.jd_type <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择接待类型'
					});
					return;
				}
				if (this.para.jd_num <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写拟人数'
					});
					return;
				}
				if (this.para.jdyj_type <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择接待依据'
					});
					return;
				}
				if (this.para.jdyj_fj.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请上传接待依据文件'
					});
					return;
				}
				if (this.para.lxr_xm.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写联系人'
					});
					return;
				}
				if (this.para.lxr_tel.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写联系方式'
					});
					return;
				}
				//提交数据
				uni.showLoading({
					title: '提交中',
					mask: false
				});
				global.$http.post('/reception/save', {
					params: this.para,
				}).then(res => {
					uni.hideLoading();
					if (res.status === "0") {
						uni.showToast({
							icon: 'none',
							title: '提交成功'
						});
						if (this.para.id) {
							uni.navigateBack({
								delta: 1
							});
						} else {
							uni.reLaunch({
								url: '/pages/reception/myReceptionList'
							});
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
	}
</script>

<style>
	.grid.col-1>uni-view {
		width: 85%;
	}
</style>
