
$('aside .single').on('click','li',function(event) {
	$('.title-report').text($(this).text());
	$(".prd-enabled").find("input").val("");
    $("#yerC").html("");
	CtrlMenu($(this), $('.report-content'));
    $.ajax({
        url: "bean/relatorio.php",
        type:"POST",
        dataType:"json",
        data:{"intention" : "load report filters",
            "reportName": $(this).text()},
        success:function (e)
		{
            sessionStorage.removeItem('filterReport');
			$("#report-entities").empty();
			$("#report-entities").append('<option value="">(Selecione)</option>');
			loadComoBoxIDandValueReport($("#report-entities"), e.reportFilter);
		}

    });
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
	}
});


$('.filter-added').on('click','.xClose',function(event) {
	Ipt = $(this).parent().find('input');
	myIdent = Ipt.attr('identifier');
  	myValue = "";
  	// setDataStorage(sessionStorage, 'filterReport', myIdent , myValue);
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
  	// _id = $(this).attr('id');
});

$('.callFilter').click(function(event) {
	$('.filter-report').removeClass('hidden');
});

//
$('.x-icon-ok').click(function(event) {
    sendFilterReport();
});




function filterConstruct(identifier, selected, filter){
	var structure;
	selected = selected.val();
	if(!filterExists(filter).exist){
		structure = '<section class="sec-added" filter="' + filter + '">' +
		'<span class="xClose" title="Remover filtragem por '+ filter +'"><hr><hr></span>' +
		'<span class="x-autocomplete">' +
		'<input identifier="'+ identifier + '" list ="'+ selected +'" placeholder="' + filter + '">' +
		'<datalist id="' + selected + '">' + returnListFilter(identifier, selected);+
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
	var desc;
	$.ajax({
		url: "bean/relatorio.php",
		type:"POST",
		dataType:"json",
		data:{"intention" : "load report object",
			"object" : listDB},
		success:function (e) {
			if(e.objeto.length >0){
				desc = validViewField(e.objeto);
                for(var i=0;i<e.objeto.length;i++){
                    $("datalist#"+listDB).append('<option value="'+e.objeto[i][desc]+'" ></option>');
                }
			}
		}
	});
}

function createFilterReport(){
	$('.filter-added section').each(function() {
		myIdent = $(this).find('input').attr('identifier');
	  	myValue = $(this).find('input').val();
        console.info("value "+myValue);
        if(myValue !== "")
	  		setDataStorage(sessionStorage, 'filterReport', myIdent , myValue);
	});
}

function reset(){
    $('.filter-added section').each(function() {
        $(this).find('input').remove();
    });
}









