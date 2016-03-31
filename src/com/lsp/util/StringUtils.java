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

}
