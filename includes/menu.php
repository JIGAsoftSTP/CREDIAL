	<header>
		<nav class="header-1"><i class="logo">
			<h1>LOGO here!</h1></i> 





			<div class="logged-user">
			<nav class="photo default-user-img ph-bk"></nav>
			<ul>
				<nav class="photo2 default-user-img ph-bk"></nav>
				<p><span class="aut-user-login-name username"></span></p>
				<p>Administrador na agência SEDE</p>
				
				<div class="more-opt">
					<li><span>Suporte</span></li>
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


			<!-- <span class="user-span">
				<span class="photo default-user-img"></span> 
				<span class=""><label class="aut-user-login-name"></label>
					<i class="icon-ctrl"></i>
					<ul class="menu-user">
						<li class="chg-pwd">Alterar senha</li>
						<li class="logout">Terminar sessão</li>
					</ul>
				</span>
			</span> -->







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
	                    <span class="mp-close">X</span>
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
	                    <span class="mp-close">X</span>
	            </div>
	        </div>
	    </div>
	</section>
    <?php include "process.html"; ?>
