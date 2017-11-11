<!DOCTYPE html>
<html lang="pt">
<head>
	<meta charset="UTF-8">
	<script type="text/javascript" src="../../resources/js/admission.js"></script>
	<link rel="stylesheet" href="../../resources/css/geralStyle.css">
	<link rel="stylesheet" href="../../resources/css/report.css">
	<link rel="stylesheet" href="../../resources/css/reports/report-all.css">
	
	
</head>
<body>
	<div class="master-content">

		<div class="table-list">
			<nav class="to-report">
				<h2></h2>
			</nav>

			<div class="x-table table-client auto-width">
				<table id="table-client" class="" cellpadding="0" cellspacing="0">
					<thead>
						<tr>                    
							<th grow="2">NIF</th>
							<th grow="5">Nome</th>
							<th grow="2">Contratos</th>
							<th grow="2">Con. Pago</th>
							<th grow="2">Con. Não Pago</th>
							<th grow="4">Total Ca. Pago</th>
							<th grow="4">TAEG</th>
						</tr>
					</thead>
					<tbody id="tableCliente">
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
</html>


