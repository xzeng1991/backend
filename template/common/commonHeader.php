<header class="main-header">
	<a href="${request.contextPath}/" class="logo">
		<span class="logo-mini"><b>M</b>INI</span>
		<span class="logo-lg"><b>星梦年华</b>管理中心</span>
	</a>
	<nav class="navbar navbar-static-top" role="navigation">
		<a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button"><span class="sr-only">切换导航</span></a>
        	<div class="navbar-custom-menu">
			<ul class="nav navbar-nav">
				<li class="dropdown user user-menu">
                   <a href=";" id="logoutBtn" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                   		<span class="hidden-xs">注销</span>
                    </a>
				</li>
			</ul>
		</div>
	</nav>
</header>
<?php
define('IA_ROOT', str_replace("\\", '/', dirname(dirname(__FILE__))));