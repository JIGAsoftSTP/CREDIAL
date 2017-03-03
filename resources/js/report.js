
$('aside .single').on('click','li',function(event) {
	$('.title-report').text($(this).text());
	CtrlMenu($(this), $('.report-content'));
    reset();
    $.ajax({
        url: "bean/relatorio.php",
        type:"POST",
        dataType:"json",
        data:{"intention" : "load report filters",
            "reportName":  $('#secondary-menu li.active').attr('id')},
        beforeSend: function () {  $(".mp-loading").fadeIn(); },
        complete: function () {
            $(".mp-loading").fadeOut();},
        success:function (e)
		{
            sessionStorage.removeItem('filterReport');
			$("#report-entities").empty();
			$("#report-entities").append('<option value="">(Selecione)</option>');

            regUserActivity(reportActivityAddress, -1, "Visualizou a pagina de Relatório de "+$('.title-report').text(),
                -1, LevelActivity.VISUALIZACAO);
                loadComoBoxIDandValueReport($("#report-entities"), e.reportFilter);
                data();
                if( $('#secondary-menu li.active').attr('id') === TypeReport.CHEQUE)
                    $("#iframe-" + $('aside li.active').index()).contents().find(".filter-type-cheq li.active").trigger("click");

		},
		error:function (e) {
			console.info(e);
        }

    });
    header = $('.header-report');
    $(this).attr('id') == 'rel.acti' ? header.hide(200) : header.show(200);
});

var typeReport = undefined;
var reportActivityAddress = "bean/activity.php";

$('.ctrls .hide-filter').click(function(event) {
	if(!$('.filter-report').hasClass('fixed')){
		$('.filter-report').addClass('hidden');
		setAppLog($('.filter-report'), 'hidden');
	}
});
$('.ctrls .pin').click(function(event) {
	$(this).toggleClass('pinned');
	$('.filter-report').toggleClass('fixed');

	setAppLog($(this), 'pinned');
	setAppLog($('.filter-report'), 'fixed');
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
  	deleteContentDataStorage(sessionStorage, 'filterReport',myIdent);
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
	setAppLog($('.filter-report'), 'hidden');
});


function filterConstruct(identifier, selected, filter){
	var structure;
	selected = selected.val();

	if(!filterExists(filter).exist){
			structure = '<section class="sec-added" filter="' + filter + '">' +
		'<span class="xClose" title="Remover filtragem por '+ filter +'"><hr><hr></span>' +
		'<span class="x-autocomplete">' +
		'<input id="'+identifier+'" onchange="getId(identifier, selected)" class="dataListValue"  identifier="'+ identifier + '" list ="'+ selected +'" placeholder="' + filter + '">' +
		'<datalist  id="' + selected + '">' + returnListFilter(identifier, selected)+
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


function getId(identifer, selected) {
	var idObject = $("#"+selected+" option[value='" + $('#'+identifer).val() + "']").attr('data-id');

    if( $('#secondary-menu li.active').attr('id') !== "rep.gara")
	{
        if(idObject !== undefined && idObject !== ""){
            setDataStorage(sessionStorage, 'filterReport', identifer, idObject);
        }
	}
	else
	{
        console.info("value "+$("#"+identifer).val());
		if($("#"+identifer).val() !== "")
           setDataStorage(sessionStorage, 'filterReport', identifer, $("#"+identifer).val() );
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

	if( $('#secondary-menu li.active').attr('id') !== "rep.gara")
	{
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
                        $("datalist#"+listDB).append('<option data-id ="'+e.objeto[i]["ID"]+'" value="'+e.objeto[i][desc]+'"></option>');
                    }
                }
                regUserActivity(reportActivityAddress, -1, "Adicionou filtros de pesquisa no Relatório de "+$('.title-report').text(),
                    -1, LevelActivity.ATUALIZACAO);
            }
        });
	}
	else
        $("datalist#"+listDB).empty();

}

function createFilterReport(){
	$('.filter-added section').each(function() {
		myIdent = $(this).find('input').attr('identifier');
	  	myValue = $(this).find('input').val();
	});
}

function  reset() {
    $('.filter-added section').each(function () {
		$(this).remove();
    });
}






