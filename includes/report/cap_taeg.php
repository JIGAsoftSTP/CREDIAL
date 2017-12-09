<!DOCTYPE html>
<html lang="pt">
<head>
	<meta charset="UTF-8">
	<!--	<script type="text/javascript" src="../../resources/js/admission.js"></script>-->
	<link rel="stylesheet" href="../../resources/css/geralStyle.css">
	<link rel="stylesheet" href="../../resources/css/report.css">
	<link rel="stylesheet" href="../../resources/css/reports/report-all.css">
	<link rel="stylesheet" href="../../resources/css/reports/cap_taeg.css">
	
	
</head>
<body>
	<div class="master-content">
		<div class="true-report">
			<section bkg="green" class="first-section">
				<h1>STD Atual<span></span></h1>
				<h1>STD Passado<span></span></h1>
				<nav>Total Valor Crédito</nav>
			</section>
			<section bkg="red" class="second-section">
				<h1>STD Atual<span></span></h1>
				<h1>STD Passado<span></span></h1>
				<nav>Total Montante em Dívida:</nav>
			</section>
			<section bkg="blue" class="third-section">
				<h1>STD Atual<span></span></h1>
				<h1>STD Passado<span></span></h1>
				<nav>Total TAEG</nav>
			</section>

		</div>

		<div class="x-table table-client auto-width">
			<table id="table-capital-taeg" class="selectable" cellpadding="0" cellspacing="0">
				<thead>
					<tr>                    
						<th grow="2" orderBy>Nº Dossier</th>
						<th grow="1" orderBy>NIF</th>
						<th grow="3.5" orderBy>Cliente</th>
						<th grow="2" orderBy>Valor Crédito</th>
						<th grow="2" orderBy>Montante Dívida</th>
						<th grow="1.5" orderBy>Crédito TAEG</th>
						<th grow="1">Data Inicio</th>
						<th grow="1">Data Fim</th>
						<th grow="1" orderBy>Estado Crédito</th>
					</tr>
				</thead>
				<tbody id="tabela-taeg-corpo">

				</tbody>
			</table>
		</div>
	</div>
	<?php include "../process.html"; ?>
</body>
<!--<script type="text/javascript" src="../../resources/js/jQuery.js"></script>
<script type="text/javascript" src="../../resources/js/table.js"></script>
<script type="text/javascript" src="../../resources/js/geralScript.js"></script>-->
</html>


