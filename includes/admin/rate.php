<!DOCTYPE html>
<html lang="pt">
<head>
	<meta charset="UTF-8">
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
				</select>
			</div>
			<div class="table-taxa x-table">
				<table id="table-taxa" class="selectable" cellpadding="0" cellspacing="0">
					<thead>
						<tr>
							<th grow="2">Taxa</th>
							<th grow="1">Dias</th>
							<th grow="4">Tipo Crédito</th>
							<th grow="2">Data Inicio</th>
							<th grow="2">Data Fim</th>
							<th grow="3">Estado</th>
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
<script type="text/javascript" src="../../resources/js/controller/geral.js"></script>
<script type="text/javascript" src="../../resources/js/controller/taxs.js"></script>
<script type="text/javascript" src="../../resources/js/admin.js"></script>
<script type="text/javascript" src="../../resources/js/table.js"></script>
</html>




