package com.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.model.Role;
import com.model.User;

/**
 * 角色切换控制器
 * @author peach
 * @Time 2017-05-31 18:13:44
 */

@Controller
@RequestMapping(value="/user/changeRole")
public class ChangeRoleController {
	/**
	 * 响应获取登录用户角色请求
	 * @param request jsp request对象
	 * @return 拥有角色
	 */
	@RequestMapping(value="/GetRolesAjax")
	@ResponseBody
	public List<Role> GetRolesAjax(HttpServletRequest request){
		User loginUser = (User)request.getSession().getAttribute("loginUser");
		List<Role> roles = loginUser.getRoles();
		return roles;
	}
	
	@RequestMapping(value="/SetUserRoleAjax")
	public void SetUserRoleAjax(HttpServletRequest request){
		String role = request.getParameter("role");
		User loginUser = (User)request.getSession().getAttribute("loginUser");
		loginUser.setcurrentRole(role);
	}
}
