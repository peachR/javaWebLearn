package com.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.Dao.NavigationDao;
import com.model.Navigation;

/**
 * 导航服务层
 * @author peach
 * @Time 2017-05-27 14:29:12
 */
@Service
public class NavigationService {
	@Resource
	private NavigationDao navigationDao;
	
	public List<Navigation> getNavByRoleName(String roleName){
		return navigationDao.getNavByRole(roleName);
	}
	
	public List<Navigation> getParentNav(){
		return this.navigationDao.getParentNav();
	}
}
