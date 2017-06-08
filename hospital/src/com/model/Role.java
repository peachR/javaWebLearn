package com.model;
/**
 * 角色实体类
 * @author peach
 * @Time 2017-05-25 16:00:21
 */
import java.io.Serializable;
import java.util.List;

public class Role implements Serializable {
	private int id;
	private String Name;//角色名
	private String Description;//角色描述中文
	private List<User> users;
	
	public void setName(String Name){
		this.Name =Name;
	}
	
	public void setDescription(String Description){
		this.Description = Description;
	}
	
	public void setId(int id){
		this.id = id;
	}
	
	public void setUsers(List<User> users){
		this.users = users;
	}
	
	public int getId(){
		return this.id;
	}
	
	public String getName(){
		return this.Name;
	}
	
	public String getDescription(){
		return this.Description;
	}
	
	public List<User> getUsers(){
		return this.users;
	}
}
