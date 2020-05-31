<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">选择会议时间</block>
		</cu-custom>
		<form>
			<view class="cu-form-group">
				<view class="title">日期</view>
				<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="DateChange">
					<view class="picker">
						{{date}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">时间</view>
				<picker mode="time" :value="time" @change="TimeChange">
					<view class="picker">
						{{time}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">会议时长</view>
				<picker @change="ChangeHours" :value="hourIndex" :range="hours">
					<view class="picker">
						{{hourIndex>-1?hours[hourIndex] + "小时" : "请选择"}}
					</view>
				</picker>
			</view>
			
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-linear-blue margin-tb-sm lg" @click="Submit">下一步</button>
			</view>
		</form>
		
	</view>
</template>

<script>

	function getDate(addDay) {
		const date = new Date();
		if (addDay > 0) {
			date.setDate(date.getDate() + addDay);
		}
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		month = month > 9 ? month : '0' + month;
		day = day > 9 ? day : '0' + day;

		return `${year}-${month}-${day}`;
	}

	function getTime(addMinute) {
		const date = new Date();
		var tmpMinute = date.getMinutes();
		if (tmpMinute < 30) {
			date.setMinutes(30);
		} else if (tmpMinute > 30 && tmpMinute <= 59) {
			date.setMinutes(60);
		}

		if (addMinute > 0) {
			date.setMinutes(date.getMinutes() + addMinute);
		}

		let hour = date.getHours();
		let minute = date.getMinutes();

		hour = hour > 9 ? hour : '0' + hour;;
		minute = minute > 9 ? minute : '0' + minute;

		return `${hour}:${minute}`;
	}

	function getEndTime(startTime, addHour) {
		//特殊处理IOS日期，用‘/’代替‘-’
		startTime = startTime.replace(/-/g, '/');
		var date = new Date(startTime);
		date.setHours(date.getHours() + addHour);
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		let hour = date.getHours();
		let minute = date.getMinutes();

		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;
		hour = hour > 9 ? hour : '0' + hour;;
		minute = minute > 9 ? minute : '0' + minute;

		return `${year}-${month}-${day} ${hour}:${minute}`;
	}
	//计算两个时间相差了几个小时
	     function getIntervalHour(startDate, endDate) {
			 startDate = new Date(startDate.replace(/-/g, '/'));
			 endDate = new Date(endDate.replace(/-/g, '/'));
	            var ms = endDate.getTime() - startDate.getTime();
	            if (ms < 0) return 0;
	            return Math.floor(ms/1000/60/60);
	        }

	export default {
		data() {
			return {
				date: getDate(),
				startDate: getDate(),
				endDate: getDate(7),
				time: getTime(),
				hourIndex: 0,
				hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
				peopleIndex: 0,
				peoples: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
					30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50
				],
				para: {
					start_time: "",
					end_time: ""
				}
			}
		},
		computed: {
			start_time: function(){
				return this.date + " " + this.time;
			},
			end_time: function(){
				return getEndTime(this.start_time, this.hours[this.hourIndex]);
			}
		},
		onLoad(option) {
			if(option.para){
				var info = JSON.parse(decodeURIComponent(option.para));
				this.para = info;
				this.date = info.start_time.substring(0, 10);
				this.time = info.start_time.substring(11, 16);
				this.hourIndex = getIntervalHour(info.start_time, info.end_time) - 1;
			}
		},
		onPullDownRefresh() {
			
		},
		methods: {
			DateChange: function(e) {
				this.date = e.detail.value;
			},
			TimeChange: function(e){
				this.time = e.detail.value;
			},
			ChangeHours: function(e) {
				this.hourIndex = e.detail.value;
			},
			Submit: function(e){
				this.para.start_time = this.start_time;
				this.para.end_time = this.end_time;
				uni.navigateTo({
					url: '../meeting/selectRoom?para=' + encodeURIComponent(JSON.stringify(this.para))
				});
			}
		}
	}
</script>

<style>
	
</style>
