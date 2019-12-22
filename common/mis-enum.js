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

//建筑状态枚举
const BuildingStatusEnumMap = new Map([
	[0, "未使用"],
	[1, "在使用"]
]);

export default { 
    MeetingRecordEnumMap,
	FoodRecordEnumMap,
	BuildingStatusEnumMap
}