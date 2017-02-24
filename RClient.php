<!DOCTYPE html>
<html lang="pt-br" >
<head>
	<meta charset="UTF-8">
	<title>Crédito</title>
	<link rel="stylesheet" href="./resources/css/geralStyle.css">
	<link rel="stylesheet" href="./resources/css/client.css">
</head>

<body id="p1">
	<?php include 'includes/menu.php'; ?> 
	<div class="content-body" >

		<span class="new-client">+</span>
		<span class="new-simulation"><i class="icon-shift"></i></span>
		<span class="search-span"><i class="icon-search"></i><input type="text" id="client-search" placeholder="Faça sua pesquisa aqui...">
			<span id="span-type-search-client">
				<i class="icon-newspaper" title="NIF" id="nifS"></i>
				<i class="icon-file-text2" title="Nº documento"></i>
				<i class="icon-coin-dollar" title="Garantia"></i>
				<i class="icon-search" title="Todos"></i>
			</span>
		</span>
		<div class="table-client x-table">
			<table id="table-client" class="selectable" cellpadding="0" cellspacing="0">
				<thead>
					<tr>                    
						<th grow="1">Ações</th>
						<th grow="1.5" orderBy>NIF</th>
						<th grow="5" orderBy>Nome</th>
						<th grow="1" orderBy>Telemóvel</th>
						<th grow="1" orderBy>Créditos</th>
					</tr>
				</thead>
				<tbody id="tableCliente">
					<!--                <tr><td><i class="icon-credit-card"></i><i class="icon-info"></i><i class="icon-pencil"></i></td><td>109935310</td><td>WALDEMIRO QUARESMA FERNANDES</td><td>9969457</td></tr>-->

				</tbody>
			</table>
			<div class="alphabet table-resources">
				<span value="0">*</span>
				<span class="active" value="1">A</span>
				<span value="2">B</span>
				<span value="3">C</span>
				<span value="4">D</span>
				<span value="5">E</span>
				<span value="6">F</span>
				<span value="7">G</span>
				<span value="8">H</span>
				<span value="9">I</span>
				<span value="10">J</span>
				<span value="11">K</span>
				<span value="12">L</span>
				<span value="13">M</span>
				<span value="14">N</span>
				<span value="15">O</span>
				<span value="16">P</span>
				<span value="17">Q</span>
				<span value="18">R</span>
				<span value="19">S</span>
				<span value="20">T</span>
				<span value="21">U</span>
				<span value="22">V</span>
				<span value="23">W</span>
				<span value="24">X</span>
				<span value="25">Y</span>
				<span value="26">Z</span>
			</div>
		</div>
		<div class="add-new-form" id="log-add-new-client">
			<span class="close-add-client">x</span>
			<div>
				<div class="master xpert-form">
					<h1>Adicionar cliente</h1>
					<section class="flex-form header-tittle"><b>Informações gerais</b><i class="icon-ctrl"></i></section>
					<section class="flex-form">
						<p class="input-total"><input type="text" maxlength="9" id="cli-nif" class="input-2" placeholder="NIF"></p>
						<p class="input-2"><input type="text" id="cli-nome" class="input-total" placeholder="Nome"></p>
						<p class="input-2"><input type="text" id="cli-sobNome" class="input-total" placeholder="Sobrenome"></p>
						<p class="input-2"><input type="text" id="cli-dataNasc" class="input-total is-datepicker" placeholder="Data de nascimento"></p>
						<p class="input-2">
							<select id="cli-sexo" class="input-total">
								<option value="0">(Sexo)</option>
							</select></p>
							<p class="input-2">
								<select id="cli-stateCivil" class="input-total">
									<option value="0">(Estado Civil)</option>
								</select>
							</p>
							<p class="input-2"><input type="text" id="cli-mora" class="input-total" placeholder="Morada"></p>

						</section>
						<section class="flex-form header-tittle shrink"><b>Rendimento</b><i class="icon-ctrl"></i></section>
						<section class="flex-form">
							<p class="input-2">
								<select id="cli-prof" class="input-total">
									<option value="0">(Profissão)</option>
								</select>
							</p>
							<p class="input-2"><input type="text" id="cli-salar" class="input-total  formatNumber double" placeholder="Salário"></p>
							<p class="input-2">
								<select id="cli-local" class="input-total">
									<option value="0">(Localidade)</option>
								</select>
							</p>
							<p class="input-2">
								<select id="cli-localTrab" class="input-total">
									<option value="0">(Local de trabalho)</option>
								</select>
							</p>
						</section>
						<section class="flex-form header-tittle shrink"><b>Contacto</b><i class="icon-ctrl"></i></section>
						<section class="flex-form">

							<p class="input-3"><input type="text" id="cli-cont-telm" class="input-total integer" placeholder="Telemóvel"></p>
							<p class="input-3"><input type="text" id="cli-cont-telf" class="input-total integer _noObrigatory" placeholder="Telefone"></p>
							<p class="input-3"><input type="text" id="cli-cont-tels" class="input-total integer _noObrigatory" placeholder="Serviço"></p>
							<p class="input-total"><input type="text" id="cli-email" class="input-total _noObrigatory" placeholder="Email"></p>


						</section>
						<section class="flex-form header-tittle shrink"><b>Arquivagem</b><i class="icon-ctrl"></i></section>
						<section class="flex-form">
							<p class="input-4">
								<select id="cli-ar-ano" class="input-total">
									<option value="0">(Ano)</option>
								</select>
							</p>
							<p class="input-4">
								<select id="cli-ar-mes" class="input-total">
									<option value="0">(Mês)</option>
								</select>
							</p>
							<p class="input-4">
								<select id="cli-ar-let" class="input-total">
									<option value="0">(Letra)</option>
								</select>
							</p>
							<p class="input-4"><input type="text" id="cli-ar-capa" class="input-total" placeholder="Capa"></p>
						</section>
					</div>
					<button id="cli-reg">Adicionar cliente</button>
				</div>
			</div>
			<div class="history-selected">
				<span class="close-history"><hr>
					<hr></span>
					<div class="hs-container">
						<div class="geral-info be-fixed">
							<div class="mini-report rep2">
								<section>
									<h1 id="inf-cli-name"><i class="icon-user-tie"></i></h1>
									<p><b id="inf-cli-career">Career here!</b></p>
									<p><b>Vencimento atual de</b> <label id="inf-cli-salario">STD Salary here!</label></p><br>
									<p id="inf-cli-ano" ></p>
									<small><i>Mais informações</i></small>
								</section>

							</div>
							<div class="mini-report rep1">
								<section class="show-cred cred-pedido">
									<nav>Pedidos <b id="inf-cred-total"></b></nav>
									<h1 id="inf-cred-val-Pedido"><span >$ </span></h1>
									<i class="icon-coin-dollar"></i>
								</section>
								<section>
									<nav>Amortizados <b></b></nav>
									<h1 id="inf-cred-val-amorti"><span >$ </span></h1>
									<i class="icon-coin-dollar"></i>
								</section>
								<section class="show-cred cred-pago">
									<nav>Pagos <b id="inf-cred-Pagos"></b></nav>
									<h1 id="inf-cred-val-pago"><span >$ </span ></h1>
									<i class="icon-coin-dollar"></i>
								</section>
								<section class="show-cred cred-porPagar">
									<nav>A pagar <b id="inf-cred-porPa">5</b></nav>
									<h1 id="inf-cred-val-porPagar"><span>$ </span></h1>
									<i class="icon-coin-dollar"></i>
								</section>
							</div>
						</div>
						<h1 class="title-history">Histórico de Créditos do Cliente</h1>
						<div class="list-history" id="cred-list-amort">
						</div>
					</div>
				</div>
			</div>
			<section class="modalPage mp-new-credit">
				<div class="modalFrame">
					<div class="modalContainer">
						<div class="select-client flex-form xpert-form">
							<div>
								<section>
									<input type="text" id="cred-sh-nif" maxlength="9" placeholder="NIF do cliente" class="input-3">
									<span id="cred-sh-name"></span>
								</section>
								<a>
									<b>Concluir</b>
									<small>Cancelar</small>
								</a>
							</div>
						</div>
						<div class="master-add-customer">
							<div class="xpert-form">
								<!-- <h1>Client Name here!</span></h1> -->
								<div class="div-total">
									<section class="flex-form part-1">
										<span class="name-client">
											<span>
												<b id="cred-cli-nif"></b>
												<span id="cred-cli-comName">Cliente não selecionado</span>
											</span>
											<b class="define-client">editar</b>
										</span>
										<span class="xpert-is-wl span-v input-total">
											Valor: <input type="text" id="cred-value" class="input-total formatNumber double init-value">
										</span>
										<select id="cred-tipoCred" class="input-total">
											<option value="0">(Tipo de Crédito)</option>
										</select>
										<input type="text" id="cred-data" placeholder="Data" class="is-datepicker input-2">
										<input type="text" id="cred-dia" placeholder="Dias" class="input-2 integer">
										<input type="text" id="cred-desco" value="0" placeholder="Desconto (10%-20%)" title="Desconto (10%-20%)" class="input-2 double percent1020">
										<input type="text" id="cred-corr" value="0" placeholder="Correção" title="Correção" class="input-2 double formatNumber">
										<span><span class="xpert-toggle-2"><span class="active">A</span><span>B</span></span></span>
										<button id="start-simulation" >Simulação <i class="icon-arrow-right2"></i></button>
									</section>
									<section class="flex-form part-2">
										<ul>
											<li>Capital <b id="cred-capi">0</b></li>
											<li>Periodo <b id="cred-peri">0</b></li>
											<li>Taxa <b id="cred-taxa">0</b></li>
											<li>Taxa s/desconto <b id="cred-taxaS">0,00</b></li>
											<li>Taxa c/desconto <b id="cred-taxaC">0,00</b></li>
											<li>Prestação <b id="cred-prest">0,00</b></li>
											<li>Reembolso/Periodo <b id="cred-reePer">0,00</b></li>
											<li>Seguro <b id="cred-segu">0,00</b></li>
										</ul>
									</section>
								</div>
								<div class="div-total-2">
									<div class="table-liquid x-table">
										<table id="table-liquid" class="selectable" cellpadding="0" cellspacing="0">
											<thead>
												<tr>                    
													<th grow="1.5">Data</th>
													<th grow="3">Reembolso</th>
													<th grow="3">Capital restante</th>
												</tr>
											</thead>
											<tbody id="cred-table-prestacao" >

											</tbody>
										</table>

									</div>
									<section class="flex-form add-detail-table">
										<span class="close-add-detail">X</span>
										<select id="cred-tab-amor-tipoPagamento" class="input-total" title="Tipo pagamento">
											<option value="0">(Tipo de pagamento)</option>
										</select>
										<select id="cred-tab-amor-banco" class="input-total" title="Banco">
											<option value="0">(Banco)</option>
										</select>
										<input id="cred-tab-amor-numDoc" type="text" placeholder="Nº Documento" title="Número documento" class="input-total">
										<button id="cred-edit-table-amor">OK</button>
									</section>
								</div>
								<div class="detail-table">
									<ul>
										<li>Pagamento via: <b id="cred-tab-selTipoPag"></b></li>
										<li>Banco: <b id="cred-tab-selNomeBanco"></b></li>
										<li>Documento nº: <b id="cred-tab-selNumDoc"></b></li>
									</ul>
								</div>
							</div>
							<div class="xpert-form  about-customer">
								<div class="item-descript xpert-form flex-form">
									<textarea name="" placeholder="Descrição" class="input-total"></textarea>
									<small>Cancelar</small>
								</div>
								<span>
									<h2>O cliente</h2>
									<div class="flex-form" id="cred-form-cli">
										<div class="x-list-select input-total">
											<input type="text"  id="cred-cli-bank" placeholder="Banco" title="Banco" class="input-total" readonly>
											<ul id="cred-cli-bank-list"></ul>
										</div>
										<div class="special-ipt">
											<span placeholder="Nº Doc. p/ pgto" id="cred-cli-numDoc-veiw" ></span>
											<input type="text"  id="cred-cli-numDoc" placeholder="Nº Doc. p/ pgto" title="Número documento" class="integer" maxlength="3">
										</div>

										<select id="cred-cli-fonRend" class="input-total" title="Fonte rendimento">
											<option value="0">(Fonte rendimento)</option>
										</select>
										<select id="cred-cli-modaPag" class="input-total" title="Modalidade pgto.">
											<option value="0">(Modalidade pagamento)</option>
										</select>
										<p class="mabott">
											Garântia
											<div class="x-list input-total" id="cred-cli-list-garaValue">
												<input class="_noObrigatory" datalist="list" list="cred-cli-list-gara">
												<datalist id="cred-cli-list-gara">
												</datalist>
											</div>
										</p>
										<p>
											Documentos
											<div class="x-list input-total" id="cred-cli-list-docuValue">
												<input class="_noObrigatory" datalist="list" list="cred-cli-list-docu">
												<datalist id="cred-cli-list-docu">
												</datalist>
											</div>
										</p>
									</div>
				</span>
				<div class="bottom-part">
					<h1 class="total-val">A pagar: <br><b id="cred-totalPagar">0,00</b></h1>
					<button id="import-simulation">Concluir Operação</button>
				</div>
			</div>
		</div>
		<div class="modal-header">
			<b>Novo crédito</b>
			<span class="mp-close"></span>
		</div>
	</div>
</div>
</section>
<section class="modalPage mp-info-client">
	<div class="modalFrame">
		<div class="modalContainer">
			<div class="content">
				<div class="divSec">
					<ul class="menu-info single">
						<li class="active">Geral</li>
						<li>Rendimento</li>
						<li>Contacto</li>
						<li>Arquivagem</li>
					</ul>
					<div class="content-info">
						<section class="active">
							<p><label>NIF</label><span id="inf-cli-geral-nif">cont</span></p>
							<p><label>Nome Completo</label><span id="inf-cli-geral-nome">cont</span></p>
							<p><label>Data Nascimento</label><span id="inf-cli-geral-dataNasc">cont</span></p>
							<p><label>Sexo: </label><span id="inf-cli-geral-sexo">cont</span></p>
							<p><label>Estado Civil</label><span id="inf-cli-geral-estadoCivil">cont</span></p>
							<p><label>Morada</label><span id="inf-cli-geral-morada">cont</span></p>
						</section>
						<section>
							<p><label>Profissão</label><span id="inf-cli-geral-prof">cont</span></p>
							<p><label>Salário</label><span id="inf-cli-geral-salario">cont</span></p>
							<p><label>Localidade</label><span id="inf-cli-geral-lacali">cont</span></p>
							<p><label>Local Trabalho</label><span id="inf-cli-geral-localTrab">cont</span></p>
						</section>
						<section>
							<p><label>Telemóvel</label><span id="inf-cli-geral-telemo">cont</span></p>
							<p><label>Telefone</label><span id="inf-cli-geral-telefo">cont</span></p>
							<p><label>Serviço</label><span id="inf-cli-geral-telSer">cont</span></p>
							<p><label>Email</label><span id="inf-cli-geral-email">cont</span></p>
						</section>
						<section>
							<p><label>Ano</label><span id="inf-cli-geral-ano">cont</span></p>
							<p><label>Mês</label><span id="inf-cli-geral-mes">cont</span></p>
							<p><label>Letra</label><span id="inf-cli-geral-letra">cont</span></p>
							<p><label>Capa</label><span id="inf-cli-geral-capa">cont</span></p>
						</section>
					</div>
				</div>
			</div>

			<div class="modal-header">
				<b>Informações sobre cliente</b>
				<span class="mp-close"></span>
			</div>
		</div>
	</div>
</section>
<section class="modalPage mp-liquidar" id="cred-pay-form">
	<div class="modalFrame">
		<div class="modalContainer">
			<div class="content">
				<p class="type-font">
					<i class="icon-checkbox-unchecked" id="cred-pay-dife">
						<label>Fonte de pagamento diferente</label>							
					</i>
				</p>
				<div class="secDiv xpert-form" >
					<section class="sec-same flex-form ">
						<input type="text" id="cred-pay-doc" placeholder="Nº Documento" class="input-total" disabled>
						<select id="cred-pay-bank" class="input-total" title="Banco" disabled>
							<option value="0">(Banco)</option>
						</select>			
						<input type="text" placeholder="Data" id="cred-pay-data" class="input-total date-liquida is-datepicker">
						<input type="text" placeholder="Valor" id="cred-pay-value" class=" formatNumber double input-total number-right" disabled>
						<p class="rest input-total" id="cred-pay-value-rest">0,00</p>
					</section>
					<section class="sec-another flex-form">
						<span>
							<p class="input-total"><i class="icon-checkbox-unchecked" id="cred-pay-fazea" > <label>Pagamento Faseado</label></i> </p>
							<p class="input-total"><i class="icon-checkbox-unchecked" id="cred-pay-desco"> <label>Desconto</label></i> </p>
						</span>
					</section>
				</div>
			</div>
			<div class="bt-yes-no-cancel">
				<button id="cred-pay-bt">OK</button>
				<button class="bt-no-option">Cancelar</button>
			</div>
			<div class="modal-header">
				<b>Efetuar pagamento</b>
				<span class="mp-close"></span>
			</div>
		</div>
	</div>
</section>
    <section class="modalPage mp-liquidar-full" id="cred-pay-form-full" style="display: block">
        <div class="modalFrame">
            <div class="modalContainer">
                <div class="content">
                    <p class="type-font">
                        <i class="icon-checkbox-unchecked" id="cred-pay-dife">
                            <label>Fonte de pagamento diferente</label>
                        </i>
                    </p>
                    <div class="secDiv xpert-form" >
                        <section class="sec-same flex-form ">
                            <p>
                                <label>Inical</label>
                                <label>12522555</label>
                            </p>
                            <p>
                                <label>Pago</label>
                                <label>12522555</label>
                            </p>
                            <p>
                                <label>Valor Recalculado</label>
                                <label>12522555</label>
                            </p>
                            <p>
                                <label>Diferença</label>
                                <label>12522555</label>
                            </p>
                        </section>
                    </div>
                </div>
                <div class="bt-yes-no-cancel">
                    <button id="cred-pay-bt-full">OK</button>
                    <button class="bt-no-option">Cancelar</button>
                </div>
                <div class="modal-header">
                    <b>Efetuar pagamento antecepado</b>
                    <span class="mp-close"></span>
                </div>
            </div>
        </div>
    </section>
<section class="modalPage mp-confirm-simulation">
	<div class="modalFrame">
		<div class="modalContainer">
			<p>Deseja realmente importar a simulaçao?</p>
			<div class="bt-yes-no-cancel">
				<button id="cred-simula-import">OK</button>
				<button class="bt-no-option">Cancelar</button>
			</div>
			<div class="modal-header">
				<b>Importar Simulaçao</b>
				<span class="mp-close"></span>
			</div>
		</div>
	</div>
</section>
<script type="text/javascript" src="./resources/fw/pikaday/pikaday.js"></script>
<!-- <div class="xpert-alert notification"><i class="icon-notification"></i><span class="txt">Text here!</span> <span class="close">X</span></div> -->
</body>
<script type="text/javascript" src="./resources/js/jQuery.js"></script>
<script type="text/javascript" src="resources/js/table.js"></script>
<script type="text/javascript" src="resources/js/geralScript.js"></script>
<script type="text/javascript" src="resources/js/controller/geral.js"></script>
<script type="text/javascript" src="resources/js/controller/logar.js"></script>
<script type="text/javascript" src="./resources/js/controller/menu.js"></script>
<script type="text/javascript" src="resources/js/rclient.js"></script>
<script type="text/javascript" src="resources/js/controller/forMask.js"></script>
<script type="text/javascript" src="resources/js/controller/cliente.js"></script>
<script type="text/javascript" src="resources/js/controller/simulacao.js"></script>
<script type="text/javascript" src="resources/js/controller/prestacaoBluider.js"></script>
</html>
