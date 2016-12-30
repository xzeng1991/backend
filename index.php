<?php
/**
 * 后台网站首页
 */
define('WEB_ROOT', dirname(__FILE__));
require WEB_ROOT . '/template/common/common.php';

$commonStyle = commonStyle();
echo $commonStyle;
// 输出HTML
//html();
/*
function html(){
    $commonStyle = commonStyle();
    echo $commonStyle;
    $root = $root = $_SERVER['DOCUMENT_ROOT'];
    echo <<<EOF
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>星梦年华</title>
<!-- 通用样式 -->
{$commonStyle}
<link rel="stylesheet" href="{$root}/static/adminlte/plugins/datatables/dataTables.bootstrap.css">
</head>
<body class="hold-transition skin-blue sidebar-mini sidebar-collapse ">
<div class="wrapper">
<!-- header -->
<!-- left -->
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
</div>
<!-- script -->
<!-- alert -->
<!-- DataTables -->
<script src="{$root}/static/adminlte/plugins/datatables/jquery.dataTables.min.js"></script>
<script src="{$root}/static/adminlte/plugins/datatables/dataTables.bootstrap.min.js"></script>
<script src="{$root}/static/plugins/jquery/jquery.validate.min.js"></script>
<!-- daterangepicker -->
<script src="{$root}/static/adminlte/plugins/daterangepicker/moment.min.js"></script>
<script src="{$root}/static/adminlte/plugins/daterangepicker/daterangepicker.js"></script>
<script src="{$root}/static/js/xzinfo.index.1.js"></script>
</body>
</html>
EOF;

}
*/



