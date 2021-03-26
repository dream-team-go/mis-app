<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">
			<block slot="content">工作餐</block>
		</cu-custom>

		<form>
			<view class="cu-form-group">
				<view class="title">用餐领导</view>
				<input name="input" v-model="para.lead"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">用餐人数</view>
				<picker @change="ChangePeoples" :value="peopleIndex" :range="peoples">
					<view class="picker">
						{{peopleIndex>-1?peoples[peopleIndex] + "人" : "请选择"}}
					</view>
				</picker>
			</view>
			
			<view class="cu-form-group margin-top-xs">
				<view class="title">用餐日期</view>
				<picker mode="date" :value="mealDate" :start="startDate" :end="endDate" @change="DateChange">
					<view class="picker">
						{{mealDate}}
					</view>
				</picker>
			</view>
			
			<view class="cu-form-group">
				<view class="title">午/晚餐</view>
				<picker @change="ChangeType" :value="typeIndex" :range="types">
					<view class="picker">
						{{typeIndex>-1?types[typeIndex] : "请选择"}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group" v-if="typeIndex > 0">
				<view class="title">用餐时间</view>
				<picker mode="time" :value="mealTime" @change="MealTimeChange">
					<view class="picker">
						{{mealTime}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">用餐要求</view>
				<input name="input" v-model="para.desc"></input>
			</view>
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-linear-blue margin-tb-sm lg" @click="Submit">下一步</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		onLoad(option) {
			if (option.para) {
				var info = JSON.parse(decodeURIComponent(option.para));
				this.para.id = info.id;
				this.para.lead = info.lead;
				this.para.num = info.num;
				this.para.dining_date = info.dining_date;
				this.para.desc = info.desc;
				this.para.cp_advise = info.cp_advise;
				this.para.type = info.type;
				this.para.tjcps = info.tjcps;
				this.typeIndex = info.type;
				this.peopleIndex = info.num - 1;
				this.mealDate = info.dining_date.substring(0, 10);
				this.mealTime = info.dining_date.substring(11, 16);
			}
		},
		data() {
			return {
				peopleIndex: 0,
				peoples: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				typeIndex: 0,
				types: ["请选择", "午餐", "晚餐"],
				mealTime: this.util.getTime(),
				mealDate: this.util.getDate(),
				startDate: this.util.getDate(0),
				endDate: this.util.getDate(4),
				para: {
					lead: "",
					num: 1,
					type: 0,
					dining_date: "",
					desc: "",
					cp_advise: ""
				}
			}
		},
		computed: {
			dining_date: function() {
				return this.mealDate + " " + this.mealTime + ":00";
			}
		},
		methods: {
			DateChange: function(e){
				this.mealDate = e.detail.value;
			},
			MealTimeChange: function(e) {
				this.mealTime = e.detail.value;
			},
			ChangePeoples: function(e) {
				this.peopleIndex = e.detail.value;
				this.para.num = this.peoples[e.detail.value];
			},
			ChangeType: function(e) {
				if(this.typeIndex != e.detail.value)
				{
					if(e.detail.value == 1)
						this.mealTime = "12:00";
					else if(e.detail.value == 2)
						this.mealTime = "18:00";
				}
				this.typeIndex = e.detail.value;
				this.para.type = e.detail.value;
			},
			Submit: function(e) {
				this.para.dining_date = this.dining_date;
				//验证数据
				if (this.para.lead.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '用餐领导不能为空'
					});
					return;
				}
				if (this.para.type <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择午/晚餐'
					});
					return;
				}
				//下一步
				uni.navigateTo({
					url: '../food/recommendDishes?para=' + encodeURIComponent(JSON.stringify(this.para))
				});
			}
		}
	}
</script>

<style>

</style>
