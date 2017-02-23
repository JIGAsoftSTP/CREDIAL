<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Credial</title>
	<link rel="stylesheet" href="./resources/css/geralStyle.css">
	<link rel="stylesheet" href="./resources/css/fonts.css">
	<link rel="stylesheet" href="./resources/css/index.css">
    <script type="text/javascript" src="resources/fw/js/angular.min.js"></script>
</head>
<body>
	<div class="udf">
		<div class="flex-form xpert-form">
			<span>
				<nav class="photo default-user-img"></nav>
				<p>
				<i class="icon-user"></i>	
				<input id="user" type="text" placeholder="NIF" autofocus>
				</p>
				<p>
				<i class="icon-lock"></i>	
				<input id="pwd" type="password" placeholder="Password">
				</p>
				<!--<a href="RClient.php">--><button id="logar">Autenticar</button><!--</a>-->
			</span>
		</div>
	</div>
	<section class="modalPage mp-change-pwd" >
	    <div class="modalFrame">
	        <div class="modalContainer">
				<h2><span>Olá, </span> <b id="nome">Username here!</b></h2>
				<p>Verificamos que esta é a sua primeira vez a aceder ao sistema. Por razões de segurança é obrigatório que altere sua senha atual.</p>
	        	<div class="flex-form xpert-form">
	        		<input type="password" id="pwd1" placeholder="Nova senha" class="input-total">
	        		<input type="password" id="pwd2" placeholder="Confirme senha" class="input-total">
	        	</div>
	            <div class="bt-yes-no-cancel">
	                <button id="confirme">OK</button>
	                <button class="bt-no-option">Cancelar</button>
	            </div>
	            <div class="modal-header">
	                    <b>Alterar senha</b>
	                    <span class="mp-close"></span>
	            </div>
	        </div>
	    </div>
	</section>
</body>
<script type="text/javascript" src="resources/js/jQuery.js"></script>
<script type="text/javascript" src="resources/js/geralScript.js"></script>
<script type="text/javascript" src="resources/js/index.js"></script>
<script type="text/javascript" src="resources/js/controller/geral.js"></script>
<script type="text/javascript" src="resources/js/controller/logar.js"></script>
</html>