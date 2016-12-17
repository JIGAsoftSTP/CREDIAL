<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<link rel="stylesheet" href="./resources/css/geralStyle.css">
	<link rel="stylesheet" href="./resources/css/reports.css">
</head>
<body id="p2">
	<?php include 'includes/menu.php'; ?> 
	<div class="content-body">
		<div class="content-w-lateral">
			<aside class="">
				<i class="icon-menu"></i>
				<ul class="multiple" id="secondary-menu">
<!--					<li class="active">-->
<!--						<nav>-->
<!--							<span><i class="icon-upload"></i>Clientes</span>-->
<!--							<i class="icon-ctrl"></i>-->
<!--						</nav>-->
<!--						<ul>-->
<!--							<li class="active">Clientes</li>-->
<!--							<li>Créditos Obtidos</li>-->
<!--							<li>Crescimento Homólogo</li>-->
<!--						</ul>-->
<!--					</li>	-->
<!--					<li class="">-->
<!--						<nav>-->
<!--							<span><i class="icon-upload"></i>Créditos</span>-->
<!--							<i class="icon-ctrl"></i>-->
<!--						</nav>-->
<!--						<ul>-->
<!--							<li>Concedidos</li>-->
<!--						</ul>-->
<!--					</li>-->
<!--					<li class="">-->
<!--						<nav>-->
<!--							<span><i class="icon-upload"></i>Cobranças</span>-->
<!--							<i class="icon-ctrl"></i>-->
<!--						</nav>-->
<!--						<ul>-->
<!--							<li>Cobranças</li>-->
<!--						</ul>-->
<!--					</li>	-->
<!--					<li class="">-->
<!--						<nav>-->
<!--							<span><i class="icon-upload"></i>Dívidas</span>-->
<!--							<i class="icon-ctrl"></i>-->
<!--						</nav>-->
<!--						<ul>-->
<!--							<li>Capital / TAEG</li>-->
<!--							<li>Dívidas p/ produto</li>-->
<!--						</ul>-->
<!--					</li>-->
<!--					<li class="">-->
<!--						<nav>-->
<!--							<span><i class="icon-upload"></i>Cheques</span>-->
<!--							<i class="icon-ctrl"></i>-->
<!--						</nav>-->
<!--						<ul>-->
<!--							<li>Cheques</li>-->
<!--						</ul>-->
					</li>			
				</ul>				
			</aside>
			<article class="article-report">
				<div class="search-agency xpert-form float">
					<div class="search-1 flex-form">
						<select name="" class="agency" id="">
							<option value="1">Agencia 1</option>
							<option value="1">Agencia 2</option>
						</select>	
						<select name="" class="param input-4" id="">
							<option value="1">Todos</option>
							<option value="2">Por período</option>
						</select>
					</div>
					<div class="is-periodic xpert-form flex-form">
						<input type="text" placeholder="Data início" class="input-3" id="" />
						<span>à</span>
						<input type="text" placeholder="Data Fim" class="input-3" id="" />
						<span><b>3 meses</b> em comparação</span>
					</div>
					<i class="icon-ctrl sh-srch-agc"></i>
					<i class="icon-pushpin pin"></i>
				</div>
				<div class="report-content">
					
				</div>
			</article>
		</div>
	</div>
</body>
<script type="text/javascript" src="./resources/js/jQuery.js"></script>
<script type="text/javascript" src="resources/js/geralScript.js"></script>
<script type="text/javascript" src="resources/js/controller/logar.js"></script>
<script type="text/javascript" src="./resources/js/controller/menu.js"></script>
<script type="text/javascript" src="resources/js/table.js"></script>
<script type="text/javascript" src="resources/js/reports.js"></script>
<script type="text/javascript" src="resources/js/controller/geral.js"></script>
</html>