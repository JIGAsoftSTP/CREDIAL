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
				<ul class="multiple" id="secondary-menu"></ul>				
			</aside>
			<article class="article-report ">
				<div class="content">
					<div class="header-report">
						<h1 class="title-report">Clientes</h1>
						<span class="funtionality">

							<i class="icon-file-pdf" title="Exportar para PDF"></i>
							<i class="icon-file-excel" title="Exportar para Excel"></i>
							<separator></separator>
							<i class="icon-filter callFilter"></i>
						</span>
						
					</div>
					<div class="report-content">
						<!-- ALL PAGE HERE! -->
					</div>

				</div>

				<div class="filter-report xpert-form float">
					<nav class="ctrls">
						<i class="icon-pushpin pin"></i>
						<i class="icon-arrow-right2 hide-filter"></i>
					</nav>
					<div class="add-section-filter">
						<select name="" id="report-entities">
							<option value="">(Selecione)</option>
							<option value="100" identifier="agency" filter="Agência">Agência</option>
							<option value="50" filter="Periodo">Periodo</option>
						</select>
						<b></b>
						
					</div>
					<div class="periodic">
						<nav><i class="icon-checkbox-unchecked"><span> Filtrar por periodo de tempo</span></i> <i class="icon-ctrl"></i></nav>

						<div class="prd-enabled">
							<input type="text" placeholder="Data Inicial">
							<input type="text" placeholder="Data Final">
							<p><span>5</span> em comparação</p>
						</div>
					</div>
					<div class="filter-added">
						<nav> Filtro selecionado<i class="icon-ctrl show"></i></nav>

						
					</div>
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
<script type="text/javascript" src="resources/js/controller/report.js"></script>
</html>