<!DOCTYPE html>
<html lang="pt">
<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="../../resources/css/geralStyle.css">
	<link rel="stylesheet" href="../../resources/css/admin/cheq.css">
	<link rel="stylesheet" href="../../resources/css/admin.css">

</head>
<body>
	<div class="master-content cheq">
		<nav class="first">
			<h1 class="title">Cheque</h1>
			<span class="add-more default">+</span>
		</nav>
		<div class="second">
			<div class="container">
					<section class="">
						<div class="table-list-cheq x-table">
							<table id="table-cheq" cellpadding="0" cellspacing="0">
								<thead>
									<tr>                    
										<th grow="1">Ação</th>
										<th grow="2">Banco</th>
										<th grow="3">Agência</th>
										<th grow="6">Seq. Início</th>
										<th grow="6">Seq. Fim</th>
										<th grow="2">Folhas</th>
									</tr>
								</thead>
								<tbody id="chequesTabela">
								</tbody>
							</table>
						</div>					
					</section>
			</div>
			<div class="add-new-admin xpert-form">
				<b class="head"><span class="closeIt">X</span><h2>Adicionar cheque</h2></b>
				<div class="flex-form">
					<select name="" class="input-total listAccounts" id="chequeContas">
						<option value="">(Selecione Conta)</option>
					</select><select name="" class="input-total listAccounts" id="chequeAgencia">
						<option value="">(Selecione Agência)</option>
					</select>
					<input type="text" placeholder="Sequência de início" class="input-total integer" id="sequenciaInicioCheque" maxlength="30">
					<input type="text" placeholder="Sequência de fim" class="input-total integer" id="sequenciaFimCheque" maxlength="30">
					<input type="text" placeholder="Nº total de folhas" class="input-total integer" id="totalFolhas">
				</div>
				<button id="addCheck">Adicionar</button>
			</div>
		</div>
	</div>
    <?php include "../process.html"; ?>
</body>
<script type="text/javascript" src="../../resources/js/jQuery.js"></script>
<script type="text/javascript" src="../../resources/js/geralScript.js"></script>
<script type="text/javascript" src="../../resources/js/controller/geral.js"></script>
<script type="text/javascript" src="../../resources/js/controller/cheque.js"></script>
<script type="text/javascript" src="../../resources/js/admin.js"></script>
<script type="text/javascript" src="../../resources/js/table.js"></script>
<script type="text/javascript" src="../../resources/js/xMenu.js"></script>
</html>

