<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title></title>
	<script type="text/javascript" src="../../resources/js/admission.js"></script>
	<link rel="stylesheet" href="../../resources/css/geralStyle.css">
	<link rel="stylesheet" href="../../resources/css/activity.css">
	<link rel="stylesheet" href="../../resources/fw/pikaday/pikaday.css">

</head>
<body>
	<div class="log-user">
		<div class="content">	
			<div class="list-user-log">
				<span class="m-search focus">
                    <input type="text" placeholder="Funcionário" id="activitySearch-user">

                    <i class="icon-search"></i>
                </span>
				<ul class="user-names">

				</ul>
			</div>
			<div class="arend">
				<div class="little-det">
					<span class="super-search focus">
						<i class="icon-search"></i>
						<input type="text" placeholder="Pesquise aqui..." id="searchActivity">
                        <input type="text" class="is-datepicker reportActivityDate"  id="reportActivity-initialDate" placeholder="Data Inicial">
                        <input type="text" class="is-datepicker reportActivityDate" id="reportActivity-finalDate" placeholder="Data Final">
						<select id="filterActivity">
							<option value="5">Todos</option>
							<option value="2">Adicionados</option>
							<option value="1">Editados</option>
							<option value="0">Removidos</option>
							<option value="3">Visualizados</option>
						</select>
					</span>
					<span class="view-m-det">Estatísticas</span>

				</div>
				
				<div class="list-logs">
				</div>
			</div>
			<div class="div-statitcs">
				<span class="x-close"></span>
				<div class="det-tabs">
					<nav class="total-added">
						<h3></h3>
						<b>Itens adicionados</b>
					</nav>
					<nav class="total-edited">
						<h3></h3>
						<b>Itens editados</b>
					</nav>
					<nav class="total-removed">
						<h3></h3>
						<b>Itens removidos</b>
					</nav>
				</div>
				<section id="contratoDesc">
					<span>
						<h1 id="totalCreditos"></h1>
						<i class="icon-profile"></i>
					</span>
					<p ></p>
				</section>
<!--				<section>-->
<!--					<span>-->
<!--						<h1><small>minutos</small></h1>-->
<!--						<i class="icon-stopwatch"></i>-->
<!--					</span>-->
<!--					<p>Tempo médio de atividades</p>-->
<!--				</section>-->
			</div>
		</div>
	</div>



    <section class="modalPage mp-mf-activity">
        <div class="modalFrame">
            <div class="modalContainer">
                <div class="content">

                </div>

                <div class="modal-header">
                    <b>Mais detalhes</b>
                    <span class="mp-close"></span>
                </div>
            </div>
        </div>
    </section>

    <?php include "../process.html"; ?>
    <script type="text/javascript" src="../../resources/fw/pikaday/pikaday.js"></script>
</body>
<script src="../../resources/js/jQuery.js"></script>
<script src="../../resources/js/controller/geral.js"></script>
<script src="../../resources/js/geralScript.js"></script>
<script src="../../resources/js/activity.js"></script>
<script src="../../resources/js/controller/activity.js"></script>

</html>