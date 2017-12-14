<!DOCTYPE html>
<html lang="pt">
<head>
	<meta charset="UTF-8">
	<!--	<script type="text/javascript" src="../../resources/js/admission.js"></script>-->
	<!-- <link rel="stylesheet" href="../../resources/css/reports/report-all.css"> -->
	<!-- <link rel="stylesheet" href="../../resources/css/report.css"> -->
	
	
</head>
<body>

	<div class="master-content">

		<div class="x-table table-client auto-width">
			<table id="table-report-client" class="" cellpadding="0" cellspacing="0" >
				<thead>
					<tr>                    
						<th grow="1.5" orderBy>NIF</th>
						<th grow="4" orderBy>Cliente</th>
						<th grow="1.5" orderBy>Quantidade</th>
						<th grow="2" orderBy>Valor</th>
						<th grow="3" orderBy>Local Trabalho</th>
					</tr>
				</thead>
				<tbody id="tableReportCustomerBody">
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


