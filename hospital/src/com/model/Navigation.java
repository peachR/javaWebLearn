package com.model;
/**
 * 导航表模型
 * @author peach
 * @Time 2017-05-27 14:13:15
 * @version v1.0
 */

public class Navigation {
	private int id;
	private String name;
	private String icon;
	private String url;
	private int node;
	private int parent;
	
	public void setId(int id){
		this.id = id;
	}
	
	public void setName(String name){
		this.name = name;
	}
	
	public void setIcon(String icon){
		this.icon = icon;
	}
	
	public void setUrl(String url){
		this.url = url;
	}
	
	public void setNode(int node){
		this.node = node;
	}
	
	public void setParent(int parent){
		this.parent = parent;
	}
	
	public int getId(){
		return this.id;
	}
	
	public String getName(){
		return this.name;
	}
	
	public String getIcon(){
		return this.icon;
	}
	
	public String getUrl(){
		return this.url;
	}
	
	public int getNode(){
		return this.node;
	}
	
	public int getParent(){
		return this.parent;
	}
}
