/**
 * Created by ahmedjorge on 9/26/16.
 */

var hasSearched = false;
$(function () {
    regUserActivity("./bean/activity.php", -1 , "Visualizou a página de cliente e créditos!", -1, LevelActivity.VISUALIZACAO );

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
        if (e.keyCode === 13) {
            functionSearch = searchClient();
            carregarCliente(true, functionSearch);
            hasSearched = true;
        }
    }).keyup(function () {
        if ($(this).val() === "") {
            functionSearch = undefined;
            carregarCliente(true, functionSearch);
            hasSearched = false;
        }
    })
});

var i = 0;
var lastI = 0;
var addTable = 0;
var clienteData = undefined;
var clienteLetra = 1;
var typeSearch = "Todos";
var addCustomerActivity = undefined;
/**
 * @type {*}
 */
var functionSearch = undefined;

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
        },beforeSend: function () {  $(".mp-loading").fadeIn(); },
        complete: function () { $(".mp-loading").fadeOut();
            carregarCliente(true, functionSearch);
        }
    });
}
$("#tableCliente").scroll(function () {
        if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
            carregarCliente(false, functionSearch);
        }
});

/**
 * @returns {*}
 */
function addLETRAS() {
    var letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var array = letras.split("");
    return $.makeArray(array);
}

/***
 * @returns {Array}
 */
function addANO() {
    var data = new Date();
    var anos = [];
    for (var i= data.getFullYear(); i>= 2008; i-- )
        anos[anos.length] = i;
     return anos;
}

/**
 * @returns {[string,string,string,string,string,string,string,string,string,string,string,string]}
 */
function addMES() {
    return ['01','02','03','04','05','06','07','08','09','10','11','12'];
}
/**
 * @param empty {boolean}
 * @param functions {function}
 */
function carregarCliente(empty, functions) {
    if(functions === undefined) {
        clienteSearch = false;
        addTable = (clientes[clienteLetra] !== undefined) ? clientes[clienteLetra].length : 0;
        if (empty) {
            $('#tableCliente').empty();
            lastI = 0;
        }

        var add = 0;
        lastI++;
        for (var ff = lastI; (ff < addTable && add < 100); ff++) {
            var client = clientes[clienteLetra][ff];
            var table = document.getElementById("tableCliente");
            var row = table.insertRow(table.childElementCount);

            row.id = ff;

            row.onclick = function () {
                $(this).addClass('selected').siblings().removeClass('selected');
            };

            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);

            cell1.innerHTML = "<i class='icon-credit-card' onclick='" + "credito(" + ff + ")'  title='Registo Crédito'></i>" +
                "<i class='icon-info' onclick='" + "inforCiente(" + ff + ")'  title='Mais Informaçõess'></i>" +
                "<i class='icon-pencil' onclick='" + "editCiente(" + ff + ")' title='Editar Cliente' ></i>";
            cell2.innerHTML = client['NIF'];
            cell3.innerHTML = client['NAME'] + " " + client['SURNAME'];
            cell4.innerHTML = client['TELE'];

            var span1 = document.createElement("span");
            span1.setAttribute("class", "total");
            var spanText1 = document.createTextNode(client['QUANTIDADE DE CREDITO']);
            span1.appendChild(spanText1);

            var span2 = document.createElement("span");
            span2.setAttribute("class", "payed");
            var spanText2 = document.createTextNode(client['creditopay']);
            span2.appendChild(spanText2);

            var porPagar = Number(client['QUANTIDADE DE CREDITO']) - Number(client['creditopay']);
            var span3 = document.createElement("span");
            span3.setAttribute("class", "doubt");
            var spanText3 = document.createTextNode(porPagar);
            span3.appendChild(spanText3);

            cell5.appendChild(span1);
            cell5.appendChild(span2);
            cell5.appendChild(span3);
            cell5.setAttribute("class", "col-credit");

            add++;
            lastI = ff;
        }
        tableEstructure($('.x-table.table-client'));
        setRowCount($('.x-table.table-client'));
    } else{
        functions();
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
            if(fill === undefined) {
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

                regUserActivity("./bean/activity.php", -1 , "Selecionou Cliente para ver as Prestações do Crédito!", -1, LevelActivity.VISUALIZACAO );
            }
        },
        beforeSend: function () {  $(".mp-loading").fadeIn(); },
        complete: function () { $(".mp-loading").fadeOut();}
    });
}
function editCiente(c, type) {
    // if(containMenu("cre.EdCl")) {
        CLIENTEEDITE = true;
        if (type === undefined)
            inforCiente(c, undefined, true);
        else
            inforCiente(c, 2, true);
    // } else{
    //     callXpertAlert("Infelizmente nao tens permiçao para efectuar o ediçao de Cliente!", new Mensage().warning, 8000);
    // }
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

function setAddCustomerActivity()
{
    addCustomerActivity = {"NIF":  $("#cli-nif").val(), "Cliente":  $("#cli-nome").val()+" "+$("#cli-sobNome").val(),
        "Data de Nascimento": $("#cli-dataNasc").val(), "Sexo": $("#cli-sexo :selected").text(),
    "Estado Civil": $("#cli-stateCivil :selected").text(), "Morada":  $("#cli-mora").val(),
    "Email": $("#cli-email").val(), "Profissão": $("#cli-prof :selected").text(), "Salário": $("#cli-salar").val(),
    "Localidade" : $("#cli-local :selected").text(), "Local de Trabalho": $("#cli-localTrab :selected").text(),
    "Telefone":  $("#cli-cont-telf").val(), "Serviço":  $("#cli-cont-tels").val(), "Ano":  $("#cli-ar-ano").val(),
    "Mês":  $("#cli-ar-mes").val(), "Letra":  $("#cli-ar-let").val(), "Capa": $("#cli-ar-capa").val()};
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
    if(containMenu("cre.regCli")) {
        getDataClienteInForm("regCliente");
        setAddCustomerActivity();

        $.ajax({
            url: "./bean/cliente.php",
            type: "POST",
            data: scli,
            dataType: "json",
            success: function (e) {
                if (e.result) {
                    callXpertAlert('Cliente registado com sucesso!', new Mensage().checkmark, 8000);
                    resetForm($(".add-new-form"));
                    $('.add-new-form').removeClass('show');
                    setTimeout(creditoNow, 800, scli);
                    var re = new refresh();
                    re.dataType = "CLIENT";
                    saveRefresh(re);

                    regUserActivity("./bean/activity.php", -1, "Registou um novo Cliente",
                        JSON.stringify(addCustomerActivity), LevelActivity.CRIACAO);
                } else {
                    callXpertAlert(e.msg, new Mensage().cross, 8000);
                }
            }
        });
    }else{
        callXpertAlert("Infelizmente, não tens permissão para efetuar o registo de cliente!", new Mensage().warning, 8000);
    }
}

$("#cli-reg").click(function () {
    if(clienteValidacao()){
        if(!CLIENTEEDITE)  {regCliente(); }
        else { editeSelectedClient(); }
    }
    else{
        callXpertAlert('Por favor, Preencha os campos obrigatórios!', 'warning', 8000);
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
                .dataEndosse((listPrestacao[h]["DATA ENDOSSADO"] === null) ? " ---------------- " : listPrestacao[h]["DATA ENDOSSADO"])
                .dataEmissao(listPrestacao[h]["DATA EMISAO"])
                .addAmortizacao();
        }
        $("#list-prestacao-" + _idCreito).html(pre.getListAmortiza());
    }
    else{ $("#list-prestacao-" + _idCreito).empty(); }
}

function showDataCliente(){
    regUserActivity("./bean/activity.php", clienteData["NIF"] , "Visualizou dados do(a) cliente "+clienteData["NAME"]+" "+clienteData["SURNAME"], -1, LevelActivity.VISUALIZACAO );

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

    regUserActivity("./bean/activity.php", -1 ,
        "Selecionou mais informações sobre crédito do(a) cliente com NIF: "+clienteData["NIF"], -1, LevelActivity.VISUALIZACAO );

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

    $("#inf-cli-salario").text(((listCredito["CLIENTE SALARIO"] === null) ? "Indisponivel" : clienteData["CLIENTE SALARIO"]));

    //"PAGOS" : "2",

    $("#cred-list-amort").html("");
    for (var jk = 0; jk < listCredito.length; jk++) {
        if (_type === listCredito[jk]["credito"]["STATE COD"] || _type === "-1") {
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
    carregarCliente(true);
});

$("#table-client").on("dblclick","tr", function () {
    credito($(this).attr("id"), (clienteSearch) ? true : undefined);
});


function getDadosCliente() {

    $("#cli-dataNasc").val(clienteData["DATA NASCIMENTO"]).attr("disabled",true);
    $("#cli-ar-ano").val((clienteData["TRADOSSIER ANO"] !== null) ? clienteData["TRADOSSIER ANO"] : "0").attr("disabled",true);
    $("#cli-ar-mes").val((clienteData["TRADOSSIER MES"] !== null) ? clienteData["TRADOSSIER MES"] : "0").attr("disabled",true);
    $("#cli-ar-let").val((clienteData["TRADOSSIER LETRA"] !== null) ? clienteData["TRADOSSIER LETRA"] : "0").attr("disabled",true);
    $("#cli-local").val((clienteData["LOCALIDADE ID"] !== null) ? clienteData["LOCALIDADE ID"] : "0").attr("disabled",true);
    $("#cli-ar-capa").val(clienteData["TRADOSSIER NUMERO DE CAPA"]).attr("disabled",true);

    if(clienteData["TRADOSSIER ANO"] === null){ $("#cli-ar-ano").removeAttr("disabled"); }

    if(clienteData["DATA NASCIMENTO"] === null){ $("#cli-dataNasc").removeAttr("disabled"); }

    if(clienteData["TRADOSSIER MES"] === null){ $("#cli-ar-mes").removeAttr("disabled"); }

    if(clienteData["TRADOSSIER LETRA"] === null){ $("#cli-ar-let").removeAttr("disabled"); }

    if(clienteData["LOCALIDADE ID"] === null){ $("#cli-local").removeAttr("disabled"); }

    if(clienteData["TRADOSSIER NUMERO DE CAPA"] === null){ $("#cli-ar-capa").removeAttr("disabled"); }


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

    if(valorEstaNoArray(clienteData["TRADOSSIER LETRA"], addLETRAS())){  $("#cli-ar-let").val("0") }

    if(valorEstaNoArray(clienteData["TRADOSSIER MES"], addMES())){ $("#cli-ar-mes").val("0")  }

    isNull($(".add-new-form select"));
}

$("#cred-pay-bt").click(function () {
    if (containMenu("cre.pgto")) {
        var paymentActivity, typePayment;
        if (validation1($("#cred-pay-form input, #cred-pay-form select"))) {

            var paga = new Pagamento();
            paga.id = prestacaoS["ID"];
            paga.data = $("#cred-pay-data").val();
            paga.type = ( !$("#cred-pay-dife").hasClass("icon-checkbox-checked") ? "S"
                : (!$("#cred-pay-fazea").hasClass("icon-checkbox-checked") ? "D"
                    : "F") );
            paga.idBank = $("#cred-pay-bank").val();
            paga.value = unformatted($("#cred-pay-value").val());
            paga.doc = $("#cred-pay-doc").val();

            typePayment = ( !$("#cred-pay-dife").hasClass("icon-checkbox-checked") ? "Semelhante"
                : (!$("#cred-pay-fazea").hasClass("icon-checkbox-checked") ? "Diferente"
                    : "Faseado") );

            paymentActivity = {
                "Data": paga.data, "Banco": $("#cred-pay-bank :selected").text(), "Valor": $("#cred-pay-value").val(),
                "Número de Documento": paga.doc, "Tipo de Pagamento": typePayment
            };


            $.ajax({
                url: "./bean/cliente.php",
                type: "POST",
                data: {"intensao": "efectuarPagamento", pagamento: paga},
                dataType: "json",
                success: function (e) {
                    if (e.result != true) {
                        callXpertAlert(e.msg, new Mensage().cross, -1);
                    }
                    else {
                        callXpertAlert("Novo pagamento registado sucesso!", new Mensage().checkmark, 8000);
                        regUserActivity("./bean/activity.php", -1, "Efetuou um novo Pagamento!", JSON.stringify(paymentActivity), LevelActivity.CRIACAO);
                        $('#cred-pay-form').closest('.modalPage').fadeOut(300);
                        setTimeout(reloadPestacaoCreditdo, 700);
                        var re = new refresh();
                        re.dataType = "PAYMENT";
                        saveRefresh(re);
                    }
                },
                beforeSend: function () {
                    $(".mp-loading").fadeIn();
                },
                complete: function () {
                    $(".mp-loading").fadeOut();
                }
            });
        }
    } else {
        callXpertAlert("Infelizmente nao tens permissao para efectuar o pagamento de prestaçao!", new Mensage().warning, 8000);
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
            $('#tableCliente').empty();
            lastI = 0;
            listSearchCLients = e.data;
            functionSearch = loadDataSearch();
            // loadDataSearch();
        }
    });
}

function loadDataSearch() {
    clienteSearch = true;
    var add = 0;
    for (var i = lastI; i< listSearchCLients.length && add < 100 ; i++) {
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

        var span1 = document.createElement("span");
        span1.setAttribute("class","total");
        var spanText1 = document.createTextNode(client['QUANTIDADE DE CREDITO']);
        span1.appendChild(spanText1);

        var span2 = document.createElement("span");
        span2.setAttribute("class","payed");
        var spanText2 = document.createTextNode(client['creditopay']);
        span2.appendChild(spanText2);

        var porPagar = Number(client['QUANTIDADE DE CREDITO'])-Number(client['creditopay']);
        var span3 = document.createElement("span");
        span3.setAttribute("class","doubt");
        var spanText3 = document.createTextNode(porPagar);
        span3.appendChild(spanText3);

        cell5.appendChild(span1);
        cell5.appendChild(span2);
        cell5.appendChild(span3);
        cell5.setAttribute("class","col-credit");
        add++;
        lastI = i;
    }
    tableEstructure($('.x-table.table-client'));
    setRowCount($('.x-table.table-client'));
}

function reloadPestacaoCreditdo() {
    reShowDataClient = true;
    inforCiente(iSeletedCliente, (clienteSearch) ? true : undefined);
}

function editeSelectedClient() {
    if(containMenu("cre.EdiCli")) {
        getDataClienteInForm("editeSelectedClient");
        $.ajax({
            url: "./bean/cliente.php",
            type: "POST",
            data: scli,
            dataType: "json",
            success: function (e) {
                if (e.result) {
                    callXpertAlert('O Cliente foi editado com sucesso!', new Mensage().checkmark, 8000);
                    var re = new refresh();
                    re.dataType = "CLIENT";
                    $('.add-new-form').removeClass('show');
                    saveRefresh(re);

                    regUserActivity("./bean/activity.php", scli.nif, "Atualizou informações do(a) cliente "+
                        scli.nome+" "+scli.apelido, -1, LevelActivity.ATUALIZACAO);

                    if (DOCREDITO) setTimeout(creditoNow, 800, scli);
                } else {
                    callXpertAlert(e.msg, new Mensage().cross, 8000);
                }
            },
            beforeSend: function () {
                $(".mp-loading").fadeIn();
            },
            complete: function () {
                $(".mp-loading").fadeOut();
            }
        });
    }else{
        callXpertAlert("Infelizmente não tens permissão para efetuar a edição dos dados do(a) cliente!", new Mensage().warning, 8000);
    }
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

                regUserActivity("./bean/activity.php", -1 , "Selecionou Cliente para efetuar crédito!", -1, LevelActivity.VISUALIZACAO );
       /*     }
        },
        beforeSend: function () {  $(".mp-loading").fadeIn(); },
        complete: function () { $(".mp-loading").fadeOut();}
    });*/
 }

var FullPay = function () {
    this.idCred = undefined;
    this.data = undefined;
    this.doc = undefined;
    this.bank = undefined;
    this.desconto = undefined;
    this.corecao = undefined;
    this.startValue = undefined;
    this.paydValue = undefined;
    this.reValue = undefined;
    this.difenceValue = undefined;
    this.opcao = undefined;
    this.type = undefined;
};

/**
 * @type {FullPay}
 */
var payfull = new FullPay();
/**
 * @type {*}
 */
var payfullData = undefined;

function getDadosPayFull() {
    iPrestacao = $(this).attr("jk");
    if(payfull.idCred === undefined) {
        payfull.idCred = $(this).attr("l-id");
        payfull.bank = -1;
        payfull.desconto = 0;
        payfull.corecao = 0;
        payfull.opcao = $('#full-pay-op span.active').text();
        payfull.data = getStringDate();
    } else {
        if(!validation1($("#full-pay-corr, #full-pay-desco, #full-pay-data"))) return true;
        payfull.bank = $("#full-pay-bank").val();
        payfull.desconto = $('#full-pay-desco').val();
        payfull.corecao = $('#full-pay-corr').val();
        payfull.opcao = $('#full-pay-op span.active').text();
        payfull.data = $("#full-pay-data").val();
    }

    $("#full-pay-data").val(payfull.data);

    $.ajax({
        url: "./bean/cliente.php",
        type: "POST",
        data: {intensao: "regPavementFull", payFull : payfull},
        dataType: "json",
        success: function (e) {
            if(e.result) {
                payfullData = e.return;
                payfull.paydValue = payfullData.creditpago;
                payfull.reValue = payfullData.valuerecalculated;
                payfull.difenceValue = payfullData.valuerecalculated;
                payfull.startValue = payfullData.creditvalue;

                $("#full-pay-dife").html(formattedString(Number(payfull.difenceValue).dc().rp()));
                $("#full-pay-start").html(formattedString(Number(payfull.startValue).dc().rp()));
                $("#full-pay-recal").html(formattedString(Number(payfull.reValue).dc().rp()));
                $("#full-pay-pago").html(formattedString(Number(payfull.paydValue).dc().rp()));

                openModalFrame($('.mp-liquidar-full'));
            } else { callXpertAlert(e.msg, new Mensage().cross, 8000); }
        },
        beforeSend: function () { $(".mp-loading").fadeIn(); },
        complete: function () { $(".mp-loading").fadeOut(); }
    });
}

$(".changeValuePayFull").change(function () { getDadosPayFull(); });

$("#full-pay-bt").click(function () {

    var fullPaymentActivity;
    if($("#full-pay-dife-che").hasClass("icon-checkbox-checked")){
        if(!validation1($("#full-pay-bank, #full-pay-numDoc")))
            return false;
        payfull.bank = $("#full-pay-bank").val();
        payfull.doc = $("#full-pay-numDoc").val();
    }else{
        payfull.bank = "null";
        payfull.doc = "null";
    }
    payfull.type = ( !$("#full-pay-dife-che").hasClass("icon-checkbox-checked") ? "S" : "D" );

     if(payfull.bank !== "null")
     {
         fullPaymentActivity = {"Banco":  $("#full-pay-bank :selected").text(), "Número de Documento": payfull.doc,
         "Tipo de Pagamento": (!$("#full-pay-dife-che").hasClass("icon-checkbox-checked") ? "Semelhante" : "Diferente" ) };
     }
     else
         fullPaymentActivity = {"Tipo de Pagamento": (!$("#full-pay-dife-che").hasClass("icon-checkbox-checked") ? "Semelhante" : "Diferente" ) };



    $.ajax({
        url: "./bean/cliente.php",
        type: "POST",
        data: {intensao: "regPayFullNow", payFull : payfull},
        dataType: "json",
        success: function (e) {
            if(e.result) {
                $('.mp-liquidar-full').closest('.modalPage').fadeOut(300);
                callXpertAlert('Novo pagamento antecipado registado com sucesso!', new Mensage().checkmark, 8000);
                regUserActivity("./bean/activity.php", -1 , "Pagamento antecipado registado com sucesso!",
                    JSON.stringify(fullPaymentActivity), LevelActivity.CRIACAO );
                setTimeout(reloadPestacaoCreditdo, 700);
                var re = new refresh();
                re.dataType = "PAYMENT";
                saveRefresh(re);
            }
            else { callXpertAlert(e.msg, new Mensage().cross, 8000); }
        },
        beforeSend: function () { $(".mp-loading").fadeIn(); },
        complete: function () { $(".mp-loading").fadeOut(); }
    });
});


/***
 *
 * @param value string
 * @param ar array
 * @return string
 */
function valorEstaNoArray(value, ar) {
    /**
     * @type {Array}
     */
    for (var ari=0; ari< ar.length; ari++){
        if((value+"") === (ar[ari]+"")){
            return true;
        }
    }
    return false;
}
