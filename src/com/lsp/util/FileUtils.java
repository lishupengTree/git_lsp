package com.lsp.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.RandomAccessFile;
import java.util.Properties;

/**
 * 
 * @author lsp  2016-03-31 15:41:54
 *
 */
public class FileUtils {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		
	}
	/**
	 * 返回 web-inf下的绝对路径    调用方式：getWeb_InfPath("exp\\exp_daodu.txt");
	 * @param filename  
	 * @return
	 * @throws Exception
	 */
	public static String getWeb_InfPath(String filename) throws Exception{
		String path = Thread.currentThread().getContextClassLoader().getResource("").toString();
		path=path.replace('/', '\\'); // 将/换成\  
        path=path.replace("file:", ""); //去掉file:  
        path=path.replace("classes\\", ""); //去掉class\  
        path=path.substring(1); //去掉第一个\,如 \D:\JavaWeb...  
        path+=filename;  
		return path;
	}
	
	/**
	 * 返回src 或者 web-inf  路径    
	 * @param type 类型 src 或者 inf 
	 * @param obj  类对象  （如：FileUtils.class.getClass() ）
	 * @return
	 * @throws Exception
	 */
	public static String getsrcPath(String type,Class<?> obj)throws Exception{
		String path = "";
		if("src".equals(type)){
			path = obj.getResource("/").getPath();
			path = path.substring(1, path.length());
		}else if("inf".equals(type)){
			path = obj.getResource("/").getPath();
			path = path.substring(1, path.indexOf("classes"));
		}else{
			path = "";
		}
		return path;
	}
	/**
	 * 返回Properties 对象 
	 * @param path 属性文件的路径 
	 */
	public static Properties getPropertiesObj(String path)throws Exception{
		Properties p = new Properties();
		p.load(new FileInputStream(path));
		//String s = p.getProperty("name");
		return p;
	}
	
	
	/**
	 *  读txt文件并返回  读取 到的字符串
	 * @param filePath （绝对路径）
	 * @return
	 * @throws IOException
	 */
	public static String readTxtFile(String filePath) throws IOException{
		StringBuilder sb = new StringBuilder();  
		String encoding="UTF-8";
        File file=new File(filePath);
        if(file.isFile() && file.exists()){ //判断文件是否存在
            InputStreamReader read = new InputStreamReader(
            new FileInputStream(file),encoding);//考虑到编码格式
            BufferedReader bufferedReader = new BufferedReader(read);
            String lineTxt = null;
            while((lineTxt = bufferedReader.readLine()) != null){
            	sb.append(lineTxt);
            }
            read.close();
        }
		return sb.toString(); 
	}
	/**
	 * 写 文本文件  txt 或者 html 
	 * @param filename 文件名（绝对路径+文件名+后缀）
	 * @param content  写入的内容 
	 * @throws IOException
	 */
	public static void  writeFile(String filename, String content) throws IOException{
		File file = new File(filename);
		if(!file.exists()){
			file.createNewFile();
		}else{
			file.delete();
			file.createNewFile();
		}
		RandomAccessFile mm = null;
		FileOutputStream o = null;
		try {
			o = new FileOutputStream(file);
			o.write(content.getBytes("UTF-8"));
			o.close();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (mm != null) {
				mm.close();
			}
		}  
	}
	
}
