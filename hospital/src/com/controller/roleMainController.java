package com.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.model.Information;
import com.model.Navigation;
import com.model.User;
import com.service.InformationService;
import com.service.NavigationService;
import com.service.UserService;

/**
 * 角色主界面控制器
 * @author peach
 * @Time 2017-05-25 13:23:17
 */
@Controller
@RequestMapping(value="/user")
public class roleMainController {
	//导航服务层对象
	@Autowired
	private NavigationService navigationService;
	//用户服务层对象
	@Autowired
	private UserService userService;
	//消息服务层对象
	@Autowired
	private InformationService informationService;
	
	/**
	 * 获取角色对应所有功能导航
	 * @param request
	 * @param response
	 * @return 该角色功能导航
	 */
	@RequestMapping(value="/GetNavAjax")
	@ResponseBody
	public Map<String,List<Navigation> > handlerGetNavAjax(HttpServletRequest request, HttpServletResponse response){
		String roleName = ((User)request.getSession().getAttribute("loginUser")).getCurrentRole();
		List<Navigation> nav = navigationService.getNavByRoleName(roleName);
		List<Navigation> parentNav = navigationService.getParentNav();
		Map<String,List<Navigation> > json = new HashMap<>();
		json.put("nav", nav);
		json.put("parent", parentNav);
		return json;
	}
	
	/**
	 * 跳转切换角色界面
	 * @return 切换角色界面视图
	 */
	@RequestMapping(value="/changeRole")
	public String tochangeRole(){
		return "Main/changeRole";
	}
	
	/**
	 * 注销跳转到登录界面
	 * @param request
	 * @return 登录界面视图
	 */
	@RequestMapping(value="/signOut")
	public void toLogin(HttpServletRequest request){
		HttpSession session = request.getSession();
		//session.removeAttribute("loginUser");
		User user = (User)session.getAttribute("loginUser");
		userService.updateOnline(user, (byte)0);
		session.invalidate();
	}
	
	/**
	 * 返回当前用户角色可见消息
	 * @param request
	 * @return 角色消息json对象
	 */
	@RequestMapping(value="/informationAjax", method=RequestMethod.POST)
	@ResponseBody
	public List<Information> handlerInformationAjax(HttpServletRequest request){
		String role = ((User)request.getSession().getAttribute("loginUser")).getCurrentRole();
		List<Information> test = informationService.getInformationByRole(role);
		return informationService.getInformationByRole(role);
	}
}
