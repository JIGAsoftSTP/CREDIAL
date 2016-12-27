$('aside .multiple').on('click','li',function(event) {
	$('.title-report').text($(this).text());
});


$('.ctrls .hide-filter').click(function(event) {
	if($('.filter-report').hasClass('float'))
		$('.filter-report').addClass('hidden');
});
$('.ctrls .pin').click(function(event) {
	$(this).toggleClass('pinned');
	$('.filter-report').toggleClass('float');
});

$('.add-section-filter select').change(function(event) {
	selected = $(this).val();
	filter = $(this).find('option:selected', this).attr('filter');
	identifier = $(this).find('option:selected', this).attr('identifier');
	if(!isEmpty($(this))){
		filterConstruct(identifier, $(this), filter);
		/*setDataStorage(sessionStorage, 'filterReport', identifier +'-' + selected , "");*/
	}
});
$('.add-section-filter b').click(function(event) {
});

$('.filter-added').on('click','.xClose',function(event) {
	Ipt = $(this).parent().find('input');
	myIdent = Ipt.attr('identifier');
  	myValue = "";
  	setDataStorage(sessionStorage, 'filterReport', myIdent , myValue);
	$(this).closest('section').remove();
});



$('.periodic i:first').click(function(event) {
	$(this).toggleClass('icon-checkbox-checked icon-checkbox-unchecked');
	$('.periodic i.icon-ctrl').click();
});
$('.periodic i.icon-ctrl').click(function(event) {
	$(this).add($('.prd-enabled')).toggleClass('show');
});

$('.filter-added .icon-ctrl').click(function(event) {
	$('.filter-added').toggleClass('hidden');
	$(this).toggleClass('show');
});

$('.filter-added').on('change','datalist',function(){
  	_id = $(this).attr('id');
  	alert(_id);
});

$('.callFilter').click(function(event) {
	$('.filter-report').removeClass('hidden');
});


$('.x-icon-ok').click(function(event) {
	createFilterReport();

});



function filterConstruct(identifier, selected, filter){
	var structure;
	selected = parseInt(selected.val());
	if(!filterExists(filter).exist){
		structure = '<section class="sec-added" filter="' + filter + '">' +
		'<span class="xClose" title="Remover filtragem por '+ filter +'"><hr><hr></span>' +
		'<span class="x-autocomplete">' +
		'<input identifier="'+ identifier + '-'+ selected +'" list ="'+ selected +'" placeholder="' + filter + '">' +
		'<datalist id="' + selected + '">' +
		returnListFilter(identifier, selected);
		+
		'</datalist>' +
		'</span>' +
		'</section>';
		$('.filter-added').append(structure);
		$("datalist#"+selected).prev().focus();
	} else{
		$('.filter-added section').eq(filterExists(filter).position)
		.insertBefore($('.filter-added section').eq(0))
		.find('input').focus();
	}
}





function filterExists(filter){
	var arrayExist = {exist: false, position: 0};
	$('.filter-added section').each(function(index, el) {
		if($(this).attr('filter') === filter){
			arrayExist.exist = true;
			arrayExist.position = $(this).index() - 1;
			return false;
		}

	});
	return arrayExist;
}

function returnListFilter(identfier, listDB){
	intention = identifier === "entity" ? "load object values" : "load agency";
	listDB = identifier === "entity" ? listDB : 100;
	returnValue = identifier === "entity" ? "DESCRICAO" : "NOME";
	
	if(identifier === "entity" || identfier === "agency")
		$.ajax({
			url: "bean/relatorio.php",
			type:"POST",
			dataType:"json",
			data:{"intention" : intention, "id" : listDB},
			success:function (e) {
				for(var i=0;i<e.objeto.length;i++){
					$("datalist#"+listDB).append('<option value="'+ e.objeto[i][returnValue] +'"></option>');
					sessionStorage
				}

			}
		});

}



/*function lighting(el){
	el.addClass('lighted').siblings().removeClass('lighted');
	
}
function setPositionXC(el){
	var divPos = {};
	var offset = $('body').offset();

	divPos = {
		left: el.offset().left - offset.left,
		top: el.offset().top - offset.top
	};
	console.log(divPos.left + ' ' + divPos.top + ' '+ el.next().height());
}*/


/*function dataStorage(myObject, myKey, myValue){
	
	console.log(getDataStorage(sessionStorage, myObject));
}*/

/*function listDataStorage(dataName){
	if (sessionStorage.getItem(dataName)) {

			var personView = $.parseJSON(sessionStorage.getItem(dataName));
			
			console.log(sessionStorage.getItem(dataName));
		}
}*/
function createFilterReport(){
	$('.filter-added section').each(function(index, el) {
		myIdent = $(this).find('input').attr('identifier');
	  	myValue = $(this).find('input').val();
	  	setDataStorage(sessionStorage, 'filterReport', myIdent , myValue);
	});
}

