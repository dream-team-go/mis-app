function formatTime(time) {
	if (typeof time !== 'number' || time < 0) {
		return time
	}

	var hour = parseInt(time / 3600)
	time = time % 3600
	var minute = parseInt(time / 60)
	time = time % 60
	var second = time

	return ([hour, minute, second]).map(function(n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}).join(':')
}

function formatLocation(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}
var dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function(milliseconds) {
		var humanize = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	format: function(dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if (diff < this.UNITS['天']) {
			return this.humanize(diff);
		}
		var _format = function(number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDay()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function(str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	}
};

function completeLength(num, length) {
	return ("0000000000000000" + num).substr(-length);
}

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

function getMonthDate(addDay) {
	const date = new Date();
	if (addDay > 0) {
		date.setDate(date.getDate() + addDay);
	}
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();
	// month = month > 9 ? month : '0' + month;
	// day = day > 9 ? day : '0' + day;

	return `${month}月${day}日`;
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
	return Math.floor(ms / 1000 / 60 / 60);
}

function getEnumStatusDesc(map, status) {
	var statusDesc = "";
	map.forEach((value, key, map) => {
		if (key == status) {
			statusDesc = value;
			return;
		}
	});
	return statusDesc;
}

module.exports = {
	formatTime: formatTime,
	formatLocation: formatLocation,
	dateUtils: dateUtils,
	completeLength: completeLength,
	getDate: getDate,
	getTime: getTime,
	getEndTime: getEndTime,
	getIntervalHour: getIntervalHour,
	getMonthDate: getMonthDate,
	getEnumStatusDesc: getEnumStatusDesc
}
