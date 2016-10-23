package com.lsp.util;

import java.util.List;
import java.util.Map;

public class ListUtil {
	
	/**
	 * 
	 * @param list
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static boolean listIsNotEmpty(List list){
		if(list != null && list.size() >= 1){
			return true;
		}else{
			return false;
			
			
		}
	}
	
	/**
	 * 
	 * @param list
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static Object distillFirstRow(List list){
		if(listIsNotEmpty(list)){
			return list.get(0);
		}else{
			return null;
		}
	}
	/**
	 * 
	 * @param list
	 * @param name
	 * @return
	 */
	
	public static String getListstring(List<Map> list,String name){
		if(!listIsNotEmpty(list)){
			return "";
		}
		StringBuffer sb = new StringBuffer();
		for (Map map : list) {
			String code = (String)map.get(name);
			sb.append(code+",");
		}
		//sb.substring(0, sb.length()-1);
		return sb.toString();
	}
	public static String getListstring1(List<Map> list,String name){
		if(!listIsNotEmpty(list)){
			return "";
		}
		StringBuffer sb = new StringBuffer();
		for (Map map : list) {
			String code = (String)map.get(name);
			sb.append("'" + code+ "'"+ ",");
		}
		String s = sb.toString().substring(0, sb.length()-1);
		
		return s;
	}
	
	
}
