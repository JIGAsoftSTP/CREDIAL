<!DOCTYPE html>
<html lang="pt">
<head>
	<meta charset="UTF-8">
	<!--	<script type="text/javascript" src="../../resources/js/admission.js"></script>-->
	<link rel="stylesheet" href="./resources/css/geralStyle.css">
	<link rel="stylesheet" href="./resources/css/report.css">
	<link rel="stylesheet" href="./resources/css/reports/report-all.css">
	
	
</head>
<body>
	<div class="master-content">

		<div class="x-table table-client auto-width">
			<table id="table-report-growth" class="selectable" cellpadding="0" cellspacing="0">
				<thead>
					<tr>                    
						<th grow="2" orderBy>NIF</th>
						<th grow="5" orderBy>Cliente</th>
						<th grow="2" orderBy>Localidade</th>
						<th grow="2">Ano atual</th>
						<th grow="2">Ano Passado</th>
						<th grow="2" orderBy>Crescimento</th>
					</tr>
				</thead>
				<tbody id="tabelaCresHCorpo">
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
<script src="./resources/js/geralScript.js" ></script>
</html>


