<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<link rel="stylesheet" href="./resources/css/geralStyle.css">
	<link rel="stylesheet" href="./resources/css/xMenu.css">
	<link rel="stylesheet" href="./resources/css/admin.css">
</head>
<body id="p4">
	<?php include 'includes/menu.php'; ?> 
	<div class="content-body">
		<div class="content-w-lateral">
			<aside>			
				<i class="icon-menu"></i>
				<ul class="single">
					<li class="active"><i class="icon-cogs"></i><span>Entidades</span></li>
					<li urldata="includes/admin/rate.php"><i class="icon- icon-stats-bars"></i><span>Taxa</span></li>
					<li urldata="includes/admin/insurance.php"><i class="icon-shield"></i><span>Seguros</span></li>
					<li urldata="includes/admin/bank.php"><i class="icon-office"></i><span>Banco</span></li>
					<li class="li-item-cheq" urldata="includes/admin/cheq"><i class="icon-file-text"></i><span>Cheque</span></li>
					<li id="section-user"><i class="icon-user"></i><span>Utilizador</span></li>
					<li><i class="icon-home3"></i><span>Agência</span></li>
				</ul>
			</aside>
			<article class="article-admin">
				
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