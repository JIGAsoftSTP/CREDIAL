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
				<ul class="menu-cheq">
					<nav>
						<li class="active">Cheques</li>
						<li class="">Saldos diários</li>
						<li class="">Cobrança e depósitos diários</li>
						<li class="">Cheques distribuídos</li>
					</nav>
				</ul>
				<div class="abas">
					<section class="active">
						<div class="table-list-cheq">
							<table id="table-cheq" cellpadding="0" cellspacing="0">
								<thead>
									<tr>                    
										<th width="25">Banco</th>
										<th width="25">Agência</th>
										<th width="20">Seq. Início</th>
										<th width="20">Seq. Fim</th>
										<th width="10">Folhas</th>
									</tr>
								</thead>
								<tbody>							
								</tbody>
							</table>
						</div>					
					</section>
					<section class="">
						<div class="table-list-saldos">
							<table id="table-saldos" cellpadding="0" cellspacing="0">
								<thead>
									<tr>                    
										<th width="15">Data</th>
										<th width="20">Débito</th>
										<th width="20">Crédito</th>
										<th width="45">Designação</th>
									</tr>
								</thead>
								<tbody>							
								</tbody>
							</table>
						</div>
					</section>
					<section class="">
						<div class="table-list-cobranca">
							<table id="table-cobranca" cellpadding="0" cellspacing="0">
								<thead>
									<tr>                    
										<th width="15">Data</th>
										<th width="30">Débito</th>
										<th width="30">Crédito</th>
										<th width="25">Banco</th>
									</tr>
								</thead>
								<tbody>						
								</tbody>
							</table>
						</div>
					</section>
					<section>
						<div class="table-list-cheq">
							<table id="table-cheq-dist" cellpadding="0" cellspacing="0">
								<thead>
									<tr>                    
										<th width="25">Data</th>
										<th width="20">Seq. Início</th>
										<th width="20">Seq. Fim</th>
										<th width="25">Agência</th>
									</tr>
								</thead>
								<tbody>							
								</tbody>
							</table>
						</div>			
					</section>
				</div>
			</div>
			<div class="add-new-admin xpert-form">
				<b class="head"><span class="closeIt">X</span><h2>Adicionar cheque</h2></b>
				<div class="flex-form">
					<select name="" class="input-total listAccounts" id="">
						<option value="">(Selecione Conta)</option>
					</select>
					<input type="text" placeholder="Sequência de início" class="input-total integer" id="sequenciaInicioCheque" maxlength="30">
					<input type="text" placeholder="Sequência de fim" class="input-total integer" id="sequenciaFimCheque" maxlength="30">
					<input type="text" placeholder="Nº total de folhas" class="input-total integer" id="totalFolhas">
				</div>
				<button id="addCheck">Adicionar</button>
			</div>
		</div>
	</div>
</body>
<script type="text/javascript" src="../../resources/js/jQuery.js"></script>
<script type="text/javascript" src="../../resources/js/geralScript.js"></script>
<script type="text/javascript" src="../../resources/js/admin.js"></script>
</html>

