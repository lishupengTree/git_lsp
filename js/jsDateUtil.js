/**
 * js ���ڴ����� ������
 * 
 * @return {}
 */

/**
 * �Ƚ����ڴ�С if(A>B) return true;else return false;
 */

function compareDate(dateAStr, dateBStr) {

	dateAStr = dateAStr.replace(/-/g, "/");
	dateBStr = dateBStr.replace(/-/g, "/");

	var a = new Date(dateAStr).getTime();
	var b = new Date(dateBStr).getTime();

	return a > b;
}

/**
 * DateFormat �� ʹ�÷����� DateFormat.formatCurrentDate("yyyy-MM-dd HH:mm:ss");
 * 
 * @param {}
 *            bDebug
 */
var DateFormat = function(bDebug) {
	this.isDebug = bDebug || false;
	this.curDate = new Date();
}

DateFormat.prototype = {
	// ����һЩ���õ����ڸ�ʽ�ĳ���
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
	 * ���ݸ���������ʱ���ʽ����ʽ����ǰ����
	 * 
	 * @params strFormat ��ʽ���ַ����� �磺"yyyy-MM-dd" Ĭ�ϸ�ʽΪ�� yyyy-MM-dd HH:mm:ss
	 * @return ���ظ��ݸ�����ʽ���ַ�����ʾ��ʱ�����ڸ�ʽ ������벻�Ϸ��ĸ�ʽ���򷵻����ڵ��ַ�����ʽ
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
			this.debug('��ʽ�����ڳ����쳣��' + e.message);
		}
	},
	/**
	 * ���ݸ����ĸ�ʽ���Ѹ�����ʱ����и�ʽ��
	 * 
	 * @params date Ҫ��ʽ��������
	 * @params strFormat Ҫ�õ������ڵĸ�ʽ�ĸ�ʽ���ַ������磺'yyyy-MM-dd'��Ĭ�ϣ�yyyy-MM-dd HH:mm:ss
	 * @return ���ݹ涨��ʽ��ʱ���ʽ
	 */
	format : function(date, strFormat) {
		try {
			if (date == undefined) {
				this.curDate = new Date();
			} else if (!(date instanceof Date)) {
				this.debug('�������date:' + date + '������������');
				return date;
			} else {
				this.curDate = date;
			}
			return this.formatCurrentDate(strFormat);
		} catch (e) {
			this.debug('��ʽ�����ڳ����쳣��' + e.message);
		}
	},

	/**
	 * ���ݸ����ĸ�ʽ�Ը������ַ�������ʱ����н�����
	 * 
	 * @params strDate Ҫ���������ڵ��ַ�����ʾ,�˲���ֻ�����ַ�����ʽ�����ڣ����򷵻ص���ϵͳ����
	 * @params strFormat �����������ڵ�˳��, ��������strDate�ĸ�ʽΪ����֧�ֵĸ�ʽ��
	 *         ����Բ����룬����һ��Ҫ������strDate��Ӧ�ĸ�ʽ, ���������ʽ�򷵻ص���ϵͳ���ڡ�
	 * @return ���ؽ������Date���͵�ʱ�� �����ܽ����򷵻ص�ǰ���� ������Ϊʱ���ʽ �򷵻ص�����Ϊ 1970��1��1�յ�����
	 * 
	 * bug: �˷���Ŀǰֻ��ʵ������'yyyy-MM-dd'��ʽ�����ڵ�ת���� ��'yyyyMMdd'��ʽ�����ڣ�����ʵ��
	 */

	parseDate : function(strDate, strFormat) {
		if (typeof strDate != 'string') {
			return new Date();
		}
		var longTime = Date.parse(strDate);
		if (isNaN(longTime)) {
			if (strFormat == undefined) {
				this.debug('���������ڵĸ�ʽ');
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
	 * ���ݸ�����ʱ�������ͼ����ֵ���Ը����ĸ�ʽ�Ը�����ʱ����м��㲢��ʽ������
	 * 
	 * @params date Ҫ����������ʱ�����Ϊʱ����ַ������� ���Ƶ�ʱ�����
	 * @params interval ʱ���������磺"YEAR"��"MONTH"�� "DATE", �����ִ�Сд
	 * @params amount ʱ����ֵ�����������͸���, ����Ϊ��date�����ڼ�ȥ��Ӧ����ֵ������Ϊ��date�������ϼ�����Ӧ����ֵ
	 * @params strFormat ������˵�date�ĸ�ʽΪ�ַ����ǣ�����������롣��date����Ϊ{@see Date}�����Ǵ������Ϊ��������ĸ�ʽ��
	 * @params targetFormat �������������ʱ��ĸ�ʽ����û��������ʹ��strFormat����Ĭ�ϸ�ʽ'yyyy-MM-dd
	 *         HH:mm:ss'
	 * @return ���ؼ��㲢��ʽ�����ʱ����ַ���
	 */
	changeDate : function(date, interval, amount, strFormat, targetFormat) {
		var tmpdate = new Date();
		if (date == undefined) {
			this.debug('�����ʱ�䲻��Ϊ��!');
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
			this.debug('�������[amount=' + amount + ']����ת��Ϊ����');
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
				this.debug('�������[interval:' + field + '] ����������!');
		}

		this.curDate = tmpdate;
		return this.formatCurrentDate(targetFormat == undefined
				? strFormat
				: targetFormat);
	},

	/**
	 * �Ƚ��������ڵĲ��
	 * 
	 * @param date1
	 *            Date���͵�ʱ��
	 * @param date2
	 *            Dete ���͵�ʱ��
	 * @param isFormat
	 *            boolean �Ƿ�Եó���ʱ����и�ʽ�� false:���غ�������true�����ظ�ʽ���������
	 * @return ������������֮��ĺ����� �����Ǹ�ʽ����Ľ��
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
			this.debug('�Ƚ�ʱ������쳣' + e.message);
		}
	},

	/**
	 * ���ݸ��������ڵõ����ڵ��£��գ�ʱ���ֺ���Ķ���
	 * 
	 * @params date ���������� dateΪ��Date���ͣ� ���ȡ��ǰ����
	 * @return �и������ڵ��¡��ա�ʱ���ֺ�����ɵĶ���
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
	 * �ڿ���̨�����־
	 * 
	 * @params message Ҫ�������־��Ϣ
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
 * ���ڴ�������
 */

var DateUtil = function() {
	/**
	 * �ж�����
	 * 
	 * @param date
	 *            Date���ڶ���
	 * @return boolean true ��false
	 */
	this.isLeapYear = function(date) {
		return (0 == date.getYear() % 4 && ((date.getYear() % 100 != 0) || (date
				.getYear()
				% 400 == 0)));
	}

	/**
	 * ���ڶ���ת��Ϊָ����ʽ���ַ���
	 * 
	 * @param f
	 *            ���ڸ�ʽ,��ʽ�������� yyyy-MM-dd HH:mm:ss
	 * @param date
	 *            Date���ڶ���, ���ȱʡ����Ϊ��ǰʱ��
	 * 
	 * YYYY/yyyy/YY/yy ��ʾ��� MM/M �·� W/w ���� dd/DD/d/D ���� hh/HH/h/H ʱ�� mm/m ����
	 * ss/SS/s/S ��
	 * @return string ָ����ʽ��ʱ���ַ���
	 */
	this.dateToStr = function(formatStr, date) {
		formatStr = arguments[0] || "yyyy-MM-dd HH:mm:ss";
		date = arguments[1] || new Date();
		var str = formatStr;
		var Week = ['��', 'һ', '��', '��', '��', '��', '��'];
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
	 * ���ڼ���
	 * 
	 * @param strInterval
	 *            string ��ѡֵ y �� m�� d�� w���� ww�� hʱ n�� s��
	 * @param num
	 *            int
	 * @param date
	 *            Date ���ڶ���
	 * @return Date �������ڶ���
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
	 * �Ƚ����ڲ� dtEnd ��ʽΪ�����ͻ�����Ч���ڸ�ʽ�ַ���
	 * 
	 * @param strInterval
	 *            string ��ѡֵ y �� m�� d�� w���� ww�� hʱ n�� s��
	 * @param dtStart
	 *            Date ��ѡֵ y �� m�� d�� w���� ww�� hʱ n�� s��
	 * @param dtEnd
	 *            Date ��ѡֵ y �� m�� d�� w���� ww�� hʱ n�� s��
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
	 * �ַ���ת��Ϊ���ڶ���
	 * 
	 * @param date
	 *            Date ��ʽΪyyyy-MM-dd HH:mm:ss�����밴������ʱ�����˳���м�ָ���������
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
	 * ��ָ����ʽ���ַ���ת��Ϊ���ڶ���yyyy-MM-dd HH:mm:ss
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
	 * ���ڶ���ת��Ϊ������
	 */
	this.dateToLong = function(date) {
		return date.getTime();
	}

	/**
	 * ����ת��Ϊ���ڶ���
	 * 
	 * @param dateVal
	 *            number ���ڵĺ�����
	 */
	this.longToDate = function(dateVal) {
		return new Date(dateVal);
	}

	/**
	 * �ж��ַ����Ƿ�Ϊ���ڸ�ʽ
	 * 
	 * @param str
	 *            string �ַ���
	 * @param formatStr
	 *            string ���ڸ�ʽ�� ���� yyyy-MM-dd
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
	 * �����Ƿ�Ϊ����
	 */
	this.isNumber = function(str) {
		var regExp = /^\d+$/g;
		return regExp.test(str);
	}

	/**
	 * �����ڷָ������ [�ꡢ�¡��ա�ʱ���֡���]
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
	 * ȡ������������Ϣ ���� interval ��ʾ�������� y �� M�� d�� w���� ww�� hʱ n�� s��
	 */
	this.datePart = function(interval, myDate) {
		myDate = arguments[1] || new Date();
		var partStr = '';
		var Week = ['��', 'һ', '��', '��', '��', '��', '��'];
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
	 * ȡ�õ�ǰ���������µ��������
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