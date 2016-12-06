/**
 * Created by ahmedjorge on 9/30/16.
 */
$(function () {
    loadDataSimulation();
    $("#cred-data").mask("99-99-9999");
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

var si = new Simulation();

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
                    $("#cred-taxa").text(e.return['TAXA']);
                    $("#cred-peri").text(e.return['PERIODO']);
                    $("#cred-capi").text(formattedString(e.return['CAPITAL']));
                    $("#cred-taxaS").text(formattedString(e.return['TAXA SEM DESCONTO']));
                    $("#cred-taxaC").text(formattedString(e.return['TAXA COM DESCONTO']));
                    $("#cred-totalPagar").text(formattedString(e.return['TOTAL PAGAR']));
                    $("#cred-prest").text(formattedString(e.return['PRESTACAO']));
                    $("#cred-reePer").text(formattedString(e.return['REEMBOLSO/PRESTACAO']));
                    $("#cred-segu").text(formattedString(e.return['SEGURO']));

                    si.numSemanaMes = Number(e.return["NUMERO SEMANA MES"]);
                    si.dia = Number($("#cred-dia").val());
                    si.data = $("#cred-data").val();
                    si.reembolsoPeriodo = Number(e.return['REEMBOLSO/PRESTACAO']);
                    si.totalPagar = Number(e.return['TOTAL PAGAR']);
                    si.numeroPrestacao = Number(e.return['PERIODO']);
                    si.valorDesconto = Number($("#cred-desco").val());
                    si.taeg = Number(e.return['TAXA COM DESCONTO']);
                    si.idTaxa = Number(e.return['ID TAXA INFERIOR']);

                    $("#cred-cli-bank").html('<option value="0">(Banco)</option>');
                    loadComoBoxIDandValue($("#cred-cli-bank"), e.banks, "ID", "SIGLA");

                    // "ID TAXA INFERIOR":"51"
                    bluiderTablePestacao();
                }
                else {
                    callXpertAlert(e.return['MESSAGE'], new Mensage().cross, 8000);
                    $('section .part-2 b').text("0,0");
                    $("#cred-totalPagar").text("0,0");
                    $("#cred-cli-bank").html('<option value="0">(Banco)</option>');

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
    $.ajax({
        url: "./bean/simulation.php",
        type: "POST",
        data: {"intensao":"load-data"},
        dataType: "json",
        success: function (e) {
            loadComoBoxIDandValue($("#cred-tipoCred"), e.tipocreditos, "ID", "DESC");

            loadComoBoxIDandValue($("#cred-tab-amor-banco"), e.banks, "ID", "SIGLA");
            loadComoBoxIDandValue($("#cred-tab-amor-tipoPagamento"), e.fontepagamentos, "ID", "DESC");

            loadComoBoxIDandValue($("#cred-cli-modaPag"), e.fontepagamentos, "ID", "DESC");
            loadComoBoxIDandValue($("#cred-cli-fonRend"), e.tipopagamentos, "ID", "DESC");

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
        var arData = si.data.split("-");

        var depois = new Date();
        depois.setUTCFullYear(Number(arData[2]));
        depois.setMonth(Number(arData[1]) -1);
        depois.setDate(Number(arData[0]));

        depois.setDate(depois.getDate() + si.dia);
        si.data = depois.getDate()+"-"+(depois.getMonth()+1)+"-"+depois.getUTCFullYear();

        var day = (((depois.getDate()+"").length == 1) ? "0"+depois.getDate() : depois.getDate() );
        var mouth = ((((depois.getMonth()+1)+"").length == 1) ? "0"+(depois.getMonth()+1) : (depois.getMonth()+1) );
        var year = depois.getUTCFullYear();

        id = (i);

        if(i == 0){
            si.valorAmotizado = si.totalPagar - si.reembolsoPeriodo;
        }
        else{
            si.valorAmotizado -= (si.reembolsoPeriodo + si.valorDesconto);
        }
        si.valorAmotizado = ((si.valorAmotizado<0) ? 0 : si.valorAmotizado);

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
        $(this).addClass('selected')
            .siblings().removeClass('selected');
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
    cell2.innerHTML = formattedString(si.reembolsoPeriodo+"");
    cell3.innerHTML = formattedString(si.valorAmotizado+"");
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
        var idv = "'#simula-list-id-"+lis[id]+"'";
        var id_id = "simula-list-id-"+lis[id];
        element.append('<li id="'+id_id+'" onclick="check('+idv+')"><span><i class="icon-checkbox-unchecked"></i><span class="list-name">'+lis[value]+'</span></span> <b>0</b></li>')
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
        if( !$(this).hasClass("delete-item-list") && $(this).attr("value") != undefined){
            var cb = new ComoBox();
            cb.id = $(this).attr("value");
            var input = $(this).parent("div.item-list").find("input:text");
            cb.value = input.val();

            var div = $(this).parent("div.item-list");
            comoList[comoList.length] = cb;

            if (isEmpty(input)) {
                div.css("borderColor", "red");
                input.addClass("empty");
                callXpertAlert("Por Favor, adicione a descrição "+_title+"!", new Mensage().warning, 8000);
                reValue = false;
                return false;
            }
            else{
                div.css("borderColor", "");
                input.removeClass("empty");
            }
        }
    });
    return reValue;
}

$("#cred-cli-bank").change(loadChequeSimulacao);


function loadChequeSimulacao() {
    $.ajax({
        url: "./bean/simulation.php",
        type: "POST",
        data: {"intensao":"load-cheque","value":unformatted($("#cred-value").val()),"idbank":$("#cred-cli-bank").val()},
        dataType: "json",
        success: function (e) {
            if(e.result){
                $("#cred-cli-numDoc").val(e.return['NUM SEQUENCIA']);
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
}

$("#import-simulation").click(function () {
    if (validarSimulacao($("#cred-form-cli input, #cred-form-cli select")) && checkIsValid() && testTableAmortizacao() && testlistDocGar()) {

        si.numeroCheque =  $("#cred-cli-numDoc").val();
        si.idBank =  $("#cred-cli-bank").val();
        si.objectoTipoCredito =  $("#cred-tipoCred").val();
        si.objectoFontePagamento =  $("#cred-cli-fonRend").val();
        // si. =  $("#cred-cli-fonRend").val();

        $.ajax({
            url: "./bean/simulation.php",
            type: "POST",
            data: {"intensao": "import-simulation", "simulation": si},
            dataType: "json",
            success: function (e) {
                if (!e.result) {  callXpertAlert(e.return["MESSAGE"], new Mensage().cross, -1); }
                else {
                    callXpertAlert("<b>" + "Numero Dossier: </b>" + e.return["NUM DOSSIER"] + "<br>" +
                                   "<b>" + "Numero Cheque: </b>" + e.return["NUM CHEQUE"] + "<br>" +
                                   "<b>" + "Nome Banco: </b>" + e.return["BANCO NAME"] + "<br>" +
                                   "<b>" + "Sigla Banco: </b>" + e.return["BANCO SIGLA"], new Mensage().checkmark, -1);
                }
            }
        });
    }
});

function testTableAmortizacao() {
    if(si.dataTableAmortizacao.length==0) {
        callXpertAlert("Tabela de Amortização vazia!", new Mensage().warning, 8000);
        return false;
    }
    if(!tableIsPriencida()){
        callXpertAlert("Tabela de Amortização, incorretamente Prienhida!", new Mensage().warning, 8000);
        return false;
    }
    return true;
}

function testlistDocGar() {
    var result =  listDocGaraHasElement();
    if(result && si.listGara.length==0){
        callXpertAlert("Por Favor, adicione Garantia!", new Mensage().warning, 8000);
        return false;
    }

    if(result && si.listDocu.length==0){
        callXpertAlert("Por Favor, adicione Documento!", new Mensage().warning, 8000);
        return false;
    }

    return ((!result) ? result : true );
}

$("#cred-cli-numDoc").change(function () {
    checkIsValid();
});

function checkIsValid() {
    var isValid = false;
    if(si.numeroCheque == undefined){
        callXpertAlert("Por Favor, Selecione o Banco!", new Mensage().warning, 8000);
        $("#cred-cli-numDoc").addClass("empty");
        $("#cred-cli-bank").addClass("empty");
    }else if(!$("#cred-cli-numDoc").val().$$(si.numeroCheque)){
        callXpertAlert("Cheque invalido!", new Mensage().warning, 8000);
        $("#cred-cli-numDoc").val(si.numeroCheque);
        $("#cred-cli-numDoc").addClass("empty");
    }
    else if( $("#cred-cli-numDoc").val().length > si.numeroCheque.length+3 ){
        var va = $("#cred-cli-numDoc").val();
        $("#cred-cli-numDoc").val(va.substring(0, si.numeroCheque.length+3));
    }
    else {
        $("#cred-cli-numDoc").removeClass("empty");
        isValid = true;
    }
    return isValid;
}
