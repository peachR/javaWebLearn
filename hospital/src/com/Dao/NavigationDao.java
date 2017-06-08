package com.Dao;

import java.util.List;

import com.model.Navigation;

/**
 * 导航表Dao接口
 * @author peach
 * @Time 2017-05-27 14:16:07
 */
public interface NavigationDao {
	public List<Navigation> getNavByRole(String roleName);
	public List<Navigation> getParentNav();
}
