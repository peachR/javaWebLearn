<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Welcome</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <!-- Bootstrap 3.3.6 -->
  <link rel="stylesheet" href="/hospital/AdminLTE/bootstrap/css/bootstrap.min.css">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="/hospital/AdminLTE/font-awesome-4.7.0/css/font-awesome.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="/hospital/AdminLTE/ionicons-master/css/ionicons.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="/hospital/AdminLTE/dist/css/AdminLTE.min.css">
  <!-- AdminLTE Skins. Choose a skin from the css/skins
       folder instead of downloading all of them to reduce the load. -->
  <link rel="stylesheet" href="/hospital/AdminLTE/dist/css/skins/_all-skins.min.css">

  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->
</head>
<body>
	<div class="container">
		<div class="row">
			<section class="content-header">
				<h1>
					切换角色
					<small>&nbsp;请选择角色</small>
				</h1>
			</section>
			<div class="col-md-4 col-md-offset-4">
				<div class="panel panel-default login-panel">
					<div class="panel-heading">
						<h3 class="panel-title">Please choose</h3>
					</div>
					<div class="panel-body">
						<div class="form-group">
							<select id="rolesSelect" class="form-control">
							
							</select>
						</div>
						<input id="changeRole" type="button" class="btn btn-lg btn-success btn-block" value="Login" />
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- jquery -->
    <script src="/hospital/jquery/jquery.min.js"></script>
    <!-- main script -->
	<script type="text/javascript" src="/hospital/scripts/MainScripts/changeRole.js"></script>
</body>
</html>