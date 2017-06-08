package com.service;
/**
 * 用户服务层
 * @author peach
 * @Time 2017-05-25 16:01:04
 */
import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.Dao.UserDao;
import com.model.User;

@Service
public class UserService {
	@Resource
	private UserDao userDao;
	
	public User getUser(User user){
		return userDao.getUser(user);
	}
	
	public void updateOnline(User user, byte on){
		user.setOn(on);
		this.userDao.updateOnline(user);
	}
	
}
