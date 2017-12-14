/**
 * Created by ahmedjorge on 4/27/17.
 */

loadDataToPage();

$('.list-warr').on("click", ".first small", function (event) {
    me = $(this).closest('section');
    me.find('.more').toggleClass('show');
}).scroll(function () {
    if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
        transformDataToCredito();
    }
});

$("#labelNotificacao").click(function () {
    loadDataToPage();
});

var CreditoBluiderNotificacao = function () {
    this.listaCredito = [];

    /**
     * @param credito
     * @param ig {Number}
     */
    this.bluiderCreditos = function (credito, ig) {
        var nome_cliente = (credito.clientenome + ((credito.clienteapelido === credito.clientenome) ? '' : ' ' + credito.clienteapelido));
        var rt = '<section>' +
            '<div class="first">' +
            '<b><span>Crédito nº <span>' + credito.creditonumero + '</span></span><small id-id="' + ig + '">Mais detalhes</small></b>' +
            '<h3 title="Nome de cliente">' + nome_cliente + '</h3>' +
            '<h3 title="Notificação Enviada em">' + credito["data-send"] + '</h3>' +
            '</div>' +
            '<div class="more" >' +
            '<h4>NIF Cliente</h4>' +
            '<p>' + credito.clientenif + '</p>' +

            '<h4>Email Cliente</h4>' +
            '<p>' + credito.clientmail + '</p>' +

            '<h4>Telefone Cliente</h4>' +
            '<p>' + credito.clientmovel + '</p>' +

            '<h4>NIF Cliente</h4>' +
            '<p>' + credito.clientenif + '</p>' +

            '<h4>Tipo Credito</h4>' +
            '<p>' + credito.tipocreditoname + '</p>' +

            '<h4>Data de inicio do credito</h4>' +
            '<p>' + credito.creditodatainicio + '</p>' +

            '<h4>Data de fim do Credito</h4>' +
            '<p>' + credito.creditodatafinalizarprazo + '</p>' +

            '<h4>Valor Credito Inicial</h4>' +
            '<p>' + notificacao.formattedString(credito.creditocapitalinicial) + '</p>' +

            '<h4>Montante Credito a Pagar</h4>' +
            '<p>' + notificacao.formattedString(credito.creditomontantepagar) + '</p>' +

            '<h4>Montante Credito Restante</h4>' +
            '<p>' + notificacao.formattedString(credito.creditomontanterestante) + '</p>' +

            '</div>' +
            '</section>';
        $(".list-warr").append(rt);
    };

    this.addCredito = function (GarClient) {
        this.listaCredito[this.listaCredito.length] = GarClient;
    };
};


var ExportData = function () {
    this.type = undefined;
    this.name = undefined;
    this.data = undefined;

    this.haveData = function () {
        return true/*(this.data !== undefined || $.isArray(this.data))*/;
    };
};

var creditBluider = new CreditoBluiderNotificacao();

var dataExport = new ExportData();

function loadDataToPage() {
    $.ajax({
        url: "./bean/relInformationCredit.php",
        type: "POST",
        data: {
            intensao: "relatorioNotificacaoPagamentoCredito",
            filter: getDataStorage(sessionStorage, 'filterReport')
        },
        dataType: "json",
        success: function (e) {
            notificacao.data = e.credits;
            /*dataExport.data = notificacao.data;*/
            dataExport.type = "rep.notifcredito";
            dataExport.name = "Notificações de Creditos";
            sessionStorage.dataExport = JSON.stringify(dataExport);
            notificacao.last_add = 0;
        }, beforeSend: function () {
            $(".mp-loading").fadeIn();
        },
        complete: function () {
            $(".mp-loading").fadeOut();
            $(".list-warr").empty();
            transformDataToCredito();
        }
    });
}

function transformDataToCredito() {
    var totalData = (notificacao.data !== undefined) ? notificacao.data.length : 0;
    var add = 0;
    for (var i = notificacao.last_add; (i < totalData && add < notificacao.total_add); i++) {
        var credits = notificacao.data[i];
        creditBluider.addCredito(credits);
        creditBluider.bluiderCreditos(credits, i);
        add++;
        notificacao.last_add = i + 1;
    }
}

var notificacao = {
    last_add: 0,
    data: undefined,
    total_add: 100,
    formattedString: function (nStr) {
        var num = nStr.replace(/(\s)/g, '');
        return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
    }
};


