<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="content">接待审批</block>
		</cu-custom>
		
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="text-lg text-black text-bold">审批意见</text>
			</view>
			<!-- <view class="action right text-blue" @tap="getHistory()">历史</view> -->
		</view>
		
		<view class="cu-form-group solid-bottom">
			<textarea maxlength="-1" @input="textareaInput" v-model="para.spr_advise" placeholder="请输入审批意见"></textarea>
		</view>
		
		<view class="text-sd bg-white padding" style="padding-top: 0upx;" v-if="history.length > 0">
			<view class="padding-top text-bluelight" v-for="item in history" :key="item" @tap="setHistory(item)">{{item}}</view>
		</view>
		
		<view class="cu-form-group margin-top-xs">
			<view class="title"><text class="text-lg text-black text-bold">审批日期</text></view>
			<picker mode="date" :value="para.sp_date" @change="DateChange">
				<view class="picker">
					{{para.sp_date}}
				</view>
			</picker>
		</view>
		
		<view class="cu-bar bg-white solid-bottom margin-top-xs">
			<view class="action">
				<text class="text-lg text-black text-bold">签字(下方空白区域)</text>
			</view>
		</view>
		
		<canvas class='firstCanvas' canvas-id="firstCanvas" @touchmove='move' @touchstart='start($event)' @touchend='end'
		 @touchcancel='cancel' @longtap='tap' disable-scroll='true' @error='error'>
		</canvas>
		
		<!-- <view class="cu-form-group margin-top-xs">
			<view class="title text-bold" style="color: #333333;">接待员</view>
			<view class="modal-group" @tap="showJobModal()" data-target="Modal">
				<view class="picker">
					{{ para.jd_users.length > 0 ? jobName : '请选择' }}
				</view>
			</view>
		</view> -->
		
		<view class="bottom-btns-seat"></view>
		<view class="bottom-btns">
			<view class="cancel" @click="clearClick">重签</view>
			<view class="pass" @click="overSign">提交</view>
		</view>
		
		<view class="list-modal cu-modal bottom-modal" :class="isShowJobModal?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-linear-blue"
					:style="[{'padding-top':StatusBar + 'px'},{height:CustomBar + 'px'}]">
					<view class="action text-white" @tap="hideJobModal">取消</view>
					<view class="action text-white text-lg" style="text-align: center;margin-right: 15px;">选择接待员
					</view>
					<view class="action" style="margin-right: 15upx;">
						<view @tap="sureJob">确认</view>
					</view>
				</view>
				<scroll-view scroll-y="true">
					<view>
						<checkbox-group @change="checkboxChange">
							<view class="cu-form-group" v-for="job in modalJobs" :key="job.customer_id">
								<view class="title" style="color: #333333;font-size: 34upx;">{{job.user_cn_name}}</view>
								<checkbox :class="job.checked?'checked':''" :checked="job.checked?true:false"
									:value="job.customer_id">
								</checkbox>
							</view>
						</checkbox-group>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	var content = null;
	var touchs = [];
	var canvasw = 0;
	var canvash = 0;
	var _that;
	//获取系统信息
	uni.getSystemInfo({
		success: function(res) {
			canvasw = res.windowWidth;
			canvash = res.windowHeight;
		},
	});
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				ScreenHeight: this.ScreenHeight,
				data: null,
				isEnd: false,
				history:[],
				//选择接待员模态框参数
				isShowJobModal: false,
				jobs: [],
				modalJobs: [],
				jobName: "",
				para:{
					id: "",
					spr_advise: "",
					spr_sign: "",
					sp_date: this.util.getDate()
				}
			}
		},
		onLoad(option) {
			if(option.para){
				var info = JSON.parse(decodeURIComponent(option.para));
				this.para.id = info.id;
			}
			_that = this;
			//获得Canvas的上下文
			content = wx.createCanvasContext('firstCanvas');
			//设置线的颜色
			content.setStrokeStyle("#000");
			//设置线的宽度
			content.setLineWidth(5);
			//设置线两端端点样式更加圆润
			content.setLineCap('round');
			//设置两条线连接处更加圆润
			content.setLineJoin('round');
			
			//获取审批意见历史记录
			global.$http.post('/reception/getFgAdviseHistory', {
				params: {
					
				},
			}).then(res => {
				if (res.status === "0") {
					res.data.forEach(c=>{
						this.history.push(c.fg_spr_advise);
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
			
		},
		methods: {
			DateChange: function(e){
				this.para.sp_date = e.detail.value;
			},
			textareaInput: function(e) {
				this.para.spr_advise = e.detail.value;
			},
			setHistory: function(e){
				this.para.spr_advise = e;
			},
			overSign: function() {
				if (this.para.spr_advise.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写审批意见'
					});
					return;
				}
				if (!this.isEnd) {
					uni.showToast({
						icon: 'none',
						title: '请签字'
					});
					return;
				}
				uni.canvasGetImageData({
					canvasId: 'firstCanvas',
					x: 0,
					y: 0,
					width: 500,
					height: 200,
					success(res) {
						_that.data = res.data;
					}
				});
				uni.canvasToTempFilePath({
					canvasId: 'firstCanvas',
					success: function(res) {
						//上传图片
						uni.showLoading({
							title: '提交中',
							mask: false
						});
						global.$http.upload('/oos/upload', {
							name: 'file',
							filePath: res.tempFilePath
						}).then(res => {
							if (res.status === "0") {
								_that.para.spr_sign = res.data;
								global.$http.post('/reception/fgSpTg', {
									params: _that.para
								}).then(re => {
									if (re.status === "0") {
										uni.navigateBack({
											delta: 1
										});
									} else {
										uni.showToast({
											title: re.msg,
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
								uni.hideLoading();
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
				});
			},
			// 画布的触摸移动开始手势响应
			start: function(event) {
				//获取触摸开始的 x,y
				let point = {
					x: event.changedTouches[0].x,
					y: event.changedTouches[0].y
				}
				// console.log(point)
				touchs.push(point);
			
			},
			// 画布的触摸移动手势响应
			move: function(e) {
				let point = {
					x: e.touches[0].x,
					y: e.touches[0].y
				}
				// console.log(point)
				touchs.push(point)
				if (touchs.length >= 2) {
					this.draw(touchs)
				}
			},
			// 画布的触摸移动结束手势响应
			end: function(e) {
				// 设置为已经签名
				this.isEnd = true
				// 清空轨迹数组
				for (let i = 0; i < touchs.length; i++) {
					touchs.pop()
				}
			},
			// 画布的触摸取消响应
			cancel: function(e) {
			
			},
			// 画布的长按手势响应
			tap: function(e) {
			
			},
			error: function(e) {

			},
			//绘制
			draw: function(touchs) {
				let point1 = touchs[0]
				let point2 = touchs[1]
				touchs.shift()
				content.moveTo(point1.x, point1.y)
				content.lineTo(point2.x, point2.y)
				content.stroke()
				content.draw(true)
			},
			//清除操作
			clearClick: function() {
				// 设置为未签名
				this.isEnd = false;
				//清除画布
				content.clearRect(0, 0, canvasw, canvash);
				content.draw(true);
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
						if (c.customer_id == x)
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
						names.push(c.user_cn_name);
						ids.push(c.customer_id);
					}
				});
				if (ids.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择接待员'
					});
				} else {
					this.jobName = names.join('、');
					this.para.jd_users = ids;
					this.isShowJobModal = false;
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "style/mystyle.scss";

	canvas {
		background-color: #FFFFFF;
		width: 750upx;
		height: 300upx;
	}
</style>
