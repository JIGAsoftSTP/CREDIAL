/**
 * Created by ahmedjorge on 9/30/16.
 */
$(function () {
    loadDataSimulation();
    /*$("#cred-data").mask("99-99-9999");
    $("#cred-pay-data").mask("99-99-9999");*/
});
function validarSimulacao(element) {
    return validation1(element);
}

var Simulation = function () {};
Simulation.prototype.nifClient = "";
Simulation.prototype.valorCredito = "";
Simulation.prototype.totalPagar = "";
Simulation.prototype.numeroPrestacao = "";
Simulation.prototype.dataInicio = "";
Simulation.prototype.dataFinalizar = "";
Simulation.prototype.idTaxa = "";
Simulation.prototype.numeroCheque = undefined;
Simulation.prototype.objectoFontePagamento = "";
Simulation.prototype.idCheque = undefined;
Simulation.prototype.valorDesconto = 0;
Simulation.prototype.objectoTipoCredito = "";
Simulation.prototype.taeg = 0;
Simulation.prototype.listGara = [];
Simulation.prototype.listDocu = [];
Simulation.prototype.numSemanaMes = 0;
Simulation.prototype.dia = 0;
Simulation.prototype.data = "";
Simulation.prototype.reembolsoPeriodo = 0;
Simulation.prototype.dataTableAmortizacao = [];
Simulation.prototype.valorAmotizado = 0;
Simulation.prototype.idBank = 0;
Simulation.prototype.idForRegBank = 0;
Simulation.prototype.bankState = 0;

var si = new Simulation();
/**
 * @type {Array}
 */
var banks = undefined;
$("#cred-simula-import").click(function () {
   var creditoRegisto;
    $.ajax({
        url: "./bean/simulation.php",
        type: "POST",
        data: {"intensao": "import-simulation", "simulation": si},
        dataType: "json",
        success: function (e) {
            if (!e.result) {  callXpertAlert(e.return["MESSAGE"], new Mensage().cross, -1); }
            else {
                creditoRegisto = {"Número de Dossier" : e.return["NUM DOSSIER"], "Número de Cheque" : e.return["NUM CHEQUE"],
                "Banco" :e.return["BANCO NAME"], "Sigla do Banco" :  e.return["BANCO SIGLA"]};
                regUserActivity("./bean/activity.php", e.return["NUM DOSSIER"] ,
                    "Registou novo Crédito com o Dossier "+e.return["NUM DOSSIER"], JSON.stringify(creditoRegisto), LevelActivity.CRIACAO );

                $(".mp-confirm-simulation").fadeOut();
                callXpertAlert("<b>" + "Numero Dossier: </b>" + e.return["NUM DOSSIER"] + "<br>" +
                    "<b>" + "Numero Cheque: </b>" + e.return["NUM CHEQUE"] + "<br>" +
                    "<b>" + "Nome Banco: </b>" + e.return["BANCO NAME"] + "<br>" +
                    "<b>" + "Sigla Banco: </b>" + e.return["BANCO SIGLA"], new Mensage().checkmark, -1);
                var re = new refresh();
                re.dataType = "CLIENT";
                si = new Simulation();
                saveRefresh(re);
                resetForm($(".mp-new-credit").fadeOut(800));
            }
        }
    });
});

$("#start-simulation").click(function () {
    if(validarSimulacao($(".xpert-form .part-1 input, .xpert-form .part-1 select"))){
        var dt = {"intensao": "start-simulation", "value" : unformatted($("#cred-value").val()),"data" : $("#cred-data").val(), "dia":$("#cred-dia").val(),
                "correcao":unformatted($("#cred-corr").val()),"desconto":$("#cred-desco").val(), "opcao" : $('.master-add-customer span.active').text(),
                "tipoCredtio":$("#cred-tipoCred").val()};

        si.valorCredito = unformatted($("#cred-value").val());
        si.objectoTipoCredito = $("#cred-tipoCred").val();
        si.dataInicio = $("#cred-data").val();

        $.ajax({
            url: "./bean/simulation.php",
            type: "POST",
            data: dt,
            dataType: "json",
            success: function (e) {
                if (e.result) {
                   /* $("#cred-taxa").text(Number(e.return['TAXA']).dc().rp());*/
                    $("#cred-peri").text(e.return['PERIODO']);
                    $("#cred-capi").text(formattedString(Number(e.return['CAPITAL']).dc().rp()));
                   /*  $("#cred-taxaS").text(formattedString(Number(e.return['TAXA SEM DESCONTO']).dc().rp()));
                    $("#cred-taxaC").text(formattedString(Number(e.return['TAXA COM DESCONTO']).dc().rp()));*/
                    $("#cred-totalPagar").text(formattedString(Number(e.return['TOTAL PAGAR']).dc().rp()));
                   /* $("#cred-prest").text(formattedString(Number(e.return['PRESTACAO']).dc().rp()));*/
                    $("#cred-reePer").text(formattedString(Number(e.return['REEMBOLSO/PRESTACAO']).dc().rp()));
                    /*$("#cred-segu").text(formattedString(Number(e.return['SEGURO']).dc().rp()));*/

                    si.numSemanaMes = Number(e.return["NUMERO SEMANA MES"]);
                    si.dia = Number($("#cred-dia").val());
                    si.data = $("#cred-data").val();
                    si.reembolsoPeriodo = Number(e.return['REEMBOLSO/PRESTACAO']).dc();
                    si.totalPagar = Number(e.return['TOTAL PAGAR']).dc();
                    si.numeroPrestacao = Number(e.return['PERIODO']).dc();
                    si.valorDesconto = Number($("#cred-desco").val()).dc();
                    si.taeg = Number(e.return['TAXA COM DESCONTO']).dc();
                    si.idTaxa = Number(e.return['ID TAXA INFERIOR']).dc();
                    banks = e.banks;
                    addBancoCheque($("#cred-cli-bank-list"), e.banks);

                    /*"ID TAXA INFERIOR":"51"*/
                    bluiderTablePestacao();

                    regUserActivity("./bean/activity.php", -1 , "Efetuou uma simulação!", JSON.stringify(si), LevelActivity.OUTROS );

                }
                else {
                    callXpertAlert(e.return['MESSAGE'], new Mensage().cross, 8000);
                    $('section .part-2 b').text("0,0");
                    $("#cred-totalPagar").text("0,0");
                    /*$("#cred-cli-bank").html('<option value="0">(Banco)</option>');*/

                    si.dataTableAmortizacao = [];

                    si.numSemanaMes = 0;
                    si.dia = 0;
                    si.data = "";
                    si.reembolsoPeriodo = 0;
                    si.totalPagar = 0;
                    si.numeroPrestacao = 0;
                    si.valorDesconto = 0;
                    si.taeg = 0;
                    i.idTaxa = 0;
                }
            }
        });
    }
});

function loadDataSimulation() {
    $("#cred-data").val(getStringDate());
    $.ajax({
        url: "./bean/simulation.php",
        type: "POST",
        data: {"intensao":"load-data"},
        dataType: "json",
        success: function (e) {
            loadComoBoxIDandValue($("#cred-tipoCred"), e.tipocreditos, "ID", "DESC");

            loadComoBoxIDandValue($("#cred-tab-amor-banco"), e.banks, "ID", "DESCRICAO");
            loadComoBoxIDandValue($("#cred-pay-bank"), e.banks, "ID", "DESCRICAO");
            loadComoBoxIDandValue($("#full-pay-bank"), e.banks, "ID", "DESCRICAO");
            loadComoBoxIDandValue($("#cred-tab-amor-tipoPagamento"), e.fontepagamentos, "ID", "DESC");

            loadComoBoxIDandValue($("#cred-cli-modaPag"), e.fontepagamentos, "ID", "DESC");
            loadComoBoxIDandValue($("#cred-cli-fonRend"), e.tipopagamentos, "ID", "DESC");

            /*loadComoBoxIDandValue($("#cred-cli-list-docu"), e.tipodocumentos, "ID", "DESC");
            loadComoBoxIDandValue($("#cred-cli-list-gara"), e.garantias, "ID", "DESC");*/

            loadDcomentOrGarrant($("#cred-cli-list-docu"),e.tipodocumentos,"ID","DESC");
            loadDcomentOrGarrant($("#cred-cli-list-gara"),e.garantias,"ID","DESC");
        }
    });
}

var id = -1;
function bluiderTablePestacao() {

    si.dataTableAmortizacao = [];
    $("#cred-table-prestacao").html("");
    for (var i = 0; i < si.numeroPrestacao ; i++ ) {

        var arData = ((i+1) === si.numeroPrestacao ) ? si.dataInicio.split("-") : si.data.split("-");

        var depois = new Date();
        depois.setUTCFullYear(Number(arData[2]));
        depois.setMonth(Number(arData[1]) -1);
        depois.setDate(Number(arData[0]));

        depois.setDate(depois.getDate() + (((i+1) === (si.numeroPrestacao ) ) ? (Number(si.dia) -1) : ((Number(si.dia) / Number(si.numeroPrestacao)) -1)));
        si.data =  depois.getDate()+"-"+(depois.getMonth()+1)+"-"+depois.getUTCFullYear();

        var day = (((depois.getDate()+"").length === 1) ? "0"+depois.getDate() : depois.getDate() );
        var mouth = ((((depois.getMonth()+1)+"").length === 1) ? "0"+(depois.getMonth()+1) : (depois.getMonth()+1) );
        var year = depois.getUTCFullYear();

        id = (i);

        if(i === 0){ si.valorAmotizado = si.totalPagar - si.reembolsoPeriodo; }
        else{ si.valorAmotizado -= (si.reembolsoPeriodo + si.valorDesconto); }
        si.valorAmotizado = ((si.valorAmotizado<1) ? 0 : si.valorAmotizado);

        var am = new Amortizacao();
        am.data = day + "-" + mouth + "-" + year;
        am.reebolso = si.reembolsoPeriodo;
        si.dataTableAmortizacao[i] = am;
        si.dataFinalizar = am.data;

        addPestacao(day+"-"+mouth+"-"+year);
    }
    tableEstructure($('#table-liquid'));
}

function addPestacao(data) {
    var table = document.getElementById("cred-table-prestacao");
    var row = table.insertRow(table.childElementCount);

    row.id = id;
    row.onclick = function () {
        $(this).addClass('selected').siblings().removeClass('selected');

        id = Number($(this).attr("id"));
        $('#cred-tab-selNomeBanco').text(si.dataTableAmortizacao[id].nomeBanco);
        $("#cred-tab-selNumDoc").text(si.dataTableAmortizacao[id].nunDoc);
        $("#cred-tab-selTipoPag").text(si.dataTableAmortizacao[id].tipoPagam);

        $("#cred-tab-amor-banco").val(si.dataTableAmortizacao[id].idBanco);
        $("#cred-tab-amor-numDoc").val(si.dataTableAmortizacao[id].nunDoc);
        $("#cred-tab-amor-tipoPagamento").val(si.dataTableAmortizacao[id].idTipoPagam);
    };

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    cell1.innerHTML = data;
    cell2.innerHTML = formattedString(si.reembolsoPeriodo.dc().rp());
    cell3.innerHTML = formattedString(si.valorAmotizado.dc().rp());
}

$("#cred-edit-table-amor").click(function () {
    if(validarSimulacao($(".add-detail-table input, .add-detail-table select"))){

        si.dataTableAmortizacao[id].nomeBanco = $("#cred-tab-amor-banco").find("option:selected").text();
        si.dataTableAmortizacao[id].idBanco = $("#cred-tab-amor-banco").val();

        si.dataTableAmortizacao[id].tipoPagam = $("#cred-tab-amor-tipoPagamento").find("option:selected").text();
        si.dataTableAmortizacao[id].idTipoPagam = $("#cred-tab-amor-tipoPagamento").val();

        si.dataTableAmortizacao[id].nunDoc = $("#cred-tab-amor-numDoc").val();

        $('#cred-tab-selNomeBanco').text(si.dataTableAmortizacao[id].nomeBanco);
        $("#cred-tab-selNumDoc").text(si.dataTableAmortizacao[id].nunDoc);
        $("#cred-tab-selTipoPag").text(si.dataTableAmortizacao[id].tipoPagam);

    }
});

function loadDcomentOrGarrant(element,array,id,value) {
    for (var x = 0; x < array.length; x++) {
        var lis =array[x];
        var id_id = "simulaListId-"+lis[id];
        element.append('<option id="'+id_id+'" value="'+lis[value]+'"></option>');
    }
}

function check(id) {
    XpertListItem($(id));
}

function tableIsPriencida() {
    for (var v = 0; v < si.dataTableAmortizacao.length; v++) {
        if(si.dataTableAmortizacao[v].idBanco === "0" && si.dataTableAmortizacao[v].idTipoPagam === "0"){
            return false;
        }
    }
    return true;
}

function listDocGaraHasElement() {
    var r1= searchElement($("#cred-cli-list-garaValue"),"a Garantia");
    si.listGara = comoList;
    if(!r1) return r1;
    var r2 = searchElement($("#cred-cli-list-docuValue"),"ao Documento");
    si.listDocu = comoList;
    return r2;
}

var comoList  = [];
function searchElement(obj, _title) {
    comoList = [];
    var reValue = true;
    obj.find("span").each(function () {
        if( $(this).attr("description") !== "") {
             var cb = new ComoBox();
                cb.value = $(this).attr("description");
                var id = $(this).attr("id-opt").split("-");
                cb.id = id[1];
                comoList[comoList.length] = cb;
            hasClassTo($(this), "good", "bad");
        } else {
            hasClassTo($(this), "bad", "good");
            callXpertAlert("Por favor, adicione a descrição "+_title+"!", new Mensage().warning, 8000);
            reValue = false;
            return false;
        }
    });
    return reValue;
}

$("#cred-cli-bank").change(loadChequeSimulacao);

var sBank = undefined;
function loadChequeSimulacao() {
    si.idBank = $("#cred-cli-bank").attr("newid");
    $("#cred-cli-numDoc").val("");
    $("#cred-cli-numDoc-veiw").html("");
    sBank = getStateBankByID();
    si.bankState = ($("#cred-cli-bank").attr("newid") === "0") ? "0" :  sBank['STATE'];
    si.idForRegBank = ($("#cred-cli-bank").attr("newid") === "0") ? "0" : sBank['ID'];
    if(si.bankState !== "0" ) {
        $.ajax({
            url: "./bean/simulation.php",
            type: "POST",
            data: {
                "intensao": "load-cheque",
                "value": unformatted($("#cred-value").val()),
                "idbank": si.idBank
            },
            dataType: "json",
            success: function (e) {
                if (e.result) {
                    $("#cred-cli-numDoc-veiw").html(e.return['NUM SEQUENCIA']);
                    $("#cred-cli-numDoc").attr("maxlength", sBank["VARIABLE_DIGITS"]);
                    si.idCheque = e.return['ID CHEQUE'];
                    si.numeroCheque = e.return['NUM SEQUENCIA'];
                }
                else {
                    si.idCheque = undefined;
                    si.numeroCheque = undefined;
                    callXpertAlert(e.return['MESSAGE'], new Mensage().cross, 8000);
                    $("#cred-cli-numDoc").val("");
                }
            }
        });
    }else{
        if($("#cred-cli-bank").attr("newid") !== "0") {
            callXpertAlert("Banco " + sBank["NAME"] + " " + sBank["MESSAGE"], new Mensage().cross, 8000);
            si.numeroCheque = undefined;
            si.idCheque = undefined;
        }else{
            callXpertAlert("Por favor, selecione um banco válido!", new Mensage().cross, 8000);
            si.numeroCheque = undefined;
            si.idCheque = undefined;
        }
    }
}

$("#import-simulation").click(function () {
    if (containMenu("cre.regCre")) {
        if (hasNif() && validarSimulacao($("#cred-form-cli input, #cred-form-cli select")) && checkIsValid() && testTableAmortizacao() && testlistDocGar()) {
            si.numeroCheque = $("#cred-cli-numDoc-veiw").html() + $("#cred-cli-numDoc").val();
            si.idBank = $("#cred-cli-bank").attr("newid");
            si.objectoTipoCredito = $("#cred-tipoCred").val();
            si.objectoFontePagamento = $("#cred-cli-fonRend").val();
            openModalFrame($('.mp-confirm-simulation'));
            regUserActivity("./bean/activity.php", -1, "Carregou o botão de Concluir a simulação!", -1, LevelActivity.OUTROS);
        }
    }
    else {
        callXpertAlert("Infelizmente, não tens permissão para efetuar o registo de Crédito!", new Mensage().warning, 8000);
    }
});

function hasNif() {
    if (si.nifClient === ""){
        callXpertAlert("Por favor, selecione um Cliente!", new Mensage().cross, 8000);
        return false;
    }
    return true;
}

function testTableAmortizacao() {
    if(si.dataTableAmortizacao.length === 0) {
        callXpertAlert("Tabela de Amortização vazia!", new Mensage().warning, 8000);
        return false;
    }
    if(!tableIsPriencida()){
        callXpertAlert("Tabela de Amortização incorretamente preenchida!", new Mensage().warning, 8000);
        return false;
    }
    return true;
}

function testlistDocGar() {
    var result =  listDocGaraHasElement();
    if(result && si.listGara.length === 0){
        callXpertAlert("Por favor, adicione Garrantia(s)!", new Mensage().warning, 8000);
        return false;
    }

    if(result && si.listDocu.length === 0){
        callXpertAlert("Por favor, adicione Documento(s)!", new Mensage().warning, 8000);
        return false;
    }

    return ((!result) ? result : true );
}

$("#cred-cli-numDoc").change(function () {
    checkIsValid();
});

function checkIsValid() {
    var isValid = false;
    if(si.numeroCheque === undefined){
        callXpertAlert("Por favor, selecione o Banco!", new Mensage().warning, 8000);
        $("#cred-cli-numDoc").addClass("empty");
        $("#cred-cli-bank").addClass("empty");
    }else if($("#cred-cli-numDoc").val().length !== Number($("#cred-cli-numDoc").attr("maxlength"))){
        var numDocVeiw = $("#cred-cli-numDoc-veiw").html().length;
        var numDoc = $("#cred-cli-numDoc").val().length;
        var numDocMiss = Number($("#cred-cli-numDoc").attr("maxlength"));
        callXpertAlert("Numero de Cheque incompleto!<br>" +
            "Atual: "+(numDocVeiw+numDoc)+"<br>"+
            "Necessário: "+(numDocVeiw+numDocMiss), new Mensage().warning, 8000);
            $("#cred-cli-numDoc").addClass("empty");
    } else{
        $("#cred-cli-numDoc").removeClass("empty");
        return true;
    }
    return isValid;
}

function getStateBankByID() {
    var sBank = undefined;
    banks.forEach(function (bt) {
       if (bt["ID"] === si.idBank ){
           sBank = bt;
           return false;
       }
    });
    return sBank;
}

$(".percent1020").change(function () {
    var value = unformatted($(this).val());
    if(value < 10 || value > 20){
        $(this).val("0");
    }
});

var FindCliente = function () {
    this.name = undefined;
    this.nif = undefined;
    this.fullName = undefined;
    this.isFind = false;
};
/***
 * @type {FindCliente}
 */
var cliFind = new FindCliente();
$("#cred-sh-nif").keyup(function (e) {
    cliFind.isFind = false;
    if( $(this).val().length === 9 || e.keyCode === 13 ){
        for (var cc = 1; cc < 27; cc++){
            for (var cl = 0; cl < clientes[cc].length; cl++){
                if ( clientes[cc][cl]["NIF"].$$($(this).val().trim()) ){
                    cliFind.fullName = clientes[cc][cl]["NAME"]+" "+clientes[cc][cl]["SURNAME"];
                    var lastName = (clientes[cc][cl]["SURNAME"]).split(" ");
                    cliFind.name = clientes[cc][cl]["NAME"]+" "+(lastName[lastName.length-1]);
                    cliFind.nif = clientes[cc][cl]["NIF"];
                    $("#cred-sh-name").text(cliFind.fullName);
                    cliFind.isFind = true;
                    break;
                }
            }
            if(cliFind.isFind) {break;}
        }
    }else{ $("#cred-sh-name").text(""); }
});

function hasClassTo(span, classNameAdd, classNameRemove) {
    if ( span.hasClass(classNameRemove) ){ span.removeClass(classNameRemove)}
    if ( !span.hasClass(classNameAdd) ){ span.addClass(classNameAdd); }
}

/**
 *
 * @param op
 * @param banks {Array}
 */
function addBancoCheque(op, banks){
    op.empty();
    for (var i = 0; i < banks.length; i++){
        var idbank = banks[i]["ID"];
        var state = banks[i]["STATE"];
        op.append("<li id="+idbank+" status="+getStats(state)+">"+banks[i]["NAME"]+"</li>");
    }
}

function getStats(state) {
    return (Number(state) !== 0) ? "good" : "bad";
}

$("#cred-data-fim").change(function () {
    if ($(this).val() !== "" && $("#cred-data").val() !== "") {
        var datainiciar = new Date();
        var dataFinal = new Date();

        var arDataFin = $("#cred-data-fim").val().split("-");
        dataFinal.setUTCFullYear(Number(arDataFin[2]));
        dataFinal.setMonth(Number(arDataFin[1]) -1);
        dataFinal.setDate(Number(arDataFin[0]));

        var arDataInicio = $("#cred-data").val().split("-");
        datainiciar.setUTCFullYear(Number(arDataInicio[2]));
        datainiciar.setMonth(Number(arDataInicio[1]) -1);
        datainiciar.setDate(Number(arDataInicio[0]));

        var diff  = new Date(dataFinal - datainiciar);
        var days  = (diff/1000/60/60/24)+1;

        $("#cred-dia").val(days);

    }
});

$("#cred-data").change(function () {
    if ($(this).val() !== "" && $("#cred-dia").val() !== "") {
        $("#cred-dia").keyup();
    }
    else if ($(this).val() !== "" && $("#cred-data-fim").val() !== "") {
        $("#cred-data-fim").change();
    }
});

$("#cred-dia").keyup(function () {
    if($(this).val() !== "" && $("#cred-data").val() !== "" ) {
        var datainiciar = new Date();
        var arDataInicio = $("#cred-data").val().split("-");
        datainiciar.setUTCFullYear(Number(arDataInicio[2]));
        datainiciar.setMonth(Number(arDataInicio[1]) - 1);
        datainiciar.setDate(Number(arDataInicio[0]));
        datainiciar.setDate(datainiciar.getDate() + (Number($(this).val() - 1)));

        $("#cred-data-fim").val(datainiciar.getDatePt());
    }
});
