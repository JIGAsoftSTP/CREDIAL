<!DOCTYPE html>
<html lang="pt">
<head>
	<meta charset="UTF-8">
	<!--	<script type="text/javascript" src="../../resources/js/admission.js"></script>-->
	<link rel="stylesheet" href="./resources/css/reports/cap_taeg.css">
	
	
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
            <div class="pagination flex h-ct" id="relatorio_pagination">
                <div class="icon-backward2">
                </div>
                <div id="relatorio_pagination-add" class="icon-forward3">
                </div>
            </div>
		</div>
	</div>
	<?php include "../process.html"; ?>
</body>
<script type="text/javascript" src="resources/js/reports/report.js"></script>
</html>


