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
					<i class="icon-undo2 reset-cheq" id="bt-restaurar-cheque"><span> <b>Restaurar</b></span></i>
					<section class="">
						<div class="table-list-cheq x-table">
							<table class="selectable" id="table-cheq" cellpadding="0" cellspacing="0">
								<thead>
									<tr>                    
										<th grow="1">Ação</th>
										<th grow="2.5">Banco</th>
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
	<section class="modalPage mp-reset-cheq">
		<div class="modalFrame">
			<div class="modalContainer">
				<div class="content">
					<section id="section-cheque-anular">
<!--						<h1>Registo a anular</h1>-->
<!--						<nav><b>Banco</b> <span></span>rhwe</nav>-->
<!--						<nav><b>Agência</b> <span></span></nav>-->
<!--						<nav><b>Seq. Inicio</b> <span></span></nav>-->
<!--						<nav><b>Seq. Fim</b> <span></span></nav>-->
					</section>
					<section id="section-cheque-restaurar">
<!--						<h1>Registo a restaurar</h1>-->
<!--						<nav><b>Banco</b> <span></span>rhwe</nav>-->
<!--						<nav><b>Agência</b> <span></span></nav>-->
<!--						<nav><b>Seq. Inicio</b> <span></span></nav>-->
<!--						<nav><b>Seq. Fim</b> <span></span></nav>-->
					</section>
					
					
				</div>
				<div class="bt-yes-no-cancel">
					<button id="bt-conf-restaurar-cheque">Restaurar</button>
					<button class="bt-no-option">Cancelar</button>
				</div>
				<div class="modal-header">
					<b>Restaurar Cheque</b>
					<span class="mp-close">X</span>
				</div>
			</div>
		</div>
	</section>
	<section class="modalPage mp-cancel-cheq">
		<div class="modalFrame">
			<div class="modalContainer">
				<div class="content">
					<p>Tem a certeza que queres anular?</p>
					
				</div>
				<div class="bt-yes-no-cancel">
					<button id="conf-anularCheque">OK</button>
					<button class="bt-no-option">Cancelar</button>
				</div>
				<div class="modal-header">
					<b>Anular Cheque</b>
					<span class="mp-close">X</span>
				</div>
			</div>
		</div>
	</section>
    <?php include "../process.html"; ?>
</body>
<script type="text/javascript" src="../../resources/js/jQuery.js"></script>
<script type="text/javascript" src="../../resources/js/geralScript.js"></script>
<script type="text/javascript" src="../../resources/js/table.js"></script>
<script type="text/javascript" src="../../resources/js/controller/geral.js"></script>
<script type="text/javascript" src="../../resources/js/controller/cheque.js"></script>
<script type="text/javascript" src="../../resources/js/admin.js"></script>
<script type="text/javascript" src="../../resources/js/xMenu.js"></script>
</html>

