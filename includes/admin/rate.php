<!DOCTYPE html>
<html lang="pt">
<head>
	<meta charset="UTF-8">
	<script type="text/javascript" src="../../resources/js/admission.js"></script>
	<link rel="stylesheet" href="../../resources/css/geralStyle.css">
	<link rel="stylesheet" href="../../resources/css/admin/insurate.css">
	<link rel="stylesheet" href="../../resources/css/admin.css">
</head>
<body>
	<div class="master-content taxa">
		<nav class="first">
			<h1 class="title">Taxa</h1>
			<span class="add-more default">+</span>
		</nav>
		<div class="second">
			<div class="flex-form xpert-form">
				<select name="" class="input-total listTipoCredito" id="tipoCreditoSearch">
					<option value="">(Tipo de crédito)</option>
					<option value="-1">Todos</option>
				</select>
			</div>
			<div class="table-taxa x-table auto-width">
				<table id="table-taxa" class="selectable" cellpadding="0" cellspacing="0">
					<thead>
						<tr>
							<th grow="2" orderBy>Taxa</th>
							<th grow="1" orderBy>Dias</th>
							<th grow="4" orderBy>Tipo Crédito</th>
							<th grow="2" orderBy>Data Inicio</th>
							<th grow="2" orderBy>Data Fim</th>
							<th grow="3" orderBy>Estado</th>
						</tr>
					</thead>
					<tbody id="tableTax"></tbody>
				</table>
			</div>
		</div>	


		<div class="add-new-admin xpert-form">
			<b class="head"><span class="closeIt">X</span><h2>Adicionar Taxa</h2></b>
			<div class="flex-form">
				<select name="" class="input-total listTipoCredito" id="taxaTipoCredito" required="true">
					<option value="">(Tipo de crédito)</option>
				</select>
				<input type="text" placeholder="Taxa" class="input-total formatNumber double"  id="txtTaxa" required="true">
				<input type="text" placeholder="Dias" class="input-total integer" id="taxaDias" required="true">
			</div>
			<button id="btAddTax">Adicionar</button>
		</div>
	</div>
</body>
<script type="text/javascript" src="../../resources/js/jQuery.js"></script>
<script type="text/javascript" src="../../resources/js/geralScript.js"></script>
<script type="text/javascript" src="../../resources/js/table.js"></script>
<script type="text/javascript" src="../../resources/js/controller/geral.js"></script>
<script type="text/javascript" src="../../resources/js/controller/taxs.js"></script>
<script type="text/javascript" src="../../resources/js/admin.js"></script>
</html>




