<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<script type="text/javascript" src="../../resources/js/admission.js"></script>
	<link rel="stylesheet" href="../../resources/css/geralStyle.css">
	<link rel="stylesheet" href="../../resources/css/admin/insurate.css">
	<link rel="stylesheet" href="../../resources/css/admin.css">

</head>
<body>
	<div class="master-content seguro">
		<nav class="first">
			<h1 class="title">Seguro</h1>
			<span class="add-more default">+</span>
		</nav>
		<div class="second">
			<div class="container">
				<div class="table-seguro x-table auto-width">
					<table id="table-seguro" class="selectable" cellpadding="0" cellspacing="0">
						<thead>
							<tr>
								<th grow="2" orderBy>Valor</th>
								<th grow="1" orderBy>Estado</th>
							</tr>
						</thead>
						<tbody id="tableInsurances"></tbody>
					</table>
				</div>
			</div>
		</div>
		<div class="add-new-admin xpert-form">
			<b class="head"><span class="closeIt">X</span><h2>Adicionar Seguro</h2></b>
			<div class="flex-form">
				<input type="text" placeholder="Valor" class="input-total formatNumber double" id="txtInsurance">
			</div>
			<button id="btAddInsurance">Adicionar</button>
		</div>
	</div>
</body>
<script type="text/javascript" src="../../resources/js/jQuery.js"></script>
<script type="text/javascript" src="../../resources/js/geralScript.js"></script>
<script type="text/javascript" src="../../resources/js/controller/geral.js"></script>
<script type="text/javascript" src="../../resources/js/admin.js"></script>
<script type="text/javascript" src="../../resources/js/controller/seguro.js"></script>
<script type="text/javascript" src="../../resources/js/table.js"></script>
<script type="text/javascript" src="../../resources/js/xMenu.js"></script>

</html>

