<template>
	<view>
		<cu-custom bgColor="bg-linear-blue" :isBack="true">

			<block slot="content">{{isAdd ? '会议室预定' : '编辑会议室预定'}}</block>
		</cu-custom>

		<view class="cu-bar bg-white flex padding-top padding-bottom">
			<view class="action">
				<text class="cuIcon-roundcheckfill text-red" style="font-size: 50upx;"></text>
				<view class="flex-sub ">
					<view><text>会议室：</text> <text class="text-bold">{{para.building_name}} {{para.room_number}}</text>
					</view>
					<view class="margin-top-xs"><text>时间：</text> <text class="text-bold">{{para.ydrq}} {{para.ydsjd == "1" ? "上午":"下午"}}</text></view>
				</view>
			</view>
		</view>

		<form>
			<view class="cu-form-group margin-top-xs">
				<view class="title">会议名称</view>
				<input name="input" placeholder="请输入" v-model="para.desc"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">参会人数</view>
				<input name="input" placeholder="请输入" v-model="para.people_num" type="number"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">主办单位</view>
				<input name="input" placeholder="请输入" v-model="para.host_unit"></input>
			</view>

			<view class="cu-form-group">
				<view class="title">联系人</view>
				<input name="input" placeholder="请输入" v-model="para.user_name"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">联系电话</view>
				<input name="input" placeholder="请输入" v-model="para.user_tel"></input>
			</view>

			<!-- <view class="cu-form-group">
				<view class="title">时间</view>
				<picker mode="time" :value="time">
					<view class="picker">
						{{time}}
					</view>
				</picker>
			</view> -->

			<view class="cu-form-group margin-top-xs">
				<view class="title">是否需要布标</view>
				<switch @change="SwitchIsBb" :class="para.bb? 'checked':''" :checked="para.bb?true:false"></switch>
			</view>
			<view class="cu-form-group align-start" v-show="para.bb">
				<view class="title">布标名称</view>
				<textarea maxlength="-1" @input="textareaInput" v-model="para.bb_name" placeholder="请输入"></textarea>
			</view>
			<view class="cu-form-group" v-show="is_led">
				<view class="title">是否需要电子屏</view>
				<switch @change="SwitchIsLed" :class="para.led?'checked':''" :checked="para.led?true:false">
				</switch>
			</view>
			<view class="cu-form-group" v-show="is_net_meeting">
				<view class="title">是否需要视频会议</view>
				<switch @change="SwitchIsNetMeeting" :class="para.net_meeting? 'checked':''"
					:checked="para.net_meeting?true:false"></switch>
			</view>

			<view class="cu-form-group margin-top-xs">
				<view class="title">主席台桌子数</view>
				<input name="input" placeholder="请输入" v-model="para.plat_table_num" type="number"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">桌子形式</view>
				<picker @change="ChangeTableType" :value="tableTypeIndex" :range="tableTypes">
					<view class="picker">
						{{tableTypeIndex>-1?tableTypes[tableTypeIndex] : "请选择"}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">主席台人数</view>
				<input name="input" placeholder="请输入" v-model="para.plat_person_num" type="number"></input>
			</view>

			<view class="cu-form-group align-start">
				<view class="title">席位名单</view>
				<textarea maxlength="-1" @input="textareaBInput" v-model="para.name_list" placeholder="请输入"></textarea>
			</view>

			<view class="cu-form-group margin-top-xs">
				<view class="title">会议服务内容</view>
				<view class="modal-group" @tap="showServiceModal()" data-target="Modal">
					<view class="picker">
						{{ para.services.length > 0 ? serviceName : '请选择' }}
					</view>
				</view>
			</view>

			<view class="cu-form-group">
				<view class="title">大件水数量</view>
				<input name="input" placeholder="请输入" v-model="para.large_water_num" type="number"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">小件水数量</view>
				<input name="input" placeholder="请输入" v-model="para.small_water_num" type="number"></input>
			</view>

			<view class="cu-form-group">
				<view class="title">备注</view>
				<input name="input" placeholder="请输入" v-model="para.attend_leader"></input>
			</view>

			<view class="padding flex flex-direction">
				<button class="cu-btn bg-linear-blue margin-tb-sm lg" @click="Submit">下一步</button>
			</view>

			<view class="list-modal cu-modal bottom-modal" :class="isShowServiceModal?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-linear-blue"
						:style="[{'padding-top':StatusBar + 'px'},{height:CustomBar + 'px'}]">
						<view class="action text-white" @tap="hideServiceModal">取消</view>
						<view class="action text-white text-lg" style="text-align: center;margin-right: 15px;">选择会议服务内容
						</view>
						<view class="action" style="margin-right: 15upx;">
							<view @tap="sureService">确认</view>
						</view>
					</view>
					<scroll-view scroll-y="true">
						<view>
							<checkbox-group @change="checkboxChange">
								<view class="cu-form-group" v-for="service in modalServices" :key="service.dic_code">
									<view class="title" style="color: #333333;font-size: 34upx;">{{service.dic_name}}
									</view>
									<checkbox :class="service.checked?'checked':''"
										:checked="service.checked?true:false" :value="service.dic_code">
									</checkbox>
								</view>
							</checkbox-group>
						</view>
					</scroll-view>
				</view>
			</view>
		</form>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import uniLoadMore from '@/colorui/components/uni-load-more.vue';

	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				isAdd: true,
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				ScreenHeight: this.ScreenHeight,
				time: this.util.getTime(),
				is_net_meeting: 0,
				is_led: 0,

				tableTypeIndex: -1,
				tableTypes: [],
				tableTypeDatas: [],

				modalServices: [],
				serviceName: "",
				isShowServiceModal: false,
				services: [],

				para: {
					user_name: "",
					user_tel: "",
					people_num: "",
					desc: "",
					attend_leader: "",
					meeting_id: "",
					building_name: "",
					room_number: "",
					ydrq: "",
					ydsjd: "",
					net_meeting: 0,
					led: 0,
					bb: 0,
					bb_name: "",
					plat_table_num: 0,
					plat_person_num: 0,
					host_unit: "",
					table_type: 0,
					large_water_num: 0,
					small_water_num: 0,
					name_list: "",
					services: [],
					max_meeting_people: 0
				}
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		onLoad(option) {
			var info = JSON.parse(decodeURIComponent(option.para));
			this.para.meeting_id = info.meeting_id;
			this.para.building_name = info.building_name;
			this.para.room_number = info.room_number;
			this.para.ydrq = info.ydrq;
			this.para.ydsjd = info.ydsjd;
			this.para.max_meeting_people = info.max_meeting_people;
			this.is_net_meeting = info.is_net_meeting;
			this.is_led = info.is_led;
			if (info.id > 0) {
				this.isAdd = false;
				this.para.id = info.id;
				this.para.desc = info.desc;
				this.para.user_name = info.user_name;
				this.para.user_tel = info.user_tel;
				this.para.host_unit = info.host_unit;
				this.para.people_num = info.people_num;
				this.para.attend_leader = info.attend_leader;
				this.para.led = info.led;
				this.para.net_meeting = info.net_meeting;
				this.para.bb = info.bb;
				this.para.bb_name = info.bb_name;
				this.para.name_list = info.name_list;
				this.para.plat_table_num = info.plat_table_num;
				this.para.plat_person_num=info.plat_person_num;
				this.para.table_type = info.table_type;
				this.para.large_water_num = info.large_water_num;
				this.para.small_water_num = info.small_water_num;
				this.para.large_water_num = info.large_water_num;
				this.para.peoples = info.peoples;
				if(info.services){
					var names = [];
					info.services.forEach(c=>{
						this.para.services.push(c.dic_code);
						names.push(c.dic_name);
					});
					this.serviceName = names.join('、');
				}
			} else {
				this.para.user_name = this.userInfo.user.userCnName;
				this.para.user_tel = this.userInfo.user.username;
			}
			this.GetDic("DIC_ZZXS");
			this.GetDic("DIC_HYFW");
		},
		methods: {
			GetDic(type) {
				global.$http.post('/core/dic/get', {
					params: {
						type: type
					},
				}).then(res => {
					if (res.status === "0") {
						if (type == "DIC_ZZXS") {
							this.tableTypeDatas = res.data;
							this.tableTypeDatas.forEach((c, index) => {
								this.tableTypes.push(c.dic_name);
								if(this.para.id){
									if(c.dic_code == this.para.table_type)
										this.tableTypeIndex = index;
								}
							});
						} else if (type == "DIC_HYFW") {
							res.data.forEach(c => {
								var service = c;
								service.checked = false;
								if(this.para.id){
									this.para.services.forEach(x=>{
										if(x==c.dic_code)
											c.checked = true;
									});
								}
								this.services.push(service);
							});
						}
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
				}).catch(err => {
					uni.showToast({
						title: err.message,
						icon: 'none'
					});
				});
			},
			TimeChange: function(e) {
				this.time = e.detail.value;
			},
			SwitchIsNetMeeting: function(e) {
				this.para.net_meeting = e.detail.value ? 1 : 0;
			},
			SwitchIsLed: function(e) {
				this.para.led = e.detail.value ? 1 : 0;
			},
			SwitchIsBb: function(e) {
				this.para.bb = e.detail.value ? 1 : 0;
			},
			textareaInput: function(e) {
				this.para.bb_name = e.detail.value;
			},
			textareaBInput: function(e) {
				this.para.name_list = e.detail.value;
			},
			ChangeTableType: function(e) {
				this.tableTypeIndex = e.detail.value;
				this.para.table_type = this.tableTypeDatas[e.detail.value].dic_code;
			},
			showServiceModal: function(e) {
				this.modalServices = JSON.parse(JSON.stringify(this.services));
				this.isShowServiceModal = true;
			},
			hideServiceModal: function(e) {
				this.isShowServiceModal = false;
			},
			checkboxChange: function(e) {
				this.modalServices.forEach(c => {
					c.checked = false;
					e.detail.value.forEach(x => {
						if (c.dic_code == x)
							c.checked = true;
					})
				});
			},
			sureService: function(e) {
				this.services = JSON.parse(JSON.stringify(this.modalServices));
				this.services = this.modalServices;
				var names = [];
				this.para.services = [];
				this.services.forEach(c => {
					if (c.checked == true) {
						names.push(c.dic_name);
						this.para.services.push(c.dic_code);
					}
				});
				this.serviceName = names.join('、');
				this.isShowServiceModal = false;
			},
			Submit: function(e) {
				//验证数据
				if (this.para.desc.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写会议名称'
					});
					return;
				}
				if (this.para.desc.length > 20) {
					uni.showToast({
						icon: 'none',
						title: '会议名称不超过20字'
					});
					return;
				}
				if (this.para.user_name.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写联系人'
					});
					return;
				}
				if (this.para.user_tel.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写联系电话'
					});
					return;
				}
				if (this.para.people_num <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写参会人数'
					});
					return;
				}
				if (this.para.bb == 1 && this.para.bb_name.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写布标名称'
					});
					return;
				}
				//下一步
				uni.navigateTo({
					url: '../meeting/selectMeetingPeople?para=' + encodeURIComponent(JSON.stringify(this.para))
				});
			}
		}
	}
</script>

<style>
	#meeting-list-modal {
		z-index: 10000;
	}

	#meeting-list-modal .cu-dialog {
		height: 100vh;
	}

	#meeting-list-modal.cu-modal.show #list-view {
		overflow-x: hidden;
		overflow-y: scroll;
		pointer-events: auto;
	}
</style>
