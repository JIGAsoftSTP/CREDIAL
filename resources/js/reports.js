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
	$('.add-section-filter b').click();
});
$('.add-section-filter b').click(function(event) {
	selected = $(this).prev();
	filter = $(this).prev().find('option:selected', this).attr('filter');
	identifier = $(this).prev().find('option:selected', this).attr('identifier');
	if(!isEmpty(selected))
		filterConstruct(identifier, selected, filter);
});

$('.filter-added').on('click','.xClose',function(event) {
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

$('.callFilter').click(function(event) {
	$('.filter-report').removeClass('hidden');
});




function filterConstruct(identifier, selected, filter){
	var structure;
	selected = parseInt(selected.val());
	if(!filterExists(filter).exist){
            structure = '<section class="sec-added" filter="' + filter + '">' +
                '<span class="xClose" title="Remover filtragem por '+ filter +'"><hr><hr></span>' +
                '<span class="x-autocomplete">' +
                '<input list ="'+ selected +'" placeholder="' + filter + '">' +
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
					$("datalist#"+listDB).append('<option value="'+e.objeto[i][returnValue]+'"></option>');
					localStorage
				}

	        }
		});

}



function lighting(el){
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
}


