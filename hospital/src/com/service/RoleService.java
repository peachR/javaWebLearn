package com.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.Dao.RoleDao;
import com.model.Role;

@Service
public class RoleService {
	@Resource
	private RoleDao roleDao;
	
	public List<Role> getAllRole(){
		return roleDao.getAllRole();
	}
	
	public Role getRole(String name){
		return roleDao.getRole(name);
	}
}
