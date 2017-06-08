package com.model;

/**
 * 消息模型
 * @author peach
 * @Time 2017-06-08 11:11:25
 */
public class Information {
	private int id;
	private int releaseUserID;
	private String title;
	private String content;
	private byte important;
	private String permission;
	private String releaseTime;
	private User releaseUser;
	
	public void setId(int id){
		this.id = id;
	}
	
	public void setReleaseUserID(int releaseUserID){
		this.releaseUserID = releaseUserID;
	}
	
	public void setTitle(String title){
		this.title = title;
	}
	
	public void setContent(String content){
		this.content = content;
	}
	
	public void setImportant(byte important){
		this.important = important;
	}
	
	public void setPermission(String permission){
		this.permission = permission;
	}
	
	public void setReleaseTime(String releaseTime){
		this.releaseTime = releaseTime;
	}
	
	public void serReleaseUser(User releaseUser){
		this.releaseUser = releaseUser;
	}
	
	public int getId(){
		return this.id;
	}
	
	public int getReleaseUserID(){
		return this.releaseUserID;
	}
	
	public String getTitle(){
		return this.title;
	}
	
	public String getContent(){
		return this.content;
	}
	
	public byte getImportant(){
		return this.important;
	}
	
	public String getPermission(){
		return this.permission;
	}
	
	public String getReleaseTime(){
		return this.releaseTime;
	}
	
	public User getReleaseUser(){
		return this.releaseUser;
	}
}
