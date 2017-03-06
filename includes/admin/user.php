<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<script type="text/javascript" src="../../resources/js/admission.js"></script>
	<link rel="stylesheet" href="../../resources/css/geralStyle.css">
	<link rel="stylesheet" href="../../resources/css/admin/user.css">
	<link rel="stylesheet" href="../../resources/css/admin.css">
	<link rel="stylesheet" href="../../resources/css/xMenu.css">
</head>
<body>
	<div class="master-content adm-user">
		<nav class="first">
			<h1 class="title">Utilizador</h1>
			<ul class="filter">
				<li type="Pre-Ativo">Pré-Ativos</li>
				<li type="Ativo">Ativos</li>
				<li type="Inativo">Inativos</li>
				<li class="active">Todos</li>
			</ul>
			<span class="search"><input type="" name=""><i class="icon-search"></i></span>
			<span class="add-more default">+</span>
		</nav>
		<div class="second">
			<div class="container">
				<div class="list-user">
				</div>
			</div>
		</div>
		<div class="add-new-admin xpert-form">
			<b class="head"><span class="closeIt">X</span><h2>Adicionar utilizador</h2></b>
			<div class="flex-form add-new-user">
				<div class="adm-ph-user default-user-img">
					<input type="file" id="add-ph-user">
					<nav><label for="add-ph-user" class="icon-image"></label></nav>
				</div>
				<div class="new-photo input-total">
					<i class="icon-camera"><span> Tirar uma foto</span></i>
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
							
						</div>
					</div>
					<ul class="XpertTreeMenu" id="menuAccessUser">
						
					</ul>
				</div>
				<div class="bt-yes-no-cancel">
					<button id="gest-user-menu-change">OK</button>
					<button class="bt-no-option">Cancelar</button>
				</div>
				<div class="modal-header">
					<b>Menus de acesso</b>
					<span class="mp-close"></span>
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



