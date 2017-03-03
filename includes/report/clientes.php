<!DOCTYPE html>
<html lang="pt">
<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="../../resources/css/geralStyle.css">
	<link rel="stylesheet" href="../../resources/css/reports/report-all.css">
	<link rel="stylesheet" href="../../resources/css/report.css">
	
	
</head>
<body>

	<div class="master-content">

		<div class="table-list">
			<nav class="to-report">
				<h2></h2>
			</nav>

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

			</div>

		</div>
	</div>
    <?php include "../process.html"; ?>
</body>
<script type="text/javascript" src="../../resources/fw/pikaday/pikaday.js"></script>
<script type="text/javascript" src="../../resources/js/jQuery.js"></script>
<script type="text/javascript" src="../../resources/js/table.js"></script>
<script type="text/javascript" src="../../resources/js/geralScript.js"></script>
<script type="text/javascript" src="../../resources/js/controller/geral.js"></script>
<script type="text/javascript" src="../../resources/js/reports/report.js"></script>
<script type="text/javascript" src="../../resources/fw/js/angular.min.js"></script>
<script type="text/javascript" src="../../resources/js/xMenu.js"></script>
<script type="text/javascript" src=""></script>

</html>


