<template>
	<view class="container">
		<cu-custom bgColor="bg-linear-blue" :isBack="true">

			<block slot="content">选择会议日期</block>
		</cu-custom>

		<view bgColor="bg-gray">
			<view class="grid text-center col-3">
				<view class="solid padding bg-white" v-for="(record, index) in records" :key="record.date">
					<view class="text-black">
						{{record.date}}
					</view>
					<view class="margin-top-sm align-center" @tap="sureDate(record.ydrq, '1', record.noonIsBook)">
						<text :class="record.noonIsBook?'text-red':''">上午</text>
						<text class="padding-left" :class="record.noonIsBook?'text-red cuIcon-roundcheckfill':'cuIcon-roundcheck'"
							style="font-size: 60upx;"></text>
					</view>
					<view class="margin-top-sm align-center" @tap="sureDate(record.ydrq, '2', record.afternoonIsBook)">
						<span :class="record.afternoonIsBook?'text-red':''">下午</span>
						<text class="padding-left" :class="record.afternoonIsBook?'text-red cuIcon-roundcheckfill':'cuIcon-roundcheck'"
							style="font-size: 60upx;"></text>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dayNum: 11,
				start_rq: this.util.getDate(),
				records: [],
				para: {
					meeting_id: 0,
					room_number: "",
					building_name: ""
				}
			}
		},
		onLoad(option) {
			var info = JSON.parse(decodeURIComponent(option.para));
			this.para = info;
			if(!this.para.id){
				this.para.ydrq = "";
				this.para.ydsjd = "";
			}
			uni.showLoading({
				title: '加载中',
				mask: false
			});
			//获取未来12天预定情况
			global.$http.post('/meeting/record/meetingRecord', {
				params: {
					meeting_id: this.para.meeting_id,
					// start_rq: "2020-10-11",
					// end_rq: "2020-10-12",
					start_rq: this.start_rq,
					end_rq: this.util.getDate(this.dayNum)
				},
			}).then(res => {
				uni.hideLoading();
				if (res.status === "0") {
					for (let i = 0; i <= this.dayNum; i++) {
						var record = {
							ydrq: this.util.getDate(i),
							date: this.util.getDate() == this.util.getDate(i) ? "今日" : this.util
								.getMonthDate(i),
							noonIsBook: res.data.findIndex(c => c.ydrq.substr(0, 10) == this.util.getDate(
								i) && c.ydsjd == "1") >= 0,
							afternoonIsBook: res.data.findIndex(c => c.ydrq.substr(0, 10) == this.util
								.getDate(i) && c.ydsjd == "2") >= 0
						};
						if(this.util.getDate(i) == this.para.ydrq.substr(0, 10)){
							if(this.para.ydsjd == "1")
								record.noonIsBook = false;
							if(this.para.ydsjd == "2")
								record.afternoonIsBook = false;
						}
						this.records.push(record);
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
			sureDate: function(ydrq, ydsjd, isBook) {
				if(isBook)
				{
					uni.showToast({
						title: "已被预定",
						icon: 'none'
					});
				}else{
					this.para.ydrq = ydrq;
					this.para.ydsjd = ydsjd;
					uni.navigateTo({
						url: '../meeting/bookMeeting?para=' + encodeURIComponent(JSON.stringify(this.para))
					});
				}
			}
		}
	}
</script>

<style>
	.align-center {
		display: flex;
		align-items: center;
		margin-left: 20upx;
	}
</style>
