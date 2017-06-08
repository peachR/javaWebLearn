package com.Dao;

import com.model.User;
public interface UserDao {
	public User getUser(User user);
	public User updateUser(User user);
	public void insertUser(User user);
	public int deleteUser(int id);
	public void updateOnline(User user);
}
