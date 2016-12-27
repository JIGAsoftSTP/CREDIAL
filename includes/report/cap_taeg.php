<!DOCTYPE html>
<html lang="pt">
<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="../../resources/css/geralStyle.css">
	<link rel="stylesheet" href="../../resources/css/report.css">
	<link rel="stylesheet" href="../../resources/css/reports/cap_taeg.css">
	
	
</head>
<body>
	<div class="master-content">
		<div class="true-report">
			<section bkg="green">
				<h1>STD<span>100 500 257 123 456.00</span></h1>
				<nav>Total Valor Crédito</nav>
			</section>
			<section bkg="red">
				<h1>STD<span>123 456.00</span></h1>
				<nav>Total Montante em Dívida:</nav>
			</section>
			<section bkg="blue">
				<h1>STD<span>123 456.00</span></h1>
				<nav>Total TAEG</nav>
			</section>

		</div>
		<div class="table-list">
			<nav class="to-report">
				<h2>Lista de ...</h2>
			</nav>
			


			<div class="x-table table-client auto-width">
				<table id="table-capital-taeg" class="selectable" cellpadding="0" cellspacing="0">
					<thead>
						<tr>                    
							<th grow="2">NIF</th>
							<th grow="2">Cliente</th>
							<th grow="5">Nome</th>
							<th grow="3">Estado Crédito</th>
							<th grow="3">Valor Crédito</th>
							<th grow="3">Nº Dossier</th>
							<th grow="2">Pagamento Dívida</th>
							<th grow="2">Crédito TAEG</th>
							<th grow="2">Crédito Inicio</th>
							<th grow="2">Crédito Finalizar</th>
						</tr>
					</thead>
					<tbody id="tabela-taeg-corpo">

					</tbody>
				</table>
			</div>
		</div>
	</div>
</body>
<script type="text/javascript" src="../../resources/js/jQuery.js"></script>
<script type="text/javascript" src="../../resources/js/table.js"></script>
<script type="text/javascript" src="../../resources/js/geralScript.js"></script>
</html>


