<!DOCTYPE html>
<html lang="pt">
<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="../../resources/css/geralStyle.css">
	<link rel="stylesheet" href="../../resources/css/admin/bank.css">
	<link rel="stylesheet" href="../../resources/css/admin.css">
</head>
<body>
<div class="master-content bank">
	<nav class="first">
		<h1 class="title">Banco</h1>
		<span class="add-more default">+</span>
	</nav>
	<div class="second">
		<div class="container">
			<ul class="menu-bank">
				<nav class="menu-1">
					<li>Banco</li>
					<li class="li-mov openModal"><i class="icon-loop2"></i>Transferências</li>
					<li class="li-dc openModal"><i class="icon-coin-dollar"></i>Débito/Crédito</li>
					<li class="li-account openModal"><i class="icon-box-add"></i>Conta Banco</li>
				</nav>
			</ul>
			<div class="abas">
				<div class="content">
					<div class="list-bank">
						<h3>Siglas</h3>
						<ul class="siglas">

						</ul>
					</div>
					<nav class="article-bank">
						<div class="bank-descript">
							<span><b class="name" id="bankMovimentName"></b></span><span><b class="sald good">37 000 000,00</b> STD</span></div>
						<div class="table-list-bank">
							<table id="table-bank" cellpadding="0" cellspacing="0">
								<thead>
									<tr>                    
										<th width="15">Data</th>
										<th width="20">Débito</th>
										<th width="20">Crédito</th>
										<th width="45">Designação</th>
									</tr>
								</thead>
								<tbody id="tableBankMoviments">

								</tbody>
							</table>
						</div>
					</nav>
				</div>
			</div>
		</div>
	</div>	
		<div class="add-new-admin xpert-form">
			<b class="head"><span class="closeIt">X</span><h2>Banco</h2></b>
			<div class="flex-form">
				<section class="add-new-bank active">
					<input type="text" placeholder="Sigla" class="input-total" id="bancoSigla" />
					<input type="text" placeholder="Nome" class="input-total" id="bancoNome" />
					<input type="text" placeholder="Código Bancário" class="input-total integer" maxlength="4" />
				</section>
				<section class="add-mov">
					<span class="with-info">
						<select name="" class="input-total listBanks" id="bankMovimentFrom">
							<option value="">(Selecione Banco Retirar)</option>
						</select>
						<!-- <i>i <span class="value-info">s</span></i> -->
					</span>
					<span class="with-info">
						<select name="" class="input-total listBanks" id="bankMovimentTo">
							<option value="">(Selecione Banco Colocar)</option>
						</select>
						<!-- <i>i</i> -->
					</span>															
					<input type="text" placeholder="Valor" class="input-total formatNumber double" id="movimentValue">
					<textarea name="" placeholder="Descrição" class="input-total" id="movimentDesc"></textarea>
				</section>

				<section class="add-deb-cred" >
					<div id="toggle-deb-cred" class="xpert-toggle-bt ">
						<span class="bar">
							<span class="text"></span>
							<span class="round"></span>
						</span>
					</div>
					<input type="text" placeholder="Nº documento" class="input-total integer debitCreditField" id="debitCreditDoc">
					<input type="text" placeholder="Valor" class="input-total formatNumber double debitCreditField" id="debitCreditValue">
					<select name="" class="input-total listBanks debitCreditField" id="debitCreditBank">
						<option value="">(Banco)</option>
					</select>
				</section>

				<section class="add-account">
					<select name="" class="input-total listBanks" id="">
						<option value="0">(Banco)</option>
					</select>
                    <input type="text" placeholder="Código Agência" class="input-total integer" maxlength="4" />
					<input type="text" placeholder="Conta" class="input-total integer" maxlength="11" />
					<textarea name="" placeholder="Descrição" class="input-total" id=""></textarea>
				</section>
			</div>
			<button id="btBankActions">Adicionar</button>
		</div>
</div>	
</body>
<script type="text/javascript" src="../../resources/js/jQuery.js"></script>
<script type="text/javascript" src="../../resources/js/geralScript.js"></script>
<script type="text/javascript" src="../../resources/js/controller/geral.js"></script>
<script type="text/javascript" src="../../resources/js/table.js"></script>
<script type="text/javascript" src="../../resources/js/admin.js"></script>
<script type="text/javascript" src="../../resources/js/controller/bank.js"></script>
</html>



