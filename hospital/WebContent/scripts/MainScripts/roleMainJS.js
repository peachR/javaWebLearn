/**
 * 用户主界面js文件
 * @author peach
 * @Time 2017-05-26 12:16:38
 */

var usedParent = new Array();//存储已生成的导航栏父节点

$(function(){
  //根据角色生成对应导航栏
  CreateRoleNav();
  $("#navigation").bind("click",function(evt){
	 var which = evt.target;
	 var $li = $(which).closest("li");
	 var $ul = $li.children("ul");
	 if($ul.length == 0){
		 return;
	 }
	 if($ul.is(":hidden")){
		 $ul.slideDown(360);
		 $li.siblings("li").children("ul").slideUp(360);
		 $li.find("span.pull-right-container > i").removeClass("fa-angle-left").addClass("fa-angle-down");
	 }else{
		 $ul.slideUp(360,function(){
			 $li.find("span.pull-right-container > i").removeClass("fa-angle-down").addClass("fa-angle-left");
		 });
	 }
  });
});

$(function(){
	$("#signOut").bind("click", function(){
		$.ajax({
			type: "GET",
			url: "/hospital/user/signOut"
		});
		window.location.replace("/hospital/");
		return false;
	});
});
/* **
 *获取urlGet请求参数
 *@param name 请求参数名
 *@return 请求参数值不存在时返回空
 * **/
function GetQuertString(name){
  var reg = new RegExp("(^|&)" + name + "=([^&]*)($|&)");//
  var parameter = window.location.search.substr(1).match(reg);
  if(parameter != null){
    return parameter[2];
  }
  else {
    return null;
  }
}

//生成对应角色导航栏
function CreateRoleNav(){
  var role = GetQuertString("role");
  if(role == null)
    return false;
  GetNav(role);
}

/* **
 *根据角色获取导航
 *@param role 角色
 * **/
function GetNav(role){
  $.ajax({
    type: "GET",
    url: "/hospital/user/GetNavAjax",
    dataType: "json",
    success: function(jsonObj){
      if(jsonObj.length != 0){
        CreateNav(jsonObj);//根据返货导航的json对象生成导航栏
      }
    }
  })
}

/* **
 *根据返货导航的json对象生成导航栏
 *@param jsonObj 导航栏信息json对象
 * **/
function CreateNav(jsonObj){
  var $ul = $("#navigation");
  var navigation = jsonObj.nav;
  var father = jsonObj.parent;
  for(var i = 0; i< navigation.length;++i){
	  if(navigation[i].node == 0){
		  var $li = $("<li><a href=" + navigation[i].url + " ><i></i><span>" 
				  + navigation[i].name + "</span></a><input type=hidden value="
				  + navigation[i].id +" /></li>");
		  $li.find("i").addClass(navigation[i].icon);
		  $ul.append($li);
	  }else{
		  var $parent;
		  //父节点没有出现过
		  if(!findInArray(navigation[i].parent)){
			  $parent = CreateParent(navigation[i],father);
			  $ul.append($parent);
			  usedParent.push(navigation[i].parent);
		  }else{
			  InsertToParent(navigation[i]);		  
		  }
	  }
  }
}

/* **
 * 插入已有父节点
 * @param navigation 带插入节点json对象
 * **/
function InsertToParent(navigation){
	var $input = $("#navigation > li").children("input");
	var input;
	for(var i = 0;i < $input.length; ++i){
		if($input[i].value == navigation.parent){
			input = $input[i];
			break;
		}
	}
	var $ul = $(input).next("ul");
	var $li = $("<li><a href=" + navigation.url + " ><i></i>"
			+ navigation.name + "</a></li>");
	$li.find("i").addClass(navigation.icon);
	$ul.append($li);
}

/* **
*查找父节点是否已经插入
*@param pid 父节点id
* **/
function findInArray(pid){
	for(var i = 0;i < usedParent.length;++i){
		if(pid == usedParent[i])
			return true;
	}
	return false;
}

/* **
* 创建第一次出现的父节点已经该子节点
* @param navigation 子节点对象
* @return 创建好的节点
* **/
function CreateParent(navigation, father){
	var parentObj = GetParent(navigation.parent, father);
	if(parentObj == null){
		return null;
	}
	var $parent = $("<li class=treeview><a href=#><i></i><span>"
			+ parentObj.name + "</span><span class=pull-right-container>"
			+ "<i></i></span></a><input type=hidden value="
			+ parentObj.id + " />" 
			+ "<ul class=treeview-menu></ul></li>");
	$parent.find("i:eq(0)").addClass(parentObj.icon);
	$parent.find("i:eq(1)").addClass("fa fa-angle-left pull-right");
	var $ul = $parent.find("ul");
	var $li = $("<li><a href=" + navigation.url 
			+ " ><i></i>" + navigation.name + "</a></li>");
	$li.find("i").addClass(navigation.icon);
	$ul.append($li);
	return $parent;
}

/* **
* 根据id返回父节点对象
* @param fid 父节点id
* @param father 所有父节点对象
* @return 父节点对象
* **/
function GetParent(fid, father){
	for(var i = 0;i < father.length;++i){
		if(fid == father[i].id)
			return father[i];
	}
	return null;
}