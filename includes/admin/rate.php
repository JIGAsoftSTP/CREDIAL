<div class="contentOfSection">					
	<div class="container">						
		<div class="flex-form xpert-form">
			<select name="" class="input-total listTipoCredito" id="tipoCreditoSearch">
				<option value="">(Tipo de crédito)</option>
			</select>
		</div>
		<div class="table-taxa">
			<table id="table-taxa" class="selectable" cellpadding="0" cellspacing="0">
				<thead>
					<tr>
						<th width="20">Taxa</th>
						<th width="20">Dias</th>
						<th width="90">Tipo Crédito</th>
						<th width="100">Data Inicio</th>
						<th width="90">Data Fim</th>
						<th width="120">Estado</th>
					</tr>
				</thead>
				<tbody id="tableTax"></tbody>
			</table>
		</div>
	</div>
	<div class="add-new-admin xpert-form">
		<b class="head"><span class="closeIt">X</span><h2>Adicionar Taxa</h2></b>
		<div class="flex-form">
			<select name="" class="input-total listTipoCredito" id="taxaTipoCredito" required="true">
				<option value="">(Tipo de crédito)</option>
			</select>
			<input type="text" placeholder="Taxa" class="input-total formatNumber double"  id="txtTaxa" required="true">
			<input type="text" placeholder="Dias" class="input-total integer" id="taxaDias" required="true">
		</div>
		<button id="btAddTax">Adicionar</button>
	</div>
</div>