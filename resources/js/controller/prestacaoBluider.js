/**
 * Created by ahmedjorge on 10/16/16.
 */
var Pagamento = function () {};
/**
 * @type {Number}
 */
Pagamento.prototype.id = undefined;

/**
 * @type {String}
 */
Pagamento.prototype.type = undefined;

/**
 * @type {String}
 */
Pagamento.prototype.doc = undefined;

/**
 * @type {Number}
 */
Pagamento.prototype.value = undefined;

/**
 * @type {Number}
 */
Pagamento.prototype.idBank = undefined;

/**
 * @type {String}
 */
Pagamento.prototype.data = undefined;

var PrestacaoBluider = function () {

    this.id = undefined;
    this.idState = undefined;
    this.nunDossierCredito = undefined;
    this.nunCheckCredito = undefined;
    this.dataInicioCredito = undefined;
    this.dataFimCredito = undefined;
    this.dataCNTCredito = undefined;
    this.penalidadeCretido = undefined;
    this.capitalInicialCredito = undefined;
    this.totalEfetivoCredido = undefined;
    this.totalCreditoAPagar = undefined;

    this.bluider = function(jk) {
        var numCredi = listCredito[jk]["prestacao"].length;
        var numCrediText = numCredi+" "+((numCredi == 0 || numCredi > 1) ? "prestações" : "prestação");
        this.credito =
            '<section class="'+((this.idState == 0) ? "pago" : ((this.idState == 1) ? "por-pagar" : "amortizado" ) )+'">' +
            '<i class="icon-ctrl sh-more" id="pret-'+this.id+'" onclick="showAmortizacao('+this.id+','+jk+')"></i>' +
            '<nav> ' +
            '<div class="primary"><b>Dossier nº '+this.nunDossierCredito+'</b> <b>'+this.totalCreditoAPagar+'</b></div> ' +
            '<div class="secondary"><small>Efetuado em '+this.dataInicioCredito+'</small> <b><small>'+ numCrediText +'</small></b> <small>Data fim crédito: '+this.dataFimCredito+'</small></div>' +
            '</nav> ' +
            ( (this.idState != 0 && (containMenu("cre.regFullPay"))) ? '<button l-id="'+this.id+'" jk="'+jk+'" class="bt-full-payment">Pagamento Antecipado</button>' : '') +
            '<nav class="more-details"> ' +
            '<hr> ' +
            '<span class="state"></span> ' +
            '<div class="n-cheq">' +
            '<h3>Cheque nº '+this.nunCheckCredito+'</h3>' +
            '<h3 >Total efetivo: '+this.totalEfetivoCredido+'</h3>' +
            '</div>' +
            '<div class="other-details">' +
            '<h4>Capital inicial: '+this.capitalInicialCredito+'</h4>' +
            '<h4>Penalidade:  '+this.penalidadeCretido+'</h4>' +
            '<h4>Data CNT: '+this.dataCNTCredito+'</h4>' +
            '</div>' +
            '<span class="table-amort">' +
            '<h2>Tabela de amortização</h2>' +
            '<div class="x-table table-amort">'+
            '<table id="table-amortizacao-'+this.id+'" class="selectable" cellpadding="0" cellspacing="0">' +
            '<thead>' +
            '<tr>' +
            '<th grow="1.5">Data Emissão</th>' +
            '<th grow="1.5">Data Endosse</th> ' +
            '<th grow="2.5">Reembolso</th>' +
            '<th grow="2.5">Prestação paga</th>' +
            '<th grow="2">Estado</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody id="list-prestacao-'+this.id+'">' +
            '<td> </td>' +
            '<td> </td>' +
            '<td> </td>' +
            '<td> </td>' +
            '<td> </td>' +
            '</tbody>' +
            '</table>' +
            '</div>'+
            '</span>' +
            '</nav>' +
            '</section>';
    }

};

var Prestacao =  function () {

    this.id = undefined;
    this.i = undefined;
    this.estadoValue = undefined;
    this.estado = function (estado) {
        this.estadoValue = estado;
        return this
    };

    this.dataEmissaoValue = undefined;
    this.dataEmissao = function (dataEmissao) {
        this.dataEmissaoValue = dataEmissao;
        return this;
    };

    this.prestacaoPagaValue = undefined;
    this.prestacaoPaga = function (prestacaoPaga) {
        this.prestacaoPagaValue = prestacaoPaga;
        return this;
    };

    this.reembolsoValue = undefined;
    this.reembolso = function (reembolso) {
        this.reembolsoValue = reembolso;
        return this;
    };

    this.dataEndosseValue = undefined;
    this.dataEndosse = function (dataEndosse) {
        this.dataEndosseValue = dataEndosse;
        return this;
    };

    this.addAmortizacao = function () {
        this.amortizacao = '<tr id="'+this.id+'-amor" ondblclick="pagamentoPestacao('+this.i+')" onclick="clickPestacao('+this.id+')">' +
            '<td>'+this.dataEmissaoValue+'</td>' +
            '<td>'+this.dataEndosseValue+'</td>' +
            '<td>'+this.reembolsoValue+'</td>' +
            '<td>'+this.prestacaoPagaValue+'</td>' +
            '<td>'+this.estadoValue+'</td>' +
            '</tr>';
        this.listAmortizacao[this.listAmortizacao.length] = this.amortizacao;
    };

    this.listAmortizacao = [];

    this.getListAmortiza = function () {
        var data = "";
        for (var t = 0; t < this.listAmortizacao.length; t++) {
            data += this.listAmortizacao[t];
        }
        return data;
    };

};

function showAmortizacao(id, jk, show) {

    regUserActivity("./bean/activity.php", id , "Selecionou Crédito, para ver as prestações do crédito!", -1, LevelActivity.VISUALIZACAO );

    loadCreditoCliente(id,jk, (show === undefined) ? $("#pret-"+id).parent().find('.more-details').hasClass("show") : show);
    $("#pret-"+id).parent().find('.more-details').toggleClass('show');
    tableEstructure($('#table-amortizacao-'+id));
    setTimeout(function (e) {
        window.location = '#table-amortizacao-'+id;
    }, 350);
}

function clickPestacao(_idPrestacao) {
    $("#"+_idPrestacao+"-amor").addClass('selected') .siblings().removeClass('selected');
}

var prestacaoS = undefined;
function pagamentoPestacao(i) {
    // $(".mp-liquida").removeClass("icon-checkbox-checked").addClass("icon-checkbox-unchecked");
    // resetForm($("#cred-pay-form"));
    // $('.sec-another').removeClass('show');
    if(containMenu("cre.pgto"))
    {
        prestacaoS = listPrestacao[i];
        if (prestacaoS["STATE COD"] !== "0") {
            loadDataCredForForm();
            regUserActivity("./bean/activity.php", prestacaoS["ID"] , "Selecionou Prestação de um crédito", JSON.stringify(prestacaoS), LevelActivity.VISUALIZACAO );
        }
    }else{
        callXpertAlert("Infelizmente nao tens permiçao para efectuar o pagameto de prestaçao!", new Mensage().warning, 8000);
    }
}

var reembloso = undefined;
var valorPago = undefined;
var valorPorPago = undefined;
var missFazeado = false;
function loadDataCredForForm() {
    reembloso = unformatted(prestacaoS["REEMBOLSO"].replace(".",","));
    valorPago = unformatted(prestacaoS["PRESTACAO PAGA"].replace(".",","));
    missFazeado = false;

    var state = (valorPago > 0) ? 1 : 0;
    CtrlFormLiquidar(state);

    valorPorPago = (reembloso-valorPago).dc();
    if(state === 0){
        $("#cred-pay-bank").val(prestacaoS["CONTA PREVISTO ID"]);
        $("#cred-pay-value-rest").html(formattedString("0"));
        $("#cred-pay-value").val(formattedString(valorPorPago.rp()));
        $("#cred-pay-doc").val(prestacaoS["DOCUMENTO PAGAMENTO"]);
    }else{
        $("#cred-pay-bank").val(prestacaoS["CONTA REAL ID"]);
        $("#cred-pay-value-rest").html(formattedString(valorPorPago.rp()));
        $("#cred-pay-value").val("");
        $("#cred-pay-doc").val("");
    }

    isNull($("#cred-pay-bank"));

    openModalFrame($('.mp-liquidar'));
}

$("#cred-pay-value").change(function () { alterValorApagar($(this)); });

$("#cred-pay-value").keyup(function () { alterValorApagar($(this)); });

function alterValorApagar(value) {
    var restPay = (valorPorPago - unformatted(value.val())).dc();
    if(restPay< 0) {
        value.val("");
        $("#cred-pay-value-rest").html(formattedString(valorPorPago.rp()));
    }
    else{
        $("#cred-pay-value-rest").html(formattedString(restPay.rp()));
    }
}

$("#cred-pay-fazea").click(function () {
    if(!$(this).hasClass('unchange')){
        if ($(this).hasClass('icon-checkbox-checked')) {
            $("#cred-pay-value").val(formattedString("")).removeAttr("disabled");
            $("#cred-pay-value-rest").html(formattedString(valorPorPago.rp()));
        } else {
            $("#cred-pay-value").val(formattedString(valorPorPago.rp())).attr("disabled", true);
            $("#cred-pay-value-rest").html(formattedString("0"));
        }
    }
});

$("#cred-pay-dife").click(function () {
        if (!$(this).hasClass('unchange')) {
            if ($(this).hasClass('icon-checkbox-checked')) {
                $("#cred-pay-doc").val("").removeAttr("disabled");
                $("#cred-pay-bank").val("0").removeAttr("disabled");
            } else {
                $("#cred-pay-doc").val(prestacaoS["DOCUMENTO PAGAMENTO"]).attr("disabled", true);
                $("#cred-pay-bank").val(prestacaoS["CONTA PREVISTO ID"]).attr("disabled", true);
                $("#cred-pay-fazea").addClass("icon-checkbox-checked").removeClass("icon-checkbox-unchecked").click();
            }
            isNull($("#cred-pay-bank"));
        }
    }
);
