/**
 * Created by ahmedjorge on 10/16/16.
 */

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

        this.credito =
            '<section class="'+((this.idState == 0) ? "pago" : ((this.idState == 1) ? "por-pagar" : "amortizado" ) )+'">' +
            '<i class="icon-ctrl sh-more" id="pret-'+this.id+'" onclick="showAmortizacao('+this.id+','+jk+')"></i>' +
            '<nav> ' +
            '<div class="primary"><b>Dossier nº '+this.nunDossierCredito+'</b> <b>'+this.totalCreditoAPagar+'</b></div> ' +
            '<div class="secondary"><small>Efetuado em '+this.dataInicioCredito+'</small><small>Data fim crédito: '+this.dataFimCredito+'</small></div>' +
            '</nav> ' +
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
            '<table id="table-amortizacao-'+this.id+'" class="selectable" cellpadding="0" cellspacing="0">' +
            '<thead>' +
            '<tr>' +
            '<th width="18">Data Emissão</th>' +
            '<th width="18">Data Endosse</th> ' +
            '<th width="25">Reembolso</th>' +
            '<th width="25">Prestação paga</th>' +
            '<th width="16">Estado</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody id="list-prestacao-'+this.id+'">' +
            '<td></td>' +
             '<td></td>' +
             '<td></td>' +
             '<td></td>' +
             '<td></td>' +
            '</tbody>' +
            '</table>' +
            '</span>' +
            '</nav>' +
            '</section>';
    }

};

var Prestacao =  function () {

    this.id = undefined;
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

    this.addAmortizacao = function (_idCredito) {
        this.amortizacao = '<tr id="'+this.id+'-amor" ondblclick="pagamentoPestacao('+this.id+','+_idCredito+')" onclick="clickPestacao('+this.id+','+_idCredito+')">' +
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

function showAmortizacao(id, jk) {
    loadCreditoCliente(id,jk, $("#pret-"+id).parent().find('.more-details').hasClass("show"));
    $("#pret-"+id).parent().find('.more-details').toggleClass('show');
    tableEstructure($('#table-amortizacao-'+id));
    setTimeout(function () {
        location = "#table-amortizacao-"+id;
    },500);
}

var prePage = new Prestacao();
function clickPestacao(_idPrestacao,_idCredito) {
    // prePage =
    $("#"+_idPrestacao+"-amor").addClass('selected') .siblings().removeClass('selected');
}

function pagamentoPestacao(_idPrestacao,_idCredito) {
    openModalFrame($(".mp-liquida"));
}
