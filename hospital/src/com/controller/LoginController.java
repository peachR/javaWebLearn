package com.controller;
/**
 * 登录模块控制器
 * @author peach
 * @Time 2017-05-25 15:52:55
 */

import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.model.Role;
import com.model.User;
import com.service.RoleService;
import com.service.UserService;
/**
 * 登录控制器
 * @author peach
 *
 */
@Controller
@RequestMapping("/")
public class LoginController {
	@Autowired
	private UserService userService;
	@Autowired
	private RoleService roleService;
	
	/**
	 * 登录界面作为主入口拦截
	 * @return 登录视图
	 */
	@RequestMapping(value="", method=RequestMethod.GET)
	public String toLogin(){		
		return "Main/login";
	}
	
	/**
	 * 处理记住用户请求
	 * @param request
	 * @return 如果有cookie记录返回用户名密码
	 */
	@RequestMapping(value="Remember")
	@ResponseBody
	public Map<String,String> handlerRememberAjax(HttpServletRequest request){
		Cookie[] cookies = request.getCookies();
		Map<String, String> list = new HashMap<>();
			for(Cookie cookie : cookies){
				if(cookie.getName().equals("userName"))
					list.put("userName", cookie.getValue());
				else if(cookie.getName().equals("password"))
					list.put("psw", cookie.getValue());
			}
		return list;
	}
	
	/**
	 * 登录账号信息AJAX处理
	 * @param request
	 * @param response
	 * @return 登录用户的角色json
	 */
	@RequestMapping(value="LoginAjax", method={RequestMethod.POST, RequestMethod.GET})
	@ResponseBody
	public List<Role> handlerAjax(HttpServletRequest request, HttpServletResponse response){
		String number = request.getParameter("email");
		String psw = request.getParameter("password");
		String remember = request.getParameter("remember");
		User user = new User();
		user.setNumber(number);
		user.setPassword(psw);
		User ruser = userService.getUser(user);
		if(ruser != null){
			HttpSession session = request.getSession();
			session.setAttribute("loginUser", ruser);
			this.userService.updateOnline(ruser, (byte) 1);
			if(remember != null){
				Cookie cookieUserName = new Cookie("userName", number);
				Cookie cookiePassword = new Cookie("password", psw);
				cookieUserName.setMaxAge(31 * 24 * 3600);
				cookiePassword.setMaxAge(31 * 24 * 3600);
				response.addCookie(cookieUserName);
				response.addCookie(cookiePassword);
			}else{
				Cookie cookieUserName = new Cookie("userName", null);
				cookieUserName.setMaxAge(0);
				Cookie cookiePassword = new Cookie("password", null);
				cookiePassword.setMaxAge(0);
				response.addCookie(cookiePassword);
				response.addCookie(cookieUserName);
			}
			return ruser.getRoles();
		}else{
			return new LinkedList<Role>();
		}
	}
	
	/**
	 * 用户登录主界面
	 * @param request
	 * @return
	 */
	@RequestMapping(value="user/RoleMain")
	public String toRoleMain(HttpServletRequest request, ModelMap map){
		String role = request.getParameter("role");
		User user = (User)request.getSession().getAttribute("loginUser");
		user.setcurrentRole(role);
		String description = roleService.getRole(role).getDescription();
		user.setRoleDescription(description);
		map.put("age", 23);		
		return "Main/roleMain";
	}
}
