/**
 * js 日期处理类 李树鹏
 * 
 * @return {}
 */

/**
 * 比较日期大小 if(A>B) return true;else return false;
 */

function compareDate(dateAStr, dateBStr) {

	dateAStr = dateAStr.replace(/-/g, "/");
	dateBStr = dateBStr.replace(/-/g, "/");

	var a = new Date(dateAStr).getTime();
	var b = new Date(dateBStr).getTime();

	return a > b;
}

/**
 * DateFormat 类 使用方法： DateFormat.formatCurrentDate("yyyy-MM-dd HH:mm:ss");
 * 
 * @param {}
 *            bDebug
 */
var DateFormat = function(bDebug) {
	this.isDebug = bDebug || false;
	this.curDate = new Date();
}

DateFormat.prototype = {
	// 定义一些常用的日期格式的常量
	DEFAULT_DATE_FORMAT : 'yyyy-MM-dd',
	DEFAULT_MONTH_FORMAT : 'yyyy-MM',
	DEFAULT_YEAR_FORMAT : 'yyyy',
	DEFAULT_TIME_FORMAT : 'HH:mm:ss',
	DEFAULT_DATETIME_FORMAT : 'yyyy-MM-dd HH:mm:ss',
	DEFAULT_YEAR : 'YEAR',
	DEFAULT_MONTH : 'MONTH',
	DEFAULT_DATE : 'DATE',
	DEFAULT_HOUR : 'HOUR',
	DEFAULT_MINUTE : 'MINUTE',
	DEFAULT_SECOND : 'SECOND',

	/**
	 * 根据给定的日期时间格式，格式化当前日期
	 * 
	 * @params strFormat 格式化字符串， 如："yyyy-MM-dd" 默认格式为： yyyy-MM-dd HH:mm:ss
	 * @return 返回根据给定格式的字符串表示的时间日期格式 如果传入不合法的格式，则返回日期的字符串格式
	 */
	formatCurrentDate : function(strFormat) {
		try {
			var tempFormat = strFormat == undefined
					? this.DEFAULT_DATETIME_FORMAT
					: strFormat;
			var dates = this.getDateObject(this.curDate);
			if (/(y+)/.test(tempFormat)) {
				var fullYear = this.curDate.getFullYear() + '';
				var year = RegExp.$1.length == 4 ? fullYear : fullYear.substr(4
						- RegExp.$1.length);
				tempFormat = tempFormat.replace(RegExp.$1, year);
			}
			for (var i in dates) {
				if (new RegExp('(' + i + ')').test(tempFormat)) {
					var target = RegExp.$1.length == 1
							? dates[i]
							: ('0' + dates[i]).substr(('' + dates[i]).length
									- 1);
					tempFormat = tempFormat.replace(RegExp.$1, target);
				}
			}
			return tempFormat === strFormat
					? this.curDate.toLocaleString()
					: tempFormat;
		} catch (e) {
			this.debug('格式化日期出现异常：' + e.message);
		}
	},
	/**
	 * 根据给定的格式，把给定的时间进行格式化
	 * 
	 * @params date 要格式化的日期
	 * @params strFormat 要得到的日期的格式的格式化字符串，如：'yyyy-MM-dd'，默认：yyyy-MM-dd HH:mm:ss
	 * @return 根据规定格式的时间格式
	 */
	format : function(date, strFormat) {
		try {
			if (date == undefined) {
				this.curDate = new Date();
			} else if (!(date instanceof Date)) {
				this.debug('你输入的date:' + date + '不是日期类型');
				return date;
			} else {
				this.curDate = date;
			}
			return this.formatCurrentDate(strFormat);
		} catch (e) {
			this.debug('格式化日期出现异常：' + e.message);
		}
	},

	/**
	 * 根据给定的格式对给定的字符串日期时间进行解析，
	 * 
	 * @params strDate 要解析的日期的字符串表示,此参数只能是字符串形式的日期，否则返回当期系统日期
	 * @params strFormat 解析给定日期的顺序, 如果输入的strDate的格式为方法支持的格式，
	 *         则可以不传入，否则一定要传入与strDate对应的格式, 若不传入格式则返回当期系统日期。
	 * @return 返回解析后的Date类型的时间 若不能解析则返回当前日期 若给定为时间格式 则返回的日期为 1970年1月1日的日期
	 * 
	 * bug: 此方法目前只能实现类似'yyyy-MM-dd'格式的日期的转换， 而'yyyyMMdd'形式的日期，则不能实现
	 */

	parseDate : function(strDate, strFormat) {
		if (typeof strDate != 'string') {
			return new Date();
		}
		var longTime = Date.parse(strDate);
		if (isNaN(longTime)) {
			if (strFormat == undefined) {
				this.debug('请输入日期的格式');
				return new Date();
			}
			var tmpDate = new Date();
			var regFormat = /(\w{4})|(\w{2})|(\w{1})/g;
			var regDate = /(\d{4})|(\d{2})|(\d{1})/g;
			var formats = strFormat.match(regFormat);
			var dates = strDate.match(regDate);
			if (formats != undefined && dates != undefined
					&& formats.length == dates.length) {
				for (var i = 0; i < formats.length; i++) {
					var format = formats[i];
					if (format === 'yyyy') {
						tmpDate.setFullYear(parseInt(dates[i], 10));
					} else if (format == 'yy') {
						var prefix = (tmpDate.getFullYear() + '').substring(0,
								2);
						var year = (parseInt(dates[i], 10) + '').length == 4
								? parseInt(dates[i], 10)
								: prefix
										+ (parseInt(dates[i], 10) + '00')
												.substring(0, 2);
						var tmpYear = parseInt(year, 10);
						tmpDate.setFullYear(tmpYear);
					} else if (format == 'MM' || format == 'M') {
						tmpDate.setMonth(parseInt(dates[i], 10) - 1);
					} else if (format == 'dd' || format == 'd') {
						tmpDate.setDate(parseInt(dates[i], 10));
					} else if (format == 'HH' || format == 'H') {
						tmpDate.setHours(parseInt(dates[i], 10));
					} else if (format == 'mm' || format == 'm') {
						tmpDate.setMinutes(parseInt(dates[i], 10));
					} else if (format == 'ss' || format == 's') {
						tmpDate.setSeconds(parseInt(dates[i], 10));
					}
				}
				return tmpDate;
			}
			return tmpDate;
		} else {
			return new Date(longTime);
		}
	},

	/**
	 * 根据给定的时间间隔类型及间隔值，以给定的格式对给定的时间进行计算并格式化返回
	 * 
	 * @params date 要操作的日期时间可以为时间的字符串或者 类似的时间对象，
	 * @params interval 时间间隔类型如："YEAR"、"MONTH"、 "DATE", 不区分大小写
	 * @params amount 时间间隔值，可以正数和负数, 负数为在date的日期减去相应的数值，正数为在date的日期上加上相应的数值
	 * @params strFormat 当输入端的date的格式为字符串是，此项必须输入。若date参数为{@see Date}类型是此项会作为最终输出的格式。
	 * @params targetFormat 最终输出的日期时间的格式，若没有输入则使用strFormat或者默认格式'yyyy-MM-dd
	 *         HH:mm:ss'
	 * @return 返回计算并格式化后的时间的字符串
	 */
	changeDate : function(date, interval, amount, strFormat, targetFormat) {
		var tmpdate = new Date();
		if (date == undefined) {
			this.debug('输入的时间不能为空!');
			return new Date();
		} else if (typeof date == 'string') {
			tmpdate = this.parseDate(date, strFormat);
		} else if (date instanceof Date) {
			tmpdate = date;
		}
		var field = (typeof interval == 'string')
				? interval.toUpperCase()
				: 'DATE';

		try {
			amount = parseInt(amount + '', 10);
			if (isNaN(amount)) {
				amount = 0;
			}
		} catch (e) {
			this.debug('你输入的[amount=' + amount + ']不能转换为整数');
			amount = 0;
		}
		switch (field) {
			case this.DEFAULT_YEAR :
				tmpdate.setFullYear(tmpdate.getFullYear() + amount);
				break;
			case this.DEFAULT_MONTH :
				tmpdate.setMonth(tmpdate.getMonth() + amount);
				break;
			case this.DEFAULT_DATE :
				tmpdate.setDate(tmpdate.getDate() + amount);
				break;
			case this.DEFAULT_HOUR :
				tmpdate.setHours(tmpdate.getHours() + amount);
				break;
			case this.DEFAULT_MINUTE :
				tmpdate.setMinutes(tmpdate.getMinutes() + amount);
				break;
			case this.DEFAULT_SECOND :
				tmpdate.setSeconds(tmpdate.getSeconds() + amount);
				break;
			default :
				this.debug('你输入的[interval:' + field + '] 不符合条件!');
		}

		this.curDate = tmpdate;
		return this.formatCurrentDate(targetFormat == undefined
				? strFormat
				: targetFormat);
	},

	/**
	 * 比较两个日期的差距
	 * 
	 * @param date1
	 *            Date类型的时间
	 * @param date2
	 *            Dete 类型的时间
	 * @param isFormat
	 *            boolean 是否对得出的时间进行格式化 false:返回毫秒数，true：返回格式化后的数据
	 * @return 返回两个日期之间的毫秒数 或者是格式化后的结果
	 */
	compareTo : function(date1, date2, isFormat) {
		try {
			var len = arguments.length;
			var tmpdate1 = new Date();
			var tmpdate2 = new Date();
			if (len == 1) {
				tmpdate1 = date1;
			} else if (len >= 2) {
				tmpdate1 = date1;
				tmpdate2 = date2;
			}
			if (!(tmpdate1 instanceof Date) || !(tmpdate2 instanceof Date)) {
				return 0;
			} else {
				var time1 = tmpdate1.getTime();
				var time2 = tmpdate2.getTime();
				var time = Math.max(time1, time2) - Math.min(time1, time2);
				if (!isNaN(time) && time > 0) {
					if (isFormat) {
						var date = new Date(time);
						var result = {};
						result['year'] = (date.getFullYear() - 1970) > 0
								? (date.getFullYear() - 1970)
								: '0';
						result['month'] = (date.getMonth() - 1) > 0 ? (date
								.getMonth() - 1) : '0';
						result['day'] = (date.getDate() - 1) > 0 ? (date
								.getDate() - 1) : '0';
						result['hour'] = (date.getHours() - 8) > 0 ? (date
								.getHours() - 1) : '0';
						result['minute'] = date.getMinutes() > 0 ? date
								.getMinutes() : '0';
						result['second'] = date.getSeconds() > 0 ? date
								.getSeconds() : '0';
						return result;
					} else {
						return time;
					}
				} else {
					return 0;
				}
			}
		} catch (e) {
			this.debug('比较时间出现异常' + e.message);
		}
	},

	/**
	 * 根据给定的日期得到日期的月，日，时，分和秒的对象
	 * 
	 * @params date 给定的日期 date为非Date类型， 则获取当前日期
	 * @return 有给定日期的月、日、时、分和秒组成的对象
	 */
	getDateObject : function(date) {
		if (!(date instanceof Date)) {
			date = new Date();
		}
		return {
			'M+' : date.getMonth() + 1,
			'd+' : date.getDate(),
			'H+' : date.getHours(),
			'm+' : date.getMinutes(),
			's+' : date.getSeconds()
		};
	},

	/**
	 * 在控制台输出日志
	 * 
	 * @params message 要输出的日志信息
	 */
	debug : function(message) {
		try {
			if (!this.isDebug) {
				return;
			}
			if (!window.console) {
				window.console = {};
				window.console.log = function() {
					return;
				}
			}
			window.console.log(message + ' ');
		} catch (e) {
		}
	}
}

/**
 * 日期处理工具类
 */

var DateUtil = function() {
	/**
	 * 判断闰年
	 * 
	 * @param date
	 *            Date日期对象
	 * @return boolean true 或false
	 */
	this.isLeapYear = function(date) {
		return (0 == date.getYear() % 4 && ((date.getYear() % 100 != 0) || (date
				.getYear()
				% 400 == 0)));
	}

	/**
	 * 日期对象转换为指定格式的字符串
	 * 
	 * @param f
	 *            日期格式,格式定义如下 yyyy-MM-dd HH:mm:ss
	 * @param date
	 *            Date日期对象, 如果缺省，则为当前时间
	 * 
	 * YYYY/yyyy/YY/yy 表示年份 MM/M 月份 W/w 星期 dd/DD/d/D 日期 hh/HH/h/H 时间 mm/m 分钟
	 * ss/SS/s/S 秒
	 * @return string 指定格式的时间字符串
	 */
	this.dateToStr = function(formatStr, date) {
		formatStr = arguments[0] || "yyyy-MM-dd HH:mm:ss";
		date = arguments[1] || new Date();
		var str = formatStr;
		var Week = ['日', '一', '二', '三', '四', '五', '六'];
		str = str.replace(/yyyy|YYYY/, date.getFullYear());
		str = str.replace(/yy|YY/, (date.getYear() % 100) > 9
						? (date.getYear() % 100).toString()
						: '0' + (date.getYear() % 100));
		str = str.replace(/MM/, date.getMonth() > 9
						? (date.getMonth() + 1)
						: '0' + (date.getMonth() + 1));
		str = str.replace(/M/g, date.getMonth());
		str = str.replace(/w|W/g, Week[date.getDay()]);

		str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate()
						.toString() : '0' + date.getDate());
		str = str.replace(/d|D/g, date.getDate());

		str = str.replace(/hh|HH/, date.getHours() > 9 ? date.getHours()
						.toString() : '0' + date.getHours());
		str = str.replace(/h|H/g, date.getHours());
		str = str.replace(/mm/, date.getMinutes() > 9 ? date.getMinutes()
						.toString() : '0' + date.getMinutes());
		str = str.replace(/m/g, date.getMinutes());

		str = str.replace(/ss|SS/, date.getSeconds() > 9 ? date.getSeconds()
						.toString() : '0' + date.getSeconds());
		str = str.replace(/s|S/g, date.getSeconds());

		return str;
	}

	/**
	 * 日期计算
	 * 
	 * @param strInterval
	 *            string 可选值 y 年 m月 d日 w星期 ww周 h时 n分 s秒
	 * @param num
	 *            int
	 * @param date
	 *            Date 日期对象
	 * @return Date 返回日期对象
	 */
	this.dateAdd = function(strInterval, num, date) {
		date = arguments[2] || new Date();
		switch (strInterval) {
			case 's' :
				return new Date(date.getTime() + (1000 * num));
			case 'n' :
				return new Date(date.getTime() + (60000 * num));
			case 'h' :
				return new Date(date.getTime() + (3600000 * num));
			case 'd' :
				return new Date(date.getTime() + (86400000 * num));
			case 'w' :
				return new Date(date.getTime() + ((86400000 * 7) * num));
			case 'm' :
				return new Date(date.getFullYear(), (date.getMonth()) + num,
						date.getDate(), date.getHours(), date.getMinutes(),
						date.getSeconds());
			case 'y' :
				return new Date((date.getFullYear() + num), date.getMonth(),
						date.getDate(), date.getHours(), date.getMinutes(),
						date.getSeconds());
		}
	}

	/**
	 * 比较日期差 dtEnd 格式为日期型或者有效日期格式字符串
	 * 
	 * @param strInterval
	 *            string 可选值 y 年 m月 d日 w星期 ww周 h时 n分 s秒
	 * @param dtStart
	 *            Date 可选值 y 年 m月 d日 w星期 ww周 h时 n分 s秒
	 * @param dtEnd
	 *            Date 可选值 y 年 m月 d日 w星期 ww周 h时 n分 s秒
	 */
	this.dateDiff = function(strInterval, dtStart, dtEnd) {
		switch (strInterval) {
			case 's' :
				return parseInt((dtEnd - dtStart) / 1000);
			case 'n' :
				return parseInt((dtEnd - dtStart) / 60000);
			case 'h' :
				return parseInt((dtEnd - dtStart) / 3600000);
			case 'd' :
				return parseInt((dtEnd - dtStart) / 86400000);
			case 'w' :
				return parseInt((dtEnd - dtStart) / (86400000 * 7));
			case 'm' :
				return (dtEnd.getMonth() + 1)
						+ ((dtEnd.getFullYear() - dtStart.getFullYear()) * 12)
						- (dtStart.getMonth() + 1);
			case 'y' :
				return dtEnd.getFullYear() - dtStart.getFullYear();
		}
	}

	/**
	 * 字符串转换为日期对象
	 * 
	 * @param date
	 *            Date 格式为yyyy-MM-dd HH:mm:ss，必须按年月日时分秒的顺序，中间分隔符不限制
	 */
	this.strToDate = function(dateStr) {
		var data = dateStr;
		var reCat = /(\d{1,4})/gm;
		var t = data.match(reCat);
		t[1] = t[1] - 1;
		eval('var d = new Date(' + t.join(',') + ');');
		return d;
	}

	/**
	 * 把指定格式的字符串转换为日期对象yyyy-MM-dd HH:mm:ss
	 * 
	 */
	this.strFormatToDate = function(formatStr, dateStr) {
		var year = 0;
		var start = -1;
		var len = dateStr.length;
		if ((start = formatStr.indexOf('yyyy')) > -1 && start < len) {
			year = dateStr.substr(start, 4);
		}
		var month = 0;
		if ((start = formatStr.indexOf('MM')) > -1 && start < len) {
			month = parseInt(dateStr.substr(start, 2)) - 1;
		}
		var day = 0;
		if ((start = formatStr.indexOf('dd')) > -1 && start < len) {
			day = parseInt(dateStr.substr(start, 2));
		}
		var hour = 0;
		if (((start = formatStr.indexOf('HH')) > -1 || (start = formatStr
				.indexOf('hh')) > 1)
				&& start < len) {
			hour = parseInt(dateStr.substr(start, 2));
		}
		var minute = 0;
		if ((start = formatStr.indexOf('mm')) > -1 && start < len) {
			minute = dateStr.substr(start, 2);
		}
		var second = 0;
		if ((start = formatStr.indexOf('ss')) > -1 && start < len) {
			second = dateStr.substr(start, 2);
		}
		return new Date(year, month, day, hour, minute, second);
	}

	/**
	 * 日期对象转换为毫秒数
	 */
	this.dateToLong = function(date) {
		return date.getTime();
	}

	/**
	 * 毫秒转换为日期对象
	 * 
	 * @param dateVal
	 *            number 日期的毫秒数
	 */
	this.longToDate = function(dateVal) {
		return new Date(dateVal);
	}

	/**
	 * 判断字符串是否为日期格式
	 * 
	 * @param str
	 *            string 字符串
	 * @param formatStr
	 *            string 日期格式， 如下 yyyy-MM-dd
	 */
	this.isDate = function(str, formatStr) {
		if (formatStr == null) {
			formatStr = "yyyyMMdd";
		}
		var yIndex = formatStr.indexOf("yyyy");
		if (yIndex == -1) {
			return false;
		}
		var year = str.substring(yIndex, yIndex + 4);
		var mIndex = formatStr.indexOf("MM");
		if (mIndex == -1) {
			return false;
		}
		var month = str.substring(mIndex, mIndex + 2);
		var dIndex = formatStr.indexOf("dd");
		if (dIndex == -1) {
			return false;
		}
		var day = str.substring(dIndex, dIndex + 2);
		if (!isNumber(year) || year > "2100" || year < "1900") {
			return false;
		}
		if (!isNumber(month) || month > "12" || month < "01") {
			return false;
		}
		if (day > getMaxDay(year, month) || day < "01") {
			return false;
		}
		return true;
	}

	this.getMaxDay = function(year, month) {
		if (month == 4 || month == 6 || month == 9 || month == 11)
			return "30";
		if (month == 2)
			if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0)
				return "29";
			else
				return "28";
		return "31";
	}
	/**
	 * 变量是否为数字
	 */
	this.isNumber = function(str) {
		var regExp = /^\d+$/g;
		return regExp.test(str);
	}

	/**
	 * 把日期分割成数组 [年、月、日、时、分、秒]
	 */
	this.toArray = function(myDate) {
		myDate = arguments[0] || new Date();
		var myArray = Array();
		myArray[0] = myDate.getFullYear();
		myArray[1] = myDate.getMonth();
		myArray[2] = myDate.getDate();
		myArray[3] = myDate.getHours();
		myArray[4] = myDate.getMinutes();
		myArray[5] = myDate.getSeconds();
		return myArray;
	}

	/**
	 * 取得日期数据信息 参数 interval 表示数据类型 y 年 M月 d日 w星期 ww周 h时 n分 s秒
	 */
	this.datePart = function(interval, myDate) {
		myDate = arguments[1] || new Date();
		var partStr = '';
		var Week = ['日', '一', '二', '三', '四', '五', '六'];
		switch (interval) {
			case 'y' :
				partStr = myDate.getFullYear();
				break;
			case 'M' :
				partStr = myDate.getMonth() + 1;
				break;
			case 'd' :
				partStr = myDate.getDate();
				break;
			case 'w' :
				partStr = Week[myDate.getDay()];
				break;
			case 'ww' :
				partStr = myDate.WeekNumOfYear();
				break;
			case 'h' :
				partStr = myDate.getHours();
				break;
			case 'm' :
				partStr = myDate.getMinutes();
				break;
			case 's' :
				partStr = myDate.getSeconds();
				break;
		}
		return partStr;
	}

	/**
	 * 取得当前日期所在月的最大天数
	 */
	this.maxDayOfDate = function(date) {
		date = arguments[0] || new Date();
		date.setDate(1);
		date.setMonth(date.getMonth() + 1);
		var time = date.getTime() - 24 * 60 * 60 * 1000;
		var newDate = new Date(time);
		return newDate.getDate();
	}

	return this;
}();