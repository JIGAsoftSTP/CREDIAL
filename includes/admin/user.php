<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="../../resources/css/geralStyle.css">
	<link rel="stylesheet" href="../../resources/css/admin/user.css">
	<link rel="stylesheet" href="../../resources/css/admin.css">
    <link rel="stylesheet" href="../../resources/css/xMenu.css">
</head>
<body>
	<div class="master-content adm-user">
		<nav class="first">
			<h1 class="title">Utilizador</h1>
			<span class="add-more default">+</span>
		</nav>
		<div class="second">
			<div class="container">
				<div class="list-user">
				</div>
			</div>
		</div>
		<div class="show add-new-admin xpert-form">
			<b class="head"><span class="closeIt">X</span><h2>Adicionar utilizador</h2></b>
			<div class="flex-form add-new-user">
				<div class="adm-ph-user default-user-img">
					<input type="file" id="add-ph-user">
					<nav><label for="add-ph-user" class="icon-camera"></label></nav>
				</div>
				<input type="text" id="gest-user-nif" maxlength="9" placeholder="NIF" class="input-total integer">
				<input type="text" id="gest-user-nome" placeholder="Nome" class="input-2">
				<input type="text" id="gest-user-apelido" placeholder="Apelido" class="input-2">
				<select name="" id="gest-user-agencia" class="input-total listAgencies">
					<option value="0">(Agência)</option>
				</select>
				<p><i class="icon-cog"></i> Definições acesso</p>
			</div>
			<button id="gest-user-add" >Adicionar</button>
		</div>
	</div>
	<section class="modalPage mp-menu-user" >
		<div class="modalFrame">
			<div class="modalContainer">
				<div class="content">
					<div class="default">
						<div class="def">
							<p>Default</p>
							<b>+</b>
						</div>
						<div id="gest-user-type">
							<i value="1" class="icon-radio-checked2"><span> Operador</span></i><i value="2" class="icon-radio-unchecked"><span> Analista</span></i><i value="3" class="icon-radio-unchecked"><span> Administrador</span></i>
						</div>
					</div>
					<ul class="XpertTreeMenu" id="menuAccessUser">
						<!--<li fix≃"true" id="1" level="0" idfrw="1"><nav><span>Crédito</span></nav></li>
						<li fix≃"true" id="2" level="0" idfrw="2"><nav><span>Relatório</span></nav></li>
						<li fix≃"true" id="3" level="0" idfrw="1"><nav><span>Administração</span></nav></li>-->
					</ul>
				</div>
				<div class="bt-yes-no-cancel">
					<button id="">OK</button>
					<button class="bt-no-option">Cancelar</button>
				</div>
				<div class="modal-header">
					<b>Menus de acesso</b>
					<span class="mp-close">X</span>
				</div>
			</div>
		</div>
	</section>
    <?php include "../process.html"; ?>
</body>
<script type="text/javascript" src="../../resources/js/jQuery.js"></script>
<script type="text/javascript" src="../../resources/js/geralScript.js"></script>
<script type="text/javascript" src="../../resources/js/xMenu.js"></script>
<script type="text/javascript" src="../../resources/js/admin.js"></script>
<script type="text/javascript" src="../../resources/js/controller/geral.js"></script>
<script type="text/javascript" src="../../resources/js/controller/utilizador.js"></script>
</html>



