<!DOCTYPE html>
<html lang="pt">
<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="../../resources/css/geralStyle.css">
	<link rel="stylesheet" href="../../resources/css/admin/agency.css">
	<link rel="stylesheet" href="../../resources/css/admin.css">
</head>
<body>
	<div class="master-content agency">
		<nav class="first">
			<h1 class="title">Agência</h1>
			<span class="add-more default">+</span>
		</nav>
		<div class="second">
			<div class="container">
				<div class="list-agency">
				</div>
			</div>
		</div>	

		<div class="add-new-admin xpert-form">
			<b class="head"><span class="closeIt">X</span><h2>Adicionar agência</h2></b>
			<div class="flex-form add-new-agency">						
				<input type="text" placeholder="Descrição" class="input-total" id="agenciaNome">
				<select class="input-total" id="agenciaLocalidade">
					<option value="">(Localidade)</option>
				</select>
			</div>
			<button id="addAgency" >Adicionar</button>
		</div>
		<div class="list-funcs">
			<span class="closeIt">X</span>
			<div class="cont" id="agencyNameWorker">
				<h3></h3>
				<b>Funcionários</b>
				<ul class="agencyFunc">
				</ul>
			</div>
		</div>
	</div>
</body>
<script type="text/javascript" src="../../resources/js/jQuery.js"></script>
<script type="text/javascript" src="../../resources/js/geralScript.js"></script>
<script type="text/javascript" src="../../resources/js/controller/geral.js"></script>
<script type="text/javascript" src="../../resources/js/controller/agencia.js"></script>
<script type="text/javascript" src="../../resources/js/admin.js"></script>
<script type="text/javascript" src="../../resources/js/table.js"></script>
</html>



