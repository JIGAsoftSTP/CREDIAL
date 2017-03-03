<!DOCTYPE html>
<html lang="pt">
<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="../../resources/css/geralStyle.css">
	<link rel="stylesheet" href="../../resources/css/report.css">
	<link rel="stylesheet" href="../../resources/css/reports/cap_taeg.css">
	<link rel="stylesheet" href="../../resources/css/reports/report-all.css">
	
	
</head>
<body>
	<div class="master-content">
		<div class="true-report">
			<section bkg="blue" class="first-section">
				<h1>STD Atual<span></span></h1>
				<h1>STD Passado<span></span></h1>
				<nav>Total Crédito Concedido</nav>
			</section>
			<section bkg="red" class="second-section">
				<h1>STD Atual<span></span></h1>
				<h1>STD Passado<span></span></h1>
				<nav>Total Montante em Dívida</nav>
			</section>
			<section bkg="green" class="third-section">
				<h1>STD Atual<span></span></h1>
				<h1>STD Passado<span></span></h1>
				<nav>Total Valor Pago</nav>
			</section>

		</div>
		<div class="table-list">
			<nav class="to-report">
				<h2></h2>
			</nav>
			


			<div class="x-table table-client auto-width">
				<table id="tabela-relatorio-divida" class="selectable" cellpadding="0" cellspacing="0">
					<thead>
						<tr>
							<th grow="1.5">NIF</th>
							<th grow="4">Cliente</th>
							<th grow="3">Valor Crédito</th>
							<th grow="3">Montante em Dívida</th>
							<th grow="3">Crédito Valor Pago</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>
		</div>
	</div>
    <?php include "../process.html"; ?>
</body>
<script type="text/javascript" src="../../resources/js/jQuery.js"></script>
<script type="text/javascript" src="../../resources/js/table.js"></script>
<script type="text/javascript" src="../../resources/js/geralScript.js"></script>
<script type="text/javascript" src="../../resources/js/reports/report.js"></script>
</html>


