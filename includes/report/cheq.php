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
			<li type="entrados" class="bt-table-action active" id="1">Entrados</li>
			<li type="porcobrar" class="bt-table-action" id="2">Por cobrar</li>
			<li type="cobrados" class="bt-table-action" id="3">Cobrados</li>
			<li class="bt-table-action" id="4">Todos</li>
		</ul>
		<div class="table-list">
			<nav class="to-report">
				<h2></h2>
			</nav>
			


			<div class="x-table table-client auto-width">
				<table id="tabela-relatorio-cheque" class="selectable" cellpadding="0" cellspacing="0">
                    <thead>
                    <tr>
                        <th grow="2" grow2="0">Data Registo</th>
                        <th grow="2" grow2="0">Débito</th>
                        <th grow="2" grow2="0">Crédito</th>
                        <th grow="2" grow2="0">Banco</th>
                        <th grow="1" grow2="0">Agência</th>

                        <th grow="0" grow2="2">NIF</th>
                        <th grow="0" grow2="2">Cliente</th>
                        <th grow="0" grow2="2">Nº Doc. Pagamento</th>
                        <th grow="0" grow2="2">Valor Cheque Reembolso</th>
                        <th grow="0" grow2="1">Data Previsto</th>
                        <th grow="0" grow2="1">Banco</th>
                       <th grow="0" grow2="1">Data Endossado</th>
                    </tr>
                    </thead>

<!--                    <thead>-->
<!--                    <tr>-->
<!--                        <th grow="2">NIF</th>-->
<!--                        <th grow="2">Cliente</th>-->
<!--                        <th grow="2">Nº Doc. Pagamento</th>-->
<!--                        <th grow="2">Valor Cheque Reembolso</th>-->
<!--                        <th grow="1">Data Previsto</th>-->
<!--                        <th grow="1">Banco</th>-->
<!--                        <th grow="1">Data Endossado</th>-->
<!--                    </tr>-->
<!--                    </thead>-->
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


