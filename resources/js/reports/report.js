
/*################     CHEQUE  	#####################*/


/*################     COBRANÇAS  	#####################*/
$(function () {

    $('.test-expand').click(function(event) {
        expandTable($(this).closest('.master-content').find('.x-table'));
    });


    $('.x-icon-ok').click(function() {
        // alert($("#iframe-" + $('aside li.active').index()).contents().find('table').attr('id'));
         sendFilterReport();
    });

});


function sendFilterReport() {


    if($("#report-inicial-date").val() === "")
        $("#report-inicial-date").addClass("empty");
    else{
        $("#report-inicial-date").removeClass("empty");
        if($("#report-final-date").val() === "")
            $("#report-final-date").addClass("empty");
        else{
            $("#report-final-date").removeClass("empty");

            if($(".report-P").attr('id') !== undefined){
                if($(".report-P").val() === "")
                    $(".report-P").addClass("empty");
                else{
                    $(".report-P").removeClass("empty");
                    dataReport(1);
                }
            }
            else
                dataReport(0);
        }
    }
}

function reportGrowth(list)
{

    var table = $("#iframe-" + $('aside li.active').index()).contents().find('table').find('tbody');
    table.empty();
    for(var i=0;i<list.length;i++)
    {
        var growth = list[i];
        table.append('' +
            '<tr><td >' + growth["NIF"] + '</td><td >' + growth["CLIENT NAME"]+" "+growth["CLIENT SURNAME"] + '</td>' +
            '<td>'+growth["LOCALIDADE"]+'</td><td>'+growth["QUANTIDADE ANO"]+'</td>' +
            '<td>'+growth["QUANTIDADE PASSADO"]+'</td>' +
            '<td>'+growth["DIFERENCA"]+'</td></tr>');
    }
    tableEstructure($("#iframe-" + $('aside li.active').index()).contents().find('table').attr("id"));
}

function reportTaeg(list)
{
    var table = $("#iframe-" + $('aside li.active').index()).contents().find('table').find('tbody');
    table.empty();
    for(var i=0;i<list.length;i++)
    {
        var taeg = list[i];
        table.append('' +
            '<tr><td >' + taeg["NIF"] + '</td><td >' + taeg["NAME"]+" "+taeg["SURNAME"] + '</td>' +
            '<td>'+taeg["CREDITO STATE"]+'</td><td>'+taeg["CREDITO VALUE"]+'</td>' +
            '<td>'+taeg["CREDITO NUM DOSSCIER"]+'</td><td>'+taeg["CREDITO TOTAL PAGAR MONTANTE DIVIDA"]+'</td>' +
            '<td>'+taeg["CREDITO TAEG"]+'</td><td>'+taeg["CREDITO INICIO"]+'</td>' +
            '<td>'+taeg["CREDITO FINALIZAR"]+'</td></tr>');
    }
    tableEstructure($("#iframe-" + $('aside li.active').index()).contents().find('table').attr("id"));
}


function reportChequeDistribuido(list) {

    $("#tabela-cheque-corpo").empty();
    for(var i=0;i<list.length;i++)
    {   var table = document.getElementById("tabela-cheque-corpo");
        var row = table.insertRow(table.childElementCount);
        var taeg = list[i];
        row.id = i;

        var column0 = row.insertCell(0);
        var column1 = row.insertCell(1);
        var column2 = row.insertCell(2);
        var column3 = row.insertCell(3);
        var column4 = row.insertCell(4);
        var column5 = row.insertCell(5);
        var column6 = row.insertCell(6);
        var column7 = row.insertCell(7);
        var column8 = row.insertCell(8);

        column0.innerHTML = taeg["NIF"];
        column1.innerHTML = taeg["NAME"]+" "+taeg["SURNAME"];
        column2.innerHTML = taeg["CREDITO STATE"];
        column3.innerHTML = taeg["CREDITO VALUE"];
        column4.innerHTML = taeg["CREDITO NUM DOSSCIER"];
        column5.innerHTML = taeg["CREDITO TOTAL PAGAR MONTANTE DIVIDA"];
        column6.innerHTML = taeg["CREDITO TAEG"];
        column7.innerHTML = taeg["CREDITO INICIO"];
        column8.innerHTML = taeg["CREDITO FINALIZAR"];
    }
    tableEstructure($("#table-capital-taeg"));
}

function dataReport(sub) {
    if(sub === 0)
        var reportFilter = new ReportFiler($("#report-inicial-date").val(), $("#report-final-date").val(), null);
    else
    {
        var reportFilter = new ReportFiler($("#report-inicial-date").val(), $("#report-final-date").val(), $(".report-P").val());
        setDataStorage(sessionStorage, 'filterReport', "anoSub" , $(".report-P").val());
    }
    createFilterReport();

    $.ajax({
        url: "bean/relatorio.php",
        type:"POST",
        dataType:"json",
        data:{"intention": "report",
            "ReportFiler": reportFilter,
            "reportName": $('.title-report').text(),
            "jsonValue": getDataStorage(sessionStorage,'filterReport')},
        success:function (e) {
            if($('.title-report').text() === "Clientes")
                reportCustomer(e.result);
            else if($('.title-report').text() === "Crescimento Homologo")
                reportGrowth(e.result);
            else if($('.title-report').text() === "Creditos Concedidos")
                reportCredit(e.result);
            else if($('.title-report').text() === "Cobranças")
                reportCobrancas(e.result);
            else if($('.title-report').text() === "Capital / TAEG")
                reportTaeg(e.result);
        }
    });
}

function reportCustomer(list)
{
    var table = $("#iframe-" + $('aside li.active').index()).contents().find('table').find('tbody');
        table.empty();
    for(var i=0;i<list.length;i++)
    {
        var customer = list[i];
        table.append('' +
            '<tr><td >' + customer["NIF"] + '</td><td >' + customer["NAME"]+" "+customer["SURNAME"] + '</td>' +
            '<td>'+customer["VALOR"]+'</td><td>'+customer["LOCAL TRABALHO"]+'</td></tr>');
    }
    tableEstructure($("#iframe-" + $('aside li.active').index()).contents().find('table').attr("id"));
}



function reportCredit(list)
{
    var table = $("#iframe-" + $('aside li.active').index()).contents().find('table').find('tbody');
    table.empty();
    for(var i=0;i<list.length;i++)
    {
        var credit = list[i];
        if(credit["NAME"] !== null){
            table.append('' +
                '<tr><td >' + credit["NIF"] + '</td><td >' + credit["NAME"]+" "+credit["SURNAME"] + '</td>' +
                '<td>'+credit["VALOR"]+'</td><td>'+credit["LOCAL TRABALHO"]+'</td></tr>');
        }
    }
    tableEstructure($("#iframe-" + $('aside li.active').index()).contents().find('table').attr("id"));

}

var ReportFiler = function (dataI, dataF, periodo) {
    this.dataInicio = dataI;
    this.dataFim = dataF;
    this.periodoComparacao = periodo;
}

function reportCobrancas(list) {
    var table = $("#iframe-" + $('aside li.active').index()).contents().find('table').find('tbody');
    table.empty();
    for (var i = 0; i < list.length; i++) {
        var cobranca = list[i];
        table.append('' +
            '<tr><td >' + cobranca["NIF"] + '</td><td >' + cobranca["NAME"] + " " + cobranca["SURNAME"] + '</td>' +
            '<td>' + cobranca["VALOR REEMBOLSO"] + '</td><td>' + cobranca["NUM DOCUMENTO REAL"] + '</td>' +
            '<td>' + cobranca["NUM DOCUMENTO PREVISTO"] + '</td><td>' + cobranca["DATA DOCUMENTO REAL"] + '</td>' +
            '<td>' + cobranca["DATA DOCUMENTO PREVISTO"] + '</td></tr>');

    }
    tableEstructure($("#iframe-" + $('aside li.active').index()).contents().find('table').attr("id"));
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

