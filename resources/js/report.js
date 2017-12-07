
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
        complete: function () { $(".mp-loading").fadeOut();},
        success:function (e) {
            sessionStorage.removeItem('filterReport');
			$("#report-entities").empty();
			$("#report-entities").append('<option value="">(Selecione)</option>');

            regUserActivity(reportActivityAddress, -1, "Visualizou a página de Relatório de "+$('.title-report').text(),
                -1, LevelActivity.VISUALIZACAO);
                loadContensFilterReport($("#report-entities"), e.reportFilter);
                data();
                if( $('#secondary-menu li.active').attr('id') === TypeReport.CHEQUE)
                    $("#iframe-" + $('aside li.active').index()).contents().find(".filter-type-cheq li.active").trigger("click");
		}
    });
    var header = $('.header-report');
    $(this).attr('id') === 'rel.acti' ? header.hide(200) : header.show(200);
});

var typeReport = undefined;
var reportActivityAddress = "bean/activity.php";

$('.ctrls .hide-filter').click(function() {
	if(!$('.filter-report').hasClass('fixed')){
		$('.filter-report').addClass('hidden');
		setAppLog($('.filter-report'), 'hidden');
	}
});
$('.ctrls .pin').click(function() {
	$(this).toggleClass('pinned');
	$('.filter-report').toggleClass('fixed');

	setAppLog($(this), 'pinned');
	setAppLog($('.filter-report'), 'fixed');
});

$('.add-section-filter select').change(function() {
	var filter = $(this).find('option:selected', this).attr('filter');
	var identifier = $(this).find('option:selected', this).attr('identifier');
	var loadData = $(this).find('option:selected', this).attr("loadData");
	if(!isEmpty($(this))){
		filterConstruct(identifier, $(this).val(), filter, loadData);
	}
});


$('.filter-added').on('click','.xClose',function() {
	var Ipt = $(this).parent().find('input');
	$(this).closest('section').remove();
	deleteContentDataStorage(sessionStorage, "filterReport", Ipt.attr('identifier'));
});

$('.periodic i:first').click(function(event) {
	$(this).toggleClass('icon-checkbox-checked icon-checkbox-unchecked');
	$('.periodic i.icon-ctrl').click();
});
$('.periodic i.icon-ctrl').click(function() {
	$(this).add($('.prd-enabled')).toggleClass('show');
});

$('.filter-added .icon-ctrl').click(function() {
	$('.filter-added').toggleClass('hidden');
	$(this).toggleClass('show');
});

$('.callFilter').click(function() {
	$('.filter-report').removeClass('hidden');
	setAppLog($('.filter-report'), 'hidden');
});

$(".filter-added").on("change", ".dataListValue", function () {

	if($(this).val() !== undefined && $(this).val() !== "") {
       if($(this).attr("loadData") === "1"){
           var idObject = $('#dataList' + $(this).attr("identifier") + " option[value='" + $(this).val() + "']").attr('data-id');

           if(idObject !== undefined && idObject !== "")
               setDataStorage(sessionStorage, 'filterReport', $(this).attr("identifier"), idObject);
	   }else
           setDataStorage(sessionStorage, 'filterReport', $(this).attr("identifier"), $(this).val());
    }
});


function filterConstruct(identifier, selected, filter, loadData){
	var structure;

	if(!filterExists(filter).exist){
			structure = '<section class="sec-added" filter="' + filter + '">' +
		'<span class="xClose" title="Remover filtragem por '+ filter +'"><hr><hr></span>' +
		'<span class="x-autocomplete">' +
		'<input  loadData="'+loadData+'" id="'+identifier+'"  class="dataListValue"  identifier="'+ identifier + '" list ="dataList'+ identifier +'" placeholder="' + filter + '">' +
		'<datalist  id="dataList' + identifier + '">' + returnListFilter(selected, loadData, identifier)+
		'</datalist>' +
		'</span>' +
		'</section>';
		$('.filter-added').append(structure);
		$("#dataList"+identifier).prev().focus();
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

function returnListFilter(listDB, loadData, identifier){
	var desc;

	if(loadData === "1")
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
                        $("#dataList"+identifier).append('<option data-id ="'+e.objeto[i]["ID"]+'" value="'+e.objeto[i]["DESC"]+'"></option>');
                    }
                }
                regUserActivity(reportActivityAddress, -1, "Adicionou filtros de pesquisa no Relatório de "+$('.title-report').text(),
                    -1, LevelActivity.ATUALIZACAO);
            }
        });
	}
	else
        $("#dataList"+identifier).empty();

}

function reset() {
    $('.filter-added section').each(function () {
		$(this).remove();
    });
}






