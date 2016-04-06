/**
 * @Title: JsonUtil.java
 * @Package: cc.ewell.wms.app.util
 * @ClassName: JsonUtil
 * @Description: TODO(用一句话描述该文件做什么)
 * @author lsp
 * @date 2015年3月11日
 * @version: V1.0
 */
package com.lsp.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;

/**
 * @ClassName: JsonUtil
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author Jing
 * @date 2015年3月11日
 * 
 */
public class JsonUtil
{
    @SuppressWarnings("unchecked")
    public static Map<String, Object> getMapForJson(JSONObject jsonObject)
    {
        try
        {
            Iterator<String> keyIter = jsonObject.keys();
            String key;
            Object value;
            Map<String, Object> valueMap = new HashMap<String, Object>();
            while (keyIter.hasNext())
            {
                key = keyIter.next();
                value = jsonObject.get(key);
                valueMap.put(key, value);
            }
            return valueMap;
        } catch (Exception e)
        {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * pc
     * @Title: getMapForJson
     * @Description: TODO(将jsonArry转换成Map<String, Object>)
     * @param @param jsonArray
     * @param @return
     * @return Map<String,Object>
     * @throws
     */
    public static Map<String, Object> getMapForJson(JSONArray jsonArray)
    {
        try
        {

            Map<String, Object> valueMap = new HashMap<String, Object>();
            for (int i = 0; i < jsonArray.length(); i++)
            {
                valueMap.put(jsonArray.getJSONObject(i).getString("key"), jsonArray
                        .getJSONObject(i).getString("value"));
            }
            return valueMap;
        } catch (Exception e)
        {
            e.printStackTrace();
        }
        return null;
    }

    public static List<Map<String, Object>> getlistForJson(JSONArray jsonArray)
    {
        List<Map<String, Object>> list = null;
        try
        {
            JSONObject jsonObj;
            list = new ArrayList<Map<String, Object>>();
            for (int i = 0; i < jsonArray.length(); i++)
            {
                jsonObj = (JSONObject) jsonArray.get(i);
                list.add(getMapForJson(jsonObj.toString()));
            }
        } catch (Exception e)
        {
            e.printStackTrace();
        }
        return list;
    }

    /**
     * 
     * @Title: getlistForJsonToList
     * @Description: TODO(实现集合累加方法)
     * @param @param jsonArray
     * @param @param list
     * @param @return
     * @return List<Map<String,Object>>
     * @throws
     */
    public static List<Map<String, Object>> getlistForJsonToList(JSONArray jsonArray,
            List<Map<String, Object>> list)
    {

        try
        {
            JSONObject jsonObj;
            if (list == null)
            {
                list = new ArrayList<Map<String, Object>>();
            }
            for (int i = 0; i < jsonArray.length(); i++)
            {
                jsonObj = (JSONObject) jsonArray.get(i);
                list.add(getMapForJson(jsonObj.toString()));
            }
        } catch (Exception e)
        {
            e.printStackTrace();
        }
        return list;
    }

    @SuppressWarnings("unchecked")
    public static Map<String, Object> getMapForJson(String jsonStr)
    {
        JSONObject jsonObject;
        try
        {
            jsonObject = new JSONObject(jsonStr);
            Iterator<String> keyIter = jsonObject.keys();
            String key;
            Object value;
            Map<String, Object> valueMap = new HashMap<String, Object>();
            while (keyIter.hasNext())
            {
                key = keyIter.next();
                value = jsonObject.get(key);
                valueMap.put(key, value);
            }
            return valueMap;
        } catch (Exception e)
        {
            e.printStackTrace();
        }
        return null;
    }

    public static List<Map<String, Object>> getlistForJson(String jsonStr)
    {
        List<Map<String, Object>> list = null;
        try
        {
            JSONArray jsonArray = new JSONArray(jsonStr);
            JSONObject jsonObj;
            list = new ArrayList<Map<String, Object>>();
            for (int i = 0; i < jsonArray.length(); i++)
            {
                jsonObj = (JSONObject) jsonArray.get(i);
                list.add(getMapForJson(jsonObj.toString()));
            }
        } catch (Exception e)
        {
            e.printStackTrace();
        }
        return list;
    }

    public static ArrayList<String> getlistForJsonArry(JSONArray jsonArray)
    {
        ArrayList<String> list = null;
        try
        {

            list = new ArrayList<String>();
            for (int i = 0; i < jsonArray.length(); i++)
            {

                list.add(jsonArray.get(i).toString());
            }
        } catch (Exception e)
        {
            e.printStackTrace();
        }
        return list;
    }
}
