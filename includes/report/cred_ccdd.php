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
				<table id="table-report-credit" class="" cellpadding="0" cellspacing="0">
					<thead>
						<tr>
							<th grow="1" orderBy >Nº Dossier</th>
							<th grow="1" orderBy title="Data de registo">Data</th>
							<th grow="3.5" orderBy>Cliente</th>
							<th grow="1" orderBy>Capital</th>
							<th grow="1" orderBy>Montante</th>
							<th grow="1" orderBy>TAEG</th>
							<th grow="1">Data Inicio</th>
							<th grow="1">Data Fim</th>
							<th grow="1">Estado</th>
						</tr>
					</thead>
					<tbody id="table-report-credit-body" style="font-size: 12.5px;">
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


