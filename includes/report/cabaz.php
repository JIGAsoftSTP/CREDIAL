<!DOCTYPE html>
<html lang="pt">
<head>
	<meta charset="UTF-8">
<!--	<script type="text/javascript" src="../../resources/js/admission.js"></script>-->
	<link rel="stylesheet" href="../../resources/css/geralStyle.css">
	<link rel="stylesheet" href="../../resources/css/report.css">
	<link rel="stylesheet" href="../../resources/css/reports/report-all.css">
	
	
</head>
<body>
	<div class="master-content">

		<div class="table-list">
			<nav class="to-report">
				<h2></h2>
			</nav>

			<div class="x-table table-client auto-width">
				<table id="table-client" class="selectable" cellpadding="0" cellspacing="0">
					<thead>
						<tr>                    
							<th grow="2">NIF</th>
							<th grow="10">Nome</th>
							<th grow="1">Con.</th>
							<th grow="2">Con. Pago</th>
							<th grow="3">Montante à Pagar</th>
							<th grow="3">Total M. Pago</th>
							<th grow="3">TAEG</th>
						</tr>
					</thead>
					<tbody id="tableCliente">
					</tbody>
				</table>
			</div>
		</div>
	</div>
    <section class="modalPage mp-show-more-information-client-credit">
        <div class="modalFrame">
            <div class="modalContainer">
                <ul id="more-detalhes-list">
                    <!--<li>
                        <b>ddd</b>
                        <span>dd</span>
                    </li>-->
                </ul>
                <div class="modal-header">
                    <b>Mais Detalhes</b>
                    <span class="mp-close"></span>
                </div>
            </div>
        </div>
    </section>
    <?php include "../process.html"; ?>
</body>
<!--<script type="text/javascript" src="../../resources/js/jQuery.js"></script>
<script type="text/javascript" src="../../resources/js/table.js"></script>
<script type="text/javascript" src="../../resources/js/geralScript.js"></script>
<script type="text/javascript" src="../../resources/js/controller/geral.js"></script>-->
<!--<script type="text/javascript" src="../../resources/js/Base64/jquery.base64.js"></script>-->
<script type="text/javascript" src="../../resources/js/reports/cabaz.js"></script>
</html>


