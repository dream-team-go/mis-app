<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="content">会务</block>
		</cu-custom>

		<!-- <view class="bg-white">
			<view class="text-bold text-black text-lg padding">
				<text>温馨提示</text>
			</view>
			<view class="padding-left-xxxl padding-bottom">
				<text>午餐11:30 — 13:00</text>
				<text class="padding-left-xl">晚餐17:30 — 19:00</text>
			</view>
		</view> -->

		<view class="cu-card">
			<view class="cu-item bg-img shadow-blur" :style="[{backgroundImage:'url('+item.img+')'}]"
				@tap="goPage(item)" v-for="(item,index) in permissionList" :key="index">
				<view class="cardTitle">
					{{item.title}}
				</view>
			</view>
		</view>
		
		<view class="cu-modal" :class="isShowModal?'show':''" style="z-index: auto;">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">请输入会议密码</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view>
					<view class="cu-form-group" style="text-align: left;">
						<textarea maxlength="4" @input="fillPassword" placeholder="会议密码"></textarea>
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-bluelight text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-linear-blue margin-left" @tap="sureModal">确定</button>
		
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				isShowModal: false,
				password: '',
				list: [{
						title: '订会议室',
						img: '/static/meeting/dinghui.png',
						url: '/pages/meeting/selectRoom',
						permissionKey: ""
					},
					{
						title: '参加会议',
						img: '/static/meeting/canhui.png',
						url: '/pages/meeting/inputPswd',
						permissionKey: ""
					},
					{
						title: '参会记录',
						img: '/static/meeting/lishihui.png',
						url: '/pages/meeting/joinRecord',
						permissionKey: ""
					}
				]
			}
		},
		computed: {
			...mapState(['userInfo']),
			permissionList: function() {
				var showList = [];
				for (var i = 0; i < this.list.length; i++) {
					if (!this.list[i].permissionKey || this.userInfo.key.includes(this.list[i].permissionKey)) {
						showList.push(this.list[i]);
					}
				}
				return showList;
			}
		},
		onLoad() {

		},
		methods: {
			goPage(item) {
				if (!item.url) {
					uni.showToast({
						title: '敬请期待',
						icon: 'none'
					})
					return
				}
				if (item.url == '/pages/meeting/inputPswd') {
					this.showModal();
				} else {
					uni.navigateTo({
						url: item.url,
					});
				}
			},
			fillPassword: function(e) {
				this.password = e.detail.value;
			},
			showModal: function(e){
				this.isShowModal = true;
			},
			hideModal: function() {
				this.isShowModal = false;
			},
			sureModal: function() {
				if (this.password.length <= 0) {
					uni.showToast({
						title: "请输入会议密码",
						icon: 'none'
					});
					return;
				}
				uni.showLoading({
					title: '提交中',
					mask: false
				});
				global.$http.post('/meeting/record/getInfoByPwd', {
					params: {
						pwd: this.password
					},
				}).then(res => {
					uni.hideLoading();
					if (res.status === "0") {
						if(res.data){
							uni.navigateTo({
								url: '../meeting/meetingCard?para=' + encodeURIComponent(JSON.stringify(res.data))
							});
						}else{
							uni.showToast({
								title: '会议密码无效',
								icon: 'none'
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
				this.isShowModal = false;
			}
		}
	}
</script>

<style>
	.cardTitle {
		color: #fff;
		padding: 90upx 60upx;
		font-size: 40upx;
		/* font-weight: 300; */
		/* transform: skew(-10deg, 0deg); */
		position: relative;
		text-shadow: 0px 0px 6upx rgba(0, 0, 0, 0.3);
		height: 140upx;
	}

	.cardTitle::before {
		content: "";
		position: absolute;
		width: 60upx;
		height: 6upx;
		border-radius: 20upx;
		background-color: #fff;
		display: block;
		top: 60upx;
		left: 62upx;
		transform: skew(10deg, 0deg);
	}
</style>
