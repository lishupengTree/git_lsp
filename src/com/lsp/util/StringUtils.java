package com.lsp.util;

/**
 * 字符串的工具类
 * @author Administrator
 *
 */
public class StringUtils {
	
	/**
	 * 判断某字符串是否为空
	 * @param str
	 * @return
	 */
	public static boolean isEmpty(String str){
		if(str == null || str.equals("")){
			return true;
		}else{
			return false;
		}
	}
	/**
	 * 判断某字符串是否非空
	 * @param str
	 * @return
	 */
	public static boolean isNotEmpty(String str){
		if(str == null || str.equals("")){
			return false;
		}else{
			return true;
		}
	}
	
	
	public static void main(String[] args) {
		
	}

	
	
	/**
	 * 判断 字符 是不是 以某个字符结尾 
	 * @param str字符串
	 * @param ch想检查的字符
	 * @return
	 */
	public static boolean Equ(String str, char ch) {
		if (str == null || "".equals(str)) {
			return false;
		}
		if (str.charAt(str.length() - 1) == ch) {
			return true;
		} else {
			return false;
		}
	}
	//去掉字符串的  首或者 尾 n位字符 
	
	
}
