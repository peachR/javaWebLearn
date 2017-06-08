/**
 * 
 * @author peach
 * @Time 2017-05-30 13:47:24
 */

$(function(){
	CreateSelect();//创建角色选择下拉菜单
	$("#changeRole").bind("click",function(evt){
		evt.preventDefault();
		var role = $(":selected").val();
		$.ajax({
			type: "GET",
			url: "/hospital/user/changeRole/SetUserRoleAjax?role=" + role,
			async: false
		});
		window.location.href = "/hospital/user/RoleMain?role=" + role;
	});
});

function CreateSelect(){
	GetRoles();//ajax获取角色信息生成下拉菜单
}

function GetRoles(){
	$.ajax({
		type: "GET",
		dateType: "json",
		url: "/hospital/user/changeRole/GetRolesAjax",
		success: function(data){
			var $roles = $("#rolesSelect");
			for(var i = 0;i <data.length;++i){
				$roles.append("<option value=" 
						+ data[i].name 
						+ ">" + data[i].description 
						+ "</option>");
			}
		}
	});
}