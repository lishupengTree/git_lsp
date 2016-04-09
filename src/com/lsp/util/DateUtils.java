package com.lsp.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * 日期工具类
 * @author Administrator
 *
 */
public class DateUtils {
    private static String defaultDatePattern = null;  
    private static String timePattern = "HH:mm";  
    private static Calendar cale = Calendar.getInstance();  
    /** 日期格式yyyy-MM字符串常量 */  
    private static final String MONTH_FORMAT = "yyyy-MM";  
    /** 日期格式yyyy-MM-dd字符串常量 */  
    private static final String DATE_FORMAT = "yyyy-MM-dd";  
    /** 日期格式HH:mm:ss字符串常量 */  
    private static final String HOUR_FORMAT = "HH:mm:ss";  
    /** 日期格式yyyy-MM-dd HH:mm:ss字符串常量 */  
    private static final String DATETIME_FORMAT = "yyyy-MM-dd HH:mm:ss";  
    /** 某天开始时分秒字符串常量  00:00:00 */  
    private static final String DAY_BEGIN_STRING_HHMMSS = " 00:00:00";  
    /**  某天结束时分秒字符串常量  23:59:59  */  
    public static final String DAY_END_STRING_HHMMSS = " 23:59:59";  
    private static SimpleDateFormat sdf_date_format = new SimpleDateFormat(DATE_FORMAT);  
    private static SimpleDateFormat sdf_hour_format = new SimpleDateFormat(HOUR_FORMAT);  
    private static SimpleDateFormat sdf_datetime_format = new SimpleDateFormat(DATETIME_FORMAT); 
	/**
	 * 将str根据format格式转化成时间
	 * @param str
	 * @param format
	 * @return
	 */
	public static Date strToDate(String str, String format){
		if(str == null){
			return null;
		}
		SimpleDateFormat sf = new SimpleDateFormat(format);
		try {
			return sf.parse(str);
		} catch (ParseException e) {
			return null;
		}
	}
	
	/**
	 * yyyy-MM-dd格式转成时间
	 * @param str
	 * @return
	 */
	public static Date strToDate(String str){
		return strToDate(str, "yyyy-MM-dd");
	}
	
	/**
	 * 将date根据format格式转化成字符串
	 * @param date
	 * @param format
	 * @return
	 */
	public static String dateToStr(Date date, String format){
		if(date == null){
			return null;
		}
		SimpleDateFormat sf = new SimpleDateFormat(format);
		return sf.format(date);
	}
	
	/**
	 * 转成yyyy-MM-dd格式字符串
	 * @param date
	 * @return
	 */
	public static String dateToStr(Date date){
		return dateToStr(date, "yyyy-MM-dd");
	}
	
	/**
	  * 判断当前日期为星期几
	  * @param date
	  * @return
	  */
	public static int dayOfWeek(Date date) {
		Calendar aCalendar = Calendar.getInstance();
		aCalendar.setTime(date);
		int weekDay = aCalendar.get(Calendar.DAY_OF_WEEK)-1;
		return weekDay;
	}
	/**
	 * Date 对象转化为 Calendar 对象 
	 * @param d
	 * @return
	 */
	public static Calendar DatToCal(Date d){
		Calendar  c = Calendar.getInstance();
		c.setTime(d);
		return c;
	}
	
	/**
	 * 数字转中文汉字  （非大写的钱）
	 * @param num  int类型的 数字
	 * @return
	 */
	public static String numToChinese(int num) {
		String[] units = { "", "十", "百", "千", "万", "十万", "百万", "千万", "亿", "十亿", "百亿", "千亿", "万亿" };
		char[] numArray = { '零', '一', '二', '三', '四', '五', '六', '七', '八', '九' };
		char[] val = String.valueOf(num).toCharArray();
		int len = val.length;
		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < len; i++) {
			String m = val[i] + "";
			int n = Integer.valueOf(m);
			boolean isZero = n == 0;
			String unit = units[(len - 1) - i];
			if (isZero) {
				if ('0' == val[i - 1]) {
					// not need process if the last digital bits is 0
					continue;
				} else {
					// no unit for 0
					sb.append(numArray[n]);
				}
			} else {
				sb.append(numArray[n]);
				sb.append(unit);
			}
		}
		return sb.toString();
	}
	
	/**
	 * 数字转 大写的钱 
	 * @param  int类型的 数字
	 */
	public static String numToMoney(int d) {
		String[] str = { "零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖" };
		String ss[] = new String[] { "元", "拾", "佰", "仟", "万", "拾", "佰", "仟", "亿" };
		String s = String.valueOf(d);
		//System.out.println(s);
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < s.length(); i++) {
			String index = String.valueOf(s.charAt(i));
			sb = sb.append(str[Integer.parseInt(index)]);
		}
		String sss = String.valueOf(sb);
		int i = 0;
		for (int j = sss.length(); j > 0; j--) {
			sb = sb.insert(j, ss[i++]);
		}
		return sb.toString();
	}
	
	
	
	/**
	 *  获得  两个日期之间的天数
	 * @param startDate 开始日期
	 * @param endDate  结束日期
	 * @return
	 */
	public static Long getDaysBetween(Date startDate, Date endDate) {
		Calendar startCalendar = Calendar.getInstance();
		startCalendar.setTime(startDate);
		startCalendar.set(Calendar.HOUR_OF_DAY, 0);
		startCalendar.set(Calendar.MINUTE, 0);
		startCalendar.set(Calendar.SECOND, 0);
		startCalendar.set(Calendar.MILLISECOND, 0);

		Calendar endCalendar = Calendar.getInstance();
		endCalendar.setTime(endDate);
		endCalendar.set(Calendar.HOUR_OF_DAY, 0);
		endCalendar.set(Calendar.MINUTE, 0);
		endCalendar.set(Calendar.SECOND, 0);
		endCalendar.set(Calendar.MILLISECOND, 0);

		return (endCalendar.getTime().getTime() - startCalendar.getTime().getTime()) / (1000 * 60 * 60 * 24);
	}
	
	/**
	 * 获得服务器当前日期及时间，以格式为：yyyy-MM-dd HH:mm:ss的日期字符串形式返回
	 * @return
	 */
	public static String getDateTime() {  
        try {  
            return sdf_datetime_format.format(cale.getTime());  
        } catch (Exception e) {  
            e.printStackTrace();
            return "";  
        }  
    }  
	
	/**
	 *  字符串 转date 
	 * @param str 字符串
	 * @param format 要转化的格式
	 * @return
	 */
	public static Date stringToDate(String str,String format){
		if(str==null||"".equals(str)){
			return null;
		}
		SimpleDateFormat sdf=new SimpleDateFormat(format);
		try{
			return sdf.parse(str);
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
	}
	/**
	 * 日期转字符串
	 * @param date 日期对象
	 * @param format 要转化的格式
	 * @return
	 */
	public static String dateToString(Date date,String format){
		if(date==null){
			return "";
		}
		SimpleDateFormat sdf=new SimpleDateFormat(format);
		try{
			return sdf.format(date);
		}catch(Exception e){
			return "";
		}
	}
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int a = DateUtils.dayOfWeek(new Date());
		System.out.println(a);
		System.out.println(DateUtils.numToChinese(987979));

	}

}
