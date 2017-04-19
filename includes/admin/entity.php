<!DOCTYPE html>
<html lang="pt">
<head>
	<meta charset="UTF-8">
	<script type="text/javascript" src="../../resources/js/admission.js"></script>
	<link rel="stylesheet" href="../../resources/css/geralStyle.css">
	<link rel="stylesheet" href="../../resources/css/admin/entity.css">
	<link rel="stylesheet" href="../../resources/css/admin.css">


</head>
<body>
	<div class="master-content entity">
		<nav class="first">
			<h1 class="title">Entidades</h1>
			<span class="add-more default">+</span>
		</nav>
		<div class="second">
			<div class="container containerEntidades">
			</div>
		</div>	
		

		<div class="add-new-admin xpert-form">
			<b class="head"><span class="closeIt">X</span><h2>Adicionar Entidade</h2></b>
			<div class="flex-form">
				<select name="" class="input-total listAccounts" id="adminEntity">
					<option value="">(Entidade)</option>
				</select>
				<input type="text" placeholder="Descrição" class="input-total" id="txtEntity">
			</div>
			<button id="btAddEntity">Adicionar</button>
		</div>
	</div>
    <section class="modalPage mp-cancel-desativa-entity">
        <div class="modalFrame">
            <div class="modalContainer">
                <div class="content">
                    <p>Tem a certeza que queres desativar <label id="entity-title-desativar"></label>?</p>
                </div>
                <div class="bt-yes-no-cancel">
                    <button onclick="desativarModal()" >OK</button>
                    <button class="bt-no-option">Cancelar</button>
                </div>
                <div class="modal-header">
                    <b>Desativar Objeto</b>
                    <span class="mp-close"></span>
                </div>
            </div>
        </div>
    </section>
</body>
<script type="text/javascript" src="../../resources/js/jQuery.js"></script>
<script type="text/javascript" src="../../resources/js/geralScript.js"></script>
<script type="text/javascript" src="../../resources/js/controller/geral.js"></script>
<script type="text/javascript" src="../../resources/js/controller/entity.js"></script>
<script type="text/javascript" src="../../resources/js/admin.js"></script>
<script type="text/javascript" src="../../resources/js/xMenu.js"></script>
</html>


