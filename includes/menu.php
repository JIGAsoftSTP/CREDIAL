<?php
function hasSession()
{
    include "modelo/User.php";
    include "bean/Session.php";
    $user = Session::getUserLogado()->getId();
    if (!isset($user)) {
        header("location:index.php");
    }
}

hasSession();

?>
<header>
		<i class="icon-pushpin pin" appLog id="log-menu-pin"></i>
		<nav class="header-1" id="log-menu-header1"><i class="logo">
			<h1>LOGO here!</h1></i> 
			<div class="logged-user">
				<nav class="photo default-user-img ph-bk"></nav>
				<ul>
					<nav class="photo2 default-user-img ph-bk"></nav>
					<p><span class="aut-user-login-name username"></span></p>
					<p id="menu-ag-user"></p>

					<div class="more-opt">
						<li class="feedback-li"><span>Suporte</span></li>
						<li class="chg-pwd"><span>Alterar senha</span></li>
						<li>
							<div class="logout">
								<span>Sair</span>
								<span><i class="icon-exit"></i></span>
							</div>
						</li>
					</div>

				</ul>
			</div>

		</nav>
		<nav class="header-2">
			<ul id="principal-menu">
				<!--				<li class="active-menu"><a href="RClient.php" id="m1">Crédito</a></li>-->
				<!--				<li><a href="Reports.php" id="m2">Relatórios</a></li>-->
				<!--				<li><a href="Admin.php" id="m3">Administração</a></li>-->
			</ul>
		</nav>
	</header>
	
	<section class="modalPage mp-logout">
		<div class="modalFrame">
			<div class="modalContainer">
				<p>Deseja realmente terminar sessão?</p>
				<div class="bt-yes-no-cancel">
					<button id="logout">OK</button>
					<button class="bt-no-option">Cancelar</button>
				</div>
				<div class="modal-header">
					<b>Terminar sessão</b>
					<span class="mp-close"></span>
				</div>
			</div>
		</div>
	</section>

	<section class="modalPage mp-change-pwd" >
		<div class="modalFrame">
			<div class="modalContainer">
				<h2 class="aut-user-login-name">Username here!</h2>
				<div class="flex-form xpert-form">
					<input type="password" id="pwdAT" placeholder="Senha atual" class="input-total pwd-1">

					<input type="password" id="pwdN1" placeholder="Nova senha" class="input-total">
					<input type="password" id="pwdN2" placeholder="Confirme senha" class="input-total">
				</div>
				<div class="bt-yes-no-cancel">
					<button id="changePwd" >OK</button>
					<button class="bt-no-option">Cancelar</button>
				</div>
				<div class="modal-header">
					<b>Alterar senha</b>
					<span class="mp-close"></span>
				</div>
			</div>
		</div>
	</section>
	<?php include "process.html"; ?>
	<section class="modalPage mp-feedback" >
		<div class="modalFrame">
			<div class="modalContainer">
				<div class="left-panel">
					<h1>FeedBack</h1>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui quaerat voluptatum similique deleniti, obcaecati sapiente incidunt libero officiis deserunt, eveniet? Dignissimos distinctio magni vero doloremque, illum perferendis, rerum nam necessitatibus.</p>
				</div>
				<div class="content-feed xpert-form flex-form">
				<span class="xClose"><hr><hr></span>
					<input id="cli-feed-mail" type="text" class="input-total" placeholder="Email">
					<select id="cli-feed-type" class="input-total">
						<option value="0">Tipo de mensagem</option>
						<option value="error">Erro</option>
						<option value="sugestion">Sugestão</option>
						<option value="help">Ajuda</option>
						<option value="another">Outro</option>
					</select>
					<section class="another flex-form input-total disabled">
						<input type="text" id="cli-feed-other" class="input-total _noObrigatory" placeholder="Especifique">
					</section>
					<textarea id="cli-feed-text" class="input-total"></textarea>
                    <button id="cli-feed-bt">Enviar</button>
				</div>
			</div>
		</div>
	</section>
