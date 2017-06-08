/**
 * 
 */
$(function(){
	$.ajax({
		type: "POST",
		url: "/hospital/Remember",
		dataType: "json",
		success: function(data){
			if(data.length == 0){
				return;
			}else{
				$("#userName").val(data.userName);
				$("#password").val(data.psw);
				$("input[name='remember']").attr("checked",true);
			}
		}
	});
});

$(function(){
	$("div > input").bind("blur",function(){
		var $error = $("#error");
		$error.text("");
		$(this).removeClass("invalid");
		checkForm($(this));
	});
	$(":button:eq(0)").bind("click",function(){
		var $error = $("#error");
		$error.text("");
		$("div > input").removeClass("invalid");
		if(!checkForm($("div > input[name=email]"))){
			return false;
		}else if(!checkForm($("div > input[name=password]"))){
			return false;
		}else{
			var str = $("#loginFrm").serialize();
			$.ajax({
				url: "/hospital/LoginAjax",
				dataType: "json",
				type: "post",
				//data: "userName=" + $("div > input[name=email]").val() + "&psw=" + $("div > input[name=password]").val(),
				data: str,
				success:function(data){
					//var jsonObj = $.parseJSON(data);
					if(data.length != 0){
						CreateSelectOption(data);
						$("#loginFrm").closest("div").hide(100);
						$("div:hidden").show();
						//var $select = $("select");		
					}else{
						alert("error key");
					}
				}
			});
		}
	});
	$("a.toright").bind("click",function(){
		$(this).parent().parent().hide();
		$("#loginFrm").parent().show();
	})
});

$(function(){
	$(":button:eq(1)").bind("click",function(){
		var role = $("#roles :selected").val();
		window.location.replace("/hospital/user/RoleMain?role=" + role);
	});
});

function checkForm($thisElement){
	var $error = $("#error");
	if($thisElement.val() == ""){
		if($thisElement.attr("name") == "email")
			$("#error").text("用户名不能为空");
		else if($thisElement.attr("name") == "password")
			$("#error").text("密码不能为空");
		$thisElement.addClass("invalid");
		return false
	}else if($thisElement.attr("name") == "password"){
		if(!checkPassword($thisElement)){
			$error.text("请输入6位以上的密码");
			$thisElement.addClass("invalid");
			return false;
		}
	}
	return true;
}

function checkPassword($thisElement){
	var rep = /^\w{6,15}$/;
	return rep.test($thisElement.val());
}

function CreateSelectOption(data){
	var options = ""
	for(var i = 0;i < data.length;++i){
		options += "<option value=" + data[i].name + ">" + data[i].description
		+ "</option>";
	}
	$("#roles").append($(options));
}