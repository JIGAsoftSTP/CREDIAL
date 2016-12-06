<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<link rel="stylesheet" href="./resources/css/geralStyle.css">
	<link rel="stylesheet" href="./resources/css/xMenu.css">
	<link rel="stylesheet" href="./resources/css/table.css">
	<link rel="stylesheet" href="./resources/css/fonts.css">
	<link rel="stylesheet" href="./resources/css/adobe-clean.css">
	<link rel="stylesheet" href="./resources/css/admin.css">
</head>
<body id="p4">
	<?php include 'includes/menu.php'; ?> 
	<div class="content-body">
		<div class="content-w-lateral">
			<aside class="single">
			
				<i class="icon-menu"></i>
				<ul class="lateral-menu">
					<li class="active"><i class="icon-cogs"></i><span>Entidades</span></li>
					<li><i class="icon- icon-stats-bars"></i><span>Taxa</span></li>
					<li><i class="icon-shield"></i><span>Seguros</span></li>
					<li><i class="icon-office"></i><span>Banco</span></li>
					<li class="li-item-cheq"><i class="icon-file-text"></i><span>Cheque</span></li>
					<li id="section-user"><i class="icon-user"></i><span>Utilizador</span></li>
					<li><i class="icon-home3"></i><span>Agência</span></li>
				</ul>
			</aside>
			<article class="article-admin">
				<nav class="first">
					<h1 class="title">Entidades</h1>
					<span class="add-more default">+</span>
				</nav>

				<section class="entity active">
					<?php include './includes/admin/entity.php'; ?> 
				</section>
				<section class="taxa">	
					<?php include './includes/admin/rate.php'; ?> 
				</section>
				<section class="seguro">
					<?php include './includes/admin/insurance.php'; ?> 
				</section>	
				<section class="bank">
					<?php include './includes/admin/bank.php'; ?> 
					
				</section>
				<section class="cheq">
					<?php include './includes/admin/cheq.php'; ?> 
				</section>
				<section class="adm-user">
					<?php include './includes/admin/user.php'; ?> 
				</section>
				<section class="agency">
					<?php include './includes/admin/agency.php'; ?> 
				</section>	
			</article>
		</div>
	</div>
	
</body>
<script type="text/javascript" src="resources/js/jQuery.js"></script>
<script type="text/javascript" src="resources/js/geralScript.js"></script>
<script type="text/javascript" src="resources/js/xMenu.js"></script>
<script type="text/javascript" src="resources/js/table.js"></script>
<script type="text/javascript" src="resources/js/admin.js"></script>
<script type="text/javascript" src="resources/js/controller/user.js"></script>
<script type="text/javascript" src="resources/js/controller/geral.js"></script>
<script type="text/javascript" src="resources/js/controller/utilizador.js"></script>
<script type="text/javascript" src="resources/js/controller/logar.js"></script>
<script type="text/javascript" src="resources/js/controller/Administracao.js"></script>
</html>