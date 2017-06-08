package com.Dao;
/**
 * 角色Dao接口
 * @author peach
 * @Time 2017-05-27 13:44:28
 */
import java.util.List;

import com.model.Role;

public interface RoleDao {
	/**
	 * 获取所有角色
	 * @return 角色列表
	 */
	public List<Role> getAllRole();
	/**
	 * 根据角色名获取指定角色
	 * @param name 角色名
	 * @return 角色类
	 */
	public Role getRole(String name);
}
