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
	[-3, "申请人取消订单"],
	[1, "审批通过"],
	[-1, "审批未通过"],
	[2, "完成车辆调度"],
	[-2, "调度中心取消订单"],
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

export default { 
    MeetingRecordEnumMap,
	FoodRecordEnumMap,
	BuildingStatusEnumMap,
	UseCarRecordEnumMap,
	DispatchRecordEnumMap
}