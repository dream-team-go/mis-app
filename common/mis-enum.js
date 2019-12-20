const MeetingRecordEnumMap = new Map([
	[0, "待审批"],
	[-2, "取消预定"],
	[-1, "预定失败"],
	[1, "预定成功"]
]);

const FoodRecordEnumMap = new Map([
	[0, "待审批"],
	[-2, "取消预定"],
	[-1, "预定失败"],
	[1, "预定成功"]
]);

export default { 
    MeetingRecordEnumMap,
	FoodRecordEnumMap
}