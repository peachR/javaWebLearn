/**
 * 用户主界面js文件
 * @author peach
 * @Time 2017-05-26 12:16:38
 */

var usedParent = new Array();//存储已生成的导航栏父节点
var informations = [];//消息json对象

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

/**
 * 绑定注销按钮点击事件
 */
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

/**
 * 创建消息通知栏
 */
$(function(){
	CreateInformationList();
	$("#showmore").bind("click", function(){
		if($(this).text() == "more"){
			$("#information :hidden").fadeIn(360);
			$("#boxFoot").slideDown(300);
			$(this).text("hide");
		}else{
			$("tr.needHide").fadeOut(300);
			$("#boxFoot").slideUp(300);
			$(this).text("more");
		}
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

/**
* 	创建消息栏
* **/
function CreateInformationList(){
	//取得可见消息标题
	$.ajax({
		type: "POST",
		url: "/hospital/user/informationAjax",
		dataType: "json",
		success: function(data){
			if(data != undefined){
				informations = data;
				var page = data.length / 10;
				var sum = (page - parseInt(page)) == 0 ? parseInt(page) : parseInt(page) + 1;
				$("#sumPage").val(sum);
				createInformation(data, 1, true);
				if(data.length > 10){
					nextPage();
					lastPage();					
				}
			}
		}
	});
}

/**
 * 
 * @param data 消息json对象
 * @param page 生成第几页
 * @param isHide 是否影藏后5行
 * @returns
 */
function createInformation(data, page, isHide){
	var $tbody = $("#information > tbody");
	var begin = (page - 1) * 10;
	var end = (page * 10 - 1) < (data.length - 1) ? (page * 10) : data.length;
	var count = isHide ? 0 : -11;
	var needHide = 0;
	for(var i = begin;i < end;++i){
		var $titleTd = $("<td><a href=#>" + data[i].title + "</a></td>");
		var $timeTd = $("<td>" + data[i].releaseTime.split(" ")[0] + "</td>");
		var $tr = $("<tr></tr>");
		if(count > 4){
			$tr.addClass("tohidden");
		}
		if(needHide >4){
			$tr.addClass("needHide");
		}
		$tr.append($titleTd).append($timeTd);
		$tbody.append($tr);
		++count;
		++needHide;
	}
}

/**
 * 导航到某页
 * @param index 页码
 * @param isHide 生成时是否影藏后5行
 * @returns
 */
function toOnePage(index, isHide){
	$("#information tr:not(:eq(0))").remove();
	createInformation(informations, index, isHide);//line 234
	$("#currentPage").val(index);//修改当前页码
}
//4个翻页事件处理
/**
 * 激活前往首页按钮
 * @returns
 */
function firstPage(){
	var currentPage = $("#currentPage").val();
	$("#firstPage").removeClass("disabled")
	.bind("click", function(){
		toOnePage(1, false);//导航到第一页
		$(this).addClass("disabled").unbind("click");
		$("#previousPage").addClass("disabled").unbind("click");
		var sumPage = $("#sumPage").val();
		if(sumPage == currentPage){
			lastPage();
			nextPage();
		}
	});	   
}

/**
 * 激活上一页
 * @returns
 */
function previousPage(){
	$("#previousPage").removeClass("disabled")
	.bind("click", function(){
		var currentPage = $("#currentPage").val();
		toOnePage(parseInt(currentPage) - 1,false);
		if(parseInt(currentPage) == 2){
			$(this).addClass("disabled")
			.unbind("click");
			$("#firstPage").addClass("disabled")
			.unbind("click");
		}
		var sumPage = $("#sumPage").val();
		if(sumPage == currentPage){
			lastPage();
			nextPage();
		}
	});
}

/**
 * 激活下一页
 * @returns
 */
function nextPage(){
	var currentPage = $("#currentPage").val();
	var sumPage = $("#sumPage").val();
	$("#nextPage").removeClass("disabled")
	.bind("click", function(){
		toOnePage(parseInt(currentPage) + 1, false);
		if((parseInt(currentPage) + 1) == parseInt(sumPage)){
			$(this).addClass("disabled")
			.unbind("click");
			$("#lastPage").addClass("disabled")
			.unbind("click");
		}
		if(currentPage == 1){
			firstPage();
			previousPage();
		}
	});
}

/**
 * 激活末页
 * @returns
 */
function lastPage(){
	var currentPage = $("#currentPage").val();
	var sumPage = $("#sumPage").val();
	$("#lastPage").removeClass("disabled")
	.bind("click", function(){
		toOnePage(parseInt(sumPage), false);
		$(this).addClass("disabled")
		.unbind("click");
		$("#nextPage").addClass("disabled")
		.unbind("click");
		firstPage();
		previousPage();
	});
}