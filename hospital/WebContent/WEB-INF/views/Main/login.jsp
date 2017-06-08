<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Welcome</title>
<!-- Bootstrap Core CSS -->
    <link href="startbootstrap/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- MetisMenu CSS -->
    <link href="startbootstrap/vendor/metisMenu/metisMenu.min.css" rel="stylesheet">

    <!-- DataTables CSS -->
    <link href="startbootstrap/vendor/datatables-plugins/dataTables.bootstrap.css" rel="stylesheet">

    <!-- DataTables Responsive CSS -->
    <link href="startbootstrap/vendor/datatables-responsive/dataTables.responsive.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="startbootstrap/dist/css/sb-admin-2.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="startbootstrap/vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    
    <link href="Css/MainCss/login.css" rel="stylesheet" />
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col-md-4 col-md-offset-4">
				<div class="panel panel-default login-panel">
					<span id="error"></span>
					<div class="panel-heading">
						<h3 class="panel-title">Please Login</h3>
					</div>
					<div class="panel-body">
						<form id="loginFrm" method="post" action="">
							<div class="form-group">
								<input id="userName" class="form-control" placeholder="E-mail" name="email" type="text" />
							</div>
							<div class="form-group">
								<input id="password" class="form-control" placeholder="Password" name="password" type="password" value="" />
							</div>
							<div class="checkbox">
                                <label>
                                    <input name="remember" type="checkbox" />Remember Me
                                </label>
                            </div>
                            <input type="button" class="btn btn-lg btn-success btn-block" value="Login"></a>
						</form>
					</div>
					<div class="panel-body tohidden">
						<div class="form-group">
							<select id="roles" class="form-control">
							
							</select>
							<a href="#" class="toright">back</a>
							<input type="button" class="btn btn-lg btn-success btn-block" value="Login" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<script src="/hospital/jquery/jquery.min.js"></script>
	<script src="/hospital/scripts/MainScripts/loginJS.js"></script>
</body>
</html>