<!DOCTYPE html>
<html lang="pt">
<head>
	<meta charset="UTF-8">
	<!--<script type="text/javascript" src="../../resources/js/admission.js"></script>-->
	<link rel="stylesheet" href="./resources/css/geralStyle.css">
	<link rel="stylesheet" href="./resources/css/reports/report-all.css">
	<link rel="stylesheet" href="./resources/css/report.css">
	<link rel="stylesheet" href="./resources/css/reports/report.css">
	<link rel="stylesheet" href="./resources/css/reports/cbrs.css">
	
</head>
<body>
	<div class="master-content">
		<div class="x-table table-cbrs auto-width">
			<table id="tabela-cobrancas" class="" cellpadding="0" cellspacing="0">
				<thead>
					<tr>                    

						<th grow="1" orderBy>NIF</th>
						<th grow="3.5" orderBy>Cliente</th>
						<th grow="2" orderBy>Valor Reembolso</th>
						<th grow="2" orderBy>Nº Doc. Real</th>
						<th grow="2" orderBy>Nº Doc. Previsto</th>
						<th grow="1" grow2="0">Data Real</th>
						<th grow="1" grow2="0" >Data Prevista</th>
					</tr>
				</thead>
				<tbody id="report-cobrancas-corpo">
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


