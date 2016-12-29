<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>星梦年华</title>
<?php include 'template/common/commonStyle.php';?>
<link rel="stylesheet" href="static/adminlte/plugins/datatables/dataTables.bootstrap.css">
</head>
<body class="hold-transition skin-blue sidebar-mini <#if cookieMap?exists && "off" == cookieMap["adminlte_settings"].value >sidebar-collapse</#if>">
	<div class="wrapper">
	<!-- header -->
	<?php include 'template/common/commonHeader.php';?>
	<!-- left -->
	<?php include 'template/common/commonLeft.php';?>
	<!-- Content Wrapper. Contains page content -->
	<div class="content-wrapper">
		<!-- Content Header (Page header) -->
		<section class="content-header">
			<h1>星梦年华<small>管理主页</small></h1>
		</section>
		<!-- Main content -->
		<section class="content">
			<div class="row">
			</div>
			<div class="row">
				<div class="col-xs-12">
					<div class="box">
					欢迎您进入进入星梦年华的管理主页！
					</div>
				</div>
			</div>
		</section>
	</div>
	
	<!-- footer -->
	<?php include 'template/common/commonFooter.php';?>
</div>

<?php include 'template/common/commonScript.php';?>
<?php include 'template/common/commonAlert.php';?>
<!-- DataTables -->
<script src="static/adminlte/plugins/datatables/jquery.dataTables.min.js"></script>
<script src="static/adminlte/plugins/datatables/dataTables.bootstrap.min.js"></script>
<script src="static/plugins/jquery/jquery.validate.min.js"></script>
<!-- daterangepicker -->
<script src="static/adminlte/plugins/daterangepicker/moment.min.js"></script>
<script src="static/adminlte/plugins/daterangepicker/daterangepicker.js"></script>
<script src="static/js/xzinfo.index.1.js"></script>
</body>
</html>