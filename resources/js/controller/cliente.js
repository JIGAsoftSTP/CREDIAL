/**
 * Created by ahmedjorge on 9/26/16.
 */

$(function () {
    listarCliente();
    loadComoBox($("#cli-ar-ano"),addANO());
    loadComoBox($("#cli-ar-mes"),addMES());
    loadComoBox($("#cli-ar-let"),addLETRAS());
    loadOutherData();
    $("#cli-dataNasc").mask("99-99-9999");
});
var i = 0;
var lastI = 0;
var per = 1;
var ant = 0;
var nCount = 0;
var mCount = 5;
var addTable = 0;
var clienteData = undefined;
var clienteLetra = 0;

var clientes = [];
function listarCliente() {
    $.ajax({
        url: "./bean/cliente.php",
        type: "POST",
        data: {"intensao": "listarCliente"},
        dataType: "json",
        success: function (e) {
            clientes = e.data;
            limite();
            carregarCliente();
        }
    });
}
// $("#tableCliente").scroll(function () {
//     if($(this).scrollTop() === document.getElementById("tableCliente").scrollTopMax) {
//         limite();
//         carregarCliente();
//     }
// });

function addLETRAS() {
    var letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var array = letras.split("");
    return $.makeArray(array);
}

function addANO() {
    var data = new Date();
     return [data.getFullYear()];
}

function addMES() {
    return ['01','02','03','04','05','06','07','08','09','10','11','12'];
}

function carregarCliente() {
    var carregou = false;
    // addTable += (per/100*clientes.length);
    addTable = (clientes[clienteLetra] != undefined) ? clientes[clienteLetra].length : 0;
    $('#tableCliente').empty();
    i = 0;
    for (var ff = i; ff < addTable ; ff++) {
        var client = clientes[clienteLetra][ff];
        var table = document.getElementById("tableCliente");
        var row = table.insertRow(table.childElementCount);

        row.id = ff;


        row.onclick = function () { $(this).addClass('selected') .siblings().removeClass('selected'); };

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);

        cell1.innerHTML = "<i class='icon-credit-card' onclick='"+"credito("+ff+")' ></i>" +
                        "<i class='icon-info' onclick='"+"inforCiente("+ff+")' ></i>" +
                        "<i class='icon-pencil' onclick='"+"editCiente("+ff+")' ></i>";
        cell2.innerHTML = client['NIF'];
        cell3.innerHTML = client['NAME']+" "+client['SURNAME'];
        cell4.innerHTML = client['TELE'];
        carregou = true;
        // lastI = ff;
    }
    // i = lastI+1;
    if(carregou) {
        tableEstructure($('.x-table'));
        setRowCount($('.x-table.table-client'), $('.x-table.table-client').find('tr').length);
    }

}

function credito(a) {
    $("#cred-cli-nif").text(clientes[clienteLetra][a]["NIF"]+" - ");
    var lastName = clientes[clienteLetra][a]['SURNAME'].split(" ");
    $("#cred-cli-comName").text(clientes[clienteLetra][a]['NAME']+" "+lastName[lastName.length-1]);
    nifClient = clientes[clienteLetra][a]["NIF"];
    si.nifClient = nifClient;
    $('.mp-new-credit').fadeIn(500);
    tableEstructure($('#table-liquid'));
}
var listCredito = [];
var clienteShortData = undefined;
function inforCiente(b, fill) {
    $.ajax({
        url: "./bean/cliente.php",
        type: "POST",
        data: {"intensao": "loadStatusClient", "nifCliente": clientes[clienteLetra][b]["NIF"], fill : fill},
        dataType: "json",
        success: function (e) {
            clienteData = e.resultRealDataCliente;
            if(fill == undefined) {
                listCredito = e.resultCredito;
                clienteShortData = e.resultClient;
                listCreditoCliente("-1");
                setTimeout(function () {
                    $('.history-selected').toggleClass('show');
                }, 700);
            }
            else {
                $('.add-new-form').toggleClass('show');
                $('.add-new-form h1').text('Editar cliente');
                $("#cli-reg").text('Editar cliente');
                getDadosCliente();
            }
        },
        beforeSend: function () {  $(".mp-loading").fadeIn(); },
        complete: function () { $(".mp-loading").fadeOut();}
    });
}
function editCiente(c) {
    inforCiente(c, true);
}

// loadOuther
function loadOutherData() {
    $.ajax({
        url: "./bean/cliente.php",
        type: "POST",
        data: {"intensao": "loadOuther"},
        dataType: "json",
        success: function (e) {
            loadComoBoxIDandValue($("#cli-sexo"), e.sexos, "ID", "DESC");
            loadComoBoxIDandValue($("#cli-stateCivil"), e.stateCivil, "ID", "DESC");
            loadComoBoxIDandValue($("#cli-local"), e.lacali, "ID", "DESC");
            loadComoBoxIDandValue($("#cli-localTrab"), e.localTrabr, "ID", "DESC");
            loadComoBoxIDandValue($("#cli-prof"), e.prof, "ID", "DESC");
        }
    });
}


function regCliente() {
    var datas = {
        "intensao": "regCliente",
        "nif": $("#cli-nif").val(),
        "nome": $("#cli-nome").val(),
        "sobNome": $("#cli-sobNome").val(),
        "dataNasc": $("#cli-dataNasc").val(),
        "sexo": $("#cli-sexo").val(),
        "stateCivil": $("#cli-stateCivil").val(),
        "morada": $("#cli-mora").val(),
        "mail": $("#cli-email").val(),
        "profissao": $("#cli-prof").val(),
        "salario": unformatted($("#cli-salar").val()),
        "localidade": $("#cli-local").val(),
        "localTraba": $("#cli-localTrab").val(),
        "telefone": $("#cli-cont-telf").val(),
        "telemovel": $("#cli-cont-telm").val(),
        "servico": $("#cli-cont-tels").val(),
        "ano": $("#cli-ar-ano").val(),
        "mes": $("#cli-ar-mes").val(),
        "letra": $("#cli-ar-let").val(),
        "capa": $("#cli-ar-capa").val()
    };
    $.ajax({
        url: "./bean/cliente.php",
        type: "POST",
        data: datas,
        dataType: "json",
        success: function (e) {
            if(e.result){
                callXpertAlert('Novo Cliente adcionado com sucesso!', new Mensage().checkmark, 8000);
            }
        }
    });
}

$("#cli-reg").click(function () {
    if(clienteValidacao()){ regCliente(); }
    else{
        callXpertAlert('Por favor preencha os campos obrigatório!', 'warning', 8000);
    }
});

function clienteValidacao() {
    return (validation1($(".add-new-form input, .add-new-form select")) && isMailValid($("#cli-email")));
}

function isMailValid(email)
{
    var filtro = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    var info = email.val();
    if ( filtro.test(info) || email.val() == "" ) {
        email.removeClass('empty');
        return true;
    } else {
        email.addClass('empty');
        return false;
    }
}
function limite() {
    nCount++;
    per = ant + ant + nCount + Math.trunc(nCount/mCount);
    ant = per;
    return per;
}

$(".close-history").click(function () {
    $('.history-selected').toggleClass('show');
});

function loadCreditoCliente(_idCreito, jk,_asClassShow) {
    var listPrestacao = listCredito[jk]["prestacao"];
    if(!_asClassShow) {
        var pre = new Prestacao();
        for (var h = 0; h < listPrestacao.length; h++) {
            pre.id = listPrestacao[h]["ID"];
            pre.reembolso(listPrestacao[h]["REEMBOLSO"])
                .prestacaoPaga(listPrestacao[h]["PRESTACAO PAGA"])
                .estado(listPrestacao[h]["STATE"])
                .dataEndosse((listPrestacao[h]["DATA ENDOSSADO"] == null) ? " ---------------- " : listPrestacao[h]["DATA ENDOSSADO"])
                .dataEmissao(listPrestacao[h]["DATA EMISAO"])
                .addAmortizacao(_idCreito);
        }
        $("#list-prestacao-" + _idCreito).html(pre.getListAmortiza());
    }
    else{ $("#list-prestacao-" + _idCreito).empty(); }
}

function showDataCliente(){
    $("#inf-cli-geral-nif").text(clienteData["NIF"]);
    $("#inf-cli-geral-nome").text(clienteData["NAME"]+" "+clienteData["SURNAME"]);
    $("#inf-cli-geral-dataNasc").text(clienteData["DATA NASCIMENTO"]);
    $("#inf-cli-geral-sexo").text(clienteData["SEXO"]);
    $("#inf-cli-geral-estadoCivil").text(clienteData["ESTADO CIVIL"]);
    $("#inf-cli-geral-morada").text(clienteData["MORADA"]);

    $("#inf-cli-geral-prof").text(clienteData["PROFISAO"]);
    $("#inf-cli-geral-salario").text(clienteData["CLIENTE SALARIO"]);
    $("#inf-cli-geral-lacali").text(clienteData["LOCALIDADE"]);
    $("#inf-cli-geral-localTrab").text(clienteData["LOCAL TRABALHA"]);

    $("#inf-cli-geral-telemo").text(clienteData["TELE MOVEL"]);
    $("#inf-cli-geral-telefo").text(clienteData["TELE FIXO"]);
    $("#inf-cli-geral-telSer").text(clienteData["TELE SERVICO"]);
    $("#inf-cli-geral-email").text(clienteData["MAIL"]);

    $("#inf-cli-geral-ano").text(clienteData["TRADOSSIER ANO"]);
    $("#inf-cli-geral-mes").text(clienteData["TRADOSSIER MES"]);
    $("#inf-cli-geral-letra").text(clienteData["TRADOSSIER LETRA"]);
    $("#inf-cli-geral-capa").text(clienteData["TRADOSSIER NUMERO DE CAPA"]);
}

function listCreditoCliente(_type) {

    $("#inf-cli-ano").text("Cliente desde " + clienteShortData["DATA REGISTRO"]+((Number(clienteShortData["IDADE NA EMPRESA"]) > 1) ? " - Há " + clienteShortData["IDADE NA EMPRESA"] + " Anos" : "" ));
    // $("#inf-cred-lqA").text(clienteShortData["ATRAZADO"]);
    $("#inf-cred-porPa").text(clienteShortData["POR PAGAR"]);
    $("#inf-cred-Pagos").text(clienteShortData["PAGOS"]);
    $("#inf-cred-total").text(clienteShortData["TOTAL CREDITO"]);

    $("#inf-cred-val-Pedido").text("$ "+clienteShortData["MONTANTE TOTAL SOLICITADO"]);
    $("#inf-cred-val-porPagar").text("$ "+clienteShortData["MONTANTE TOTAL POR PAGAR"]);
    $("#inf-cred-val-amorti").text("$ "+clienteShortData["MONTANTE TOTAL AMORTIZAR"]);
    $("#inf-cred-val-pago").text("$ "+clienteShortData["MONTANTE TOTAL PAGO"]);

    var lastName = clienteData['SURNAME'].split(" ");
    $("#inf-cli-name").html('<i class="icon-user-tie"></i>'+clienteData['NAME'] + " " + lastName[lastName.length - 1]);
    $("#inf-cli-career").text(clienteData["PROFISAO"]);

    $("#inf-cli-salario").text(((listCredito["CLIENTE SALARIO"] == null) ? "Indinponivel" : clienteData["CLIENTE SALARIO"]));

    //"PAGOS" : "2",

    $("#cred-list-amort").html("");
    for (var jk = 0; jk < listCredito.length; jk++) {
        if (_type == listCredito[jk]["credito"]["STATE COD"] || _type == "-1") {
            var bluider = new PrestacaoBluider();
            bluider.id = listCredito[jk]["credito"]["ID"];
            bluider.idState = listCredito[jk]["credito"]["STATE COD"];
            bluider.nunDossierCredito = listCredito[jk]["credito"]["DOSSIER"];
            bluider.nunCheckCredito = listCredito[jk]["credito"]["CHEQUE USADO"];
            bluider.dataInicioCredito = listCredito[jk]["credito"]["DATA INICIO"];
            bluider.dataFimCredito = listCredito[jk]["credito"]["DATA FIM"];
            bluider.dataCNTCredito = listCredito[jk]["credito"]["DATA FINALIZAR"];
            bluider.penalidadeCretido = listCredito[jk]["credito"]["TAEG"];
            bluider.capitalInicialCredito = listCredito[jk]["credito"]["CAPITAL INICIAL"];
            bluider.totalEfetivoCredido = listCredito[jk]["credito"]["VALOR PAGO"];
            bluider.totalCreditoAPagar = listCredito[jk]["credito"]["TOTAL CREDITO"];
            bluider.bluider(jk);

            $("#cred-list-amort").append(bluider.credito);

            tableEstructure($("#table-amortizacao-"+bluider.id));
        }
    }
}

$(".show-cred").click(function () {
    listCreditoCliente(($(this).hasClass("cred-pago") ? "0" : ($(this).hasClass("cred-porPagar") ? "1" : "-1")));
});

$("div.alphabet").on("click","span",function () {
    clienteLetra = Number($(this).attr("value"));
    carregarCliente();
});

$("#table-client").on("dblclick","tr", function () {
    credito($(this).attr("id"));
});


function getDadosCliente() {
    $("#cli-nif").val(clienteData["NIF"]);
    $("#cli-nome").val(clienteData["NAME"]);
    $("#cli-sobNome").val(clienteData["SURNAME"]);
    $("#cli-dataNasc").val(clienteData["DATA NASCIMENTO"]);
    $("#cli-sexo").val(clienteData["SEXO ID"]);
    $("#cli-stateCivil").val(clienteData["ESTADO CIVIL ID"]);
    $("#cli-mora").val(clienteData["MORADA"]);

    $("#cli-prof").val(clienteData["PROFISSAO ID"]);
    $("#cli-salar").val(clienteData["CLIENTE SALARIO"]);
    $("#cli-local").val(clienteData["LOCALIDADE ID"]);
    $("#cli-localTrab").val(clienteData["LOCAL TRABALHA ID"]);

    $("#cli-cont-telm").val(clienteData["TELE MOVEL"]);
    $("#cli-cont-telf").val(clienteData["TELE FIXO"]);
    $("#cli-cont-tels").val(clienteData["TELE SERVICO"]);
    $("#cli-email").val(clienteData["MAIL"]);

    if(clienteData["TRADOSSIER ANO"] != null)
        $("#cli-ar-ano").val(clienteData["TRADOSSIER ANO"]);
    if(clienteData["TRADOSSIER MES"] != null)
        $("#cli-ar-mes").val(clienteData["TRADOSSIER MES"]);
    if(clienteData["TRADOSSIER LETRA"] != null)
        $("#cli-ar-let").val(clienteData["TRADOSSIER LETRA"]);
    if(clienteData["TRADOSSIER NUMERO DE CAPA"] != null)
        $("#cli-ar-capa").val(clienteData["TRADOSSIER NUMERO DE CAPA"]);
}
