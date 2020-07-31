<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			
			<block slot="content">电子签名</block>
		</cu-custom>
		<canvas class='firstCanvas' canvas-id="firstCanvas" @touchmove='move' @touchstart='start($event)' @touchend='end'
		 @touchcancel='cancel' @longtap='tap' disable-scroll='true' @error='error'>
		</canvas>

		<view class="bottom-btns-seat"></view>
		<view class="bottom-btns">
			<view class="cancel" @click="clearClick">重签</view>
			<view class="pass" @click="overSign">保存</view>
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
	})
	export default {
		data() {
			return {
				data: null,
				signImage: '',
				oldImage: '',
				isEnd: false // 是否签名
			}
		},
		methods: {
			delOldImg: function(){
				if(this.oldImage){
					global.$http.post('/oos/delete', {
						params: {
							url: this.oldImage
						},
					}).then(res => {
						uni.hideLoading();
						uni.showToast({
							icon: 'none',
							title: '保存成功'
						});
						uni.navigateBack();
					}).catch(err => {
						uni.hideLoading();
						uni.showToast({
							icon: 'none',
							title: '保存成功'
						});
						uni.navigateBack();
					});
				}
			},
			overSign: function() {
				if (this.isEnd) {
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
								title: '保存中',
								mask: false
							});
							global.$http.upload('/oos/upload', {
								name: 'file',
								filePath: res.tempFilePath
							}).then(res => {
								if (res.status === "0") {
									_that.signImage = res.data;
									global.$http.post('/core/user/addSign', {
										params: {
											sign: _that.signImage
										}
									}).then(re => {
										if (re.status === "0") {
											//清除旧图片
											_that.delOldImg();
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
				} else {
					uni.showToast({
						title: "请先完成签名",
						icon: 'none'
					});
				}

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
				// uni.canvasPutImageData({
				// 	canvasId: 'firstCanvas',
				// 	x: 0,
				// 	y: 0,
				// 	width: 500,
				// 	height: 200,
				// 	data: _that.data,
				// 	success(res) {
				// 		//content.draw(true);
				// 	},
				// 	fail(res) {
				// 		console.log(res);
				// 	}
				// });
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
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
			
			uni.showLoading({
				title: '加载中',
				mask: false
			});
			global.$http.post('/core/user/getSign', {
				
			}).then(res => {
				uni.hideLoading();
				if (res.status === "0") {
					if(res.data && res.data.length > 0){
						this.oldImage = res.data;
						const query = uni.createSelectorQuery().in(_that);
						query.select('.firstCanvas').boundingClientRect(data => {
							content.drawImage(res.data, 0, 0, data.width, data.height);
							content.draw();
						}).exec();
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
