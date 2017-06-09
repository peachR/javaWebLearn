package com.Dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.model.Information;

/**
 * 消息持久层接口
 * @author peach
 * @Time 2017-06-08 11:11:49
 */
public interface InformationDao {
	public List<Information> getInformationByRole(@Param("role")String role);
}
