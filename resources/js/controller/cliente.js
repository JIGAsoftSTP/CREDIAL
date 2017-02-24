/**
 * Created by ahmedjorge on 9/26/16.
 */

$(function () {
    regUserActivity("./bean/activity.php", -1 , "Visualizou a pagina de cliente e creditos!", -1, LevelActivity.VISUALIZACAO );

    listarCliente();
    loadComoBox($("#cli-ar-ano"),addANO());
    loadComoBox($("#cli-ar-mes"),addMES());
    loadComoBox($("#cli-ar-let"),addLETRAS());
    loadOutherData();
    /*$("#cli-dataNasc").mask("99-99-9999");*/

    $("#span-type-search-client i").click(function () {
       typeSearch = $(this).attr("title");
    });

    $("#client-search").keypress(function (e) {
        if(e.keyCode === 13)
            searchClient();
    }).keyup(function () {
        if($(this).val() === ""){
            carregarCliente();
        }
    })
});

var i = 0;
var lastI = 0;
var per = 1;
var ant = 0;
var nCount = 0;
var mCount = 5;
var addTable = 0;
var clienteData = undefined;
var clienteLetra = 1;
var typeSearch = "NIF";

var clientes = [];
var listSearchCLients = [];
function listarCliente() {
    $.ajax({
        url: "./bean/cliente.php",
        type: "POST",
        data: {"intensao": "listarCliente"},
        dataType: "json",
        success: function (e) {
            clientes = e.data;
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
    var anos = [];
    for (var i= data.getFullYear(); i>= 2008; i-- )
        anos[anos.length] = i;
     return anos;
}

function addMES() {
    return ['01','02','03','04','05','06','07','08','09','10','11','12'];
}

function carregarCliente() {
    var carregou = false;
    clienteSearch = false;
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
        var cell5 = row.insertCell(4);

        cell1.innerHTML = "<i class='icon-credit-card' onclick='"+"credito("+ff+")'  title='Registo Crédito'></i>" +
                        "<i class='icon-info' onclick='"+"inforCiente("+ff+")'  title='Mais Informaçõess'></i>" +
                        "<i class='icon-pencil' onclick='"+"editCiente("+ff+")' title='Editar Cliente' ></i>";
        cell2.innerHTML = client['NIF'];
        cell3.innerHTML = client['NAME']+" "+client['SURNAME'];
        cell4.innerHTML = client['TELE'];
        cell5.innerHTML = client['QUANTIDADE DE CREDITO'];
        carregou = true;
        // lastI = ff;
    }
    // i = lastI+1;
    if(carregou) {
        tableEstructure($('.x-table.table-client'));
        setRowCount($('.x-table.table-client'));
    }

}

function credito(a, type) {
    clientIsCompleto(a, type);
}

var listCredito = [];
var clienteShortData = undefined;
var reShowDataClient = false;
var iSeletedCliente = undefined;
function inforCiente(b, type, fill) {
    iSeletedCliente = b;
    $.ajax({
        url: "./bean/cliente.php",
        type: "POST",
        data: {"intensao": "loadStatusClient", "nifCliente": (type !== undefined ? listSearchCLients[b]["NIF"] :clientes[clienteLetra][b]["NIF"]), fill : fill},
        dataType: "json",
        success: function (e) {
            clienteData = e.resultRealDataCliente;
            if(fill == undefined) {
                listCredito = e.resultCredito;
                clienteShortData = e.resultClient;
                listCreditoCliente("-1");
                if(!reShowDataClient)
                    setTimeout(function () {
                        $('.history-selected').toggleClass('show');
                    }, 700);
                else
                    setTimeout(showAmortizacao, 800,idCredSeleted, iPrestacao, false);
                reShowDataClient = false;
                //regUserActivity("./bean/activity.php", b , "Selecionou o Historico do cliente!", -1, LevelActivity.VISUALIZACAO );
            }
            else {
                $('.add-new-form').toggleClass('show');
                $('.add-new-form h1').text('Editar cliente');
                $("#cli-reg").text('Editar cliente');
                getDadosCliente();

                regUserActivity("./bean/activity.php", -1 , "Selecionou Cliente para ver as prestaçoes do credito!", -1, LevelActivity.VISUALIZACAO );
            }
        },
        beforeSend: function () {  $(".mp-loading").fadeIn(); },
        complete: function () { $(".mp-loading").fadeOut();}
    });
}
function editCiente(c, type) {
    CLIENTEEDITE = true;
   if(type === undefined)
      inforCiente(c, undefined, true);
   else
       inforCiente(c, 2, true);
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

var scli = undefined;
function getDataClienteInForm(intensao) {
    scli = {
        "intensao": intensao,
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
}
/**
 * @param dt {scli}
 */
function creditoNow(dt) {
    $("#cred-cli-nif").text(dt.nif+" - ");
    var lastName = (dt.sobNome).split(" ");
    $("#cred-cli-comName").text(dt.nome+" "+lastName[lastName.length-1]);
    si.nifClient = dt.nif;
    openModalFrame($('.mp-new-credit'));
    tableEstructure($('#table-liquid'));
}

function regCliente() {
    getDataClienteInForm("regCliente");
    $.ajax({
        url: "./bean/cliente.php",
        type: "POST",
        data: scli,
        dataType: "json",
        success: function (e) {
            if(e.result){
                callXpertAlert('Novo Cliente adcionado com sucesso!', new Mensage().checkmark, 8000);
                resetForm($(".add-new-form"));
                $('.add-new-form').removeClass('show');
                setTimeout(creditoNow, 800, scli);
                var re = new refresh();
                re.dataType = "CLIENT";
                saveRefresh(re);
                regUserActivity("./bean/activity.php", scli.nif , "Novo cliente registrado com sucesso", JSON.stringify(scli), LevelActivity.CRIACAO );
            }else {
                callXpertAlert(e.msg, new Mensage().cross, 8000);
            }
        }
    });
}

$("#cli-reg").click(function () {
    if(clienteValidacao()){
        if(!CLIENTEEDITE)  {regCliente(); }
        else { editeSelectedClient(); }
    }
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

// function limite() {
//     nCount++;
//     per = ant + ant + nCount + Math.trunc(nCount/mCount);
//     ant = per;
//     return per;
// }

$(".close-history").click(function () {
    $('.history-selected').toggleClass('show');
});

var listPrestacao = undefined;
var iPrestacao = undefined;
var idCredSeleted = undefined;
function loadCreditoCliente(_idCreito, jk,_asClassShow) {
    listPrestacao = listCredito[jk]["prestacao"];
    iPrestacao = jk;
    idCredSeleted = _idCreito;
    if(!_asClassShow) {
        var pre = new Prestacao();
        for (var h = 0; h < listPrestacao.length; h++) {
            pre.id = listPrestacao[h]["ID"];
            pre.i = h;
            pre.reembolso(listPrestacao[h]["REEMBOLSO"])
                .prestacaoPaga(listPrestacao[h]["PRESTACAO PAGA"])
                .estado(listPrestacao[h]["STATE"])
                .dataEndosse((listPrestacao[h]["DATA ENDOSSADO"] == null) ? " ---------------- " : listPrestacao[h]["DATA ENDOSSADO"])
                .dataEmissao(listPrestacao[h]["DATA EMISAO"])
                .addAmortizacao();
        }
        $("#list-prestacao-" + _idCreito).html(pre.getListAmortiza());
    }
    else{ $("#list-prestacao-" + _idCreito).empty(); }
}

function showDataCliente(){
    regUserActivity("./bean/activity.php", clienteData["NIF"] , "Visualizou dados de cliente "+clienteData["NAME"]+" "+clienteData["SURNAME"], JSON.stringify(clienteData), LevelActivity.VISUALIZACAO );

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

    regUserActivity("./bean/activity.php", clienteData["NIF"] , "Selecionou mais informaçoes sobre credito cliente", JSON.stringify(clienteData), LevelActivity.VISUALIZACAO );

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
    credito($(this).attr("id"), (clienteSearch) ? true : undefined);
});


function getDadosCliente() {

    $("#cli-dataNasc").val(clienteData["DATA NASCIMENTO"]).attr("disabled",true);
    $("#cli-ar-ano").val((clienteData["TRADOSSIER ANO"] != null) ? clienteData["TRADOSSIER ANO"] : "0").attr("disabled",true);
    $("#cli-ar-mes").val((clienteData["TRADOSSIER MES"] != null) ? clienteData["TRADOSSIER MES"] : "0").attr("disabled",true);
    $("#cli-ar-let").val((clienteData["TRADOSSIER LETRA"] != null) ? clienteData["TRADOSSIER LETRA"] : "0").attr("disabled",true);
    $("#cli-local").val((clienteData["LOCALIDADE ID"] != null) ? clienteData["LOCALIDADE ID"] : "0").attr("disabled",true);
    $("#cli-ar-capa").val(clienteData["TRADOSSIER NUMERO DE CAPA"]).attr("disabled",true);

    if(clienteData["TRADOSSIER ANO"] === null){ $("#cli-ar-ano").removeAttr("disabled"); }

    if(clienteData["DATA NASCIMENTO"] == null){ $("#cli-dataNasc").removeAttr("disabled"); }

    if(clienteData["TRADOSSIER MES"] == null){ $("#cli-ar-mes").removeAttr("disabled"); }

    if(clienteData["TRADOSSIER LETRA"] == null){ $("#cli-ar-let").removeAttr("disabled"); }

    if(clienteData["LOCALIDADE ID"] == null){ $("#cli-local").removeAttr("disabled"); }

    if(clienteData["TRADOSSIER NUMERO DE CAPA"] == null){ $("#cli-ar-capa").removeAttr("disabled"); }

    $("#cli-nif").val(clienteData["NIF"]).attr("disabled",true);
    $("#cli-nome").val(clienteData["NAME"]).attr("disabled",true);
    $("#cli-sobNome").val(clienteData["SURNAME"]).attr("disabled",true);
    $("#cli-sexo").val(clienteData["SEXO ID"]).attr("disabled",true);

    $("#cli-stateCivil").val(clienteData["ESTADO CIVIL ID"]);
    $("#cli-mora").val(clienteData["MORADA"]);

    $("#cli-prof").val(clienteData["PROFISSAO ID"]);
    $("#cli-salar").val(clienteData["CLIENTE SALARIO"]);
    $("#cli-localTrab").val(clienteData["LOCAL TRABALHA ID"]);

    $("#cli-cont-telm").val(clienteData["TELE MOVEL"]);
    $("#cli-cont-telf").val(clienteData["TELE FIXO"]);
    $("#cli-cont-tels").val(clienteData["TELE SERVICO"]);
    $("#cli-email").val(clienteData["MAIL"]);

    isNull($(".add-new-form select"));
}

$("#cred-pay-bt").click(function () {
    if(validation1($("#cred-pay-form input, #cred-pay-form select"))){

        var paga = new Pagamento();
        paga.id = prestacaoS["ID"];
        paga.data = $("#cred-pay-data").val();
        paga.type = ( !$("#cred-pay-dife").hasClass("icon-checkbox-checked") ? "S"
            : (!$("#cred-pay-fazea").hasClass("icon-checkbox-checked") ? "D"
                : "F") );
        paga.idBank = $("#cred-pay-bank").val();
        paga.value = unformatted($("#cred-pay-value").val());
        paga.doc = $("#cred-pay-doc").val();

        $.ajax({
            url: "./bean/cliente.php",
            type: "POST",
            data: {"intensao": "efectuarPagamento", pagamento : paga },
            dataType: "json",
            success: function (e) {
                if (e.result != true) {  callXpertAlert(e.msg, new Mensage().cross, -1); }
                else {
                    callXpertAlert("Novo pagamento registado sucesso!", new Mensage().checkmark, 8000);
                    $('#cred-pay-form').closest('.modalPage').fadeOut(300);
                    setTimeout(reloadPestacaoCreditdo, 700);
                    var re = new refresh();
                    re.dataType = "PAYMENT";
                    saveRefresh(re);
                }
            },
            beforeSend: function () {  $(".mp-loading").fadeIn(); },
            complete: function () { $(".mp-loading").fadeOut(); }
        });
    }
});

var clienteSearch = false;
function searchClient()
{
    var value = $("#client-search").val();
    value = value.toUpperCase();
    $.ajax({
       url: "bean/pesquisaCliente.php",
        type: "POST",
       dataType: "json",
       data:{"intensao" : "search client", "search" : typeSearch, "valueSearch": value},
        success:function (e) {
            listSearchCLients = e.data;

            $('#tableCliente').empty();
            clienteSearch = true;
            for (var i = 0; i< listSearchCLients.length ; i++) {
                var client = listSearchCLients[i];
                var table = document.getElementById("tableCliente");
                var row = table.insertRow(table.childElementCount);

                row.id = i;
                row.onclick = function () { $(this).addClass('selected') .siblings().removeClass('selected'); };

                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var cell5 = row.insertCell(4);

                cell1.innerHTML = "<i class='icon-credit-card' onclick='"+"credito("+i+", 2)' ></i>" +
                    "<i class='icon-info' onclick='"+"inforCiente("+i+", 2)' ></i>" +
                    "<i class='icon-pencil' onclick='"+"editCiente("+i+", 2)' ></i>";
                cell2.innerHTML = client['NIF'];
                cell3.innerHTML = client['NAME']+" "+client['SURNAME'];
                cell4.innerHTML = client['TELE'];
                cell5.innerHTML = client['QUANTIDADE DE CREDITO'];
                carregou = true;
                // lastI = ff;
            }
            tableEstructure($('.x-table.table-client'));
            setRowCount($('.x-table.table-client'));
        }
    });
}

function reloadPestacaoCreditdo() {
    reShowDataClient = true;
    inforCiente(iSeletedCliente, (clienteSearch) ? true : undefined);
}

function editeSelectedClient() {
    getDataClienteInForm("editeSelectedClient");
    $.ajax({
        url: "./bean/cliente.php",
        type: "POST",
        data: scli,
        dataType: "json",
        success: function (e) {
            if(e.result) {
                callXpertAlert('O Cliente foi editado com sucesso!', new Mensage().checkmark, 8000);
                var re = new refresh();
                re.dataType = "CLIENT";
                $('.add-new-form').removeClass('show');
                saveRefresh(re);

                regUserActivity("./bean/activity.php", scli.nif , "Concluio a Ediçao de Cliente!", JSON.stringify(scli), LevelActivity.ATUALIZACAO );

                if(DOCREDITO) setTimeout(creditoNow, 800, scli);
            } else {
                callXpertAlert(e.msg, new Mensage().cross, 8000);
            }
        },
        beforeSend: function () {  $(".mp-loading").fadeIn(); },
        complete: function () { $(".mp-loading").fadeOut(); }
    });
}

function clientIsIncomple() {
    var rt = (clienteData["CLIENTE SALARIO"] === null
        || clienteData["DATA NASCIMENTO"] === null
        || clienteData["LOCALIDADE"] === null
        || clienteData["TELE MOVEL"] === null
        || clienteData["TRADOSSIER ANO"] === null
        || clienteData["TRADOSSIER LETRA"] === null
        || clienteData["TRADOSSIER MES"] ===  null
        || clienteData["TRADOSSIER NUMERO DE CAPA"] === null
        || clienteData["TRADOSSIER SEQUENCIA"] === null);
    return  rt;
}

 function clientIsCompleto(b,type) {
    /*$.ajax({
        url: "./bean/cliente.php",
        type: "POST",
        data: {"intensao": "loadStatusClient", "nifCliente": (type !== undefined ? listSearchCLients[b]["NIF"] :clientes[clienteLetra][b]["NIF"]), fill : true},
        dataType: "json",
        success: function (e) {
            clienteData = e.resultRealDataCliente;
            if(clientIsIncomple()){
                getDadosCliente();
                CLIENTEEDITE = true;
                DOCREDITO = true;
                $('.add-new-form').toggleClass('show');
                $('.add-new-form h1').text('Editar cliente');
                $("#cli-reg").text('Editar cliente');
                callXpertAlert('Cliente com dados incompletos<br>por favor atualize os dados!', new Mensage().warning, -1);
            } else {*/
                $("#cred-cli-nif").text((type !== undefined ?listSearchCLients[b]["NIF"]: clientes[clienteLetra][b]["NIF"])+" - ");
                var lastName = (type !== undefined ?listSearchCLients[b]["SURNAME"]: clientes[clienteLetra][b]['SURNAME']).split(" ");
                $("#cred-cli-comName").text((type !== undefined ?listSearchCLients[b]["NAME"]:clientes[clienteLetra][b]['NAME'])+" "+lastName[lastName.length-1]);
                nifClient = type !== undefined ?listSearchCLients[b]["NIF"] : clientes[clienteLetra][b]["NIF"];
                si.nifClient = nifClient;
                openModalFrame($('.mp-new-credit'));
                tableEstructure($('#table-liquid'));

                regUserActivity("./bean/activity.php", -1 , "Selecionou Cliente para efectuar credito!", -1, LevelActivity.VISUALIZACAO );
       /*     }
        },
        beforeSend: function () {  $(".mp-loading").fadeIn(); },
        complete: function () { $(".mp-loading").fadeOut();}
    });*/
 }


