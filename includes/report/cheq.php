<!DOCTYPE html>
<html lang="pt">
<head>
	<meta charset="UTF-8">
	<!--<script type="text/javascript" src="../../resources/js/admission.js"></script>-->
	<link rel="stylesheet" href="./resources/css/geralStyle.css">
	<link rel="stylesheet" href="./resources/css/report.css">
	<link rel="stylesheet" href="./resources/css/reports/report-all.css">
	<link rel="stylesheet" href="./resources/css/reports/report.css">
	<link rel="stylesheet" href="./resources/css/reports/cheq.css">
	
	
</head>
<body>
	<div class="master-content">
		
		<ul class="filter-type-cheq">
			<li type="entrados" class="bt-table-action active" id="1">Entrados</li>
			<li type="porcobrar" class="bt-table-action" id="2">Por cobrar</li>
			<li type="cobrados" class="bt-table-action" id="3">Cobrados</li>
			<li class="bt-table-action" id="4">Carteira</li>
		</ul>
		<div class="x-table table-client auto-width">
			<table id="tabela-relatorio-cheque" class="selectable" cellpadding="0" cellspacing="0">
				<thead>
					<tr>
						<th grow="1" grow2="0">Data Registo</th>
						<th grow="2" grow2="0">Débito</th>
						<th grow="2" grow2="0">Crédito</th>
						<th grow="2" grow2="0">Banco</th>
						<th grow="1" grow2="0">Agência</th>

						<th grow="0" grow2="1">NIF</th>
						<th grow="0" grow2="2">Cliente</th>
						<th grow="0" grow2="2">Nº Doc. Pagamento</th>
						<th grow="0" grow2="2">Valor Cheque Reembolso</th>
						<th grow="0" grow2="1">Data Previsto</th>
						<th grow="0" grow2="1">Banco</th>
						<th grow="0" grow2="1">Data Endossado</th>
					</tr>
				</thead>
				<tbody id="tabela-cheque-corpo">
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
</html>


