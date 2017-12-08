
/*################     CHEQUE  	#####################*/
$('.report-content').on("click", ".filter-type-cheq li", function(event) {
    $(this).addClass('active').siblings().removeClass('active');
    if($(this).index() !== 0)
        expandTable($(this).closest('.master-content').find('.x-table'), false, true);
    else
        expandTable($(this).closest('.master-content').find('.x-table'), false, false);

    $('.x-icon-ok').click();
});

/*################     COBRANÇAS  	#####################*/
$('.test-expand').click(function(event) {
    $(this).toggleClass('active');
    expandTable($(this).closest('.master-content').find('.x-table'), true);
});

var chequeFiltro = 1;
var listLastValues = {};
var listReportData = [];
var size = 0;
var customer,growth, credit,
    date, cobranca, taeg, divida,
    cheque;
var table;

$(function () {
    sessionStorage.removeItem('filterReport');
    $('.x-icon-ok').click(function () {
        if ($('#secondary-menu').find('li.active').attr('id') !== "rep.gara"
            && $('#secondary-menu').find('li.active').attr('id') !== "rep.cred_anulado"
            && $('#secondary-menu').find('li.active').attr('id') !== "rep.notifcredito") {
            // se o relatorio não for de garrantia os dados para base de dados
            sendFilterReport();
            $("#relatorio_pagination").show();
        }
        else if ($('#secondary-menu').find('li.active').attr('id') === "rep.gara"
            || $('#secondary-menu').find('li.active').attr('id') === "rep.cred_anulado"
            || $('#secondary-menu').find('li.active').attr('id') === "rep.notifcredito") {
            setDataStorage(sessionStorage, "filterReport", "date-inicio", ($("#report-inicial-date").val() === "" ? "" :
                alterFormatDate($("#report-inicial-date").val())));
            setDataStorage(sessionStorage, "filterReport", "date-fim", ($("#report-final-date").val() === "" ? "" :
                alterFormatDate($("#report-final-date").val())));
            var iframe = $(".report-content");
            iframe.find('#labelNotificacao').click();
            iframe.find('#labelWarranty').click();
            iframe.find('#labelAnulado').click();
            $("#relatorio_pagination").hide();
        }
    });
});


data();


function sendFilterReport() {

    if($('#secondary-menu li.active').attr('id') ===  TypeReport.CHEQUE){
         chequeFiltro = $(".report-content").find(".filter-type-cheq li.active").attr("id");
    }

 if(validation1($(".reportDate")))
        dataReport();
}

function reportGrowth(list)
{
    $(".report-content").find('table tbody').empty();
    for(var i = relatorio.begin;(i<list.length-1 && i !== relatorio.end) ;i++)
    {
         growth = list[i];
        $(".report-content").find('table tbody').append('' +
            '<tr><td >' + growth["NIF"] + '</td><td >' + growth["CLIENT NAME"]+" "+growth["CLIENT SURNAME"] + '</td>' +
            '<td>'+growth["LOCALIDADE"]+'</td><td>'+growth["QUANTIDADE ANO"]+'</td>' +
            '<td>'+growth["QUANTIDADE PASSADO"]+'</td>' +
            '<td>'+growth["DIFERENCA"]+'</td></tr>');

        listLastValues = {"Ano Atual": list[list.length-1]["QUANTIDADE ANO"], "Ano Passado" : list[list.length-1]["QUANTIDADE PASSADO"],
            "Crescimento" : list[list.length-1]["DIFERENCA"]};

        sumTable(listLastValues);
    }
    tableEstructure($(".report-content").find('table'));
}

// relatorio TAEG
function reportTaeg(list)
{
    $(".report-content").find('table tbody').empty();
    if(list.length >0){
        $(".report-content").find('.first-section h1:eq(0) span').text(formattedString(list[list.length-2]["CREDITO VALUE"]));
        $(".report-content").find('.first-section h1:eq(1) span').text(formattedString(list[list.length-1]["CREDITO VALUE"]));


        $(".report-content").find('.second-section h1:eq(0) span').text(formattedString(list[list.length-2]["CREDITO TOTAL PAGAR MONTANTE DIVIDA"]));
        $(".report-content").find('.second-section h1:eq(1) span').text(formattedString(list[list.length-1]["CREDITO TOTAL PAGAR MONTANTE DIVIDA"]));

        $(".report-content").find('.third-section h1:eq(0) span').text(formattedString(list[list.length-2]["CREDITO TAEG"]));
        $(".report-content").find('.third-section h1:eq(1) span').text(formattedString(list[list.length-1]["CREDITO TAEG"]));
    }

    for(var i = relatorio.begin;(i<list.length-1 && i !== relatorio.end) ;i++)
    {
         taeg = list[i];
        if(taeg["NIF"].toUpperCase() !=="TOTAL"){
            $(".report-content").find('table tbody').append('' +
                '<tr><td >' + taeg["CREDITO NUM DOSSCIER"] + '</td><td >' + taeg["NIF"]+'</td>' +
                '<td>'+taeg["NAME"]+" "+taeg["SURNAME"]+'</td><td>'+formattedString(taeg["CREDITO VALUE"])+'</td>' +
                '<td>'+formattedString(taeg["CREDITO TOTAL PAGAR MONTANTE DIVIDA"])+'</td>' +
                '<td>'+formattedString(taeg["CREDITO TAEG"])+'</td><td>'+formatDate(taeg["CREDITO INICIO"],2)+'</td>' +
                '<td>'+formatDate(taeg["CREDITO FINALIZAR"],2)+'</td><td>'+taeg["CREDITO STATE"]+'</td></tr>');
        }
    }
    tableEstructure($(".report-content").find('table'));
}


function reportChequeDistribuido(list) {
    $(".report-content").find('table tbody').empty();

    for(var i = relatorio.begin;(i<list.length-1 && i !== relatorio.end) ;i++)
    {
         cheque = list[i];
        $(".report-content").find('table tbody').append('' +
            '<tr><td >' + formatDate(cheque["DATA"],2) + '</td><td >' + formattedString(cheque["DEBITO"])+'</td>' +
            '<td>'+formattedString(cheque["CREDITO"])+'</td><td title="'+cheque["BANCO NAME"]+'">'+cheque["BANCO SIGLA"]+'</td>' +
            '<td>'+cheque["AGENCIA"]+'</td></tr>');
    }
    tableEstructure($(".report-content").find('table'));
}

    function dataReport() {
         var dados;
         var obj = getDataStorage(sessionStorage,'filterReport');
         var activeReport = $('#secondary-menu li.active').attr('id');
         var reportFilter = new ReportFiler($("#report-inicial-date").val(), $("#report-final-date").val());

        if($('#secondary-menu li.active').attr('id') !==  TypeReport.CHEQUE){
            dados ={"intention": "report",
            "ReportFiler": reportFilter,
            "reportName": $('#secondary-menu li.active').attr('id'),
            "jsonValue": (checkObject(obj) ? "" : getDataStorage(sessionStorage,'filterReport'))};
        }
        else {
            if(chequeFiltro === "2")
                setDataStorage(sessionStorage, 'filterReport', "state", "1");
            else if(chequeFiltro === "3"){
                setDataStorage(sessionStorage, "filterReport", "state", "0");
            }

            dados ={"intention": "report",
            "ReportFiler": reportFilter,
            "reportName": $('#secondary-menu li.active').attr('id'),
            "chequeFiltro": chequeFiltro,
            "jsonValue": getDataStorage(sessionStorage,'filterReport')};
        }

        $.ajax({
            url: "bean/relatorio.php",
            type:"POST",
            dataType:"json",
            data: dados,
            beforeSend: function () { $(".report-content").find(".mp-loading").fadeIn(); },
            complete: function () {
                $(".report-content").find(".mp-loading").fadeOut();},
            success:function (e) {
                regUserActivity("bean/activity.php", -1, "Visualizou dados do Relatório de "+$('.title-report').text(),
                    -1, LevelActivity.VISUALIZACAO);
                listReportData = [];
                listReportData = e.result;

                relatorio.type = activeReport;
                relatorio.create_pagination(e.result);
                relatorio.add_data_to_relatorio();

                /*dataExport.data = e.result;*/
                dataExport.type = activeReport;
                sessionStorage.dataExport = JSON.stringify(dataExport);
            }
        });
    }

function reportCustomer(list)
{
    var totalQuantity = 0;
    $(".report-content").find('table tbody').empty();

    for(var i = relatorio.begin;(i<list.length-1 && i !== relatorio.end) ;i++)
    {
        customer = list[i];

        $(".report-content").find('table tbody').append('' +
            '<tr><td >' + customer["NIF"] + '</td><td >' + customer["NAME"]+" "+customer["SURNAME"] + '</td>' +
            '<td>'+customer["QUANTIDADE CREDITO"]+'</td><td>'+formattedString(customer["VALOR"])+'</td><td>'+customer["LOCAL TRABALHO"]+'</td></tr>');

        totalQuantity  += Number(customer["QUANTIDADE CREDITO"]);
        listLastValues  = {"Quantidade" : totalQuantity, "Valor" : formattedString((list[list.length-1]["VALOR"]))};
        sumTable(listLastValues);
    }
    tableEstructure($(".report-content").find('table'));
}

function reportCabaz(list)
{
    $(".report-content").find('table tbody').empty();

    for(var i = relatorio.begin;(i<list.length && i !== relatorio.end) ;i++)
    {
        customer = list[i];
        $(".report-content").find('table tbody').append(
            '<tr data="'+$.base64.btoa(JSON.stringify(customer), true)+'">' +
            '<td >'+customer["dos_nif"] + '</td' + '>' +
            '<td >'+customer["dos_name"]+" "+customer["dos_surname"] + '</td>' +
            '<td>'+customer["num_contrato"]+'</td>' +
            '<td>'+customer["num_contrato_pago"]+'</td>' +
            '<td>'+formattedString(customer["total_montante_pagar"])+'</td>'+
            '<td>'+formattedString(customer["total_montante_pago"])+'</td>'+
            '<td>'+formattedString(customer["total_taeg"])+'</td>'
            +'</tr>'
        );
    }
    tableEstructure($(".report-content").find('table'));
}

function reportPagamentoAntecipado(list)
{
    $(".report-content").find('table tbody').empty();

    for(var i = relatorio.begin;(i<list.length && i !== relatorio.end) ;i++)
    {
        customer = list[i];
        $(".report-content").find('table tbody').append(
            '<tr>' +
            '<td >'+customer["clientnif"] + '</td' + '>' +
            '<td >'+customer["clientname"]+" "+customer["clientsurname"] + '</td>' +
            '<td>'+customer["creditonumero"]+'</td>' +
            // '<td>'+customer["tipocreditodesc"]+'</td>' +
            '<td>'+customer["creditovalorpedido"]+'</td>' +
            '<td>'+formattedString(customer["creditoreebolsoinicial"])+'</td>'+
            '<td>'+formattedString(customer["creditoreebolsoanticipado"])+'</td>'+
            '<td>'+formattedString(customer["creditotaeginicial"])+'</td>'+
            '<td>'+formattedString(customer["creditotaeganticiapado"])+'</td>'
            +'</tr>'
        );
    }
    tableEstructure($(".report-content").find('table'));
}

function relatorioCheque(list) {

    if(chequeFiltro === "1")
    {
        listLastValues = {"Débito": formattedString(list[list.length-1]["DEBITO"]), "Crédito": formattedString(list[list.length-1]["CREDITO"])};
        sumTable(listLastValues);
        reportChequeDistribuido(list);
    }
    else
    {
        listLastValues = {"Valor Cheque Reembolso": formattedString(list[list.length-1]["VALOR CHEQUE REEMBOLSO"])};
        sumTable(listLastValues);
        relatorioChequeEstado(list);
    }
}

function relatorioDividaProduto(list) {

    $(".report-content").find('table tbody').empty();
    if(list.length >1){
        $(".report-content").find('.first-section h1:eq(0) span').text(formattedString(list[list.length-2]["CREDITO VALUE SOLICITADO"]));
        $(".report-content").find('.first-section h1:eq(1) span').text(formattedString(list[list.length-1]["CREDITO VALUE SOLICITADO"]));

        $(".report-content").find('.second-section h1:eq(0) span').text(formattedString(list[list.length-2]["CREDITO TOTAL PAGAR MONTANTE"]));
        $(".report-content").find('.second-section h1:eq(1) span').text(formattedString(list[list.length-1]["CREDITO TOTAL PAGAR MONTANTE"]));

        $(".report-content").find('.third-section h1:eq(0) span').text(formattedString(list[list.length-2]["CREDITO VALUE PAGO"]));
        $(".report-content").find('.third-section h1:eq(1) span').text(formattedString(list[list.length-1]["CREDITO VALUE PAGO"]));
    }

    for(var i = relatorio.begin;(i<list.length-1 && i !== relatorio.end) ;i++)
    {
        divida = list[i];
        if(divida["NIF"].toUpperCase() !== "TOTAL"){
            $(".report-content").find('table tbody').append('' +
                '<tr><td >' + divida["NIF"] + '</td><td >' + divida["NAME"]+" "+divida["SURNAME"] + '</td>' +
                '<td>'+formattedString(divida["CREDITO VALUE SOLICITADO"])+'</td><td>'+formattedString(divida["CREDITO TOTAL PAGAR MONTANTE"])+'</td>' +
                '<td>'+formattedString(divida["CREDITO VALUE PAGO"])+'</td></tr>');
        }
    }
    tableEstructure($(".report-content").find('table'));
}

function relatorioChequeEstado(list) {
    $(".report-content").find('table tbody').empty();

    for(var i = relatorio.begin;(i<list.length-1 && i !== relatorio.end) ;i++)
    {
        cheque = list[i];
        $(".report-content").find('table tbody').append('' +
            '<tr><td></td><td ></td><td></td><td></td><td></td>' +
            '<td>'+cheque["NIF"]+'</td><td>'+cheque["NAME"]+" "+cheque["SURNAME"]+'</td><td>'+cheque["PAGAMENTO NUM DOCUMENTO"]+'</td><td>'
            +formattedString(cheque["VALOR CHEQUE REEMBOLSO"])+'</td><td>'+formatDate(cheque["DATA DOCUMENTO PAGAMENTO PREVISTO DEPOSITO"],2)+'' +
            '</td><td>'+cheque["BANCO SIGLA"]+'</td><td>'+verifyEmpty(cheque["PAGAMENTO DATA ENDOSSADO"])+'</td></tr>');
    }
    tableEstructure($(".report-content").find('table'));
}

function reportCredit(list)
{
    $(".report-content").find('table tbody').empty();

    for(var i = relatorio.begin;(i<list.length-1 && i !== relatorio.end) ;i++)
    {
        credit = list[i];
        if (credit["NIF"].toUpperCase() !== "TOTAL") {
            date = formatDate(credit["DATA"], 1);
            $(".report-content").find('table tbody').append('' +
                '<tr><td >' + credit["NUM CREDITO DOSSCIER"] + '</td><td >' + formatDate(credit["DATA"], 1) + '</td>' +
                '<td>' + credit["NIF"] + '</td><td>' + credit["NAME"] + " " + credit["SURNAME"] + '</td><td>' + formattedString(credit["VALOR CREDITO"]) + '</td>' +
                '<td>' + formattedString(credit["TOTAL PAGAR MONTANTE DIVIDA"]) + '</td><td>' + formattedString(credit["TAEG"]) + '</td>' +
                '<td>' + formatDate(credit["DATA INICIO"], 2) + '</td><td>' + formatDate(credit["DATA FINALIZAR"], 2) + '</td></tr>');
            listLastValues = {
                "Valor Crédito": formattedString(list[list.length - 1]["VALOR CREDITO"]),
                "Montante Dívida": formattedString(list[list.length - 1]["TOTAL PAGAR MONTANTE DIVIDA"]),
                "TAEG": formattedString(list[list.length - 1]["TAEG"])
            };
            sumTable(listLastValues);
        }
    }
    tableEstructure($(".report-content").find('table'));
}

var ReportFiler = function (dataI, dataF, periodo) {
    this.dataInicio = dataI;
    this.dataFim = dataF;
};

function reportCobrancas(list) {

    $(".report-content").find('table tbody').empty();

    for(var i = relatorio.begin;(i<list.length-1 && i !== relatorio.end) ;i++)
    {
         cobranca = list[i];
        if(cobranca["NIF"].toUpperCase() !=="TOTAL"){
            $(".report-content").find('table tbody').append('' +
                '<tr><td >' + cobranca["NIF"] + '</td><td >' + cobranca["NAME"] + " " + cobranca["SURNAME"] + '</td>' +
                '<td>' + formattedString(cobranca["VALOR REEMBOLSO"]) + '</td><td>' + cobranca["NUM DOCUMENTO REAL"] + '</td>' +
                '<td>' + cobranca["NUM DOCUMENTO PREVISTO"] + '</td><td>' + formatDate(cobranca["DATA DOCUMENTO REAL"],2) + '</td>' +
                '<td>' + formatDate(cobranca["DATA DOCUMENTO PREVISTO"],2) + '</td></tr>');
        }
        listLastValues = {"Valor Reembolso em Relação ao Ano em Comparação" : formattedString(list[list.length-1]["VALOR REEMBOLSO"]),
            "Valor Reembolso em Relação Ano Atual" : formattedString(list[list.length-2]["VALOR REEMBOLSO"])};
        sumTable(listLastValues);
    }
    tableEstructure($(".report-content").find('table'));
}


function validViewField(arrayValues) {
    if(arrayValues[0]["DESC"] !== undefined)
        return "DESC";
    else{
        if(arrayValues[0]["NAME"] !== undefined)
            return "NAME";
        else{
            if(arrayValues[0]["DESCRICAO"] !== undefined)
                return "DESCRICAO";
            else
                return "NOME";
        }
    }
}

/**
 * Tendo a data não definida pelo utilizador, o sistema define a data inicial como
 * a data de há um mês e data final a data atual
 */
function data()
{
    var dateOneMonthAgo = new Date();
    dateOneMonthAgo.setMonth(dateOneMonthAgo.getMonth() - 1);
    var actualDate = new Date();

     if($("#report-inicial-date").val() === "" &&
         $("#report-final-date").val() === "")
     {
         $("#report-inicial-date").val(dateOneMonthAgo.getDate()+"-"+(dateOneMonthAgo.getMonth()+1)+"-"+dateOneMonthAgo.getFullYear());
         $("#report-final-date").val(actualDate.getDate()+"-"+(actualDate.getMonth()+1)+"-"+actualDate.getFullYear());
     }

   $('.x-icon-ok').trigger("click");
}

function formatDate(date, type) {
    var newDate;
    if(type === 1){
     if(date !== null || date !=="null" || date!==""|| date!=="NULL"){
        var data =date.substr(0,10);
        newDate= data.substr(8,9)+"-"+data.substr(5,6)+"-"+data.substr(0,4);
        return newDate.substr(3, 13);
    }
}
else{
    if(date !== null){
        newDate = date.substr(8,9)+"-"+date.substr(5,6)+"-"+date.substr(0,4);
        return newDate.substr(3, 13);
    }
}

}



function verifyEmpty(_value)
{
    if(_value === null) return "";
    else return formatDate(_value,2);
}

var TypeReport = {
    "CLIENTES": "rep.cliente",
    "CRESCIMENTO_HOMOLOGO": "rep.cresHomo",
    "CREDITO_CONCEDIDO": "rep.credConc",
    "COBRANCA": "rep.cobranca",
    "CAPITAL_TAEG": "rep.capiTAEG",
    "DIVIDA_PRODUTO": "rep.diviProd",
    "CHEQUE": "rep.cheques",
    "GARANTIA": "rep.gara",
    "CABAZ": "rep.cabaz",
    "PAGAMENTO_ATECIPADO": "rep.antecipado"
};


function sumTable(array){

    $(".report-content").find('.sum-parts').remove();
    xTbl = $(".report-content").find('.master-content .x-table');
    $('<div class="sum-parts"></div>').insertAfter(xTbl);

    for (var key in array) {
        $(".report-content").find('.sum-parts').append(
            '<section>'+
            '<h1>'+ array[key] +'</h1>'+
            '<span>'+ key +'</span>'+
            '</section>'
            )
     }
}


$(".icon-file-excel").click(function () {
    if(dataExport.haveData()) {
        var fd = new FormData();
        fd.append("intensao", "exportExcel");
        fd.append("report", sessionStorage.dataExport);
        $.ajax({
            url: "./bean/ExportReport.php",
            type: "POST",
            processData: false,
            contentType: false,
            data: fd,
            dataType: "json",
            success: function (e) {
                open(e.fileName);
            }, beforeSend: function () {  $(".mp-loading").fadeIn(); },
            complete: function () {
                $(".mp-loading").fadeOut();
            }
        });
    }else{

    }
});

$(".icon-file-pdf").click(function () {
    if(dataExport.haveData()) {
        var fd = new FormData();
        fd.append("intensao", "exportPDF");
        fd.append("report", sessionStorage.dataExport);
        $.ajax({
            url: "./bean/ExportReport.php",
            type: "POST",
            processData: false,
            contentType: false,
            data: fd,
            dataType: "json",
            success: function (e) {
                open(e.fileName);
            }, beforeSend: function () {  $(".mp-loading").fadeIn(); },
            complete: function () {
                $(".mp-loading").fadeOut();
            }
        });
    }else{

    }
});

var relatorio = {
    step: 500,
    data : [],
    begin : undefined,
    end : undefined,
    activeReport : undefined,
    page_selected : undefined,
    page_total : undefined,
    create_pagination: function (report) {
        this.activeReport = $('#secondary-menu').find('li.active').attr('id');
        this.data = report;
        var totaldata =  ((TypeReport.CABAZ === this.activeReport) ? this.data.length : this.data.length-1);
        var total_no_arendodado = Math.trunc(totaldata/this.step);
        var total_arendodado = totaldata/this.step;
        var total = ((total_arendodado !== total_no_arendodado) ? (total_no_arendodado +1) : total_no_arendodado);
        var begin = 0;
        var end = this.step;
        var div_pagination = $("#relatorio_pagination");
        div_pagination.find(".page-k").remove();
        this.page_total = total;
        for (var i = 0; i < total; i++){
            var _start = ((i === 0) ? "-start" : "");
            var _end = ((i+1 === total) ? "-end" : "");
            var page = '<div begin="$begin" end="$end" _i="$i" class="'+( (i === 0) ? "active" : "")+' page-k page$start$end">$i</div>';
            page = page.replace("$begin", begin);
            page = page.replace("$end", end);
            page = page.replace("$i", (i+1));
            page = page.replace("$i", (i+1));
            page = page.replace("$start", _start);
            page = page.replace("$end", _end);
            $("#relatorio_pagination-add").before(page);
            begin = end;
            end += this.step;
        }
        div_pagination.find(".active").click();
    },
    add_data_to_relatorio : function(){
        var pagination = $("#relatorio_pagination").find(".active");
        relatorio.begin = Number(pagination.attr("begin"));
        relatorio.end = Number(pagination.attr("end"));
        if (this.activeReport === TypeReport.CLIENTES) reportCustomer(this.data);
        else if (this.activeReport === TypeReport.CRESCIMENTO_HOMOLOGO) reportGrowth(this.data);
        else if (this.activeReport === TypeReport.CREDITO_CONCEDIDO) reportCredit(this.data);
        else if (this.activeReport === TypeReport.COBRANCA) reportCobrancas(this.data);
        else if (this.activeReport === TypeReport.CAPITAL_TAEG) reportTaeg(this.data);
        else if (this.activeReport === TypeReport.DIVIDA_PRODUTO) relatorioDividaProduto(this.data);
        else if (this.activeReport === TypeReport.CHEQUE) relatorioCheque(this.data);
        else if (this.activeReport === TypeReport.CABAZ) reportCabaz(this.data);
        else if (this.activeReport === TypeReport.PAGAMENTO_ATECIPADO) reportPagamentoAntecipado(this.data);
    },
    alter_pages_vist : function (number) {
        var pages = $("#relatorio_pagination");
        var totalpage = pages.find("div").length;
        var value_por_lado = 5;
        if( totalpage >= 17){
            var mais5Value = value_por_lado + number;
            var menos5Value = number - value_por_lado;
            var inicial_view_page = ((menos5Value < 1) ? 1 : menos5Value);
            var final_view_page = mais5Value;
            final_view_page += inicial_view_page - number + value_por_lado;

            if(final_view_page > totalpage){
                inicial_view_page -= (final_view_page-totalpage);
                final_view_page = totalpage;
            }

            pages.find("div.page").hide();
            for( var i = inicial_view_page ; i <= final_view_page ; i++){
                pages.find("div.page[_i='"+i+"']").show();
            }
        }
    },
    test_pagination_status : function () {
        var pagination = $("#relatorio_pagination");
        if (this.page_selected === 1 && this.page_total === 1){
            pagination.find(".icon-forward3, .icon-backward2, .page-k").hide();
        }else if(this.page_selected === this.page_total){
            pagination.find(".icon-forward3").hide();
            pagination.find(".icon-backward2").show();
        }else if (this.page_selected === 1){
            pagination.find(".icon-backward2").hide();
            pagination.find(".icon-forward3").show();
        }else{
            pagination.find(".icon-forward3, .icon-backward2").show();
        }
    }
};

$("#relatorio_pagination").on("click", ".page-k", function () {
    relatorio.page_selected = Number($(this).text());
    $(".page").removeClass("active");
    $(".page-start").removeClass("active");
    $(".page-end").removeClass("active");
    $(".page-start-end").removeClass("active");
    $(this).addClass("active");
    relatorio.add_data_to_relatorio();
    relatorio.alter_pages_vist(relatorio.page_selected);
    relatorio.test_pagination_status();
}).on("click", ".icon-forward3", function () {
    $("#relatorio_pagination").find("div.page-k[_i='"+(relatorio.page_selected+1)+"']").click();
    relatorio.test_pagination_status();
}).on("click", ".icon-backward2", function () {
    $("#relatorio_pagination").find("div.page-k[_i='"+(relatorio.page_selected-1)+"']").click();
    relatorio.test_pagination_status();
});
