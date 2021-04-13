<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="content">设置参会单位</block>
		</cu-custom>

		<view class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="单位名称" @input="onKeyInput" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-linear-blue shadow-blur round" @tap="search()">搜索</button>
			</view>
		</view>
		<view style="padding-top: 100upx;">
			<view class="cu-list menu text-left">
				<view class="cu-item" v-for="item in searchData" :key="item.org_id" @click="tapCheck(item)">
					<view class="content">
						<!-- <image src="/static/tabbar/contacts_cur.png" class="png" mode="aspectFit"></image> -->
						<text class="text-black">{{item.org_name}}</text>
						
						<text :class="(item.checked ? 'cuIcon-squarecheckfill text-green' : 'cuIcon-square text-gray')" style="float: right;font-size: 60upx;margin-right: 0upx; width: 1.2em; "></text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="bottom-btns-seat"></view>
		<view class="bottom-cancel-btn" @click="submit">
			提交
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				contactsData: [],
				searchData: [],
				para:{
					meeting_record_id: '',
					orgs:[]
				}
			};
		},
		onShow() {
			
		},
		onLoad(option) {
			this.para.meeting_record_id = option.meeting_record_id;
			uni.showLoading({
				title: '提交中',
				mask: false
			});
			//获取行政单位数据
			global.$http.post('/core/organization/organizationPage', {
				params: {
					page: 1,
					pageSize: 10000,
					name: ''
				},
			}).then(res => {
				if (res.status === "0") {
					let list = [];
					for (let i = 0; i < res.data.list.length; i++) {
						list[i] = res.data.list[i];
						list[i].checked = false;
					}
					this.contactsData = list;
					this.searchData = this.contactsData;
					
					//获取选中行政单位数据
					global.$http.post('/meeting/org/getList', {
						params: {
							meeting_record_id: this.para.meeting_record_id
						},
					}).then(res => {
						if (res.status === "0") {
							this.searchData.forEach(c=>{
								var tmp = res.data.find(p=>p.org_id == c.org_id);
								if(tmp == null){
									c.checked = false;
								}else{
									c.checked = true;
								}
							});
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
			onKeyInput(e) {
				this.name = e.target.value;
			},
			search() {
				if (this.name) {
					this.searchData = this.contactsData.filter((value) => { //过滤数组元素
						return value.org_name.includes(this.name); //如果包含字符返回true
					});
				} else
					this.searchData = this.contactsData;
			},
			tapCheck: function(e){
				e.checked = !e.checked;
			},
			submit: function(e) {
				uni.showModal({
					title: '提示',
					content: '确定提交？',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.cancel) return;
						uni.showLoading({
							title: '提交中',
							mask: false
						});
						this.para.orgs = [];
						this.contactsData.forEach(c=>{
							if(c.checked)
								this.para.orgs.push(c.org_id);
						});
						global.$http.post('/meeting/org/save', {
							header:{
								ContentType: 'text/plain'
							},
							data: JSON.stringify(this.para)
						}).then(res => {
							uni.hideLoading();
							if (res.status === "0") {
								uni.showToast({
									icon: 'none',
									title: '提交成功'
								});
								uni.navigateBack({
									delta: 1
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
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "style/mystyle.scss";
</style>
