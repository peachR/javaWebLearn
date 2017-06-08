package com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Dao.InformationDao;
import com.model.Information;

/**
 * 消息服务层
 * @author peach
 * @Time 2017-06-08 11:23:46
 */
@Service
public class InformationService {
	@Autowired
	private InformationDao informationDao;
	
	public List<Information> getInformationByRole(String role){
		return informationDao.getInformationByRole(role);
	}
}
