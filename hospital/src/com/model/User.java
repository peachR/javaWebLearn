package com.model;
/**
 * 用户模型
 * @author peach
 * @Time 2017-05-20 13:46:28
 */
import java.util.List;

public class User {
	private int id;
	private String Number;
	private String password;
	private String Name;
	private String Gender;
	private String office;
	private int Activate;
	private List<Role> roles;
	private String currentRole;
	private String roleDescription;
	private byte on;
	
	
	public void setId(int id){
		this.id = id;
	}
	
	public void setNumber(String Number){
		this.Number = Number;
	}
	
	public void setPassword(String password){
		this.password = password;
	}
	
	public void setName(String Name){
		this.Name = Name;
	}
	
	public void setGender(String Gender){
		this.Gender = Gender;
	}
	
	public void setOffice(String office){
		this.office = office;
	}
	
	public void setActivate(int Activate){
		this.Activate = Activate;
	}
	
	public void setOn(byte on){
		this.on = on;
	}
	
	public void setRoles(List<Role> rList){
		this.roles = rList;
	}
	
	public void setcurrentRole(String role){
		this.currentRole = role;
	}
	
	public void setRoleDescription(String roleDescription){
		this.roleDescription = roleDescription;
	}
	
	public int getId(){
		return this.id;
	}
	
	public String getNumber(){
		return this.Number;
	}
	
	public String getPassword(){
		return this.password;
	}
	
	public String getName(){
		return this.Name;
	}
	
	public String getGender(){
		return this.Gender;
	}
	
	public int getActivate(){
		return this.Activate;
	}
	
	public List<Role> getRoles(){
		return this.roles;
	}
	
	public String getCurrentRole(){
		return this.currentRole;
	}
	
	public String getRoleDescription(){
		return this.roleDescription;
	}
	
	public byte getOn(){
		return this.on;
	}
	
	public String getOffice(){
		return this.office;
	}
}
