<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">

			<block slot="content">{{title}}</block>
		</cu-custom>

		<view class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="姓名/电话/职务" @input="onKeyInput" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-linear-blue shadow-blur round" @tap="search()">搜索</button>
			</view>
		</view>
		<scroll-view scroll-y class="indexes" :style="[{height:'calc(100vh - '+ CustomBar + 'px - 50px)'}]">
			<view class="cu-list menu-avatar no-padding">
				<view class="cu-item" v-for="(sub, subIndex) in list" :key="sub.id">
					<view class="cu-avatar round md bg-linear-blue">{{sub.code}}</view>
					<view class="content">
						<view class="text-black">{{sub.user_name}} </view>
						<!-- <view class="text-gray text-sm">
							{{sub.org_name}}
						</view> -->
						<view class="text-somber" @tap="makePhoneCall(sub.phone)">
							<image src="../../static/common/phone.png" class="ico" style="width: 32upx;height: 32upx;margin-right: 10upx;vertical-align: middle;"></image>
							<text style="vertical-align: middle;">{{sub.phone}}</text>
						</view>
						<view class="text-somber" v-show="sub.office_tel" @tap="makePhoneCall(sub.office_tel)">
							<image src="../../static/common/tel.png" class="ico" style="width: 32upx;height: 32upx;margin-right: 10upx;vertical-align: middle;"></image>
							<text style="vertical-align: middle;">{{sub.office_tel}}</text>
						</view>
					</view>
			
					<view v-if="sub.short_job_name" @tap="showJobToast(sub.job_name)" style="margin-right: 15upx;" class="solid-right cu-tag round bg-right-blue light">{{sub.short_job_name}}</view>
				</view>
			</view>
		</scroll-view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				hidden: true,
				listCurID: '',
				list: [],
				listCur: '',
				key: "",
				departId: ''
			};
		},
		onLoad(option) {
			this.departId = option.departId;
			this.title = option.departName;
			this.search();
		},
		onReady() {
			
		},
		methods: {
			search() {
				uni.showLoading({
					title: '加载中',
					mask: false
				});
				//获取通讯录数据
				global.$http.post('/core/addressBook/appOrderWeight', {
					params: {
						department_id: this.departId,
						key: this.key,
						page: 1,
						pageSize: 10000
					},
				}).then(res => {
					if (res.status === "0") {
						this.list = [];
						res.data.forEach(c=>{
							if(c.job_name){
								if(c.job_name.length > 10)
									c.short_job_name = c.job_name.substr(0, 9) + "...";
								else
									c.short_job_name = c.job_name;
									this.list.push(c);
							}
						});
						uni.hideLoading();
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
			},
			makePhoneCall: function(phone) {
				uni.makePhoneCall({
					phoneNumber: phone,
					success: () => {
						console.log("成功拨打电话")
					}
				})
			},
			showJobToast: function(e){
				uni.showToast({
					title: e,
					icon: 'none'
				});
			},
			onKeyInput(e) {
				this.key = e.target.value;
			},
			//获取文字信息
			getCur(e) {
				this.hidden = false;
				this.listCur = this.list[e.target.id].code;
			},
			setCur(e) {
				this.hidden = true;
			},
			//滑动选择Item
			tMove(e) {
				let y = e.touches[0].clientY,
					offsettop = this.boxTop,
					that = this;
				//判断选择区域,只有在选择区才会生效
				if (y > offsettop) {
					let num = parseInt((y - offsettop) / 20);
					this.listCur = that.list[num].name
				};
			},

			//触发全部开始选择
			tStart() {
				this.hidden = false
			},

			//触发结束选择
			tEnd() {
				this.hidden = true;
				this.listCurID = this.listCur
			},
			indexSelect(e) {
				let that = this;
				let barHeight = this.barHeight;
				let list = this.list;
				let scrollY = Math.ceil(list.length * e.detail.y / barHeight);
				for (let i = 0; i < list.length; i++) {
					if (scrollY < i + 1) {
						that.listCur = list[i].name;
						that.movableY = i * 20
						return false
					}
				}
			}
		}
	}
</script>

<style>
	page {
		padding-top: 100upx;
	}

	.indexes {
		position: relative;
	}

	.indexBar {
		position: fixed;
		right: 0px;
		bottom: 0px;
		padding: 20upx 20upx 20upx 60upx;
		display: flex;
		align-items: center;
	}

	.indexBar .indexBar-box {
		width: 40upx;
		height: auto;
		background: #fff;
		display: flex;
		flex-direction: column;
		box-shadow: 0 0 20upx rgba(0, 0, 0, 0.1);
		border-radius: 10upx;
	}

	.indexBar-item {
		flex: 1;
		width: 40upx;
		height: 40upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28upx;
		color: #888;
	}

	movable-view.indexBar-item {
		width: 40upx;
		height: 40upx;
		z-index: 9;
		position: relative;
	}

	movable-view.indexBar-item::before {
		content: "";
		display: block;
		position: absolute;
		left: 0;
		top: 10upx;
		height: 20upx;
		width: 4upx;
		background-color: #f37b1d;
	}

	.indexToast {
		position: fixed;
		top: 0;
		right: 80upx;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		width: 100upx;
		height: 100upx;
		border-radius: 10upx;
		margin: auto;
		color: #fff;
		line-height: 100upx;
		text-align: center;
		font-size: 48upx;
	}
	.cu-list.menu-avatar>.cu-item .content{
		line-height: 1.35em;
	}
</style>
