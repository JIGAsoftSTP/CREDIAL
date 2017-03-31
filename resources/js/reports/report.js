
/*################     CHEQUE  	#####################*/
$('.filter-type-cheq li').click(function(event) {
    $(this).addClass('active').siblings().removeClass('active');
    if($(this).index() !== 0)
        expandTable($(this).closest('.master-content').find('.x-table'), false, true);
    else
        expandTable($(this).closest('.master-content').find('.x-table'), false, false);
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
var totalReport = 0;
var reportInterval = undefined;
var customer,growth, credit,
    date, cobranca, taeg, divida,
    cheque;
var table, structureTable;

$(function () {
    sessionStorage.removeItem('filterReport');
    data();

    $('.x-icon-ok').click(function() {

         if( $('#secondary-menu li.active').attr('id') !== "rep.gara")
            sendFilterReport();
         else if($('#secondary-menu li.active').attr('id') === "rep.gara")
         {
             setDataStorage(sessionStorage, "filterReport", "date-inicio", ($("#report-inicial-date").val() === "" ? "" :
                 alterFormatDate($("#report-inicial-date").val())));
             setDataStorage(sessionStorage, "filterReport", "date-fim", ($("#report-final-date").val() === "" ? "" :
                 alterFormatDate($("#report-final-date").val())));
             $("#iframe-" + $('aside li.active').index()).contents().find('#labelWarranty').trigger('click');
         }

   });
});





function sendFilterReport() {

    if($('#secondary-menu li.active').attr('id') ===  TypeReport.CHEQUE){
         chequeFiltro = $("#iframe-" + $('aside li.active').index()).contents().find(".filter-type-cheq li.active").attr("id");
    }

 if(validation1($(".reportDate"))){
    if($(".report-P").attr('id') !== undefined)
        dataReport(1);
    else dataReport(0);
}
}

function reportGrowth(list)
{
    table.empty();
    totalReport = list.length-1;
    clearInterval(reportInterval);
    size = 0;

    if(totalReport >0)
    {
        reportInterval = setInterval(function () {
             growth = list[size];
            table.append('' +
                '<tr><td >' + growth["NIF"] + '</td><td >' + growth["CLIENT NAME"]+" "+growth["CLIENT SURNAME"] + '</td>' +
                '<td>'+growth["LOCALIDADE"]+'</td><td>'+growth["QUANTIDADE ANO"]+'</td>' +
                '<td>'+growth["QUANTIDADE PASSADO"]+'</td>' +
                '<td>'+growth["DIFERENCA"]+'</td></tr>');
            size++;

            listLastValues = {"Ano Atual": list[list.length-1]["QUANTIDADE ANO"], "Ano Passado" : list[list.length-1]["QUANTIDADE PASSADO"],
                "Crescimento" : list[list.length-1]["DIFERENCA"]};

            sumTable(listLastValues);
            tableEstructure($("#iframe-" + $('aside li.active').index()).contents().find('table'));

            if(size === totalReport) clearInterval(reportInterval);
        }, 250);
    }


}

// relatorio TAEG
function reportTaeg(list)
{
    table.empty();
    totalReport = list.length;
    clearInterval(reportInterval);
    size = 0;
    if(list.length >0){
        $("#iframe-" + $('aside li.active').index()).contents().find('.first-section h1:eq(0) span').text(formattedString(list[list.length-2]["CREDITO VALUE"]));
        $("#iframe-" + $('aside li.active').index()).contents().find('.first-section h1:eq(1) span').text(formattedString(list[list.length-1]["CREDITO VALUE"]));


        $("#iframe-" + $('aside li.active').index()).contents().find('.second-section h1:eq(0) span').text(formattedString(list[list.length-2]["CREDITO TOTAL PAGAR MONTANTE DIVIDA"]));
        $("#iframe-" + $('aside li.active').index()).contents().find('.second-section h1:eq(1) span').text(formattedString(list[list.length-1]["CREDITO TOTAL PAGAR MONTANTE DIVIDA"]));

        $("#iframe-" + $('aside li.active').index()).contents().find('.third-section h1:eq(0) span').text(formattedString(list[list.length-2]["CREDITO TAEG"]));
        $("#iframe-" + $('aside li.active').index()).contents().find('.third-section h1:eq(1) span').text(formattedString(list[list.length-1]["CREDITO TAEG"]));
    }

    if(totalReport >0)
    {
        reportInterval = setInterval(function () {
             taeg = list[size];
            if(taeg["NIF"].toUpperCase() !=="TOTAL"){
                table.append('' +
                    '<tr><td >' + taeg["CREDITO NUM DOSSCIER"] + '</td><td >' + taeg["NIF"]+'</td>' +
                    '<td>'+taeg["NAME"]+" "+taeg["SURNAME"]+'</td><td>'+formattedString(taeg["CREDITO VALUE"])+'</td>' +
                    '<td>'+formattedString(taeg["CREDITO TOTAL PAGAR MONTANTE DIVIDA"])+'</td>' +
                    '<td>'+formattedString(taeg["CREDITO TAEG"])+'</td><td>'+formatDate(taeg["CREDITO INICIO"],2)+'</td>' +
                    '<td>'+formatDate(taeg["CREDITO FINALIZAR"],2)+'</td><td>'+taeg["CREDITO STATE"]+'</td></tr>');
            }
            size++;
            tableEstructure($("#iframe-" + $('aside li.active').index()).contents().find('table'));

            if(size === totalReport) clearInterval(reportInterval);
        }, 250);
    }

}


function reportChequeDistribuido(list) {
    table.empty();
    totalReport = list.length-1;
    clearInterval(reportInterval);
    size = 0;

    if(totalReport >0)
    {
        reportInterval = setInterval(function () {
             cheque = list[size];
            table.append('' +
                '<tr><td >' + formatDate(cheque["DATA"],2) + '</td><td >' + formattedString(cheque["DEBITO"])+'</td>' +
                '<td>'+formattedString(cheque["CREDITO"])+'</td><td>'+cheque["BANCO SIGLA"]+"-"+cheque["BANCO NAME"]+'</td>' +
                '<td>'+cheque["AGENCIA"]+'</td></tr>');

            size++;
            tableEstructure($("#iframe-" + $('aside li.active').index()).contents().find('table'));
            if(size === totalReport) clearInterval(reportInterval);
        }, 250);
    }
}

    function dataReport(sub)
    {
         var dados;
         table =  $("#iframe-" + $('aside li.active').index()).contents().find('table').find('tbody');
         structureTable = $("#iframe-" + $('aside li.active').index()).contents().find('table');

         var activeReport = $('#secondary-menu li.active').attr('id');
         if(sub === 0)
            var reportFilter = new ReportFiler($("#report-inicial-date").val(), $("#report-final-date").val(), null);
        else
        {
            setDataStorage(sessionStorage, 'filterReport', "anoSub" , ($(".report-P").val() === "" ? "1" :$(".report-P").val()));
            var reportFilter = new ReportFiler($("#report-inicial-date").val(), $("#report-final-date").val(),
                ($(".report-P").val() === "" ? "1" :$(".report-P").val()));
        }
        if($('#secondary-menu li.active').attr('id') !==  TypeReport.CHEQUE){
            dados ={"intention": "report",
            "ReportFiler": reportFilter,
            "reportName": $('#secondary-menu li.active').attr('id'),
            "jsonValue": getDataStorage(sessionStorage,'filterReport')};
        }
        else
        {
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
            beforeSend: function () { $("#iframe-" + $('aside li.active').index()).contents().find(".mp-loading").fadeIn(); },
            complete: function () {
                $("#iframe-" + $('aside li.active').index()).contents().find(".mp-loading").fadeOut();},
                error:function (e) {
                    console.info(e);
                },
                success:function (e) {
                    regUserActivity("bean/activity.php", -1, "Visualizou dados do Relatório de "+$('.title-report').text(),
                        -1, LevelActivity.VISUALIZACAO);
                    if(activeReport === TypeReport.CLIENTES) reportCustomer(e.result);
                    else if(activeReport === TypeReport.CRESCIMENTO_HOMOLOGO) reportGrowth(e.result);
                    else if(activeReport === TypeReport.CREDITO_CONCEDIDO) reportCredit(e.result);
                    else if(activeReport === TypeReport.COBRANCA) reportCobrancas(e.result);
                    else if(activeReport === TypeReport.CAPITAL_TAEG) reportTaeg(e.result);
                    else if(activeReport === TypeReport.DIVIDA_PRODUTO) relatorioDividaProduto(e.result);
                    else relatorioCheque(e.result);

                    dataExport.data = e.result;
                    dataExport.type = activeReport;
                }
            });
    }

function reportCustomer(list)
{
    var totalQuantity = 0;
    $("#iframe-" + $('aside li.active').index()).contents().find('table').find('tbody').empty();
    totalReport = list.length-1;
    clearInterval(reportInterval);
     size = 0;
    if(totalReport >0)
    {
        reportInterval = setInterval(function()
        {
            customer = list[size];
            table.append('' +
                '<tr><td >' + customer["NIF"] + '</td><td >' + customer["NAME"]+" "+customer["SURNAME"] + '</td>' +
                '<td>'+customer["QUANTIDADE CREDITO"]+'</td><td>'+formattedString(customer["VALOR"])+'</td><td>'+customer["LOCAL TRABALHO"]+'</td></tr>');

            totalQuantity  += Number(customer["QUANTIDADE CREDITO"]);
            size++;
            listLastValues  = {"Quantidade" : totalQuantity, "Valor" : formattedString((list[list.length-1]["VALOR"]))};
            sumTable(listLastValues);
            tableEstructure($("#iframe-" + $('aside li.active').index()).contents().find('table'));
            if(size === totalReport) clearInterval(reportInterval);
        }, 250);
    }
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

    table.empty();
    totalReport = list.length;
    clearInterval(reportInterval);
    size = 0;
    if(list.length >1){
        $("#iframe-" + $('aside li.active').index()).contents().find('.first-section h1:eq(0) span').text(formattedString(list[list.length-2]["CREDITO VALUE SOLICITADO"]));
        $("#iframe-" + $('aside li.active').index()).contents().find('.first-section h1:eq(1) span').text(formattedString(list[list.length-1]["CREDITO VALUE SOLICITADO"]));

        $("#iframe-" + $('aside li.active').index()).contents().find('.second-section h1:eq(0) span').text(formattedString(list[list.length-2]["CREDITO TOTAL PAGAR MONTANTE"]));
        $("#iframe-" + $('aside li.active').index()).contents().find('.second-section h1:eq(1) span').text(formattedString(list[list.length-1]["CREDITO TOTAL PAGAR MONTANTE"]));

        $("#iframe-" + $('aside li.active').index()).contents().find('.third-section h1:eq(0) span').text(formattedString(list[list.length-2]["CREDITO VALUE PAGO"]));
        $("#iframe-" + $('aside li.active').index()).contents().find('.third-section h1:eq(1) span').text(formattedString(list[list.length-1]["CREDITO VALUE PAGO"]));
    }

    if(totalReport>0)
    {
        reportInterval = setInterval(function () {
            divida = list[i];
            if(divida["NIF"].toUpperCase() !== "TOTAL"){
                table.append('' +
                    '<tr><td >' + divida["NIF"] + '</td><td >' + divida["NAME"]+" "+divida["SURNAME"] + '</td>' +
                    '<td>'+formattedString(divida["CREDITO VALUE SOLICITADO"])+'</td><td>'+formattedString(divida["CREDITO TOTAL PAGAR MONTANTE"])+'</td>' +
                    '<td>'+formattedString(divida["CREDITO VALUE PAGO"])+'</td></tr>');
            }
            tableEstructure($("#iframe-" + $('aside li.active').index()).contents().find('table'));
            if(size === totalReport) clearInterval(reportInterval);
        }, 250);
    }
}

function relatorioChequeEstado(list) {
    table.empty();
    totalReport = list.length-1;
    clearInterval(reportInterval);
    size = 0;

    if(totalReport >0)
    {
        reportInterval = setInterval(function () {
            cheque = list[size];
            table.append('' +
                '<tr><td></td><td ></td><td></td><td></td><td></td>' +
                '<td>'+cheque["NIF"]+'</td><td>'+cheque["NAME"]+" "+cheque["SURNAME"]+'</td><td>'+cheque["PAGAMENTO NUM DOCUMENTO"]+'</td><td>'
                +formattedString(cheque["VALOR CHEQUE REEMBOLSO"])+'</td><td>'+formatDate(cheque["DATA DOCUMENTO PAGAMENTO PREVISTO DEPOSITO"],2)+'' +
                '</td><td>'+cheque["BANCO SIGLA"]+'</td><td>'+verifyEmpty(cheque["PAGAMENTO DATA ENDOSSADO"])+'</td></tr>');

            size++;
            tableEstructure($("#iframe-" + $('aside li.active').index()).contents().find('table'));
            if(size === totalReport) clearInterval(reportInterval);
        }, 250);
    }
}

function reportCredit(list)
{
    table.empty();
    totalReport = list.length;
    clearInterval(reportInterval);
    size = 0;

    if(totalReport >0)
    {
        reportInterval = setInterval(function () {
            credit = list[size];
            if (credit["NIF"].toUpperCase() !== "TOTAL") {
                date = formatDate(credit["DATA"], 1);
                table.append('' +
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
            size++;
            tableEstructure($("#iframe-" + $('aside li.active').index()).contents().find('table'));
            if (size === totalReport) clearInterval(reportInterval);
        }, 250);
    }
}

var ReportFiler = function (dataI, dataF, periodo) {
    this.dataInicio = dataI;
    this.dataFim = dataF;
    this.periodoComparacao = periodo;
}

function reportCobrancas(list) {

    table.empty();
    totalReport = list.length;
    clearInterval(reportInterval);
    size = 0;

    if(totalReport >0)
    {
        reportInterval = setInterval(function () {
             cobranca = list[size];
            if(cobranca["NIF"].toUpperCase() !=="TOTAL"){
                table.append('' +
                    '<tr><td >' + cobranca["NIF"] + '</td><td >' + cobranca["NAME"] + " " + cobranca["SURNAME"] + '</td>' +
                    '<td>' + formattedString(cobranca["VALOR REEMBOLSO"]) + '</td><td>' + cobranca["NUM DOCUMENTO REAL"] + '</td>' +
                    '<td>' + cobranca["NUM DOCUMENTO PREVISTO"] + '</td><td>' + formatDate(cobranca["DATA DOCUMENTO REAL"],2) + '</td>' +
                    '<td>' + formatDate(cobranca["DATA DOCUMENTO PREVISTO"],2) + '</td></tr>');
            }
            size++;
            listLastValues = {"Valor Reembolso em Relação ao Ano em Comparação" : formattedString(list[list.length-1]["VALOR REEMBOLSO"]),
                "Valor Reembolso em Relação Ano Atual" : formattedString(list[list.length-2]["VALOR REEMBOLSO"])};
            tableEstructure($("#iframe-" + $('aside li.active').index()).contents().find('table'));
            sumTable(listLastValues);

            if(size === totalReport) clearInterval(reportInterval);
        }, 250);
    }
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

function data()
{
    var month, year, day;
    var d = new Date();
     month = d.getMonth()+1;
     day = d.getDate();
     year = d.getFullYear();
     if($("#report-inicial-date").val() === "" &&  $("#report-final-date").val() === "")
     {
         $("#report-inicial-date").val(day+"-"+d.getMonth()+"-"+year);
         $("#report-final-date").val(day+"-"+month+"-"+year);
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

var TypeReport = {"CLIENTES" : "rep.cliente", "CRESCIMENTO_HOMOLOGO" : "rep.cresHomo", "CREDITO_CONCEDIDO": "rep.credConc",
"COBRANCA": "rep.cobranca",  "CAPITAL_TAEG": "rep.capiTAEG", "DIVIDA_PRODUTO": "rep.diviProd", "CHEQUE" : "rep.cheques", "GARANTIA": "rep.gara" };
Object.freeze(TypeReport);


function sumTable(array){

    $("#iframe-" + $('aside li.active').index()).contents().find('.sum-parts').remove();
    xTbl = $("#iframe-" + $('aside li.active').index()).contents().find('.master-content .x-table');
    $('<div class="sum-parts"></div>').insertAfter(xTbl);

    for (var key in array) {
         var value = data[key];
        $("#iframe-" + $('aside li.active').index()).contents().find('.sum-parts').append(
            '<section>'+
            '<h1>'+ array[key] +'</h1>'+
            '<span>'+ key +'</span>'+
            '</section>'
            )
     }
}


$(".icon-file-excel").click(function () {
        $.ajax({
            url: "./bean/ExportReport.php",
            type: "POST",
            data: {"intensao": "exportExcel", report : dataExport},
            dataType: "json",
            success: function (e) {

            }
        });
});
