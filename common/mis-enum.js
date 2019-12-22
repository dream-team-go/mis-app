const MeetingRecordEnumMap = new Map([
	[0, "待审批"],
	[-2, "取消预定"],
	[-1, "预定失败"],
	[1, "预定成功"]
]);

const FoodRecordEnumMap = new Map([
	[0, "待确认"],
	[-2, "取消预定"],
	[-1, "驳回"],
	[1, "已确认"]
]);

export default { 
    MeetingRecordEnumMap,
	FoodRecordEnumMap
}