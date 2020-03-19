function formatTime(time) {
	if (typeof time !== 'number' || time < 0) {
		return time
	}

	var hour = parseInt(time / 3600)
	time = time % 3600
	var minute = parseInt(time / 60)
	time = time % 60
	var second = time

	return ([hour, minute, second]).map(function (n) {
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
	humanize: function (milliseconds) {
		var humanize = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	format: function (dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if (diff < this.UNITS['天']) {
			return this.humanize(diff);
		}
		var _format = function (number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDay()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function (str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	}
};


function formateDate(datetime,type) {
	var year = datetime.getFullYear(),
		month = ("0" + (datetime.getMonth() + 1)).slice(-2),
		date = ("0" + datetime.getDate()).slice(-2),
		hour = ("0" + datetime.getHours()).slice(-2),
		minute = ("0" + datetime.getMinutes()).slice(-2),
		second = ("0" + datetime.getSeconds()).slice(-2);
	if(type === "Y-M-D h:min:s"){
		var result = year + "-"+ month +"-"+ date +" "+ hour +":"+ minute +":" + second;
	}else if(type === "Y-M-D"){
		var result = year + "-"+ month +"-"+ date;
	}if(type === "h:min:s"){
		var result = hour +":"+ minute +":" + second;
	}
	return result;
}

function deteleObject(obj) {
    var uniques = [];
    var stringify = {};
    for (var i = 0; i < obj.length; i++) {
        var keys = Object.keys(obj[i]);
        keys.sort(function(a, b) {
            return (Number(a) - Number(b));
        });
        var str = '';
        for (var j = 0; j < keys.length; j++) {
            str += JSON.stringify(keys[j]);
            str += JSON.stringify(obj[i][keys[j]]);
        }
        if (!stringify.hasOwnProperty(str)) {
            uniques.push(obj[i]);
            stringify[str] = true;
        }
    }
    uniques = uniques;
    return uniques;
}
function formateDate(datetime,type) {
	var year = datetime.getFullYear(),
		month = ("0" + (datetime.getMonth() + 1)).slice(-2),
		date = ("0" + datetime.getDate()).slice(-2),
		hour = ("0" + datetime.getHours()).slice(-2),
		minute = ("0" + datetime.getMinutes()).slice(-2),
		second = ("0" + datetime.getSeconds()).slice(-2);
	if(type === "Y-M-D h:min:s"){
		var result = year + "-"+ month +"-"+ date +" "+ hour +":"+ minute +":" + second;
	}else if(type === "Y-M-D"){
		var result = year + "-"+ month +"-"+ date;
	}if(type === "h:min:s"){
		var result = hour +":"+ minute +":" + second;
	}else if(type === "h"){
		var result = hour;
	}else if(type === "min"){
		var result = minute;
	}
	return result;
}
//生成从minNum到maxNum的随机数
function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
} 

function pointInsideCircle(point, circle, r) {  
	if (r===0) return false  
	var dx = circle[0] - point[0]  
	var dy = circle[1] - point[1]  
	return dx * dx + dy * dy <= r * r;		  
}

// 判断是否是一天
function isSameDay(timeStampA) {
	let dateA = new Date(timeStampA);
	let dateB = new Date();
	return (dateA.setHours(0, 0, 0, 0) == dateB.setHours(0, 0, 0, 0));
}
module.exports = {
	formatTime,
	formatLocation,
	dateUtils,
	formateDate,
	deteleObject,
	randomNum,
	pointInsideCircle,
	isSameDay
}
