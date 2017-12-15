<!DOCTYPE html>
<html lang="pt">
<head>
	<meta charset="UTF-8">
    <style>
        .modalContainer .content{
            max-height: 85vh;
            overflow: auto;
            padding: 1rem 2rem;
        }
        .modalContainer nav{
            line-height: 2.4rem;
            border-bottom: 1px #f2f2f2 solid;
        }
        .modalContainer .mykey{
            font-weight: bold;
            font-size: .9rem;
            display: inline-block;
            min-width: 200px;
        }
        .modalContainer .myVal{
            display: inline-block;
            margin-left: 2rem;
        }
        .modalContainer .myVal:before{
            content: ": ";
        }
    </style>
</head>
<body>
	<div class="master-content">
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
				<tbody id="tableCliente" style="font-size: 12.5px;">
				</tbody>
			</table>
            <div class="pagination flex h-ct" id="relatorio_pagination">
                <div class="icon-backward2">
                </div>
                <div id="relatorio_pagination-add" class="icon-forward3">
                </div>
            </div>
		</div>
	</div>
	<section class="modalPage mp-show-more-information-client-credit">
		<div class="modalFrame">
			<div class="modalContainer">
				<div class="content" id="more-detalhes-list">

				</div>
				<div class="modal-header">
					<b>Mais Detalhes</b>
					<span class="mp-close"></span>
				</div>
			</div>
		</div>
	</section>
	<?php include "../process.html"; ?>
</body>
<script type="text/javascript" src="./resources/js/reports/cabaz.js"></script>
<script src="./resources/js/geralScript.js" ></script>
</html>


