<!DOCTYPE html>
<html lang="pt">
<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="../../resources/css/geralStyle.css">
	<link rel="stylesheet" href="../../resources/css/report.css">
	<link rel="stylesheet" href="../../resources/css/reports/report.css">
	<link rel="stylesheet" href="../../resources/css/reports/cheq.css">
	
	
</head>
<body>
	<div class="master-content">
		
		<ul class="filter-type-cheq">
			<li type="entrados" class="bt-table-action active">Entrados</li>
			<li type="porcobrar" class="bt-table-action">Por cobrar</li>
			<li type="cobrados" class="bt-table-action">Cobrados</li>
			<li class="bt-table-action">Todos</li>
		</ul>
		<div class="table-list">
			<nav class="to-report">
				<h2>Lista de cheques</h2>
			</nav>
			


			<div class="x-table table-client auto-width">
				<table id="tabela-relatorio-cheque" class="selectable" cellpadding="0" cellspacing="0">
					<thead>
						<tr>                    
							<th grow="2">Ano Atual</th>
							<th grow="2">Ano Passado</th>
							<th grow="2">Diferença</th>
							<th grow="1">Resultado</th>
						</tr>
					</thead>
					<tbody id="tabela-cheque-corpo">
					</tbody>
				</table>
			</div>
		</div>
	</div>
</body>
<script type="text/javascript" src="../../resources/js/jQuery.js"></script>
<script type="text/javascript" src="../../resources/js/table.js"></script>
<script type="text/javascript" src="../../resources/js/geralScript.js"></script>
<script type="text/javascript" src="../../resources/js/reports/report.js"></script>
</html>


