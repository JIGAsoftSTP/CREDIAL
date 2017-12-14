/**
 * Created by ahmedjorge on 4/27/17.
 */

loadDataToPage();

$('.list-warr').on("click", ".first small", function (event)
{
    me = $(this).closest('section');
    me.find('.more').toggleClass('show');
}).scroll(function () {
    if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
        transformDataToCredito();
    }
});

$("#labelAnulado").click(function () {
    loadDataToPage();
});

var CreditoBluiderAnulados = function () {
    /**
     * @type {[CreditoAnulados]}
     */
    this.listaCredito = [];

    /**
     * @param credito {CreditoAnulados}
     * @param ig {Number}
     */
    this.bluiderCreditos = function (credito, ig) {
        var nome_cliente = (credito.clientname + ((credito.clientsurname === credito.clientname) ? '' : ' '+credito.clientsurname));
        var rt = '<section>' +
            '<div class="first">' +
            '<b><span>Crédito nº <span>' + credito.creditonumero + '</span></span><small   id-id="' + ig + '">Mais detalhes</small></b>' +
            '<h3 title="Nome de cliente">' + nome_cliente + '</h3>' +
            '<h3 title="Nome do Utilizador">' +credito.agenciaanulaname+' → '+ (credito.useranulaname + ((credito.useranulasurname === credito.useranulaname) ? '' : ' ' +credito.useranulasurname)) +' ← '+credito.anuladatanulacao+ '</h3>' +
            '</div>' +
            '<div class="more" >' +
                '<h4>NIF Cliente</h4>' +
                '<p>'+credito.clientnif+'</p>'+

                '<h4>Tipo Credito</h4>' +
                '<p>'+credito.tipocreditoname+'</p>'+

                '<h4>Data de inicio do credito</h4>' +
                '<p>'+credito.creditoinicio+'</p>'+

                '<h4>Data de fim do Credito</h4>' +
                '<p>'+credito.creditofinalizar+'</p>'+

                '<h4>Numero de prestaçao</h4>' +
                '<p>'+credito.creditoprestacaoe+((credito.creditoprestacaoe > 1 || credito.creditoprestacaoe !==0) ? ' prestaçoes' : ' prestaçao' )+'</p>'+

                '<h4>Valor Credito</h4>' +
                '<p>'+anulados.formattedString(credito.creditovalor)+'</p>'+

                '<h4>Justificaçao</h4>' +
                '<p>'+credito.anulaobs+'</p>'+
                '</div>' +
            '</section>';
        $(".list-warr").append(rt);
    };

    /**
     * @param GarClient {CreditoAnulados}
     */
    this.addCredito = function (GarClient) {
        this.listaCredito[this.listaCredito.length] = GarClient;
    };
};



var CreditoAnulados = function () {
    this.id = undefined;
    this.agenciaanulaid = undefined;
    this.agenciaanulaname = undefined;
    this.agenciacreateid = undefined;
    this.agenciacreatename = undefined;
    this.anuladatanulacao = undefined;
    this.anulaobs = undefined;
    this.clientname = undefined;
    this.clientnif = undefined;
    this.clientsurname = undefined;
    this.creditofinalizar = undefined;
    this.creditoinicio = undefined;
    this.creditonumero = undefined;
    this.creditoprestacaoe = undefined;
    this.creditorembolso = undefined;
    this.creditovalor = undefined;
    this.tipocreditoid = undefined;
    this.tipocreditoname = undefined;
    this.useranulaname = undefined;
    this.useranulanif = undefined;
    this.useranulasurname = undefined;
    this.usercreatename = undefined;
    this.usercreatenif = undefined;
    this.usercreatesurname = undefined;

    /**
     *
     * @type {[Information]}
     */
    this.listaInformacao = [];

    /**
     *
     * @param information {Information}
     */
    this.addInformation = function (information) {
        this.listaInformacao[this.listaInformacao.length] = information;
    }
};

var Information = function () {
    this.id = undefined;
    this.tipo = undefined;
    this.name = undefined;
    this.value = undefined;
};


var ExportData = function () {
    this.type = undefined;
    this.name = undefined;
    this.data = undefined;

    this.haveData = function () {
        return true/*(this.data !== undefined || $.isArray(this.data))*/;
    };
};

var creditBluider = new CreditoBluiderAnulados();

var dataExport = new ExportData();

function loadDataToPage() {
    $.ajax({
        url: "./bean/relInformationCredit.php",
        type: "POST",
        data: {intensao: "loadListCreditsAlunado", filter: getDataStorage(sessionStorage,'filterReport')},
        dataType: "json",
        success: function (e) {
            anulados.data = e.credits;
            dataExport.data = anulados.data;
            dataExport.type = "rep.cred_anulado";
            dataExport.name = "Creditos Anulados";
            /*sessionStorage.dataExport = JSON.stringify(dataExport);*/
            anulados.last_add = 0;
        }, beforeSend: function () {  $(".mp-loading").fadeIn(); },
        complete: function () { $(".mp-loading").fadeOut();
            $(".list-warr").empty();
            transformDataToCredito();
        }
    });
}

function transformDataToCredito() {
    var totalData = (anulados.data !== undefined) ? anulados.data.length: 0;
    var add = 0;
    for (var i = anulados.last_add; (i < totalData && add < anulados.total_add); i++) {
        var credits = anulados.data[i];
        var anu_cre = new CreditoAnulados();
        anu_cre.agenciaanulaid = credits.agenciaanulaid;
        anu_cre.agenciaanulaname = credits.agenciaanulaname;
        anu_cre.agenciacreateid = credits.agenciacreateid;
        anu_cre.agenciacreatename = credits.agenciacreatename;
        anu_cre.anuladatanulacao = credits.anuladatanulacao.substr(0, 16);
        anu_cre.anulaobs = credits.anulaobs;
        anu_cre.clientname = credits.clientname;
        anu_cre.clientnif = credits.clientnif;
        anu_cre.clientsurname = credits.clientsurname;
        anu_cre.creditofinalizar = credits.creditofinalizar;
        anu_cre.creditoinicio = credits.creditoinicio;
        anu_cre.creditonumero = credits.creditonumero;
        anu_cre.creditoprestacaoe = Number(credits.creditoprestacaoe);
        anu_cre.creditorembolso = credits.creditorembolso;
        anu_cre.creditovalor = credits.creditovalor;
        anu_cre.tipocreditoid = credits.tipocreditoid;
        anu_cre.tipocreditoname = credits.tipocreditoname;
        anu_cre.useranulaname = credits.useranulaname;
        anu_cre.useranulanif = credits.useranulanif;
        anu_cre.useranulasurname = credits.useranulasurname;
        anu_cre.usercreatename = credits.usercreatename;
        anu_cre.usercreatenif = credits.usercreatenif;
        anu_cre.usercreatesurname = credits.usercreatesurname;
        creditBluider.addCredito(anu_cre);
        creditBluider.bluiderCreditos(anu_cre, i);
        add++;
        anulados.last_add = i+1;
    }
}

var anulados = {
    last_add : 0,
    data : undefined,
    total_add : 100,
    formattedString : function(nStr) {
    var num = nStr.replace(/(\s)/g, '');
    return  num.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
}
};


