//会议预定记录枚举
const MeetingRecordEnumMap = new Map([
	[0, "待审批"],
	[-2, "取消预定"],
	[-1, "预定失败"],
	[1, "预定成功"]
]);

//订餐记录枚举
const FoodRecordEnumMap = new Map([
	[0, "待确认"],
	[-2, "取消预定"],
	[-1, "驳回"],
	[1, "已确认"]
]);

//用车申请枚举
const UseCarRecordEnumMap = new Map([
	[0, "待审批"],
	[-3, "申请人取消"],
	[1, "审批通过"],
	[-1, "审批未通过"],
	[2, "完成车辆调度"],
	[-2, "调度中心取消"],
	[3, "订单进行中"],
	[4, "订单完成"]
]);

//派车记录枚举
const DispatchRecordEnumMap = new Map([
	[1, "等待出车"],
	[2, "已出车"],
	[3, "已归队"],
	[4, "已结算"]
]);

//建筑状态枚举
const BuildingStatusEnumMap = new Map([
	[0, "未使用"],
	[1, "在使用"]
]);

//维修记录枚举
const RepairRecordEnumMap = new Map([
	[1, "待审批"],
	[0, "取消申请"],
	[2, "组长通过"],
	[-1, "组长未通过"],
	[3, "维修出单"],
	[4, "主任通过"],
	[-2, "主任未通过"],
	[5, "局长通过"],
	[-3, "局长未通过"]
]);

//消息状态枚举
const WarnStatusEnumMap = new Map([
	[0, "未读"],
	[1, "已读"]
]);

//工作餐类型枚举
const LeaderBookFoodEnumMap = new Map([
	[1, "午餐"],
	[2, "晚餐"]
]);

const CarTypeEnumMap = new Map([
	[0, "小轿车"],
	[1, "越野车"],
	[2, "商务车"],
	[3, "中型客车"],
	[4, "大型客车"],
	[5, "其它"]
]);

export default { 
    MeetingRecordEnumMap,
	FoodRecordEnumMap,
	BuildingStatusEnumMap,
	UseCarRecordEnumMap,
	DispatchRecordEnumMap,
	RepairRecordEnumMap,
	WarnStatusEnumMap,
	LeaderBookFoodEnumMap,
	CarTypeEnumMap
}