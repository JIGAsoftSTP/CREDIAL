<!DOCTYPE html>
<html lang="pt">
<head>
	<meta charset="UTF-8">
	<!--<script type="text/javascript" src="../../resources/js/admission.js"></script>-->
	<link rel="stylesheet" href="../../resources/css/geralStyle.css">
	<link rel="stylesheet" href="../../resources/css/report.css">
	<link rel="stylesheet" href="../../resources/css/reports/report-all.css">
	<link rel="stylesheet" href="../../resources/css/reports/report.css">
	<link rel="stylesheet" href="../../resources/css/reports/cheq.css">
	
	
</head>
<body>
	<div class="master-content">
		
		<ul class="filter-type-cheq">
			<li type="entrados" class="bt-table-action active" id="1">Entrados</li>
			<li type="porcobrar" class="bt-table-action" id="2">Por cobrar</li>
			<li type="cobrados" class="bt-table-action" id="3">Cobrados</li>
			<li class="bt-table-action" id="4">Carteiras</li>
		</ul>
		<div class="table-list">
			<nav class="to-report">
				<h2></h2>
			</nav>
			


			<div class="x-table table-client auto-width">
				<table id="tabela-relatorio-cheque" class="selectable" cellpadding="0" cellspacing="0">
                    <thead>
                    <tr id="list-th-to-table-cheque">
                    </tr>
                    </thead>
                    <tbody id="tabela-cheque-corpo">
					</tbody>
				</table>
			</div>
		</div>
	</div>
    <?php include "../process.html"; ?>
</body>
<!--<script type="text/javascript" src="../../resources/js/jQuery.js"></script>
<script type="text/javascript" src="../../resources/js/table.js"></script>
<script type="text/javascript" src="../../resources/js/geralScript.js"></script>-->
<!--<script type="text/javascript" src="../../resources/js/reports/report.js"></script>-->
</html>


